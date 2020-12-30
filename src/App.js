import React, { useState, useEffect } from "react"
import Unity from "react-unity-webgl"
import unityContent from "./unity"
import Over from "./components/Over"
import Landing from "./components/Landing"
import { isMobile } from "react-device-detect"

const awardsObject = {
  black: {
    label: 'The Black Lives Matter movement',
    icon: 'gettone_black.png',
    taken: false
  },
  bsk: {
    label: 'The death of Kobe',
    icon: 'gettone_bsk.png',
    taken: true
  },
  koala: {
    label: 'The Australian bushfire season',
    icon: 'gettone_koala.png',
    taken: true
  },
  maradona: {
    label: 'The death of Diego',
    icon: 'gettone_maradona.png',
    taken: false
  },
  virus: {
    label: 'The sars-cov-2 lockdown',
    icon: 'gettone_virus.png',
    taken: false
  }
}

const App = () => {
  const location = window.location;
  const urlParams = new URLSearchParams(location.search) 
  const [loaded, setLoaded] = useState( ( urlParams.has('e') && urlParams.get('e') ) === 'OsxMerda' ? true : false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState( ( urlParams.has('e') && urlParams.get('e') ) === 'OsxMerda' ? true : false);
  const [showRestart, setShowRestart] = useState(false);
  const [score, setScore] = useState(false);
  const [awards, setAwards] = useState(awardsObject);
  
  unityContent.on('loaded', () => {
    setLoaded(true)
  })
  unityContent.on('OnPlayerDeath', payload => {
    console.log('OnPlayerDeath', {payload})
    setShowRestart(true)
    setScore(payload)
    const awardsCollected = [true, true, true, false, true]
    const awardsUpdated = { ...awardsObject }
    Object.keys(awardsObject).forEach( (key, i) => {
      awardsUpdated[key].taken =  awardsCollected[i]
    })
    setAwards(awardsUpdated)
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

  return (
    <>
      {
        isMobile ? <>
          <Landing mobile={true} />
          </> : <div className="unity-container">
          { !show && <div className="loading"><span style={{width: `${Math.round(progress * 100)}%`}}></span></div>}
          <Unity className={`haine ${ !show ? 'hidden' : '' }`} unityContent={unityContent} />
          {showRestart && <Over score={score} unityContent={unityContent} setShowRestart={setShowRestart} awards={awards} />}
        </div>
      }
      
    </>
  )
}

export default App;
