document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('call-form');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const destinatario = 'thalitasuzyr@gmail.com';
        const assunto = 'Vamos Conversar?';
        let mensagem = `Olá,\n\nMeu nome é ${nome}. Gostaria de saber mais sobre como o Bookapê funciona.\n\nObrigado(a),\n${nome}\n${email}`;

        const linkEmail = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;

        window.location.href = linkEmail; 
    });
});
