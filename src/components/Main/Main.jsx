import React, { useState,useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { generateGeminiResponse } from '../../config/gemini'
import ReactMarkdown from "react-markdown";
const Main = ({ selectedPrompt, onNewPrompt ,onNewChat  }) => {
  const [prompt, setPrompt] = useState("");
  const [respText, setRespText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [err, setErr] = useState(null);
  const [question, setQuestion] = useState("");

useEffect(() => {
  if (onNewChat && selectedPrompt === "") {
    // New Chat reset
    setPrompt("");
    setRespText("");
    setShowResult(false);
    setErr(null);
  } else if (selectedPrompt) {
    // Load an old prompt
    setPrompt(selectedPrompt);
    handleSubmit(selectedPrompt);
  }
}, [selectedPrompt]);

  const handleSubmit = async (customPrompt) => {
    const currentPrompt = customPrompt || prompt;
    setQuestion(currentPrompt)
    if (!currentPrompt.trim()) return;

    setLoading(true);
    setErr(null);
    setRespText("");
    setShowResult(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const result = await generateGeminiResponse(currentPrompt, {}, apiKey);

      // typing effect
      const words = result.split(" ");
      let index = 0;
      const interval = setInterval(() => {
        setRespText(prev => prev + (index === 0 ? "" : " ") + words[index]);
        index++;
        if (index >= words.length) clearInterval(interval);
      }, 50);

      // save prompt to recent list in App.jsx
      onNewPrompt(currentPrompt);
      setPrompt("");
    } catch (e) {
      console.error(e);
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="main">
      <div className="nav">
        <p>Ask Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>


      <div className="main-container">
        {!showResult ? <>
          <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can i hep you today</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="compass_icon" />
            </div>
            <div className="card">
              <p>Briefly summarize this concept: urban planning</p>
              <img src={assets.bulb_icon} alt="bulb_icon" />
            </div>
            <div className="card">
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="message_icon" />
            </div>
            <div className="card">
              <p>Tell me about React js and React native</p>
              <img src={assets.code_icon} alt="code_icon" />
            </div>
          </div>
        </> : <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{question}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? <div className="loader">
              <hr />
              <hr />
              <hr />

            </div> :
           <div className="markdown-output">
  <ReactMarkdown>{respText}</ReactMarkdown>
</div>

            }
          </div>

        </div>}
<div className="main-bottom">
        <div className="search-box">
          <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder="Enter a prompt here" />

          <div>
            <img src={assets.gallery_icon} width="30" alt="" />
            <img src={assets.mic_icon} width="30" alt="" />
            <img  onClick={() => handleSubmit()} src={assets.send_icon} width="30" alt="" disabled={loading} />

          </div>
        </div>
        <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
      </div>
      </div>
      
    </div>
  )
}

export default Main