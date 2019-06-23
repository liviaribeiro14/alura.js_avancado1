class NegociacaoController{

    constructor(){
        let $= document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona','esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagemView')), 
            'texto');

        this._ordemAtual = '';
    }

    adiciona(event){
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this._mensagem.texto = "Negociação incluída";
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    importarNegociacoes(){
        let negociacaoService = new NegociacaoService();

        Promise.all(
            [negociacaoService.obterNegociacoesDaSemana(),
            negociacaoService.obterNegociacoesDaSemanaAnterior()])
            .then(negociacoes => {
                negociacoes
                .reduce((arrayAchatado, array)=>arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações carregadas com sucesso.';
            })
            .catch(err => this._mensagem.texto = err);
        /* negociacaoService.obterNegociacoesDaSemana()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações carregadas com sucesso.';
        })
        .catch(err => this._mensagem.texto = err); */
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