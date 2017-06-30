require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import HowItWorks from './components/how-page-works';
import UserSearchInput from './components/user-search-input';
import Footer from './components/footer';


document.addEventListener('DOMContentLoaded', () =>
        ReactDOM.render(<Header />, document.getElementById('reactHeader')));

document.addEventListener('DOMContentLoaded', () =>
        ReactDOM.render(<HowItWorks />, document.getElementById('reactHowPageWorks')));

document.addEventListener('DOMContentLoaded', () =>
        ReactDOM.render(<UserSearchInput />, document.getElementById('reactUserSearchInput')));

document.addEventListener('DOMContentLoaded', () =>
        ReactDOM.render(<Footer />, document.getElementById('myBottomNav')));
