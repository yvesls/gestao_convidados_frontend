import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { CommonModule } from "@angular/common";
import { HomeComponent } from './components/home/home.component';
import { ListaConvidadosComponent } from './components/lista-convidados/lista-convidados.component';
import { CadastroConvidadosComponent } from './components/cadastro-convidados/cadastro-convidados.component';
import { CadastroTipoConvidadosComponent } from './components/cadastro-tipo-convidados/cadastro-tipo-convidados.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginComponent } from './components/login/login.component';
import { GridComponent } from './components/kit/grid/grid.component';
import { ModalConfigComponent } from './components/kit/modal-config/modal-config.component';
import { ModalService } from "./services/modal.service";

@NgModule({
    declarations: [AppComponent, MenuLateralComponent, HomeComponent, ListaConvidadosComponent, CadastroConvidadosComponent, CadastroTipoConvidadosComponent, BreadcrumbComponent, LoginComponent, GridComponent, ModalConfigComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
    providers: [ModalService],
    bootstrap: [AppComponent],
    exports: [MenuLateralComponent],
})
export class AppModule {}
