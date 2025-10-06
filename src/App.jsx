import React, { useState,useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
 

   const [prevPrompts, setPrevPrompts] = useState(() => {
    // load from localStorage on first render
    const stored = localStorage.getItem("recentPrompts");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedPrompt, setSelectedPrompt] = useState("");

  // Save prompts to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("recentPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  // Add a new prompt
  const handleAddPrompt = (newPrompt) => {
    setPrevPrompts((prev) => [newPrompt, ...prev.filter(p => p !== newPrompt)].slice(0, 10));
  };

  // When user clicks a previous prompt in Sidebar
  const handleSelectPrompt = (prompt) => {
    setSelectedPrompt(prompt);
  };
    return (
      <>
   
              <Sidebar
        recentPrompts={prevPrompts}
        onSelectPrompt={handleSelectPrompt}
         onNewChat={() => setSelectedPrompt("")}
      />
      <Main
        selectedPrompt={selectedPrompt}
        onNewPrompt={handleAddPrompt}
         onNewChat={() => setSelectedPrompt("")}
      />
      </>
    )
  }

  export default App