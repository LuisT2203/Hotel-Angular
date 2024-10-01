import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuespedsComponent } from './huespeds.component';

describe('HuespedsComponent', () => {
  let component: HuespedsComponent;
  let fixture: ComponentFixture<HuespedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuespedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuespedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
