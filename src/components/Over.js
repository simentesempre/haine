import React from 'react'
import ReactTooltip from 'react-tooltip'
import {
    FacebookShareButton, 
    TwitterShareButton
  } from "react-share"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Over = ({ score, unityContent, setShowRestart, awards}) => {
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
        <div className="awards">
            You re-experienced
            <ul>
                {
                    Object.keys(awards).map( key => {
                        const award = awards[key]
                        const image = require(`../assets/images/${award.icon}`)
                        return (
                            <li data-tip={award.taken ? award.label : null} className={`${ award.taken ? 'show': ''}`}>
                                <img src={image.default} alt={award.label} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
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
        <ReactTooltip />    
    </div>
    )
}

export default Over