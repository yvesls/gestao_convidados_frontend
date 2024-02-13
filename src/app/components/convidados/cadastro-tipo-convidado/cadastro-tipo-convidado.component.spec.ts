import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTipoConvidadoComponent } from './cadastro-tipo-convidado.component';

describe('CadastroTipoConvidadoComponent', () => {
  let component: CadastroTipoConvidadoComponent;
  let fixture: ComponentFixture<CadastroTipoConvidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTipoConvidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTipoConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
