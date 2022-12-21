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

  };

  class BooksList {
    constructor() {
      const thisBook = this;

      thisBook.favoriteBooks = [];
      thisBook.filters = [];

      thisBook.initData();
      thisBook.getElements();
      thisBook.initActions();



    }

    initData() {
      const thisBook = this;

      this.data = dataSource.books;


      console.log('booksHTML', thisBook.booksHTML);

      for (let book of this.data) {

        const ratingBgc = thisBook.determineRatingBgc(book.rating);
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

    getElements() {
      const thisBook = this;

      thisBook.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.booksHTML = document.querySelector(select.containerOf.booksList);
      thisBook.formFilters = document.querySelector(select.filters.filtersWrapper);




    }

    initActions() {
      const thisBook = this;


      thisBook.booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image') && thisBook.favoriteBooks.includes(event.target.offsetParent.attributes[2].value)) {
          const removeBook = thisBook.favoriteBooks.indexOf(event.target.offsetParent.attributes[2].value);
          thisBook.favoriteBooks.splice(removeBook, 1);
          event.target.offsetParent.classList.remove(classNames.booksList.bookFavorite);


        } else if (event.target.offsetParent.classList.contains('book__image') && !thisBook.favoriteBooks.includes(event.target.offsetParent.attributes[2].value)) {
          event.target.offsetParent.classList.add(classNames.booksList.bookFavorite);
          thisBook.favoriteBooks.push(event.target.offsetParent.attributes[2].value);
        }

      });



      thisBook.formFilters.addEventListener('click', function (event) {
        if (thisBook.filters.includes(event.target.value)) {
          console.log('Nie ', event.target.value);
          const removeFilter = thisBook.filters.indexOf(event.target.value);
          thisBook.filters.splice(removeFilter, 1);

        } else if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
          console.log('List item ', event.target.value);
          thisBook.filters.push(event.target.value);
        }
        console.log(thisBook.filters);

        thisBook.filterBooks();
      });

      console.log('favoriteBooks', thisBook.favoriteBooks);


    }

    filterBooks() {
      const thisBook = this;

      for (let book of this.data) {
        let shouldBeHidden = false;
        const correctId = document.querySelector('.book__image[data-id="' + book.id + '"]');
        for (const filter of thisBook.filters) {
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

    determineRatingBgc(rating) {
      const thisBook = this;

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

  }

  const app = new BooksList();

}