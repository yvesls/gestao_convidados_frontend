
/* animação e exibição dos forms */
$("#abrirRegistrar").click(() => {
    $("#formLogar").animate({
        opacity: '0.0'},
        "slow"
    ).addClass("d-none");
    $("#formRegistrar").animate({
        opacity: '1.0'},
        "slow"
    ).removeClass("d-none");
});

$("#abrirLogar").click(() => {
    $("#formLogar").animate({
        opacity: '1'},
        "slow"
    ).removeClass("d-none");
    $("#formRegistrar").animate({
        opacity: '0.0'},
        "slow"
    ).addClass("d-none");
});

const urlApi = "http://localhost:8080";
$("#logar").click(async () => {
    //$("#carregando").removeClass("d-none").innerHTML = "<div class='spinner-grow text-atualizar m-auto' role='status'><span class='visually-hidden'>Carregando...</span></div>";
    const nome = $("#inputName").val();
    const senha = $("#inputPassword").val();
    if (nome === "" || senha === "") {
        $("#modalErro").show("Campo descrição ou data de conclusão vazio");
        return; 
    }
    const response = await fetch(`${urlApi}/login`, {
        method: "POST",
        headers: new Headers({
        "Content-Type": "application/json; charset=utf8",
        Accept: "application/json",
        }),
        body: JSON.stringify({
        username: nome,
        password: senha,
        }),
    });

    let key = "Authorization";
    let token = response.headers.get(key);
    window.localStorage.setItem(key, token);

    if (response.ok) {
        window.location = "/src/home.html";
        console.log(response.headers.get(key))
    } else {
        window.location = "../../index.html";
    }

    window.setTimeout(function () {
        window.location = "../../index.html";
    }, 3000);
});

