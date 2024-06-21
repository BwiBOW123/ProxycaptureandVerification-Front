import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DisplayDocumentComponent } from '../../Components/display-document/display-document.component';
import { DisplayFileComponent } from '../../Components/display-file/display-file.component';
import { DisplayVoteComponent } from '../../Components/display-vote/display-vote.component';

@Component({
  selector: 'app-proxycapture-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,DisplayDocumentComponent,DisplayFileComponent,DisplayVoteComponent],
  templateUrl: './proxycapture-page.component.html',
  styleUrl: './proxycapture-page.component.css'
})
export class ProxycapturePageComponent {

}
