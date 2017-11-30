import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import './css/CSSReset.css';
import './css/App.css';
class App extends React.Component {
    render() {
        return <p> Hello React project</p>;
    }
}
// $.ready(() => {
    console.log('$.ready')
    render(<App />, document.getElementById('root'));
// })
