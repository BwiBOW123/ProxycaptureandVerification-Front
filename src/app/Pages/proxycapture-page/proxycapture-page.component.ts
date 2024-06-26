import { MessageInfo } from './../../Models/Models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DisplayDocumentComponent } from '../../Components/display-document/display-document.component';
import { DisplayFileComponent } from '../../Components/display-file/display-file.component';
import { DisplayVoteComponent } from '../../Components/display-vote/display-vote.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { ToolbarComponent } from '../../Components/toolbar/toolbar.component';
import { MessageBoxComponent } from '../../Components/message-box/message-box.component';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-proxycapture-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,DisplayDocumentComponent,DisplayFileComponent,DisplayVoteComponent,NavbarComponent,ToolbarComponent,MessageBoxComponent],
  templateUrl: './proxycapture-page.component.html',
  styleUrl: './proxycapture-page.component.css'
})
export class ProxycapturePageComponent implements OnInit,OnDestroy{


  MessageBox:any
  private MessageBoxSubscription:any

  constructor(private dataservice:DataService) {
    this.MessageBox = this.dataservice.getShowMsg()
  }

  ngOnInit(): void {
    //this.MessageBox.content_message = "Helloasdsadsdasdasdasfsldfks;dlfksdf;lkdsf;slkf;sfks;ldfk;asdlkasdlasdjl"
    //this.MessageBox.documentCode = ["123ade","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15","asdsad15"]
    this.MessageBoxSubscription = this.dataservice.MessageBox$.subscribe(newData=>{
      this.MessageBox = newData
    })
  }
  ngOnDestroy(): void {
    this.MessageBoxSubscription.unsubscribe();
  }
}
