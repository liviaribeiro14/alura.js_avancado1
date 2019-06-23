class NegociacaoService{
    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return this._http
        .get('negociacoes/semana')
        .then(negociacoes => {
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
        })                
        .catch(erro => {
            console.log(erro);
            throw new Error('Negociações da semana não foram carregadas.');
        });
    }

    obterNegociacoesDaSemanaAnterior(){        
        return this._http
        .get('negociacoes/anterior')
        .then(negociacoes => {
            return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        })
        .catch(erro => {
            console.log(erro);
            throw new Error('Negociações da semana anterior não foram carregadas.');
        });
    }
}