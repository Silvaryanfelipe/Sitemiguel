function openFileInput() {
    document.getElementById("escolherImagem").click();
}

function preview(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var imgElement = document.getElementById('imagemPreview');
        imgElement.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("salvarCard").addEventListener("click", cadastrarLivro)
})

function obterImagem() {
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



async function cadastrarLivro() {

    var titulo = document.getElementById("titulo").value;

    var autor = document.getElementById("autor").value;

    var ano = document.getElementById("ano").value;

    var imagem = await obterImagem();

    var id = localStorage.getItem("livroId");
   
    if(!id){
        id = 1;
    } else {
        id = parseInt(id) + 1;
    }

    localStorage.setItem("livroId", id);

    var livro = {
        id: id,
        titulo: titulo,
        autor: autor,
        ano: ano,
        imagem: imagem
    };

    console.log(livro)
    adicionarLivroLocalStorage(livro)
}

function adicionarLivroLocalStorage(livro) {
    var books = JSON.parse(localStorage.getItem('books') || '[]');
    books.push(livro);
    localStorage.setItem('books', JSON.stringify(books));
}