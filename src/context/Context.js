import React, { createContext, useState } from 'react'
import runChat from '../config/Gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData,setResultData] = useState(""); 

    //typing effect
    const deplayPara = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev=> prev+nextWord);
        },75*index)
    }


    const onSent = async () => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompt(prev => [...prev,input]);
        const response = await runChat(input);
        //to make the heading bold
        let responseArray = response.split("**");
        let newResponse;
        for(let i=0;i<responseArray.length;i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] +"</b>";
            }
        }
        //to create new line
        let newResponse2 = newResponse.split("*").join("</br>")
        
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            deplayPara(i,nextWord +" ");
        }
        setLoading(false);
        setInput('');
        
    }

    

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;