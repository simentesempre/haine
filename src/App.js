import React, { useState, useEffect } from "react"
import Unity from "react-unity-webgl"
import unityContent from "./unity"
import Over from "./components/Over"
import { isMobile } from "react-device-detect"

const App = () => {
  const location = window.location;
  const urlParams = new URLSearchParams(location.search) 
  const [loaded, setLoaded] = useState( ( urlParams.has('e') && urlParams.get('e') ) === 'OsxMerda' ? true : false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState( ( urlParams.has('e') && urlParams.get('e') ) === 'OsxMerda' ? true : false);
  const [showRestart, setShowRestart] = useState(false);
  const [score, setScore] = useState(false);
  
  unityContent.on('loaded', () => {
    setLoaded(true)
  })
  unityContent.on('OnPlayerDeath', payload => {
    console.log('OnPlayerDeath', {payload})
    setShowRestart(true)
    setScore(payload)
  })
  unityContent.on('progress', progression => {
    setProgress(progression)
  })

  useEffect(()=>{
    if(loaded){
      setTimeout(()=>{
        setShow(true)
      }, 2000)
    }
  },[loaded])

  useEffect(()=>{
  },[score, progress, loaded])

  return (
    <>
      {
        isMobile ? <>
          <div className="coming-soon"><p>Try it on your pc/mac.<br />
          Available on app stores soon</p></div>
          </> : <>
          { !show && <div className="loading"><span style={{width: `${Math.round(progress * 100)}%`}}></span></div>}
          <Unity className={`haine ${ !show ? 'hidden' : '' }`} unityContent={unityContent} />
          {showRestart && <Over score={score} unityContent={unityContent} setShowRestart={setShowRestart}/>}
        </>
      }
      
    </>
  )
}

export default App;
