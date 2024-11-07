document.addEventListener("DOMContentLoaded", function () {

    const loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
        alert("Você precisa estar logado para acessar esta página.")
        window.location.href = "../html/index.html";
        return;
    }

const user = JSON.parse(localStorage.getItem (loggedUser));
if (user && user.books) {
    console.log("entrou")
    renderizarLivrosHome(user.books);

        // Adiciona o evento de input para o campo de pesquisa
        document.getElementById('searchInput').addEventListener('input', function () {
            var searchTerm = this.value.toLowerCase();
            var filteredBooks = user.books.filter(function (livro) {
                return livro.titulo.toLowerCase().includes(searchTerm) || 
                       livro.autor.toLowerCase().includes(searchTerm) || 
                       livro.ano.toLowerCase().includes(searchTerm);
            });
            renderizarLivrosHome(filteredBooks);
        });

    } else {
        console.error("Nenhum livro encontrado no localStorage");
    }

    document.getElementById("logo").addEventListener("click", function () {
        localStorage.clear();
    });

});

function renderizarLivrosHome(books) {
    var cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    books.forEach(function (livro) {
        var card = criarCard(livro);
        cardsContainer.appendChild(card);
    });
}

function criarCard(livro) {
    var card = document.createElement('div');
    card.classList.add('cards');

    card.innerHTML = `
        <h3>${livro.titulo}</h3>
        <img class="imagemCard" id="imgCard${livro.id}" src="${livro.imagem}">
        <span>${livro.autor}</span>
        <div class="data">
        <span>${livro.ano}</span>
        </div>
        `;

    card.addEventListener("click", () => {
        console.log(livro.id);
        window.location.href = `../html/alterar.html?id=${livro.id}`;
    });

    return card;
}

function limparLocalStorage() {
    localStorage.clear();
}
