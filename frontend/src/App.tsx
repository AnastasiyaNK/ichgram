import { useEffect, useState } from 'react'

import './App.module.css'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000") // твій бекенд
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + TypeScript + Vite</h1>
      <p>Message from backend: {message}</p>
    </div>
  );

}

export default App
