/* configurando exibição de containers */
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

/* configurando as requisições */
$(document).ready(function (){
    getConvidados();
});

const urlApi = "http://localhost:8080";
async function getConvidados() {
        let key = "Authorization";
        const response = await fetch(`${urlApi}/guest/user`, {
        method: "GET",
        headers: new Headers({
        Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    console.log(data);
    if (response.status === 200) {
        createList(data);
    }
}

function createList(list) {
    for(x in list) {
        console.log(list[x]);
        let isChecked;
        list[x].present === true ? isChecked = 'checked' : isChecked = '';
        $("table > tbody").append(`
            <tr>
                <th>${list[x].guestName}</th>
                <td>${list[x].guestTel}</td>
                <td>${list[x].typeGuest.typeDescription}</td>
                <td><input class="" type="checkbox" ${isChecked}/></td>
            </tr>
        `)
    }
}