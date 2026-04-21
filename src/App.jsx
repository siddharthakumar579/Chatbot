import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { GoogleGenAI } from "@google/genai";


function App() {
  const [input, setInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

  function handleChange(e) {
    setInput(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(!input.trim()) return;
    setAiResponse("")
    setIsLoading(true)
    // setInput("")
    
    try{
      // console.log("Sending request to Gemini...");
      const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: input,
      config: {
        systemInstruction: `You are an expert in software and hardware problems faced in a computer or a laptop or any other communication device.
      
      
        Only answer questions related to your expertise and if any one asks an off-topic question reply them very rudely. 
        If someone asks a genuine question try to reply them in the simplest way possible
        And if any asks about who trained you can tell the about me (Siddharth)`,
      },
    });
    setAiResponse(response.text)
    // console.log("FULL RESPONSE:", response);
    // console.log("TEXT:", response.text);

    } catch(error){
      console.error("Cannot fetch data: " , error)
      setAiResponse("Oops something bad happened, check your console")
    } finally{
      setIsLoading(false);
      setInput("")
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className='title'>Not your Regular AI Assistant</h2>
        <form id="inputform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask a tech question (and keep it on topic)... "
            onChange={handleChange}
            value={input}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking" : "Submit"}
          </button>
        </form>

        <div className="responseDiv">
          <p className="responsePara">{aiResponse}</p>
        </div>
      </div>
    </div>
  );

}

export default App
