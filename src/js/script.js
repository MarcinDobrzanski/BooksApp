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
    },
  };

  console.log('select', select);

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

  function initActions() {

    const favoriteBooks = [];
    console.log({ favoriteBooks });

    const allBooks = document.querySelectorAll(select.book.bookImage);
    console.log({ allBooks });

    for (let book of allBooks) {
      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        favoriteBooks.push(book);
      });
    }


  }
  initActions();


}