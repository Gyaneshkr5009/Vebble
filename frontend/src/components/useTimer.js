import { useState , useRef } from "react";

export default function useTimer(){
    const [time , setTime] = useState(0);
    const [isActive , setIsActive] = useState(false);
    const timerRef = useRef(null);

    const startTimer = () => {
        if(!isActive && !timerRef.current){
            setIsActive(true);
            timerRef.current = setInterval(() => {
                setTime((prev) => prev+1);
            },1000);
        }
    };

    const resetTimer = () =>{
        setIsActive(false);
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setTime(0);
    }

    const stopTimer = () => {
        setIsActive(false);
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    return {time , isActive , startTimer , stopTimer , resetTimer};
}