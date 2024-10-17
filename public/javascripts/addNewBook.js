document.getElementById('book-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = document.getElementById('book_title').value;
    const autor = document.getElementById('book_autor').value;
    const publishDate= document.getElementById('book_publish_date').value;
    const pages = document.getElementById('book_pages').value;
    const gender = document.getElementById('book_gender').value;
    const description = document.getElementById('book_description').value;
    const cover = document.getElementById('book_cover_input').value;

     // Enviar a requisição de registro
     const response = await fetch('/addNewBook', {
        method: 'POST',
        body: formData // Passa o FormData diretamente
    });
    
    const data = await response.json();
    if (response.ok) {
        messageDiv.textContent = "Livro adicionado com sucesso!";
        window.location.href = '/searchBooks';
    } else {
        messageDiv.textContent = data.message || "Erro ao adicionar livro. Tente novamente.";
    }
});