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
  };

  console.log('select', select);

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
    // CODE ADDED START

    // CODE ADDED END
  };

  function render() {
    
    const booksHTML = document.querySelectorAll(select.containerOf.booksList);

    console.log('booksHTML', booksHTML);

    for (let book in dataSource.books) {

      const generatedHTML = templates.booksList(book);
      console.log('generatedHTML', generatedHTML);
      // create element using untils.createElementFromHTML
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      // find menu cointainer
      const booksContainer = document.querySelector(select.containerOf.menu);

      // add element to menu
      booksHTML.appendChild(generatedDOM);
    }
    // generate HTML Based on template
  }
  render();

}