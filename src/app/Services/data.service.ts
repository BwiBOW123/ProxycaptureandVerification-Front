import { Injectable } from '@angular/core';
import {Document} from '../Models/Models'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  private documentdata = new BehaviorSubject<Document[]>([]);

  public getDocumentData(): Document[] {
    return this.documentdata.getValue();
  }
  public setDocumentData(newData: Document[]): void {
    this.documentdata.next(newData);
  }
}
