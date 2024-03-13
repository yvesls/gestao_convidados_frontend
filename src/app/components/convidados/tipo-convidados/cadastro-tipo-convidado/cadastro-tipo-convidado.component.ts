import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuStateService } from 'src/app/services/menu-state.service';
import { DefaultIconConfiguration } from '../../../kit/abstracts/default-icon-configuration.class';
import { ActionConfiguration } from '../../../kit/interfaces/action-configuration';
import { IconConfiguration } from '../../../kit/interfaces/icon-configuration';
import { ModalService } from 'src/app/services/modal.service';
import { PopupService } from 'src/app/services/popup.service';
import { DeletePopupConfig } from '../../../kit/model-config/delete-popup-config.class';
import { SuccessPopupConfig } from '../../../kit/model-config/success-popup-config.class';
import { PopupConfiguration } from '../../../kit/interfaces/popup-configuration';
import { distinctUntilChanged, take } from 'rxjs';
import { EditarTipoConvidadoComponent } from '../editar-tipo-convidado/editar-tipo-convidado.component';
import { TypeGuest } from '../../../kit/model-config/type-guest.class';
import { TipoConvidadosStore } from '../tipo-convidados.store';
import { TypeGuestService } from 'src/app/services/type-guest.service';

@Component({
  selector: 'app-cadastro-tipo-convidado',
  templateUrl: './cadastro-tipo-convidado.component.html',
  styleUrls: ['./cadastro-tipo-convidado.component.css']
})
export class CadastroTipoConvidadoComponent implements OnInit {
  @ViewChild('actionContentSpan') actionContentSpan!: ElementRef;

  cadastroForm!: FormGroup;
  isCollapsed: boolean = false;

  tipoConvidadoGrid!: TipoConvidadoGrid;

  constructor(private formBuilder: FormBuilder, private menuStateService: MenuStateService, private modalService: ModalService, private popupService: PopupService, private typeGuestStore: TipoConvidadosStore, private typeGuestService: TypeGuestService) {
  }

  ngOnInit(): void {
    this.menuStateService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });
    
    this.cadastroForm = this.formBuilder.group({
      tipoConvidado: ['', Validators.required],
    });

    this.tipoConvidadoGrid = new TipoConvidadoGrid(
      new CustomIconConfiguration(),
      new CustomActionConfiguration(this.modalService, this.popupService, this.typeGuestService)
    );
    
    this.typeGuestStore.findAllByUser().subscribe((typeGuests) => {
      const data = typeGuests.map((type) => {
        return {
          id: type.typeId,
          tipoConvidado: type.typeDescription,
          acao: this.tipoConvidadoGrid.generateActionIcons(type),
        };
      });

      this.tipoConvidadoGrid.setGridData(data);
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
    } else {
    }
  }
}

export class CustomIconConfiguration extends DefaultIconConfiguration {
  override trashIcon = 'fa-solid fa-trash';
  override penIcon = 'fa-solid fa-pen-to-square';
}

export class CustomActionConfiguration implements ActionConfiguration {
  
  constructor(private modalService: ModalService, private popupService: PopupService, private typeGuestService: TypeGuestService) {
  }

  openModalOnClick = true;

  editAction(typeGuest: TypeGuest): void {
    this.toggleModal(typeGuest);
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
   
  private toggleModal(typeGuest: TypeGuest): void {
    if (this.openModalOnClick) {
      this.typeGuestService.setTypeGuest(typeGuest);
      this.modalService.openModal(EditarTipoConvidadoComponent);
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

  gridData = [];

  setGridData(data: any) {
    this.gridData = data;
  }

  generateActionIcons(typeGuest: TypeGuest): Icon[] {
    if (this.actionConfig.openModalOnClick) {
      return [
        new Icon(`${this.iconConfig.trashIcon}`, () => this.actionConfig.deleteAction(typeGuest.typeId)),
        new  Icon(`${this.iconConfig.penIcon}`, () => this.actionConfig.editAction(typeGuest))
      ];
    } else {
      return [];
    }
  }
}

export class Icon {
  constructor(public className: string, public clickAction: () => void) {}
}
