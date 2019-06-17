class DateHelper{
    constructor(){
        throw new Error("Essa classe não pode ser instanciada");
    }

    static textoParaData(texto){
        return new Date(...
            texto
            .split('-')
            .map((item, indice) => item - indice % 2)
        );
    }

    static dataParaTexto(date){
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }
}