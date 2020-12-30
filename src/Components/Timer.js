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
              }, 1000);
        } else if (isRunning) {
            // debugger;
            setSeconds(0);
            setIsRunning(false);
            props.stopFunc();
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);     //Only re-run effect if these state changes

    return(
        <div className="Timer">
            <p>{seconds}s</p>
            <button onClick={toggleIsRunning}>{isRunning ? "Pause" : "Start"} </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}


export default Timer;