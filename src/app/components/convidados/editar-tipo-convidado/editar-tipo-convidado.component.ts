import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuStateService } from 'src/app/services/menu-state.service';
import { DefaultIconConfiguration } from '../../kit/abstracts/default-icon-configuration.class';
import { ActionConfiguration } from '../../kit/interfaces/action-configuration';
import { IconConfiguration } from '../../kit/interfaces/icon-configuration';
import { ModalService } from 'src/app/services/modal.service';
import { PopupService } from 'src/app/services/popup.service';
import { DeletePopupConfig } from '../../kit/model-config/delete-popup-config.class';
import { SuccessPopupConfig } from '../../kit/model-config/success-popup-config.class';
import { PopupConfiguration } from '../../kit/interfaces/popup-configuration';
import { distinctUntilChanged, take } from 'rxjs';

@Component({
  selector: 'app-editar-tipo-convidado',
  templateUrl: './editar-tipo-convidado.component.html',
  styleUrls: ['./editar-tipo-convidado.component.css']
})
export class EditarTipoConvidadoComponent implements OnInit {
  @ViewChild('actionContentSpan') actionContentSpan!: ElementRef;

  editarForm!: FormGroup;
  isCollapsed: boolean = false;

  tipoConvidadoGrid!: TipoConvidadoGrid;

  constructor(private formBuilder: FormBuilder, private menuStateService: MenuStateService, private modalService: ModalService, private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.menuStateService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });
    
    this.editarForm = this.formBuilder.group({
      tipoConvidado: ['', Validators.required],
    });

    this.tipoConvidadoGrid = new TipoConvidadoGrid(
      new CustomIconConfiguration(),
      new CustomActionConfiguration(this.modalService, this.popupService)
    );
    
  }

  onSubmit() {
    if (this.editarForm.valid) {
    } else {
    }
  }
}

export class CustomIconConfiguration extends DefaultIconConfiguration {
  override trashIcon = 'fa-solid fa-trash';
  override penIcon = 'fa-solid fa-pen-to-square';
}

export class CustomActionConfiguration implements ActionConfiguration {
  
  constructor(private modalService: ModalService, private popupService: PopupService) {
  }

  openModalOnClick = true;

  editAction(id: number): void {
    this.toggleModal();
  }

  deleteAction(id: number): void {
    const popupConfig: PopupConfiguration = new DeletePopupConfig();

    this.popupService.openPopup(popupConfig);
    this.popupService.onConfirm()
      .pipe(take(1), distinctUntilChanged())
      .subscribe(() => {
        this.excluir();
      });
  }
  
  private excluir(): void {
    this.popupService.openPopup(new SuccessPopupConfig());
  }
   
  private toggleModal(): void {
    if (this.openModalOnClick) {
      this.modalService.openModal(null);
    } else {
      this.modalService.closeModal();
    }
  }
}

class TipoConvidadoGrid {
  constructor(
    private iconConfig: IconConfiguration,
    private actionConfig: ActionConfiguration
  ) {}
    
  gridColumns = [
    { header: 'ID', field: 'id' },
    { header: 'Tipo de Convidado', field: 'tipoConvidado' },
    { header: 'Ação', field: 'acao' },
  ];

  gridData = [
    { id: 1, tipoConvidado: 'VIP', acao: this.generateActionIcons(1)},
    { id: 2, tipoConvidado: 'PISTA', acao: this.generateActionIcons(2)},
    { id: 3, tipoConvidado: 'CAMAROTE', acao: this.generateActionIcons(3)}
  ];

  generateActionIcons(id: number): Icon[] {
    if (this.actionConfig.openModalOnClick) {
      return [
        new Icon(`${this.iconConfig.trashIcon}`, () => this.actionConfig.deleteAction(id)),
        new  Icon(`${this.iconConfig.penIcon}`, () => this.actionConfig.editAction(id))
      ];
    } else {
      return [];
    }
  }
}

export class Icon {
  constructor(public className: string, public clickAction: () => void) {}
}
