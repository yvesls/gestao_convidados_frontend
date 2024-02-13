import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConvidadosComponent } from './editar-convidados.component';

describe('EditarConvidadosComponent', () => {
  let component: EditarConvidadosComponent;
  let fixture: ComponentFixture<EditarConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConvidadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
