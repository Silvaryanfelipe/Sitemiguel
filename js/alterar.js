function openFileInput() {
    document.getElementById("escolherImagem").click();
}

window.preview = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var imgElement = document.getElementById('imagemPreview');
        imgElement.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}



window.obterImagem = function() {
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

function atualizarLivroLocalStorage(livro) {
    var livros = JSON.parse(localStorage.getItem('books')) ||[];
    var indiceLivroExistente = livros.findIndex(c => c.id === livro.id);

    if (indiceLivroExistente !== -1) {
        livros[indiceLivroExistente] = livro;
        console.log("Livro Atualizado com sucesso.");
    } else {
        console.error("Erro ao atualizar o livro. Não foi encontrado");
    }

    localStorage.setItem('books', JSON.stringify(livros));
    console.log(livros);
}

function excluirLivro() {
    if(confirm("Tem certeza que deseja excluir o livro?")) {
        var livros = JSON.parse(localStorage.getItem('books')) || [];
        var idLivro = parseInt(new URLSearchParams(window.location.search).get('id'));

        var indiceLivro = livros.findIndex(book => book.id === idLivro);


        if (indiceLivro !== -1) {
            livros.splice(indiceLivro, 1);

            localStorage.setItem('books', JSON.stringify(livros));

            alert("Livro excluido com sucesso");
        } else {
            alert("Não foi possível excluir o livro");
        }
        window.location.href = "../html/index.html"
    }

}

document.addEventListener("DOMContentLoaded", function () {
    var parametros = new URLSearchParams(window.location.search);
    var idLivro = parametros.get('id');

    var livrosJSON = localStorage.getItem('books');
    if (livrosJSON) {
        var livros = JSON.parse(livrosJSON);
        var indiceLivroSelecionado = livros.findIndex(book => book.id === parseInt(idLivro));
        if (indiceLivroSelecionado !== -1) {
            var livroSelecionado = livros[indiceLivroSelecionado];
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
        id: parseInt(idLivro),
        titulo: titulo,
        autor: autor,
        ano: ano,
        imagem: imagem
    };

    atualizarLivroLocalStorage(livroAtualizado);
}


    document.getElementById("salvarCard").addEventListener("click", salvarAlteracoesLivro)
});