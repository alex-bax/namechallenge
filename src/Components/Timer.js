import './Timer.css';
import { useState, useEffect, useRef } from "react";

var Timer = (props) => {

    // const [seconds, setSeconds] = useState(props.secs);

    const [isRunning, setIsRunning] = useState(false);
    const [isCombo, setIsCombo] = useState(props.isCombo);
    // const [seconds, setSeconds] = useState(0);     //val doesn't matter - is overwritten by interval

    const secRef = useRef(props.secs);

    const start = () => { setIsRunning(true); }
    // const reset = () => {
    //     // setSeconds(20);  //what ever hardcoded val from App.js
    //     setIsRunning(false);
    //     props.stopFunc(false);   //reset game
    //     props.updateTime(20);   //reset App secs state
    //     clearIncSec()
    // }

    const reset = () => {
        secRef.current = 5;
        props.updateTime(secRef.current);
        props.stopFunc(false);
        // clearIncSec();
    }

    const clearIncSec = () => {
        window.clearInterval(secRef.current);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(secRef.current === 0 || isCombo)
                return clearInterval(intervalId);
            secRef.current = secRef.current - 1;
            // setSeconds(secRef.current);
            props.updateTime(secRef.current);
        }, 1000);

        return (() => clearInterval(intervalId));
    }, [isRunning]);

    //works - but ++
    // useEffect(() => {
    //     // debugger;
    //     secRef.current = window.setInterval(() => {
    //         setSeconds((s) => s + 1);
    //     }, 1000);

    //     return clearIncSec;

    // }, []);

    // useEffect(() => {
    //     let interval = null;
    //     if (isRunning && seconds > 0) {
    //         interval = setInterval(() => {
    //             // setSeconds(seconds => seconds - 1);
    //             props.updateTime(seconds-1);
    //             setSeconds(seconds-1);

    //           }, 1000);
    //     } else if (isRunning) {
    //         // debugger;
    //         props.updateTime(0);
    //         setSeconds(0);
    //         setIsRunning(false);
    //         props.stopFunc(true);
    //         clearInterval(interval);
    //     }
    //     return () => clearInterval(interval);
    // }, [isRunning, seconds]);     //Only re-run effect if these state changes

    return(
        <div className="timer">
            {/* <p className="secs">{seconds}s</p> */}

            <div >
                {secRef.current > 0 ?
                    <button disabled={props.seconds===0} onClick={start} className="button">Start</button>
                    : ""}
                <button onClick={reset} className="button">Reset</button>
            </div>
        </div>
    );
}


export default Timer;