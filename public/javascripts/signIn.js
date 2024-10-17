document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        const messageDiv = document.getElementById('responseMessage');

        if (response.ok) {
            // Exibir mensagem de sucesso
            messageDiv.textContent = data.message || "Login bem-sucedido!";

            // Redirecionar para a página inicial
            window.location.href = '/searchBooks'; // Ajuste para a rota desejada
        } else {
            messageDiv.textContent = data.message || "Erro ao realizar login.";
        }
    } catch (error) {
        console.error('Erro ao realizar o login:', error);
        document.getElementById('responseMessage').textContent = 'Erro no servidor.';
    }
});