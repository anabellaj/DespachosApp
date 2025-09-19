import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDespacho } from './detalle-despacho';

describe('DetalleDespacho', () => {
  let component: DetalleDespacho;
  let fixture: ComponentFixture<DetalleDespacho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDespacho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDespacho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
