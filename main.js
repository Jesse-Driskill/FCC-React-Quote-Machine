import React from "react";
import ReactDOM from 'react-dom';
import { famousPeople, quotes } from "./quotes";

// let currentColor = {
//     red: 128,
//     green: 128,
//     blue: 128
// }
// let previousColor = {
//     red: null,
//     green: null,
//     blue: null
// }

// let nextColor = {
//     red: null,
//     green: null,
//     blue: null
// }

let changingColor = false;

function compareRGB(rgb1, rgb2) {
    if (rgb1.red === rgb2.red && rgb1.green === rgb2.green && rgb1.blue === rgb2.blue) {
        return true;
    } else {
        return false;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div id="app">
            <QuoteBoxContainer/>
        </div>)
    }
}

const QuoteBoxContainer = () => {
    return (<div id="quote-box-container">
        <QuoteBox/>
    </div>)
}

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: ""
        }
        this.generateNewQuote = this.generateNewQuote.bind(this);
    }

    generateNewQuote() {
        let n = Math.floor(Math.random() * 100);
        let quote = quotes[n];
        let author = famousPeople[n];
        
        this.setState({
            quote: quote,
            author: author
        });

        function rRGB() {
            return Math.floor(Math.random() * 190); 
        }

        let r = rRGB();
        let g = rRGB();
        let b = rRGB();

        let colorString = `rgb(${r}, ${g}, ${b})`;

        document.body.style.backgroundColor = colorString;
        document.getElementById("new-quote").style.backgroundColor = colorString;
        document.body.style.color = colorString;



        

    }

    componentDidMount() {
        this.generateNewQuote();
    }

    render() {
        return (<div id="quote-box">
            <Quote quote={this.state.quote} />
            <QuoteAuthor author={this.state.author} />
            <QuoteBoxFooter 
            author={this.state.author} 
            quote={this.state.quote}
            generateNewQuote={this.generateNewQuote}/>
        </div>)
    }
}

class Quote extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (<h2 id="text">"{this.props.quote}"</h2>)
    }
}

class QuoteAuthor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div id="author">{this.props.author}</div>)
    }
}

class QuoteBoxFooter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div id="quote-box-footer">
        <SocialsContainer author={this.props.author} quote={this.props.quote}/>
        <GenQuoteButton id="gen-quote-button" generateNewQuote={this.props.generateNewQuote}/>
        </div>)
    }
}

class GenQuoteButton extends React.Component {
    constructor(props) {
        super(props);
        // this.generateNewQuote = this.generateNewQuote.bind(this);
    }

    render() {
        return (<button id="new-quote" onClick={this.props.generateNewQuote}>New Quote</button>)
    }
}

class SocialsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div id="socials-container">
        <TwitterIcon quote={this.props.quote} author={this.props.author}/>
        <TumblrIcon/>
    </div>)
    }
}

class TwitterIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let quote = this.props.quote.split(" ").join("%20");
        let author = this.props.author.split(" ").join("%20");
        let tweetString = `https://twitter.com/intent/tweet?text="${quote}"%0A-${author}`; 
        return (<a href={tweetString} id="tweet-quote" target="_blank">
            <img height="50px" src="assets/twitter.png"></img>
        </a>)
    }
}

class TumblrIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // return (<div id="tumblr">Tumblr Icon</div>)
    }
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello World!");
    let main = document.getElementById("main");
    ReactDOM.render(<App/>, main);
});