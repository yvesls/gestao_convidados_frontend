import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CadastroConvidadosComponent } from "./components/cadastro-convidados/cadastro-convidados.component";
import { LoginComponent } from "./components/login/login.component";
import { CadastroTipoConvidadosComponent } from "./components/cadastro-tipo-convidados/cadastro-tipo-convidados.component";
import { ListaConvidadosComponent } from "./components/lista-convidados/lista-convidados.component";

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
                path: 'cadastroTipoConvidados',
                component: CadastroTipoConvidadosComponent
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
        path: 'cadastroTipoConvidados', 
        component: CadastroTipoConvidadosComponent 
    },
    {
        path: 'listaConvidados',
        component: ListaConvidadosComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
