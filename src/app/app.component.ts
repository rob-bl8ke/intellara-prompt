import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromptListComponent } from './components/prompt-list/prompt-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PromptListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Intellara Prompt Database';
}