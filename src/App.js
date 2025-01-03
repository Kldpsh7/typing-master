import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [para,setPara] = useState("Use an integrated toolchain for the best user and developer experience. This page describes a few popular React toolchains which help with tasks like: Scaling to many files and components. Using third-party libraries from npm. Detecting common mistakes early. Live-editing CSS and JS in development. Optimizing the output for production. The toolchains recommended on this page don’t require configuration to get started. This feature introduces a weighted scoring system for interview kits, allowing different types of questions to carry specific weights. The total score for an interview is calculated based on the defined weights and scores for each question type. This ensures a more accurate evaluation by emphasizing critical questions.".split(" "))
  const [val,setVal] = useState("")
  const [started,setStarted] = useState(false)
  const [ended,setEnded] = useState(false)
  const [seconds,setSeconds] = useState(60)
  const [speed,setSpeed] = useState(0)
  const [accuracy,setAccuracy] = useState(0)

  const handleChange = (e)=>{
    if(!started){
      setStarted(true)
      setTimeout(() => {
        setEnded(true)
      }, 60000)
    }
    if(e.target.value.split(" ").length===para.length+1){
      setEnded(true)
      setSeconds(0)
    }
    setVal(e.target.value)
  }

  const handlePaste = (e)=>{
    e.preventDefault()
    alert("Copy-pasting is not allowed")
  }

  useEffect(() => {
    if (seconds === 0 || !started) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds,started]);

  useEffect(()=>{
    setSpeed(val?.split(" ").length)
    setAccuracy(()=>{
      let correct = 0
      let incorect = 0
      let words = val?.trim().split(" ")
      for(let i=0;i<words.length;i++){
        if (words[i]===para[i]){
          correct++
        }else{
          incorect++
        }
      }
      return (correct/words.length)*100
    })
  },[ended])

  return (
    <div className="App">
      <header className="App-header">
          <h1 style={{paddingTop:"0px"}}>Typing Master</h1>
          <div style={{marginBottom:"50px"}}>Remaining Time: 00:{seconds>9?seconds:`0${seconds}`}</div>
          <div style={{width:"90%"}}>
          {para.map((i,j)=><span className={`${val.split(" ").length>j?'written':''} ${val.split(" ").length>j+1 && (val.split(" ")[j]===para[j]?'right':'wrong')}`} key={j}>{i} </span>)}
        </div>
      <textarea disabled={seconds===0} value={val} rows={5} style={{width:"90%", fontSize:"30px", marginTop:"20px", marginBottom:"50px"}} onChange={handleChange} onPaste={handlePaste}/>
      {ended && <div>
        <h2>Typing Speed: {speed} Words per minute</h2>
        <h2>Accuracy: {accuracy.toFixed(2)}%</h2>
      </div>}
      </header>
    </div>
  );
}

export default App;