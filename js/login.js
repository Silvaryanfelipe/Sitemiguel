document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem(username));

    if (user) {
        if (user.password === password) {
            localStorage.setItem("loggedUser", username);
            alert("Login Bem-sucedido!");
            window.location.href = "inicial.html";
        } else {
            alert("Usuário ou senha incorretos.");
        }
    }

    else {
        alert("Usuário ou senha incorretos.");
    }
});