export default class List {
  constructor() {
    this.content = `
    <section>
        <h1 class="h1 invisible">Awesome Books</h1>
        <div class="books"></div>
        <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody class="library">
            </tbody>
        </table>
    </section>
    `;
  }

  get content() {
    return this.content;
  }

  static displayBooks() {
    const library = document.querySelector('.library');
    let dataStored = [];
    let books = [];
    if (localStorage.getItem('books')) {
      dataStored = localStorage.getItem('books');
      books = JSON.parse(dataStored);
      books.forEach((element, index) => {
        library.innerHTML += `
        <tr>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>
                <button class="delete-btn" id=${index}>Remove</button>
            </td>
        </tr>
        `;
      });
    } else {
      library.innerHTML += `
        <tr>
            <td colspan="3"></td>
        </tr>
        `;
    }
  }

  static deleteBook() {
    const delBtn = document.querySelectorAll('.delete-btn');
    delBtn.forEach((element, index) => {
      element.addEventListener('click', () => {
        element.parentNode.parentNode.remove();
        const books = JSON.parse(localStorage.getItem('books'));
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      });
    });
  }
}
