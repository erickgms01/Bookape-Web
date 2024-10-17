document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('responseMessage');

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        messageDiv.textContent = "As senhas não coincidem.";
        return;
    }

    // Enviar a requisição de registro
    const response = await fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        messageDiv.textContent = "Conta criada com sucesso!";
        // Redirecionar para a página de login
        window.location.href = '/signIn';
    } else {
        messageDiv.textContent = data.message || "Erro ao registrar. Tente novamente.";
    }
});