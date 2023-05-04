/* Funções de exibição de containers */
$("#exibirDivAddConvidado").click(function (){
    $(".div-tipo").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-tipo shadow px-3 my-5 bg-white rounded");
    $(".div-table").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-table shadow px-3 my-5 bg-white rounded");
    $(".div-convidado").removeClass().css("height", "0.0rem").animate({
        height: '18rem'},
        "slow"
    ).addClass("col-10 div-convidado shadow px-3 my-5 bg-white rounded");
});

$("#exibirDivAddTipo").click(function (){
    $(".div-convidado").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-convidado shadow px-3 my-5 bg-white rounded");
    $(".div-table").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-table shadow px-3 my-5 bg-white rounded");
    $(".div-tipo").removeClass().css("height", "0.0rem").animate({
        height: '18rem'},
        "slow"
    ).addClass("col-10 div-tipo shadow px-3 my-5 bg-white rounded");
});

$("#exibirDivConvidados").click(function (){
    $(".div-convidado").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-convidado shadow px-3 my-5 bg-white rounded");
    $(".div-tipo").removeClass().animate({
        height: '0.0'},
        "slow"
    ).addClass("d-none col-10 div-tipo shadow px-3 my-5 bg-white rounded");
    $(".div-table").removeClass().css("height", "0.0rem").animate({
        height: '35rem'},
        "slow"
    ).addClass("col-10 div-table shadow px-3 my-5 bg-white rounded");
});

/* declarando variáveis e constantes globais */
var listaConvidados = [];
var listaConvitesEnviados = [];
var listaTipo = [];
const urlApi = "http://localhost:8080";

/* Funções de requisição */
const getConvidados = async () => {
    let key = "Authorization";
    const response = await fetch(`${urlApi}/guest/user`, {
            method: "GET",
            headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    if (response.status === 200) {
        listaConvidados = data;
        exibirTotalConvidados(data);
        criaTbodyConvidados(data);
    }
}
getConvidados();

const getTipoConvidado = async () => {
    let key = "Authorization";
    const response = await fetch(`${urlApi}/typeguest/user`, {
            method: "GET",
            headers: new Headers({
                Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    if (response.status === 200) {
        listaTipo = data;
        criaSeletoresNomeTipo(listaTipo);
    }
}
getTipoConvidado();

const getTotalEmailsEnviados = async () => {
    let key = "Authorization";
    const response = await fetch(`${urlApi}/email/user`, {
            method: "GET",
            headers: new Headers({
                Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    if (response.status === 200) {
        exibirTotalEmailsEnviados(data);
        listaConvitesEnviados = data;
    }
}
getTotalEmailsEnviados();

$("#registrarConvidado").click(async (e) => {
    e.preventDefault();
    const nome = $("#nomeConvidado").val();
    const email = $("#emailConvidado").val();
    const telefone = $("#telefoneConvidado").val();
    const tipo = $("#tipo").val();
    const presente = $("#presente").is(":checked");

    if (nome === "" || email === ""|| telefone === ""|| tipo === "tipo") {
        $("#modalErro").show("Há campos não preenchidos");
        return; 
    }

    if(listaTipo.length == 0) {
        alert("É preciso adicionar um tipo");
        return;
    }

    let key = "Authorization";
    const response = await fetch(`${urlApi}/guest`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json; charset=utf8",
            Authorization: localStorage.getItem(key),
            Accept: "application/json",
        }),
        body: JSON.stringify({
            guestName: nome,
            present: presente,
            guestEmail: email,
            guestTel: telefone,
            typeGuest: {
                typeId: tipo
            }
        }),
    });

    if (response.ok) {
        alert("Registrado")
        $("#exibirDivConvidados").show();
        getConvidados();
    }
});

$("#registrarTipoConvidado").click(async (e) => {
    e.preventDefault();
    const tipo = $("#tipoConvidado").val();

    if (tipo === "") {
        $("#modalErro").show("O campo não foi preenchido.");
        return; 
    }

    let key = "Authorization";
    const response = await fetch(`${urlApi}/typeguest`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json; charset=utf8",
            Authorization: localStorage.getItem(key),
            Accept: "application/json",
        }),
        body: JSON.stringify({
            typeDescription:tipo
        }),
    });

    if (response.ok) {
        alert("Registrado")
        $("#exibirDivAddTipo").show();
        getTipoConvidado();
    }
});

/* Funções de tratamento de dados */

const criaTbodyConvidados = (list) => {
    $("table > tbody").html('');
    if(list.length == 0){
        exibirMensagemNotFould();
        return;
    }
    $("#tabelaConvidados").addClass("table-hover");
    for(x in list) {
        let isChecked;
        list[x].present === true ? isChecked = 'checked' : isChecked = '';
        $("table > tbody").append(`
            <tr>
                <th>${list[x].guestName}</th>
                <td>${list[x].guestEmail}</td>
                <td>${list[x].guestTel}</td>
                <td>${list[x].typeGuest.typeDescription}</td>
                <td><input class="" type="checkbox" ${isChecked}/></td>
            </tr>
        `)
    }
}

const criaSeletoresNomeTipo = (listaTipo) => {
    $("#filtroDropdownExibicao").html('');
    $("#tipo").html("<option selected>Tipo</option>");
    for(x in listaTipo) {
        $("#filtroDropdownExibicao").append(`<span id="${listaTipo[x].typeId}" class="dropdown-item text-white px-4">${listaTipo[x].typeDescription}</span>`);
        $("#tipo").append(`<option value="${listaTipo[x].typeId}">${listaTipo[x].typeDescription}</option>`);
    }
    adicionarFuncaoNosTipos();
}

/* Funções de exibição de resultado */
const exibirTotalConvidados = (lista) => {
    $("#totalConvidados").html(" ").html(lista.length);
}

const exibirTotalEmailsEnviados = (emailDetails) => {
    $("#totalConvitesEnviados").html("").html(emailDetails.length);
}

/* Funções de busca de dados */
$("#btnProcurar").click(() => {
    let nomeConvidado = $("#inputProcurar").val();
    let result = [];
    let copiaLista = [];
    jQuery.extend(copiaLista, listaConvidados);
    for (let i = 0; i < copiaLista.length; i++) {
        const str = copiaLista[i].guestName;
        if (str.includes(nomeConvidado)) {
            result.push(copiaLista[i]);
        }
    }
    criaTbodyConvidados(result);
});

$("#listarTodos").click(() => {
    criaTbodyConvidados(listaConvidados);
    $("#inputProcurar").val('');
});

const adicionarFuncaoNosTipos = ()=> {
    $($('#filtroDropdownExibicao > span')).click((e)=> {
        let elemento = $(e.target).html();
        let result = [];
        let copiaLista = [];
        jQuery.extend(copiaLista, listaConvidados);
        for (let i = 0; i < copiaLista.length; i++) {
            const str = copiaLista[i].typeGuest.typeDescription;
            if (str.includes(elemento)) {
                result.push(copiaLista[i]);
            }
        }
        criaTbodyConvidados(result);
    });
}

const exibirMensagemNotFould = ()=> {
    $("table > tbody").html('');
    $("#tabelaConvidados").removeClass("table-hover");
    $("table > tbody").append(`
        <tr>
            <td colspan="5" align="center" class="py-5"><h2>Nenhum convidado encontrado.</h2></td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
    `)
}
