document.addEventListener('DOMContentLoaded', function () {

    //Função para o botão Continuar scrollar até o formulário
    var continuar = document.getElementById("continuar");
    var form = document.getElementById("form");

    function rolar() {
        form.scrollIntoView({ behavior: 'smooth' });
    }
    continuar.addEventListener('click', rolar);



    //validação dos dados do formulário
    form.addEventListener('submit', function (event) {

        //Impede o envio padrão do formulário 
        event.preventDefault();

        //Declaração das variáveis dos valores do formulário
        var nome = document.getElementById("nome").value.trim();
        var sobrenome = document.getElementById("sobrenome").value.trim();
        var email = document.getElementById("email").value.trim();
        var telefone = document.getElementById("telefone").value.trim();

        //Variável com valor booleano para realizar o teste de validade do e-mail e telefone
        var validade = true;

        //Utilizando expressão regular para validação
        var padraoEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        var padraotelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

        //Verifica se o e-mail e telefone está nos padrões da expressão regular
        if (!padraoEmail.test(email)) {
            alert("Por favor insira um e-mail valido!");
            validade = false;
        }

        if (!padraotelefone.test(telefone)) {
            alert("Por favor insira um telefone valido!");
            validade = false
        }

        //Condição para caso os dados estajam preenchidos e corretos cria o objeto dadosForm com os dados do formulário
        if (validade) {
            //Dados para API
            var dadosForm = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                telefone: telefone
            };

            //URL da API JSONplaceholder
            var urlAPI = 'https://jsonplaceholder.typicode.com/posts';

            //Envio dos dados usando o FETCH com o método POST
            fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                //Defini que o objeto deve ser representados em formato de string JSON
                body: JSON.stringify(dadosForm)
            })

                //Processa as respostas da requisição fetch
                .then(response => response.json())
                .then(data => {
                    alert("Formulário enviado com sucesso! Dados recebidos:\n");
                    console.log (JSON.stringify(data, null, 2));
                })

                .catch(erro => {
                    alert("Erro ao enviar o formulário!" + erro.message)
                });
        }

        
    });

});
