import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTipoConvidadoComponent } from './editar-tipo-convidado.component';

describe('EditarTipoConvidadoComponent', () => {
  let component: EditarTipoConvidadoComponent;
  let fixture: ComponentFixture<EditarTipoConvidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoConvidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
