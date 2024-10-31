document.getElementById("createAccountForm").addEventListener("submit", function (e) {
e.preventDefault();
const username = document.getElementById("email").value;
const password = document.getElementById("password").value;

if (localStorage.getItem(username)) {
    alert("Usuário já existe. Escolha outro usuário.");
    return;
}
localStorage.setItem(username, JSON.stringify ({
    password: password,
    books: []
}));

alert ("Conta criada com sucesso!");
window.location.href = "../html/index.html"


});