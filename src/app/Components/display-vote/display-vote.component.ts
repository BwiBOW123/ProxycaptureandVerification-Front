import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-display-vote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './display-vote.component.html',
  styleUrl: './display-vote.component.css'
})

export class DisplayVoteComponent implements OnInit,OnDestroy{

  ques:any
  private quesSubscription:any

  public form: FormGroup;
  constructor(private fb: FormBuilder,private dataservice:DataService) {
    this.form = fb.group({});
    this.form.addControl("Name",fb.control("ชื่อไทย 123456"))
    this.form.addControl("offerProxy",fb.control("นายศร"))
    this.form.addControl("signature",fb.control("มี"))
    this.questions.forEach((question)=>{
      this.form.addControl(
        question.name,
        fb.control(question.select)
      );
    })
    }
  ngOnInit(): void {
      this.questions.length = 0
      this.onSubmit()
      this.quesSubscription = this.dataservice.questions$.subscribe(newData=>{
        this.ques = newData
        newData.forEach(()=>{
          this.questions.push({
            name:"วาระที่1",
            ans1:"เห็นด้วย",
            ans2:"ไม่เห็นด้วย",
            ans3:"งดออกเสียง",
            select:"เห็นด้วย"
          })
        })
      })

  }
  ngOnDestroy(): void {
    this.quesSubscription.unsubscribe();
  }
  public onSubmit(): void {
    this.dataservice.setVote(this.form.value)
  }

  questions = [
    {
      name:"วาระที่1",
      ans1:"เห็นด้วย",
      ans2:"ไม่เห็นด้วย",
      ans3:"งดออกเสียง",
      select:"เห็นด้วย"
    }
  ]
}
