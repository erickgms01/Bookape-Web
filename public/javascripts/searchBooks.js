document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    const url = `/search?title=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const books = data.docs;
            const resultsContainer = document.getElementById('book-results');
            resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

            books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';

                const bookCover = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/100x150?text=Sem+Capa';
                const bookId = book.key;

                bookItem.innerHTML = `
                    <a href="/book/${encodeURIComponent(bookId)}">
                        <img src="${bookCover}" alt="${book.title}">
                        <div>
                            <h2>${book.title}</h2>
                            <p><strong>Autor:</strong> ${book.author_name ? book.author_name.join(', ') : 'Desconhecido'}</p>
                            <p><strong>Ano:</strong> ${book.first_publish_year || 'Desconhecido'}</p>
                        </div>
                    </a>
                `;

                resultsContainer.appendChild(bookItem);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os livros:', error);
            const resultsContainer = document.getElementById('book-results');
            resultsContainer.innerHTML = '<p>Erro ao buscar os livros. Tente novamente.</p>';
        });
});
