class Mensagem{
    constructor(texto=''){
        this._texto = texto;
        //iniciando os testes.
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}