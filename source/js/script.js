'use strict';
var DESKTOP_WIDTH = 1024;
var pageHeader = document.querySelector('.page-header');
var pageHeaderSearch = pageHeader.querySelector('.page-header__search');
var searchInput = pageHeader.querySelector('.page-header__search-input');
var userNavigation = pageHeader.querySelector('.page-header__user-navigation');
var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav--nojs');

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

if (document.body.clientWidth <= DESKTOP_WIDTH) {
  mainNavToggle.addEventListener('click', function () {
    if (pageHeader.classList.contains('page-header--menu-closed')) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}
