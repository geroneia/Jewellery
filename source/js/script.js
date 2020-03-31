'use strict';
(function () {
  // Открытие/закрытие меню
  var DESKTOP_WIDTH = 1024;
  var pageHeader = document.querySelector('.page-header');
  var pageHeaderSearch = pageHeader.querySelector('.page-header__search');
  var searchInput = pageHeader.querySelector('.page-header__search-input');
  var userNavigation = pageHeader.querySelector('.page-header__user-navigation');
  var mainNav = document.querySelector('.main-nav');
  var mainNavToggle = mainNav.querySelector('.main-nav__toggle');

  var openMenu = function () {
    pageHeader.classList.remove('page-header--menu-closed');
    pageHeaderSearch.classList.remove('page-header__search--closed');
    searchInput.classList.remove('page-header__search-input--menu-closed');
    userNavigation.classList.remove('user-navigation--menu-closed');
    mainNav.classList.remove('main-nav--closed');

    pageHeader.classList.add('page-header--menu-opened');
    pageHeaderSearch.classList.add('page-header__search--opened');
    searchInput.classList.add('page-header__search-input--menu-opened');
    userNavigation.classList.add('user-navigation--menu-opened');
    mainNav.classList.add('main-nav--opened');
  };

  var closeMenu = function () {
    pageHeader.classList.remove('page-header--menu-opened');
    pageHeaderSearch.classList.remove('page-header__search--opened');
    searchInput.classList.remove('page-header__search-input--menu-opened');
    userNavigation.classList.remove('user-navigation--menu-opened');
    mainNav.classList.remove('main-nav--opened');

    pageHeader.classList.add('page-header--menu-closed');
    pageHeaderSearch.classList.add('page-header__search--closed');
    searchInput.classList.add('page-header__search-input--menu-closed');
    userNavigation.classList.add('user-navigation--menu-closed');
    mainNav.classList.add('main-nav--closed');
  };

  mainNav.classList.remove('main-nav--nojs');
  closeMenu();

  if (document.body.clientWidth <= DESKTOP_WIDTH) {

    mainNavToggle.addEventListener('click', function () {
      if (pageHeader.classList.contains('page-header--menu-closed')) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  // Открытие/закрытие модального окна Log In
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var link = document.querySelector('.user-navigation__login-link');
  var closeButton = document.querySelector('.login__close-button');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.login');

  // Устанавливает фокус на поле e-mail
  var setFocus = function () {
    document.getElementById('email').focus();
  };

  var openLogIn = function () {
    overlay.classList.remove('modal--close');
    overlay.classList.add('modal--open');
    setFocus();
    body.classList.add('modal-open');
  };

  var closeLogIn = function () {
    overlay.classList.remove('modal--open');
    overlay.classList.add('modal--close');
    body.classList.remove('modal-open');
  };

  // Открытие по enter
  var onEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.preventDefault();
      openLogIn();
    }
  };

  // Закрытие по esc
  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeLogIn();
    }
  };

  // Закрытие по нажатию вне окна

  var onOverlayClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('login')) {
      closeLogIn();
    }
  };

  link.addEventListener('click', openLogIn);

  link.addEventListener('keydown', onEnterPress);

  closeButton.addEventListener('click', closeLogIn);

  closeButton.addEventListener('keydown', onEscPress);

  document.addEventListener('click', onOverlayClick, true);

  document.addEventListener('keydown', onEscPress);
})();
