/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    book: {
      bookImage: '.book__image',
      bookId: 'data-id',
    },
  };

  const classNames = {
    booksList: {
      bookFavorite: 'favorite',

    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),

  };

  const favoriteBooks = [];

  function render() {

    const booksHTML = document.querySelector(select.containerOf.booksList);

    console.log('booksHTML', booksHTML);

    for (let book of dataSource.books) {

      const generatedHTML = templates.booksList(book);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);


      const booksContainer = document.querySelector(select.containerOf.booksList);


      booksContainer.appendChild(generatedDOM);
    }

  }
  render();

  function initActions() {

    const booksList = document.querySelector(select.containerOf.booksList);
    console.log({ booksList });
    const allBooks = document.querySelectorAll(select.book.bookImage);
    console.log({ allBooks });
    const etBookList = document.getElementsByTagName('UL');
    console.log({ etBookList });



    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('.book__image')) {
        for (let book of allBooks) {
          const bookId = book.getAttribute(select.book.bookId);

          if (!favoriteBooks.includes(bookId)) {
            book.classList.add(classNames.booksList.bookFavorite);
            favoriteBooks.push(bookId);
          } else {
            const removeBook = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(removeBook, 1);
            book.classList.remove(classNames.booksList.bookFavorite);
          }

        }

      }
    });

  }
  initActions();


}