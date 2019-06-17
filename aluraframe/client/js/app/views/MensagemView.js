class MensagemView extends View {
    constructor(elemento){
        super(elemento);
    }

    template(mensagem){
        return mensagem.texto? `<p class="alert alert-info">${mensagem.texto}</p>`:`<p></p>`
    }

}