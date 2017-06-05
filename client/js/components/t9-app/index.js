import React, {Component} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
const keys = {
    1:".,?",
    2:"abc",
    3:"def",
    4:"ghi",
    5:"jkl",
    6:"mno",
    7:"pqrs",
    8:"tuv",
    9:"wxyz"
}

console.log("Hello world, this is the Webpack");


class App extends Component{
    constructor(props){
        super(props);
        this.state = {suggested: [],keys:"",text:"",sentence:""}
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleWordSelection = this.handleWordSelection.bind(this);
    }
    handleKeyPress(e){
        console.log(e.target);
        const dial = e.target.getAttribute('data-value');
        var keys = this.state.keys+dial
        getSuggestion(keys)
        .then((suggestions)=>{
            this.setState({
                text:this.state.text+dial.toString(),
                keys:keys,
                suggested:suggestions,
                sentence: this.state.sentence
            });
        })

    }
    handleWordSelection(e){
        console.log(e.target.getAttribute('data-value'));
        var sentence = this.state.sentence + e.target.getAttribute('data-value') + " "
        this.setState({
            text:sentence,
            keys:"",
            suggested:[],
            sentence: sentence
        })
    }
    render(){
        return(
            <div>
                <Display text={this.state.text}/>
                <SuggestedWords onWordPressed={this.handleWordSelection} suggested={this.state.suggested}/>
                <KeyPad onKeyPressed={this.handleKeyPress}/>
            </div>
        );
    }
}

class Display extends Component{
    render(){
        return(
            <div className="display"><p className="displayText">{this.props.text}</p></div>
        )
    }
}

class SuggestedWords extends Component{
    render(){
        var words = []
        for(var i = 0; i < this.props.suggested.length;i++){
            words.push(<div key={i} data-value={this.props.suggested[i]} onClick={this.props.onWordPressed} className="suggestedWord">{this.props.suggested[i]}</div>)
        }
        return(
            <div className="suggestedWords">
                {words}
            </div>
        )
    }
}

class KeyPad extends Component{
    render(){
        var dials = [];
        for(var i = 1; i < 10;i++){
            dials.push(
            <div className="dial" key={i} data-value={i} onClick={this.props.onKeyPressed}>
            <p className="number" data-value={i}>{i}</p>
            <p className="keys" data-value={i}>{keys[i]}</p>
            </div>
            );
        }
        return(
            <div className="keypad">
                    {dials}        
            </div>
        )
    }
}

class Key extends Component{

}

function getSuggestion(keys)
{
	return new Promise((fullfiled)=>
	{
		$.ajax({
			method: "GET",
			url: "/api/suggest?method=trie&keys="+keys,
			success: data => 
			{
				fullfiled(data);
			}
		});
	});
}	

ReactDOM.render(<App/>,document.getElementById("root"));

