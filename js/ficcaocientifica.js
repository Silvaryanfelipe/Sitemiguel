document.addEventListener("DOMContentLoaded", function() {
    const adicionarItemBtns = document.querySelectorAll(".adicionarItemBtn");

    adicionarItemBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const title = btn.parentNode.querySelector("h6").textContent;
            const listaDesejos = JSON.parse(localStorage.getItem("listaDesejos")) || [];
            listaDesejos.push(title);
            localStorage.setItem("listaDesejos", JSON.stringify(listaDesejos));
            alert("Livro adicionado à lista de desejos!");
        });
    });
});
