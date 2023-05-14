import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDeleteComponent } from './invoice-delete.component';

describe('InvoiceDeleteComponent', () => {
  let component: InvoiceDeleteComponent;
  let fixture: ComponentFixture<InvoiceDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
