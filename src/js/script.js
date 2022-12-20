/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
      ratingStyle: 'style',
    },
    containerOf: {
      booksList: '.books-list',
    },
    book: {
      bookImage: '.book__image',
      bookId: 'data-id',
      book: 'book',
    },
    filters: {
      filtersWrapper: '.filters div',
      inputForm: 'input',
      value: 'value',
    },
    rating: {
      bookRatingFill: '.book__rating .book__rating__fill',
    }
  };

  const classNames = {
    booksList: {
      bookFavorite: 'favorite',
      hidden: 'hidden',
    },
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    // ratingStyle: Handlebars.compile(document.querySelector(select.templateOf.ratingStyle).innerHTML),

  };

  const favoriteBooks = [];
  const filters = [];




  function determineRatingBgc(rating) {


    let bgcCalRating = '';

    if (rating < 6) {
      bgcCalRating = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      bgcCalRating = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      bgcCalRating = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      bgcCalRating = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return bgcCalRating;
  }



  function render() {

    const booksHTML = document.querySelector(select.containerOf.booksList);

    console.log('booksHTML', booksHTML);

    for (let book of dataSource.books) {

      const ratingBgc = determineRatingBgc(book.rating);
      console.log({ ratingBgc });

      const ratingWidth = (book.rating / 10) * 100;
      console.log({ ratingWidth });

      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

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
        event.target.offsetParent.classList.remove(classNames.booksList.bookFavorite);


      } else if (event.target.offsetParent.classList.contains('book__image') && !favoriteBooks.includes(event.target.offsetParent.attributes[2].value)) {
        event.target.offsetParent.classList.add(classNames.booksList.bookFavorite);
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

      filterBooks();
    });

    console.log('favoriteBooks', favoriteBooks);





  }
  initActions();


  function filterBooks() {
    // const allBooks = document.querySelectorAll(select.book.bookImage);


    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      const correctId = document.querySelector('.book__image[data-id="' + book.id + '"]');
      for (const filter of filters) {
        console.log({ filter });
        if (!book.details[filter]) {
          shouldBeHidden = true;
          console.log({ book });
          break;
        }
      }
      if (shouldBeHidden === true) {
        correctId.classList.add(classNames.booksList.hidden);
      } else {
        console.log({ correctId });
        correctId.classList.remove(classNames.booksList.hidden);
      }
    }
  }





}