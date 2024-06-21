import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DisplayDocumentComponent } from '../../Components/display-document/display-document.component';
import { DisplayFileComponent } from '../../Components/display-file/display-file.component';
import { DisplayVoteComponent } from '../../Components/display-vote/display-vote.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { ToolbarComponent } from '../../Components/toolbar/toolbar.component';

@Component({
  selector: 'app-proxycapture-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,DisplayDocumentComponent,DisplayFileComponent,DisplayVoteComponent,NavbarComponent,ToolbarComponent],
  templateUrl: './proxycapture-page.component.html',
  styleUrl: './proxycapture-page.component.css'
})
export class ProxycapturePageComponent {

}
