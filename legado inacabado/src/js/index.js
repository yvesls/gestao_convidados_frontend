
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
$("#logar").click(async (e) => {
    e.preventDefault();
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
        alert("home")
        window.location = "/src/home.html";
        console.log(response.headers.get(key))
    } else {
        alert("not ok. Index")
        window.location = "../../index.html";
    }

    window.setTimeout(function () {
        alert("timeout. index")
        window.location = "../../index.html";
    }, 3000);
});

$("#registrar").click(async (e) => {
    e.preventDefault();
    const nome = $("#inputNameR").val();
    const senha = $("#inputPasswordR").val();
    if (nome === "" || senha === "") {
        $("#modalErro").show("Campo descrição ou data de conclusão vazio");
        return; 
    }
    const response = await fetch(`${urlApi}/user`, {
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

    if (response.ok) {
        alert("Aprovado")
        window.location = "../../index.html";
        console.log(response.headers.get(key))
    }

    window.setTimeout(function () {
        alert("timeout. index")
        window.location = "../../index.html";
    }, 3000);
});

