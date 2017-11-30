import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import './css/CSSReset.css';
import './css/App.css';
import Router from './Router.jsx';

console.log('$.ready')
import Button from 'material-ui/Button';
render(
    <Router />,
    document.getElementById('root')
);

