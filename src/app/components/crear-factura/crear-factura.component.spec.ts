import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFacturaComponent } from './crear-factura.component';

describe('CrearFacturaComponent', () => {
  let component: CrearFacturaComponent;
  let fixture: ComponentFixture<CrearFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
