class NegociacaoController{

    constructor(){
        let $= document.querySelector.bind(document);
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');
        this.listaNegociacoes = new ListaNegociacoes();

        this.negociacoesView = new NegociacoesView($('#negociacoesView'));
        this.negociacoesView.update(this.listaNegociacoes);

        this.mensagem = new Mensagem();
        this.mensagemView = new MensagemView($('#mensagemView'));
        this.mensagemView.update(this.mensagem);
    }

    adiciona(event){
        event.preventDefault();
        
        this.listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this.negociacoesView.update(this.listaNegociacoes);

        this.mensagem.texto = "Negociação incluída";
        this.mensagemView.update(this.mensagem);

        //console.log(this.listaNegociacoes);
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