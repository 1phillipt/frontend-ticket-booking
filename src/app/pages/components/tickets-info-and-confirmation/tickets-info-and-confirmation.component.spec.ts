import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsInfoAndConfirmationComponent } from './tickets-info-and-confirmation.component';

describe('TicketsInfoAndConfirmationComponent', () => {
  let component: TicketsInfoAndConfirmationComponent;
  let fixture: ComponentFixture<TicketsInfoAndConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsInfoAndConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsInfoAndConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
