import React, {createContext, useState } from 'react'
import { axiosSpringInstance } from '../lib/axios';

export const vebbleAiBackendContext = createContext();

function VebbleAiContext({children}) {
    const [input , setInput] = useState("");
    const [showResult , setShowResult] = useState(false);

    const [responseState, setResponseState] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const sendPromptToSpring = async(userInput) => {
        if(!userInput.trim()) return;
        if (responseState.loading) {
            console.warn("Operation locked. Parallel transaction dropped.");
            return;
        }
        setShowResult(true);

        setResponseState({data : null , loading : true , error : null});

        try{
            const response = await axiosSpringInstance.post('/vebble-ai/reply', { 
                content: userInput 
            });

/* { this is old fetch mmethod}

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Too Many Requests: Server processing limits reached.");
                }
                else if(response.status === 503){
                    throw new Error("This model is currently experiencing high demand. Spikes in demand are usually temporary.");
                }
                else throw new Error(`Server responded with status: ${response.status}`);
            }
*/
            const result = response.data;

            // State update with successful backend data
            setResponseState({
                data: result, // Spring Boot jo key bhejega
                loading: false,
                error: null
            });
        } catch (err) {
            console.error("Backend Error:", err);
            setResponseState({
                data: null,
                loading: false,
                error: "Failed to connect with AI Server."
            });
        }
    };

    const contextValue = {
        aiData: responseState.data,
        isLoading: responseState.loading,
        apiError: responseState.error,
        sendPromptToSpring,
        input,
        setInput,
        showResult,
        setShowResult
    };

  return (
    <>
        <vebbleAiBackendContext.Provider value ={contextValue}>
            {children}
        </vebbleAiBackendContext.Provider>
    </>
  )
}

export default VebbleAiContext