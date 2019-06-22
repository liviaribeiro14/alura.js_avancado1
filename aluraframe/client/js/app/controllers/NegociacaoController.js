class NegociacaoController{

    constructor(){
        let $= document.querySelector.bind(document);
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');

        this.negociacoesView = new NegociacoesView($('#negociacoesView'));

        this.listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), 
            ['adiciona', 'esvazia'], 
            model => this.negociacoesView.update(model)
        );

        this.mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this.mensagemView.update(model)
        );
        this.mensagemView = new MensagemView($('#mensagemView'));
        this.mensagemView.update(this.mensagem);
    }

    adiciona(event){
        event.preventDefault();
        
        this.listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this.mensagem.texto = "Negociação incluída";
    }

    apagaLista(event){
        event.preventDefault();

        this.listaNegociacoes.esvazia();

        this.mensagem.texto = "Negociações removidas";
    }

    _criaNegociacao(){ 
        return new Negociacao(
            DateHelper.textoParaData(this.inputData.value), 
            this.inputQuantidade.value, 
            this.inputValor.value);
    }

    _limpaFormulario(){
        this.inputData.value = "";
        this.inputQuantidade.value = 1;
        this.inputValor.value = 0.0;
    }
}