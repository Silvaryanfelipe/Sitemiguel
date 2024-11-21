function openFileInput() {
    document.getElementById("escolherImagem").click();
}

window.preview = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var imgElement = document.getElementById('imagemPreview');
        imgElement.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}



window.obterImagem = function () {
    return new Promise((resolve, reject) => {
        var fileInput = document.getElementById('escolherImagem');
        var imagem;

        if (fileInput.files.length > 0) {
            var reader = new FileReader();
            reader.onload = function () {
                imagem = reader.result; //Armazena a imagem com base64
                resolve(imagem);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            imagem = "../img/livro.png";
            resolve(imagem);
        }
    });
}

function atualizarLivroLocalStorage(email, livro) {
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.books) {
        const indiceLivroExistente = user.books.findIndex(c => c.id === livro.id);

        if (indiceLivroExistente !== -1) {
            user.books[indiceLivroExistente] = livro;
            localStorage.setItem(email, JSON.stringify(user));
            console.log("Livro atualizado com sucesso");
        } else {
            console.error("Erro ao atualizar o Livro. Livra nao encntrado");
        }
    }
}

function excluirLivro() {
    
    if (confirm("Tem certeza que deseja excluir o livro?")) {
        const loggedUser = localStorage.getItem('loggedUser');
        const user = JSON.parse(localStorage.getItem(loggedUser));
        const idLivro = parseInt(new URLSearchParams(window.location.search).get('id'));


        if (user && user.books) {
            var indiceLivro = user.books.findIndex(book => book.id === idLivro);
            console.log("entrou")

            if (indiceLivro !== -1) {
                user.books.splice(indiceLivro, 1);

                localStorage.setItem(loggedUser, JSON.stringify(user));

                alert("Livro excluido com sucesso");
            } else {
                alert("Não foi possível excluir o livro");
            }
           window.location.href = "../html/inicial.html"
        }
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const loggedUser = localStorage.getItem('loggedUser')
    if (!loggedUser) {
        alert("Você precisa estar logado para acessar esta página.")
        window.location.href = "../html/login.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem(loggedUser));
    const parametros = new URLSearchParams(window.location.search);
    const idLivro = parseInt(parametros.get('id'));

    if (user && user.books) {
        const indiceLivroSelecionado = user.books.findIndex(book => book.id === idLivro);

        if (indiceLivroSelecionado !== -1) {
            const livroSelecionado = user.books[indiceLivroSelecionado];
            document.getElementById("titulo").value = livroSelecionado.titulo;
            document.getElementById("autor").value = livroSelecionado.autor;
            document.getElementById("ano").value = livroSelecionado.ano;
            document.getElementById("imagemPreview").src = livroSelecionado.imagem;
        } else {
            console.error("Livro não encontrado.");
        }
    } else {
        console.error("Nenhum carro encontrado no localStorage.");
    }

    async function salvarAlteracoesLivro() {
        var titulo = document.getElementById("titulo").value;

        var autor = document.getElementById("autor").value;

        var ano = document.getElementById("ano").value;

        var imagem = await obterImagem();

        var livroAtualizado = {
            id: idLivro,
            titulo: titulo,
            autor: autor,
            ano: ano,
            imagem: imagem
        };

        atualizarLivroLocalStorage(loggedUser, livroAtualizado);
    }


    document.getElementById("salvarCard").addEventListener("click", salvarAlteracoesLivro)
});