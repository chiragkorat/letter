import { useState } from "react";
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("")
  const [respText, setrespText] = useState("")

  async function sendMessage(message) {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // Replace with your OpenAI API key
        },
      });

      const { choices } = response.data;
      const reply = choices[0].message.content;

      return reply;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async function main() {
    try {
      const reply = await sendMessage(inputText);
      setrespText(reply)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="App">
      <input type='text' onChange={(e) => setInputText(e.target.value)} />
      <button onClick={() => main()}>Write</button>
      <div>{respText}</div>
    </div>
  );
}

export default App;
