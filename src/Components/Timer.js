import './Timer.css';
import { useState, useEffect } from "react";

var Timer = (props) => {

    const [seconds, setSeconds] = useState(props.secs);
    const [isRunning, setIsRunning] = useState(false);


    const toggleIsRunning = () => { setIsRunning(!isRunning); }
    const reset = () => {
        setSeconds(3);  //what ever hardcoded val from App.js
        setIsRunning(false);
        props.stopFunc(false);   //reset game
        props.updateTime(3);   //reset App secs state
    }

    useEffect(() => {
        let interval = null;
        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                // setSeconds(seconds => seconds - 1);
                props.updateTime(seconds-1);
                setSeconds(seconds-1);

              }, 1000);
        } else if (isRunning) {
            // debugger;
            props.updateTime(0);
            setSeconds(0);
            setIsRunning(false);
            props.stopFunc(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);     //Only re-run effect if these state changes

    return(
        <div className="timer">
            {/* <p className="secs">{seconds}s</p> */}

            <div >
                {seconds > 0 ?
                    <button disabled={seconds===0} onClick={toggleIsRunning} className="button">{isRunning ? "Pause" : "Start"}</button>
                    : ""}
                <button onClick={reset} className="button">Reset</button>
            </div>
        </div>
    );
}


export default Timer;