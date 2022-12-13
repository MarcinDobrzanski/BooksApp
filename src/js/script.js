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
      bookId: '',
    },
  };

  console.log('select', select);

  const classNames = {
    booksList: {
      bookFavorite: 'favorite',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),

  };

  function render() {

    const booksHTML = document.querySelector(select.containerOf.booksList);

    console.log('booksHTML', booksHTML);

    for (let book of dataSource.books) {

      const generatedHTML = templates.booksList(book);
      console.log('generatedHTML', generatedHTML);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);


      const booksContainer = document.querySelector(select.containerOf.booksList);


      booksContainer.appendChild(generatedDOM);
    }

  }
  render();

  const favoriteBooks = [];

  function initActions() {

    const allBooks = document.querySelectorAll(select.book.bookImage);
    console.log({ allBooks });

    for (let book of allBooks) {
      const bookId = book.getAttribute('data-id');

      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (!favoriteBooks[bookId]) {
          book.classList.add(classNames.booksList.bookFavorite);
          favoriteBooks.push(bookId);
        } else {
          
        }
        console.log({ bookId });
        const removeBook = favoriteBooks.indexOf(bookId);
        // book.classList.toggle(classNames.booksList.bookFavorite);

        // const removeBook = favoriteBooks.indexOf(bookId);
        // console.log({ removeBook });
        // removeBook.splice(bookId, 1);
        // book.classList.remove(classNames.booksList.bookFavorite);


      });
    }


  }
  initActions();
  console.log({ favoriteBooks });


}