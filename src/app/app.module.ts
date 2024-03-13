import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { CommonModule } from "@angular/common";
import { HomeComponent } from './components/home/home.component';
import { ListaConvidadosComponent } from './components/convidados/lista-convidados/lista-convidados.component';
import { CadastroConvidadosComponent } from './components/convidados/cadastro-convidados/cadastro-convidados.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginComponent } from './components/login/login.component';
import { GridComponent } from './components/kit/grid/grid.component';
import { ModalConfigComponent } from './components/kit/modal-config/modal-config.component';
import { ModalService } from "./services/modal.service";
import { PopupComponent } from './components/kit/popup/popup.component';
import { EditarConvidadosComponent } from "./components/convidados/editar-convidados/editar-convidados.component";
import { EditarTipoConvidadoComponent } from "./components/convidados/tipo-convidados/editar-tipo-convidado/editar-tipo-convidado.component";
import { CadastroTipoConvidadoComponent } from "./components/convidados/tipo-convidados/cadastro-tipo-convidado/cadastro-tipo-convidado.component";

@NgModule({
    declarations: [AppComponent, MenuLateralComponent, HomeComponent, ListaConvidadosComponent, CadastroConvidadosComponent, CadastroTipoConvidadoComponent, BreadcrumbComponent, LoginComponent, GridComponent, ModalConfigComponent, PopupComponent, EditarConvidadosComponent, EditarTipoConvidadoComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
    providers: [ModalService],
    bootstrap: [AppComponent],
    exports: [MenuLateralComponent],
})
export class AppModule {}
