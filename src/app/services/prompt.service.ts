import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { Prompt } from '../models/prompt.model';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts$ = new BehaviorSubject<Prompt[]>([]);
  private searchTerm$ = new BehaviorSubject<string>('');
  private selectedTags$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.loadPrompts();
  }

  private loadPrompts(): void {
    this.http.get<Prompt[]>('/assets/data/prompts.json').subscribe(
      prompts => this.prompts$.next(prompts)
    );
  }

  getPrompts(): Observable<Prompt[]> {
    return this.prompts$.asObservable();
  }

  getFilteredPrompts(): Observable<Prompt[]> {
    return combineLatest([
      this.prompts$,
      this.searchTerm$,
      this.selectedTags$
    ]).pipe(
      map(([prompts, searchTerm, selectedTags]) => {
        return prompts.filter(prompt => {
          const matchesSearch = !searchTerm || 
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

          const matchesTags = selectedTags.length === 0 ||
            selectedTags.every(tag => prompt.tags.includes(tag));

          return matchesSearch && matchesTags;
        });
      })
    );
  }

  getAllTags(): Observable<string[]> {
    return this.prompts$.pipe(
      map(prompts => {
        const allTags = prompts.flatMap(prompt => prompt.tags);
        return [...new Set(allTags)].sort();
      })
    );
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }

  setSelectedTags(tags: string[]): void {
    this.selectedTags$.next(tags);
  }

  getPromptById(id: string): Observable<Prompt | undefined> {
    return this.prompts$.pipe(
      map(prompts => prompts.find(prompt => prompt.id === id))
    );
  }
}