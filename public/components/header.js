import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <h1><img src="../assets/images/yoda-quotes-yellow.png" alt="Yoda Quotes" /></h1>
                <section className="favorites-container">
                    <div className="delete-favorites">
                        <button className="delete-favorites">
                            <img src="../assets/images/delete-favorites.png" />
                        </button>
                    </div>
                    <h2>Yodafied Quotes</h2>
                    <ul>

                    </ul>
                </section>
            </div>
        );
    }
}
