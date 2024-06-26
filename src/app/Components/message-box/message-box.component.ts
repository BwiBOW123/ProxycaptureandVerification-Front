import {Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  @Input() isOpen = false;
  @Input() isProcessBox:boolean = false
  @Input() textHead:string = "Function Replace"
  @Input() textContent:string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iste!"
  @Input() textBarcode:string[] = []
  @Input() callYes: () => void = () => {};
  @Input() callNo: () => void = () => {};
  @Output() closed = new EventEmitter<void>();

  open() {
    this.isOpen = true;
  }

  onYes(): void {
    if (this.callYes) {
      this.callYes();
    }
  }
  onNo():void{
    if(this.callNo){
      this.callNo()
    }
  }
  close() {
    this.isOpen = false;
    this.closed.emit();
  }
}
