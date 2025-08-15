import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptListComponentComponent } from './prompt-list.component';

describe('PromptListComponentComponent', () => {
  let component: PromptListComponentComponent;
  let fixture: ComponentFixture<PromptListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
