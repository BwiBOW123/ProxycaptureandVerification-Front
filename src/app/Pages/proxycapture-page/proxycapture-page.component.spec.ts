import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxycapturePageComponent } from './proxycapture-page.component';

describe('ProxycapturePageComponent', () => {
  let component: ProxycapturePageComponent;
  let fixture: ComponentFixture<ProxycapturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProxycapturePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProxycapturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
