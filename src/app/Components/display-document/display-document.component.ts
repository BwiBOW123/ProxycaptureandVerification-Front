import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
@Component({
  selector: 'app-display-document',
  standalone: true,
  imports: [],
  templateUrl: './display-document.component.html',
  styleUrl: './display-document.component.css'
})
export class DisplayDocumentComponent implements OnInit,OnDestroy{
  @Input() SrcImage:any
  private SrcImageSubscription:any

  constructor(private dataservice:DataService) {
    this.SrcImage = this.dataservice.getSrcImage()
  }

  ngOnInit(): void {
    this.SrcImageSubscription = this.dataservice.SrcImage$.subscribe(newData=>{
      this.SrcImage = newData
    })
  }
  ngOnDestroy(): void {
    this.SrcImageSubscription.unsubscribe();
  }
}
