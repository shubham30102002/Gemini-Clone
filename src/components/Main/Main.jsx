import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt='' />
            </div>

            <div className="main-container">
                {!showResult ?
                    (<>
                        <div className="greet">
                            <p><span>Hello, Shubham </span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Help me incorporate more plant-based options in my diet</p>
                                <img src={assets.compass_icon} alt='' />
                            </div>

                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.message_icon} alt='' />
                            </div>

                            <div className="card">
                                <p>Brainstrom team bonding activities for our work retreat</p>
                                <img src={assets.bulb_icon} alt='' />
                            </div>

                            <div className="card">
                                <p>Improve readability of the following code</p>
                                <img src={assets.code_icon} alt='' />
                            </div>
                        </div>
                    </>) : (
                        <div className='result'>
                            <div className="result-title">
                                <img src={assets.user_icon} alt='' />
                                <p>{recentPrompt} shubham</p>
                                {/* prompt display nhi ho raha hai  */}
                            </div>

                            <div className="result-data">
                                <img src={assets.gemini_icon} alt='' />
                                {loading ? (
                                    <div className='loader'>
                                        {/* loading animation  */}
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ):(<p dangerouslySetInnerHTML={{__html:resultData}}></p> )}                 
                                {/* dekhna padega */}
                            </div>
                        </div>    
                    )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(event) => setInput(event.target.value)}
                            value={input}
                            type='text' placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses.<span className='privacy'>Your privacy & Gemini Apps</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main