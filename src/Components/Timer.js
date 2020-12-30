import './Timer.css';
import { useState, useEffect } from "react";

var Timer = (props) => {

    const [seconds, setSeconds] = useState(props.secs);
    const [isRunning, setIsRunning] = useState(false);

    const toggleIsRunning = () => { setIsRunning(!isRunning); }
    const reset = () => {
        setSeconds(props.secs);
        setIsRunning(false);
        props.stopFunc();   //reset game

    }

    useEffect(() => {
        let interval = null;
        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                // setSeconds(seconds => seconds - 1);
                setSeconds(seconds-1);
                props.updateTime(seconds);

              }, 1000);
        } else if (isRunning) {
            // debugger;
            setSeconds(0);
            props.updateTime(seconds);
            setIsRunning(false);
            props.stopFunc();
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);     //Only re-run effect if these state changes

    return(
        <div className="timer">
            {/* <p className="secs">{seconds}s</p> */}

            <div >
                <button onClick={toggleIsRunning} className="button">{isRunning ? "Pause" : "Start"} </button>
                <button onClick={reset} className="button">Reset</button>
            </div>
        </div>
    );
}


export default Timer;