import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-display-file',
  standalone: true,
  imports: [],
  templateUrl: './display-file.component.html',
  styleUrl: './display-file.component.css'
})
export class DisplayFileComponent {
  @Input() documentdata:any
  private documentdataSubscription:any
  constructor(private dataservice:DataService) {
    this.documentdata = this.dataservice.getDocumentData()
  }

  ngOnInit(): void {
    this.documentdataSubscription = this.dataservice.documentdata$.subscribe(newData=>{
      this.documentdata = newData
    })
    //this.dataservice.setDocumentData([{barcode:"123456789as0",pages:["Page1","Page2","Page3"]}])
  }
  ngOnDestroy(): void {
    this.documentdataSubscription.unsubscribe();
  }
  triggerOnclick(event: Event){
    const input = event.target as HTMLInputElement;
    let inputs =  Array.from(document.getElementsByClassName(input.id.split("-")[0])) as HTMLInputElement[];
    let maxInput = inputs.length
    if(maxInput != 0 && this.dataservice.getDocumentData()!=undefined){
      this.dataservice.setSrcImage(this.dataservice.getDocumentData()[Number(input.id.split("-")[0].slice(6))].pages[Number(input.id.split("-")[1].slice(4))])
      this.dataservice.setPage(Number(input.id.split("-")[0].slice(6)))
      this.dataservice.setFolder(Number(input.id.split("-")[1].slice(4)))
      console.log(this.dataservice.getPage(),this.dataservice.getFolder())
      let cntInput = inputs.filter(value=>value.checked === true).length
      let headInput = document.getElementById(input.id.split("-")[0]) as HTMLInputElement;
      if(cntInput >= maxInput){
        headInput.checked = true
      }else{
        headInput.checked = false
      }
    }
  }
}

