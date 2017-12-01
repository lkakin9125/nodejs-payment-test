import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import './css/CSSReset.css';
import './css/App.css';
import Router from './Router.jsx';

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.firstCharUpperCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

render(
    <Router />,
    document.getElementById('root')
);

