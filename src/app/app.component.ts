import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProxycapturePageComponent } from './Pages/proxycapture-page/proxycapture-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProxycapturePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProxycaptureandVerification';
}
