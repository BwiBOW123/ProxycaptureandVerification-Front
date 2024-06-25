import { Component, HostListener, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DynamsoftService } from '../../Services/dynamsoft.service';
import { DisplayVoteComponent } from '../display-vote/display-vote.component';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  page:number = 0
  folder:number = 0
  pageSubscription:any = 0
  folderSubscription:any = 0
  constructor(private dynamsoftService: DynamsoftService,private dataservice:DataService){
    this.page = this.dataservice.getPage()
    this.folder = this.dataservice.getFolder()
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if(event.keyCode==37){
        this.prevPage()
      }
      if(event.keyCode==39){
        this.nextPage()
      }
  }

  ngOnInit(): void {
    this.pageSubscription = this.dataservice.page$.subscribe(newData=>{
      this.page = newData

    })
    this.folderSubscription = this.dataservice.folder$.subscribe(newData=>{
      this.folder = newData
    })
    //this.dataservice.setDocumentData([{barcode:"123",pages:["page1","page2"]},{barcode:"1233rr",pages:["page1","page2"]}])
  }
  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
  }
  dynamsoftRunProcess(){
    this.dynamsoftService.acquireImage()
  }

  path_img = ['../../../assets/img/print.png','../../../assets/img/fit_screen.png','../../../assets/img/open.png','../../../assets/img/arrow_back.png','../../../assets/img/arrow_forward.png','../../../assets/img/check.png','../../../assets/img/cancel.png']

  fitToWindow(){
    let img = document.getElementsByClassName("Document-img")[0] as HTMLElement
    img.style.width = "60%"
  }
  fitToScreen(){
    let img = document.getElementsByClassName("Document-img")[0] as HTMLElement
    img.style.width = "100%"
  }
  submit(){
    console.log(this.dataservice.getVote())
  }

  nextPage(){
    let max = Array.from(document.getElementsByClassName("Folder"+this.dataservice.getFolder())).length -1;
    let headmax = Array.from(document.getElementsByClassName("head-folder")).length -1;
    if(max > 0){
      if(this.page >= max && this.folder < headmax){
        this.dataservice.setPage(0)
        this.dataservice.setFolder(this.dataservice.getFolder()+1)
      }else if(this.page < max){
        this.dataservice.setPage(this.dataservice.getPage()+1)
      }
      this.checkInput()
      this.dataservice.setSrcImage(this.dataservice.getDocumentData()[this.folder].pages[this.page])
    }
    console.log("Folder:"+this.dataservice.getFolder())
    console.log("Page"+this.dataservice.getPage())
  }
  prevPage(){
    let max = Array.from(document.getElementsByClassName("Folder"+this.dataservice.getFolder())).length -1;
    if(max > 0){
      if(this.page <= 0 && this.folder > 0){
        this.dataservice.setPage(max)
        this.dataservice.setFolder(this.dataservice.getFolder()-1)
      }else if(this.page > 0){
        this.dataservice.setPage(this.dataservice.getPage()-1)
      }
      this.checkInput()
      this.dataservice.setSrcImage(this.dataservice.getDocumentData()[this.folder].pages[this.page])
    }
    console.log("Folder: "+this.folder)
    console.log("Page: "+this.page)
  }
  checkInput(){
    if(document.getElementById("Folder"+this.folder+"-Page"+(this.page)) != null){
      let input = document.getElementById("Folder"+this.folder+"-Page"+(this.page)) as HTMLInputElement;
      input.checked = true;
    }
    if(document.getElementsByClassName("Folder"+this.folder).length != 0){
      let inputs =  Array.from(document.getElementsByClassName("Folder"+this.folder)) as HTMLInputElement[];
      let cntInput = inputs.filter(value=>value.checked === true).length
      let headInput = document.getElementById("Folder"+this.folder) as HTMLInputElement;
      let maxInput = inputs.length
      if(cntInput >= maxInput){
        headInput.checked = true
      }else{
        headInput.checked = false
      }
    }
  }
}
