import './Timer.css';
import { useState, useEffect, useRef } from "react";

var Timer = (props) => {

    const [isRunning, setIsRunning] = useState(false);

    // const [isCombo, setIsCombo] = useState(props.isCombo);

    const secRef = useRef(props.secs);

    const start = () => {
        setIsRunning(true);
        props.enableInput();
        props.startFunc();
    }

    const reset = () => {
        clearIncSec();
        secRef.current = 20;
        setIsRunning(false);
        props.updateTime(secRef.current);
        props.stopFunc();
    }

    const clearIncSec = () => {
        window.clearInterval(secRef.current);
    }

    useEffect(() => {
        if(isRunning) {
            // debugger

            const intervalId = setInterval(() => {
                if(secRef.current === 0) {
                    reset();
                } else if (props.isCombo) {
                    clearIncSec();
                    // if(props.isCombo) {
                        secRef.current = secRef.current + 10;    //add 10 sec
                    // }
                    props.setCombFalse();   //to trigger useEffect to start again
                } else secRef.current = secRef.current - 1;

                // if(secRef.current === 0 || props.isCombo) {
                //     clearIncSec();
                //     if(props.isCombo) {
                //         secRef.current = secRef.current + 10;    //add 10 sec
                //     }
                //     props.setCombFalse();   //to trigger useEffect to start again
                // } else secRef.current = secRef.current - 1;
                // // setSeconds(secRef.current);
                props.updateTime(secRef.current);
            }, 1000);

            return (() => clearInterval(intervalId));
        }
    }, [isRunning, props.isCombo]);

    //works - but ++
    // useEffect(() => {
    //     // debugger;
    //     secRef.current = window.setInterval(() => {
    //         setSeconds((s) => s + 1);
    //     }, 1000);

    //     return clearIncSec;

    // }, []);

    return(
        <div className="timer">
            {/* <p className="secs">{seconds}s</p> */}

            <div >
                {/* {secRef.current > 0 ? */}
                {!isRunning ?
                    <button disabled={secRef.current===0} onClick={start} className="button">Start</button>
                    : ""}
                {isRunning ? <button onClick={reset} className="button">Reset</button>
                    : ""}
            </div>
        </div>
    );
}


export default Timer;