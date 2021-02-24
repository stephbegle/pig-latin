import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are some test words hard coded to make the process of testing your code a bit faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.toLowerCase().split(" ")
    console.log("userInput:", userInput)
    
    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      let firstVowel = currentWord.split("").map(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
      console.log("is it a vowel:", firstVowel)
      // firstVowel is an array of each word in boolean form showing true for vowel and false for consonant

      let indexOfVowel = firstVowel.indexOf(true);
      console.log("index of current vowel", indexOfVowel)

      let splitWord = currentWord.split("")
      // make a variable for the currentWord we will be working with
      // console.log("translatedWordsArray: ", translatedWordsArray)

      
      if (currentWord.includes("a","e","i","o","u") === false && currentWord.includes("y") === true){
        let yIndex = currentWord.indexOf("y");
        let endOfWord = splitWord.splice(yIndex);
        var pigWord = endOfWord.join("") + splitWord.join("") + "ay"
    
      } else if (currentWord.includes("qu")){
        let quIndex = currentWord.indexOf("qu");
        //console.log(quIndex);
        let indexToSplit = quIndex + 2
        let quSplitWord = currentWord.split("");
        let endOfWord = quSplitWord.splice(indexToSplit);
        let begOfWord = quSplitWord
        pigWord = endOfWord.join("") + begOfWord.join("") + "ay"
      } else if(indexOfVowel === 0){
        // if the word begins with a vowel 
        pigWord = splitWord.join("") + "way";
      } else if (indexOfVowel !== 0){
        // if the word begins with a consonant
        let endOfWord = splitWord.splice(indexOfVowel);
        let begOfWord = splitWord
        pigWord = endOfWord.join("") + begOfWord.join("") + "ay"
      }

      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return pigWord
    })

    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords this one:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({ phraseTranslated: translatedWords })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({ phrase: e.target.value })
  }

  render() {
    return (
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src="http://cdn.shopify.com/s/files/1/1061/1924/products/Pig_Nose_Emoji_grande.png?v=1571606065"
          alt="pig with butcher cut names in pig latin"
          id="butcherPig"
        />
        <div id="box">
          <h4>You want me to talk piggy to you? Oink Oink ;) 
            <br></br>Type in something to translate:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            id="inputPhrase"
            onChange={ this.handleInput }
            value={ this.state.phrase }
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={ this.setUpPreventDefault }>Submit</button>
          <button onClick={ this.restartGame }>Clear</button>
        </div>
        <div id="box2">
        <p>{ this.state.phraseTranslated }</p>
        </div>
        <footer>Coded by Nick and Steph :) </footer>
      </>
    )
  }
}

export default App
