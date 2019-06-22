class NegociacaoController{

    constructor(){
        let $= document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona','esvazia');

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagemView')), 
            'texto');
    }

    adiciona(event){
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this._mensagem.texto = "Negociação incluída";
    }

    importarNegociacoes(){
        /* let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                    this._mensagem.texto = 'Negociações carregadas com sucesso.';
                }else{
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Negociações não foram carregadas.';
                }
            }
        };

        xhr.send(); */
        let negociacaoService = new NegociacaoService();
        
        negociacaoService.obterNegociacoesDaSemana((err, negociacoes)=>{
            if(err){
                this._mensagem.texto = err;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações carregadas com sucesso.';
        }
        );
    }

    apagaLista(event){
        event.preventDefault();

        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Negociações removidas";
    }

    _criaNegociacao(){ 
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value);
    }

    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
}