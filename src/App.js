import React, { useState, useEffect } from "react"
import Unity, { UnityContent } from "react-unity-webgl"

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const unityContent  = new UnityContent(
    "unity/Build/Build.json",
    "unity/Build/UnityLoader.js"
  )
  unityContent.on('loaded', () => {
    setLoaded(true)
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
      { !show && <div className="loading">Loading...</div>}
      <Unity className={`haine ${ !show ? 'hidden' : '' }`} unityContent={unityContent} />
    </>
  )
}

export default App;
