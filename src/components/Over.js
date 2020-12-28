import React from 'react'
import {
    FacebookShareButton, 
    TwitterShareButton
  } from "react-share"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Over = ({ score, unityContent, setShowRestart}) => {
    const unitySend = (level) => {
        unityContent.send(
            "Manager", 
            "LoadLevel", 
            level
        )
    }
    const handleRestart = () => {
        unitySend(1)
        setShowRestart(false)
    }
    const handleGoToHomepage = () => {
        unitySend(0)
        setShowRestart(false)
    }
    return (
    <div className="over">
        You survived
        <h2> {score} seconds</h2>
        to this shitty year
        <div class="actions">
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleGoToHomepage}>Home</button>
        </div>
        <div class="share">
            <span>Share on</span>
            <FacebookShareButton url={window.location.href} quote={`I survived ${score} seconds to this shitty year. Can you beat me?`}>
                <FontAwesomeIcon icon={faFacebook} />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title={`I survived ${score} seconds to this shitty year. Can you beat me?`}>
                <FontAwesomeIcon icon={faTwitter} />
            </TwitterShareButton>
        </div>     
    </div>
    )
}

export default Over