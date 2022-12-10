import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import twitterLogo from '../assets/twitter_logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
   });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  const onUserChangedText = (event) => {
    ///console.log(event.target.value);
    setUserInput(event.target.value);
  };

  
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Welcome to AnimeQuest</h1>
          </div>
          <div className="header-subtitle">
            <h2>Discover your next Anime with our personalised anime recommender.</h2>
          </div>
          <div className="header-subtitle">
            <h3>Tell AnimeQuest an anime you enjoyed, and would want to watch something similar</h3>
          </div>
          <div className="header-subtitle">
            <h3>AnimeQuest will give you 3 reccomendations, with a brief summary and info on each.</h3>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea 
            placeholder="start typing here" 
            className="prompt-box" 
            value={userInput}
            onChange={onUserChangedText}
          />
          {/* New code I added here */}
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/bill_papas_12"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={twitterLogo} alt="twitter logo" />
            <p>@bill_papas_12</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
