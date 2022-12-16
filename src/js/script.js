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


    const booksList = document.querySelector(select.containerOf.booksList);


    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image') && favoriteBooks.includes(event.target.offsetParent.attributes[2].value)) {
        const removeBook = favoriteBooks.indexOf(event.target.offsetParent.attributes[2].value);
        favoriteBooks.splice(removeBook, 1);
        event.target.offsetParent.classList.remove('favorite');


      } else if (event.target.offsetParent.classList.contains('book__image') && !favoriteBooks.includes(event.target.offsetParent.attributes[2].value)) {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(event.target.offsetParent.attributes[2].value);
      }

    });


    const formFilters = document.querySelector(select.filters.filtersWrapper);
    console.log({ formFilters });

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

    console.log('favoriteBooks', favoriteBooks);





  }
  initActions();



}