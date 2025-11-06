import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecetas } from './formulario-recetas';

describe('FormularioRecetas', () => {
  let component: FormularioRecetas;
  let fixture: ComponentFixture<FormularioRecetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRecetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRecetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
