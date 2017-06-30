import React from 'react';
import ReactDOM from 'react-dom';


export default class UserSearchInput extends React.Component {
    render() {
        return (
            <form id="search-form">
                <h2>Type in your own quote</h2>
                <input id="search-section" type="text" placeholder="Type your quote here."/>
                <button id="search-button" type="submit">Yodafy</button>
            </form>
        );
    }
}
