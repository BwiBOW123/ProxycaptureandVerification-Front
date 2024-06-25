import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Document} from '../Models/Models'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  private page = new BehaviorSubject<number>(-1);
  private folder = new BehaviorSubject<number>(0);
  private documentdata = new BehaviorSubject<Document[]>([]);
  private votedata = new BehaviorSubject<{}>({});
  private SrcImage = new BehaviorSubject<string>("");
  documentdata$ = this.documentdata.asObservable();
  votedata$ = this.votedata.asObservable();
  SrcImage$ = this.SrcImage.asObservable();
  page$ = this.page.asObservable();
  folder$ = this.folder.asObservable();

  //getter method

  public getDocumentData(): Document[] {
    return this.documentdata.getValue();
  }
  public getSrcImage(): string {
    return this.SrcImage.getValue();
  }
  public getVote(): {} {
    return this.votedata.getValue();
  }
  public getPage(): number {
    return this.page.getValue();
  }
  public getFolder(): number {
    return this.folder.getValue();
  }

  //setter method
  public setVote(newData: {}): void {
    this.votedata.next(newData);
  }
  public setDocumentData(newData: Document[]): void {
    this.documentdata.next(newData);
  }
  public setSrcImage(newData: string): void {
    this.SrcImage.next(newData);
  }
  public setPage(newData:number): void {
    this.page.next(newData);
  }

  public setFolder(newData:number): void {
    this.folder.next(newData);
  }
}
