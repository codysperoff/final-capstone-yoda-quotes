import React from 'react';
import ReactDOM from 'react-dom';


export default class Footer extends React.Component {
    render() {
        return (
            <ul>
                <li className="github-logo">
                    <a target="blank" href="https://github.com/codysperoff/final-capstone-yoda-quotes">
                        <img src="../assets/images/github-logo.png" alt="Github Logo" /></a>
                </li>
                <li className="api-logos">
                    Powered By:
                    <a href="https://market.mashape.com/andruxnet/random-famous-quotes"><img src="../assets/images/famous-quotes-logo.png" alt="FamousRandomQuotesLogo" /></a> and
                    <a href="https://market.mashape.com/ismaelc/yoda-speak"><img src="../assets/images/yoda-speak-logo.png" alt="YodaSpeakLogo" /></a>
                </li>
            </ul>
        );
    }
}
