import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDespacho } from './crear-despacho';

describe('CrearDespacho', () => {
  let component: CrearDespacho;
  let fixture: ComponentFixture<CrearDespacho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDespacho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDespacho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
