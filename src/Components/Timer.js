import './Timer.css';
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

var Timer = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }


    const [isRunning, setIsRunning] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const secRef = useRef(props.secs);

    const start = () => {
        setIsRunning(true);
        props.startFunc();
        // props.enableInput();
    }

    const reset = () => {
        clearIncSec();
        secRef.current = 60;
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
                    secRef.current = secRef.current + 10;    //add 10 sec
                    props.setCombFalse();   //to trigger useEffect to start again
                } else secRef.current = secRef.current - 1;

                props.updateTime(secRef.current);
            }, 1000);

            return (() => clearInterval(intervalId));
        }
    }, [isRunning, props.isCombo]);



    return(
        <div className="timer">
            <div >
                {/* {secRef.current > 0 ? */}
                {!isRunning ?
                    <button disabled={secRef.current===0} onClick={start} className="button">Start</button>
                    : ""}
                {isRunning ? <button onClick={reset} className="button">Reset</button>
                    : ""}
                {!isRunning ? <button className="button" onClick={toggleModal}>Info</button> : "" }
                {/* {showInfo ? <Info/> : ""} */}


                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                >
                        <div className="infoBox">

                            <h2 className="infoBoxTxt">Getting combos</h2>
                            <p className="infoBoxTxt">Enter 3 correct cities in a row, and 10 sec's will be added to the timer. This can be seen when the timer flashes green.
                                The combo counter is set to 0 if a wrong city is entered. This is however the only penalty.</p>

                            <h2 className="infoBoxHdr">Spelling and dead ends</h2>
                            <p className="infoBoxTxt">The first letter of the input can be either upper or lower case. However with city names consisting of multiple words such as Kirke Værløse,
                                the first letter of the other words must be uppercase like so: "kirke Værløse". A name can only be used once.
                                If a "dead end" is reached, ie. all cities with a certain starting letter have been used, then a new random letter is generated.
                                Only valid letters are given.
                            </p>

                            <h2 className="infoBoxHdr">Data and precautions</h2>
                            <p className="infoBoxTxt">The data used is from <a href="https://statistikbanken.dk/statbank5a/SelectVarVal/Define.asp?MainTable=BY1" target="_blank" rel="noreferrer">Danmark Statistik</a>,
                                but it does not explicitly list cities only, which can be a source of error.
                                The definition of a danish "city"/"town" given by Danmarks Statistik, consists of two main criteria. Firstly being a population of min. 200, and secondly a distance of max. 200 meters from neighboring buildings.
                                Applying the data set to this definition results in approx. 1400 cities, but again precaution must be taken against minor errors.
                                The only exception to the city definition, admittedly a bit arbitrary, is the districts ("byområder/"bydele") of <a href="https://da.wikipedia.org/wiki/Hovedstadsomr%C3%A5det" target="_blank" rel="noreferrer">Hovedstadområdet</a>, e.g. Glostrup.
                            </p>

                            <button onClick={toggleModal} className="button">Close</button>
                        </div>
                </Modal>
            </div>
        </div>
    );
}


export default Timer;