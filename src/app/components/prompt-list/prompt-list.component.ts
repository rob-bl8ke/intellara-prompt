import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Prompt } from '../../models/prompt.model';
import { PromptService } from '../../services/prompt.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.css',
})
export class PromptListComponent implements OnInit {
  searchTerm = '';
  selectedTags: string[] = [];

  filteredPrompts$: Observable<Prompt[]>;
  allTags$: Observable<string[]>;

  constructor(private promptService: PromptService, private router: Router) {
    this.filteredPrompts$ = this.promptService.getFilteredPrompts();
    this.allTags$ = this.promptService.getAllTags();
  }

  ngOnInit(): void {}

  onSearchChange(): void {
    this.promptService.setSearchTerm(this.searchTerm);
  }

  onTagChange(event: any, tag: string): void {
    if (event.target.checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    }
    this.promptService.setSelectedTags(this.selectedTags);
  }

  selectPrompt(id: string): void {
    this.router.navigate(['/prompt', id]);
  }
}
