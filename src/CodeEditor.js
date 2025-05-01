import React, { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleCheckOutput = () => {
    try {
      let tempOutput = '';
      const oldWrite = document.write;
      document.write = (content) => {
        tempOutput += content;
      };
      eval(code);
      document.write = oldWrite;
      setOutput(tempOutput);
    } catch (error) {
      console.error('Error executing JavaScript code:', error);
      setOutput('Failed to execute JavaScript code. Please check your code and try again.');
    }
  };

  return (
    <div>
      <h1>Javascript Editor</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows={10}
        cols={80}
        placeholder="Write your JavaScript code here..."
      />
      <br />
      <button onClick={handleCheckOutput}>Check Output</button>
      <h2>Output:</h2>
      <div>{output}</div>
    </div>
  );
}

export default CodeEditor;
