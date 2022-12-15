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
    filters: {
      filtersWrapper: '.filters div',
      inputForm: 'input',
      value: 'value',
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
  const filters = [];





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

    // Do corectly listener for ul list

    // const booksList = document.querySelector(select.containerOf.booksList);
    // console.log({ booksList });
    // const allBooks = document.querySelectorAll(select.book.bookImage);
    // console.log({ allBooks });
    // const etBookList = document.getElementsByTagName('UL');
    // console.log({ etBookList });

    // booksList.addEventListener('dblclick', function (event) {
    //   event.preventDefault();
    //   if (event.target.offsetParent.classList.contains('book__image')) {
    //     for (let book of allBooks) {
    //       const bookId = book.getAttribute(select.book.bookId);

    //       if (!favoriteBooks.includes(bookId)) {
    //         book.classList.add(classNames.booksList.bookFavorite);
    //         favoriteBooks.push(bookId);
    //       } else {
    //         const removeBook = favoriteBooks.indexOf(bookId);
    //         favoriteBooks.splice(removeBook, 1);
    //         book.classList.remove(classNames.booksList.bookFavorite);
    //       }

    //     }

    //   }
    // });
    const allBooks = document.querySelectorAll(select.book.bookImage);

    for (let book of allBooks) {
      const bookId = book.getAttribute(select.book.bookId);

      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (!favoriteBooks.includes(bookId)) {
          book.classList.add(classNames.booksList.bookFavorite);
          favoriteBooks.push(bookId);
        } else {
          const removeBook = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(removeBook, 1);
          book.classList.remove(classNames.booksList.bookFavorite);
        }

      });
    }




    const formFilters = document.querySelector(select.filters.filtersWrapper);
    console.log({ formFilters });
    // const formInput = document.querySelectorAll(select.filters.inputForm);
    // const inPutValue = formInput.getAttribute(select.filters.value);

    formFilters.addEventListener('click', function (event) {
      if (filters.includes(event.target.value)) {
        console.log('Nie ', event.target.value);
        const removeFilter = filters.indexOf(event.target.value);
        filters.splice(removeFilter, 1);

      } else if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        console.log('List item ', event.target.value);
        filters.push(event.target.value);
      }
      console.log({ filters });
    });





  }
  initActions();



}