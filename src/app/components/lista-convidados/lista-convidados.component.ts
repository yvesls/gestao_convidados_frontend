import { Component, OnInit } from '@angular/core';
import { MenuStateService } from 'src/app/services/menu-state.service';
import { ActionConfiguration } from '../kit/interfaces/action-configuration';
import { IconConfiguration } from '../kit/interfaces/icon-configuration';
import { ModalService } from 'src/app/services/modal.service';
import { DefaultIconConfiguration } from '../kit/abstracts/default-icon-configuration.class';

@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['./lista-convidados.component.css']
})
export class ListaConvidadosComponent implements OnInit {
  isCollapsed: boolean = false;
  convidadoGrid!: ConvidadoGrid;

  constructor(private menuStateService: MenuStateService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.menuStateService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });

    this.convidadoGrid = new ConvidadoGrid(
      new CustomIconConfiguration(),
      new CustomActionConfiguration(this.modalService)
    );
  }
}

export class CustomIconConfiguration extends DefaultIconConfiguration {
  override trashIcon = 'fa-solid fa-trash';
  override penIcon = 'fa-solid fa-pen-to-square';
}

export class CustomActionConfiguration implements ActionConfiguration {
  
  constructor(private modalService: ModalService) {
  }

  openModalOnClick = true;

  editAction(id: number): void {
    this.toggleModal();
  }

  deleteAction(id: number): void {
    this.toggleModal();
  }
   
  private toggleModal(): void {
    if (this.openModalOnClick) {
      this.modalService.openModal();
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

  gridData = [
    {
      id: 1,
      nome: 'Reginaldo Pereira',
      email: 'reginaldo@example.com',
      telefone: '123-456-7890',
      tipoConvidado: 'VIP',
      presente: 'Sim',
      acao: this.generateActionIcons(1),
    },
    {
      id: 2,
      nome: 'Ana Silva',
      email: 'ana@example.com',
      telefone: '987-654-3210',
      tipoConvidado: 'VIP',
      presente: 'Sim',
      acao: this.generateActionIcons(2),
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      email: 'carlos@example.com',
      telefone: '555-123-4567',
      tipoConvidado: 'Normal',
      presente: 'Sim',
      acao: this.generateActionIcons(3),
    },
    {
      id: 4,
      nome: 'Juliana Santos',
      email: 'juliana@example.com',
      telefone: '999-888-7777',
      tipoConvidado: 'VIP',
      presente: 'Sim',
      acao: this.generateActionIcons(4),
    },
    {
      id: 5,
      nome: 'Rafael Lima',
      email: 'rafael@example.com',
      telefone: '111-222-3333',
      tipoConvidado: 'Normal',
      presente: 'Sim',
      acao: this.generateActionIcons(5),
    }
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
