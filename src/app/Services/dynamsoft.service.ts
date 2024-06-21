import { Injectable } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import { DataService } from './data.service';
import {Document} from '../Models/Models'

@Injectable({
  providedIn: 'root'
})
export class DynamsoftService {

  constructor(private dataService: DataService) {
    this.initDynamsoft();
    this.initDynamsoftWeb();
  }

  barcode:string = ''
  private reader: any;
  DWObject: WebTwain | any = null;
  containerId = "dwtcontrolContainer";

  private initDynamsoft() {
    BarcodeScanner.engineResourcePath = 'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/';
    BarcodeScanner.productKeys = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAyOTE3ODQyLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAyOTE3ODQyIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjoyMTE2OTc3NjEyfQ==';
  }
  private initDynamsoftWeb() {
    Dynamsoft.DWT.Containers = [{
      WebTwainId: 'dwtObject',
      ContainerId: this.containerId,
      Width: '0px',
      Height: '0px'
  }];
  Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
    this.Dynamsoft_OnReady();
  });
  Dynamsoft.DWT.ProductKey = 't01898AUAADqpfiwCdum8DS4zwO0GaXGvhvvyqqHGpvCxGE+yMnPwjVU2Etw/X4PCKH60MIG3sKcz2xGDrAqUfsFCSQeahU3t9c+pAk7L7zTkd7KAU4+cQDsP47Lb1TxvmqAReM+AbcdhA5gCSy0HoAtrbfQAeYA5gHk10AMuV3H++cIxIOnXOxs6OVXAafmdaUDyOFnAqUfOISB1RNUPq+2XgDA9OTtAHmCXANeL7BQQHAF5gJ0ARllAaz+J4DGR';
  Dynamsoft.DWT.ResourcesPath = 'assets/dwt-resources';
  Dynamsoft.DWT.Load();
  }
  Dynamsoft_OnReady() {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
  }

  async createBarcodeReader() {
    if (!this.reader) {
      try {
        this.reader = await BarcodeScanner.createInstance();
      } catch (ex) {
        console.error(ex);
      }
    }
    return this.reader;
  }

  async readBarcode(base64String: string) {
    try {
      if (!this.reader) {
        await this.createBarcodeReader();
      }
      const results = await this.reader.decodeBase64String(`data:image/jpg;base64,${base64String}`);
      if(results[0] != undefined){
        return [true,results];
      }else{
        return [false,results];
      }
    } catch (ex) {
      return [];
    }
  }

  acquireImage() {
    if (this.DWObject) {
        this.DWObject.SelectSourceAsync()
        .then(() => {
            return this.DWObject.AcquireImageAsync({
              IfCloseSourceAfterAcquire: true,
              IfShowUI: false,
              PixelType: Dynamsoft.DWT.EnumDWT_PixelType.TWPT_GRAY,
              Resolution: 150,
            });
        })
        .then(()=> {
          this.processAcquiredImages()
        } )
        .catch((e:any) => {
          console.log(e)
        });
    }
  }
  cuntFolder:number = -1
  async processAcquiredImages():Promise<void>{
    let Doc:Document = {barcode:"",pages:[]}
    for (let index = 0; index < this.DWObject.HowManyImagesInBuffer; index++) {
      let base64 = await this.decodeBase64([index])
      let code = await this.decodeBarcode(base64)
      if(this.dataService.getDocumentData().find(value=>value.barcode == code) == undefined){
        if(code != this.barcode){
          this.cuntFolder++
          Doc.barcode = code
          Doc.pages.push(base64)
          this.dataService.getDocumentData().push(Doc)
          this.barcode = code
        }else{
          this.dataService.getDocumentData()[this.cuntFolder].pages.push(base64)
        }
      }
    }
    if (this.DWObject) {
      this.DWObject.RemoveAllImages();
    }
    console.log(this.dataService.getDocumentData())
  }


  async decodeBase64(index :[number]):Promise<string>{
    return new Promise((resole,reject)=>{
      try {
        this.DWObject.ConvertToBase64(index,Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,(result:any, indices:any, type:any)=>{
          let base64
          base64 = result.getData(0, result.getLength())
          resole(base64)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  async decodeBarcode(base64:string):Promise<any>{
    return new Promise(async (resole,reject)=>{
      try {
        let barcodeResults:any = await this.readBarcode(base64)
        let barcode = (barcodeResults[0] == true)?barcodeResults[1][0].barcodeText:this.barcode
        resole(barcode)
      } catch (error) {
        reject(error)
      }
    })
  }
}
