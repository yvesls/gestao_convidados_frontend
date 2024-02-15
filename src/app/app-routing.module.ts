import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CadastroConvidadosComponent } from "./components/convidados/cadastro-convidados/cadastro-convidados.component";
import { LoginComponent } from "./components/login/login.component";
import { ListaConvidadosComponent } from "./components/convidados/lista-convidados/lista-convidados.component";
import { CadastroTipoConvidadoComponent } from "./components/convidados/cadastro-tipo-convidado/cadastro-tipo-convidado.component";

const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent 
    },
    { 
        path: 'home', 
        component: HomeComponent, 
        children: [
            {
                path: 'cadastroConvidados',
                component: CadastroConvidadosComponent
            },
            {
                path: 'cadastroTipoConvidado',
                component: CadastroTipoConvidadoComponent
            },
            {
                path: 'listaConvidados',
                component: ListaConvidadosComponent
            },
        ] 
    },
    { 
        path: 'cadastroConvidados', 
        component: CadastroConvidadosComponent 
    },
    { 
        path: 'cadastroTipoConvidado', 
        component: CadastroTipoConvidadoComponent 
    },
    {
        path: 'listaConvidados',
        component: ListaConvidadosComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
