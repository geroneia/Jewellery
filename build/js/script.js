'use strict';
(function () {
  // Открытие/закрытие меню
  var DESKTOP_WIDTH = 1024;
  var TABLET_WIDTH = 768;
  var pageHeader = document.querySelector('.page-header');
  var pageHeaderSearch = pageHeader.querySelector('.page-header__search');
  var searchInput = pageHeader.querySelector('.page-header__search-input');
  var userNavigation = pageHeader.querySelector('.page-header__user-navigation');
  var mainNav = document.querySelector('.main-nav');
  var mainNavToggle = mainNav.querySelector('.main-nav__toggle');

  var openMenu = function () {
    closeLogIn();
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
    document.querySelector('#email').focus();
  };

  var openLogIn = function () {
    overlay.classList.remove('modal--close');
    overlay.classList.add('modal--open');
    setFocus();
    closeMenu();
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

  // Перелистывание слайдера

  var DESKTOP_STEP = 33.3;
  var TABLET_STEP = 16.7;
  var sliderControlLeft = document.querySelector('.slider__control-left');
  var sliderControlRight = document.querySelector('.slider__control-right');
  var list = document.querySelector('.slider__product-list');
  // var paginationBlock = document.querySelector('.slider__pagination');
  var pages = document.querySelectorAll('.slider__pagination-link');
  var mobileCounter = document.querySelector('.slider__pagination-counter');
  var factor = 0;
  var counter = 0;

  if (document.body.clientWidth >= DESKTOP_WIDTH) {
    var step = DESKTOP_STEP;
    var limit = -2;
  }

  if (document.body.clientWidth < DESKTOP_WIDTH) {
    step = TABLET_STEP;
    limit = -5;
  }

  var getTransform = function () {
    var transform = 'translateX(' + factor * step + '%)';
    return transform;
  };

  var onLeftControlClick = function () {
    if (factor < 0) {
      factor++;
      counter--;
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('slider__pagination-link--active');
      }
      list.style.transform = getTransform();
      pages[counter].classList.add('slider__pagination-link--active');
    }
  };

  var onRightControlClick = function () {
    if (factor > limit) {
      factor--;
      counter++;
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('slider__pagination-link--active');
      }
      list.style.transform = getTransform();
      pages[counter].classList.add('slider__pagination-link--active');
    }
  };

  sliderControlLeft.addEventListener('click', onLeftControlClick);
  sliderControlRight.addEventListener('click', onRightControlClick);

  // Перелистывание по свайпу
  var distance = 0;
  var startX = 0;
  var startY = 0;
  var threshold = 130;
  list.addEventListener('touchstart', function (evt) {
    var touchobj = evt.changedTouches[0];
    distance = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    evt.preventDefault();
  }, false);

  list.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
  }, false);

  list.addEventListener('touchend', function (evt) {
    var touchobj = evt.changedTouches[0];
    distance = touchobj.pageX - startX;
    if (distance >= threshold && Math.abs(touchobj.pageY - startY) <= 100) {
      onLeftControlClick();
    } else {
      onRightControlClick();
    }
    evt.preventDefault();
    if (document.body.clientWidth < TABLET_WIDTH) {
      mobileCounter.innerHTML = '';
      mobileCounter.innerHTML = counter + 1;
    }
  }, false);

  // Открывание/закрывание ответа по щелчку на ворос
  var questionList = document.querySelector('.faq__list');
  var onQuestionClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('faq__link')) {
      if (target.classList.contains('faq__link--open')) {
        target.classList.remove('faq__link--open');
      } else {
        target.classList.add('faq__link--open');
      }
    } else if (target.classList.contains('faq__question')) {
      var parent = target.offsetParent;
      if (parent.classList.contains('faq__link--open')) {
        parent.classList.remove('faq__link--open');
      } else {
        parent.classList.add('faq__link--open');
      }
    }
  };
  questionList.addEventListener('click', onQuestionClick);
})();
