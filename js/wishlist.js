document.addEventListener("DOMContentLoaded", function () {
    const listaDesejos = document.getElementById("listaDesejos");

    const storedListaDesejos = JSON.parse(localStorage.getItem("listaDesejos")) || [];

    storedListaDesejos.forEach(function (itemText) {
        const newItem = document.createElement("li");
        newItem.textContent = itemText;
        listaDesejos.appendChild(newItem);
    });
});
