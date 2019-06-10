class NegociacaoController{

    constructor(){
        let $= document.querySelector.bind(document);
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');

    }
    adiciona(event){
        event.preventDefault();
        
        let dt = new Date(...
            this.inputData.value
            .split('-')
            .map((item, indice) => item - indice % 2)
        );

        let negociacao = new Negociacao(dt, this.inputQuantidade.value, this.inputValor.value);

        console.log(negociacao);
    }
}