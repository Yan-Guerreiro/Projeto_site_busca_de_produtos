function buscarProdutos() {
    var termoBusca = document.getElementById('busca').value.toLowerCase();
    var url = 'https://fakestoreapi.com/products';

    // Limpar o conteúdo anterior
    document.querySelector('.resultado').innerHTML = '';

    // Lista de lojas
    var lojas = ['Amazon', 'Mercado Livre', 'Shopee', 'Magazine Luiza', 'Casas Bahia'];

    // Realizar uma requisição AJAX usando a API Fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar os dados dos produtos. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Filtrar os produtos com base no termo de busca
            var produtosFiltrados = data.filter(function (produto) {
                return produto.title.toLowerCase().includes(termoBusca);
            });

            // Construir a estrutura HTML com os produtos filtrados
            produtosFiltrados.forEach(function (produto) {
                var container = document.createElement('div');
                container.className = 'produto';

                var imagem = document.createElement('img');
                imagem.src = produto.image;

                var nome = document.createElement('p');
                nome.textContent = produto.title;

                var preco = document.createElement('p');
                preco.textContent = 'Preço: $' + produto.price.toFixed(2);

                // Escolher aleatoriamente uma loja
                var loja = document.createElement('p');
                loja.textContent = 'Loja: ' + lojas[Math.floor(Math.random() * lojas.length)];

                var verMaisBtn = document.createElement('button');
                verMaisBtn.className = 'btn fill'; // Adiciona a mesma classe do botão de busca
                verMaisBtn.textContent = 'Ver Mais';
                verMaisBtn.onclick = function () {
                    redirecionarParaLojaFicticia(loja.textContent);
                };

                container.appendChild(imagem);
                container.appendChild(nome);
                container.appendChild(preco);
                container.appendChild(loja);
                container.appendChild(verMaisBtn);

                document.querySelector('.resultado').appendChild(container);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

function redirecionarParaLojaFicticia(loja) {
    // Redireciona para uma URL fictícia da loja
    var mensagem = 'Redirecionando para a página fictícia da loja: ' + loja;
    alert(mensagem);

    // Cria um novo elemento para a mensagem
    var mensagemElement = document.createElement('p');
    mensagemElement.textContent = mensagem;

    // Substitui o conteúdo existente com o novo elemento de mensagem
    var resultadoContainer = document.querySelector('.resultado');
    resultadoContainer.innerHTML = '';
    resultadoContainer.appendChild(mensagemElement);

    // window.location.href = 'https://lojaficticia.com/' + loja;
}
