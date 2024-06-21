import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DynamsoftService } from '../../Services/dynamsoft.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private dynamsoftService: DynamsoftService){

  }

  dynamsoftRunProcess(){
    this.dynamsoftService.acquireImage()
  }

  path_img = ['../../../assets/img/print.png','../../../assets/img/fit_screen.png','../../../assets/img/open.png','../../../assets/img/arrow_back.png','../../../assets/img/arrow_forward.png','../../../assets/img/check.png','../../../assets/img/cancel.png']
}
