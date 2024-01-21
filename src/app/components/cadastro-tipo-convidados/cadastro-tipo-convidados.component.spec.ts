import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTipoConvidadosComponent } from './cadastro-tipo-convidados.component';

describe('CadastroTipoConvidadosComponent', () => {
  let component: CadastroTipoConvidadosComponent;
  let fixture: ComponentFixture<CadastroTipoConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTipoConvidadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTipoConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
