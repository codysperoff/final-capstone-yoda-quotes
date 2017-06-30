require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';



document.addEventListener('DOMContentLoaded', () => ReactDOM.render(<Header />, document.getElementById('reactHeader')));

