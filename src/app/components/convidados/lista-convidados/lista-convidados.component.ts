import { Component, OnInit } from '@angular/core';
import { MenuStateService } from 'src/app/services/menu-state.service';
import { ActionConfiguration } from '../../kit/interfaces/action-configuration';
import { IconConfiguration } from '../../kit/interfaces/icon-configuration';
import { ModalService } from 'src/app/services/modal.service';
import { DefaultIconConfiguration } from '../../kit/abstracts/default-icon-configuration.class';
import { PopupConfiguration } from '../../kit/interfaces/popup-configuration';
import { DeletePopupConfig } from '../../kit/model-config/delete-popup-config.class';
import { SuccessPopupConfig } from '../../kit/model-config/success-popup-config.class';
import { PopupService } from 'src/app/services/popup.service';
import { distinctUntilChanged, take } from 'rxjs';
import { EditarConvidadosComponent } from '../editar-convidados/editar-convidados.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuestFilter } from '../../kit/model-config/guest-filter.class';
import { ConvidadosStore } from '../convidados.store';

@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['./lista-convidados.component.css']
})
export class ListaConvidadosComponent implements OnInit {
  isCollapsed: boolean = false;
  convidadoGrid!: ConvidadoGrid;
  filtroForm!: FormGroup;

  constructor(private menuStateService: MenuStateService, private modalService: ModalService, private popupService: PopupService, private formBuilder: FormBuilder, private convidadoStore: ConvidadosStore) { }

  ngOnInit(): void {
    this.filtroForm = this.formBuilder.group({
      nomeConvidado: [''],
      tipoConvidado: [''],
      presente: ['']
    });

    this.menuStateService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });

    this.convidadoGrid = new ConvidadoGrid(
      new CustomIconConfiguration(),
      new CustomActionConfiguration(this.modalService, this.popupService)
    );

    this.convidadoStore.findAllByUser().subscribe((guests) => {
      const data = guests.map((guest) => {
        return {
          id: guest.guestId,
          nome: guest.guestName,
          email: guest.guestEmail,
          telefone: guest.guestTel,
          tipoConvidado: guest.typeGuest.typeDescription,
          presente: guest.present ? 'Sim' : 'Não',
          acao: this.convidadoGrid.generateActionIcons(guest.guestId),
        };
      });

      this.convidadoGrid.setGridData(data);
    });
  }

  onSubmit() {
    const guestFilter: GuestFilter = {
      nomeConvidado: this.filtroForm.get('nomeConvidado')?.value,
      tipoConvidado: this.filtroForm.get('tipoConvidado')?.value,
      presente: this.filtroForm.get('presente')?.value
    };
    console.log(this.filtroForm.value);
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
      this.modalService.openModal(EditarConvidadosComponent);
    } else {
      this.modalService.closeModal();
    }
  }
}

class ConvidadoGrid {
  constructor(
    private iconConfig: IconConfiguration,
    private actionConfig: ActionConfiguration
  ) {}

  gridColumns =  [
    { header: 'ID', field: 'id' },
    { header: 'Nome do Convidado', field: 'nome' },
    { header: 'Email', field: 'email' },
    { header: 'Telefone', field: 'telefone' },
    { header: 'Tipo de Convidado', field: 'tipoConvidado' },
    { header: 'Confirmou Presença?', field: 'presente' },
    { header: 'Ações', field: 'acao' },
  ];

  gridData = [];

  setGridData(data: any) {
    this.gridData = data;
  }

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
