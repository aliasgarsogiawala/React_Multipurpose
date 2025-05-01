import React, { useState } from 'react';
import axios from 'axios';
import './VoiceTranslator.css'; 

function VoiceTranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es'); 

  const handleVoiceInput = async () => {
    try {
      setIsLoading(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = sourceLanguage;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        translateText(transcript);
      };
      recognition.start();
    } catch (error) {
      setError('Speech recognition not supported in this browser.');
    }
  };

  const translateText = async (text) => {
    try {
      const apiKey = 'AIzaSyCB-oAX8VcSwrHIn0pxY3u4ANhGUro7J78';
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      setError('Failed to translate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceLanguageChange = (e) => {
    setSourceLanguage(e.target.value);
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="voice-translator-container">
      <h1>Voice Translator</h1>
      <div className="language-selection">
        <label htmlFor="sourceLanguage">Source Language: </label>
        <select class="from" id="sourceLanguage" value={sourceLanguage} onChange={handleSourceLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="it">Italian</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          {/* Add more language options as needed */}
        </select>
        <label htmlFor="targetLanguage"> Target Language: </label>
        <select class="to" id="targetLanguage" value={targetLanguage} onChange={handleTargetLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="it">Italian</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          {/* Add more language options as needed */}
        </select>
      </div>
      <div className="button-container">
        <button className={`voice-button ${isLoading ? 'listening' : ''}`} onClick={handleVoiceInput} disabled={isLoading}>
          {isLoading ? 'Listening...' : 'Start Voice Input'}
          <div className="sound-wave"></div>
        </button>
        <button className="translate-button" onClick={() => translateText(inputText)} disabled={!inputText || isLoading}>
          Translate
        </button>
      </div>
      <br />
      <h2>Input Text:</h2>
      <div>{inputText}</div>
      <br />
      <h2>Translated Text:</h2>
      <div>{translatedText}</div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default VoiceTranslator;
