import React, { useState } from "react"
import YouTube from 'react-youtube'
import axios from 'axios'

const Landing = () => {

  const [email, setEmail] = useState('')
  const [subscriptionMessage, setSubscriptionMessage] = useState(false)

  const handleSendClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/newsletter`, { 
          email
      }, {
          headers: {
              'content-type': 'application/json'
          }
      })
      .then(res => {
        setSubscriptionMessage('Subscription sent')
      })
      .catch(err => {
          console.log(err)
      })
  }

  return (
    <div className="landing">
      <YouTube
/*         videoId={string}                  // defaults -> null
        id={string}                       // defaults -> null
        className={string}                // defaults -> null
        containerClassName={string}       // defaults -> ''
        opts={obj}                        // defaults -> {}
        onReady={func}                    // defaults -> noop
        onPlay={func}                     // defaults -> noop
        onPause={func}                    // defaults -> noop
        onEnd={func}                      // defaults -> noop
        onError={func}                    // defaults -> noop
        onStateChange={func}              // defaults -> noop
        onPlaybackRateChange={func}       // defaults -> noop
        onPlaybackQualityChange={func}    // defaults -> noop */
      />
      <p>
        L'Annèe is a french movie La Haine hommage. 
        It's a last goodbye to this shitty year. 
        It's the saddest game of the saddest year. 
        But most of all..
        IT'S A JOKE.
      </p>
      <p>
        <strong className="text-uppercase">
          Available on 31.12.2020
        </strong>
      </p>
      {subscriptionMessage ? <p>
        {subscriptionMessage}
      </p> : <p>
        <label className="text-uppercase">
          Enter your email to stay update
        </label>
        <input type="email" value={email} onChange={ e => setEmail(e.target.value) } />
        <button className="text-uppercase" onClick={handleSendClick}>Send</button>
      </p> }
    </div>
  )
}

export default Landing
