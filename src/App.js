import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Timer from './Components/Timer';
import randStartCh2 from './Components/RandChar';
import ResultTable from './Components/ResultTable';

var App = () => {
  const [cityInp, setCityInp] = useState("");
  const [sendVal, setSendVal] = useState("");   //final val being sent
  const [score, setScore] = useState(0);
  const [acc, setAcc] = useState(false);    //if sent city was accepted
  const [sec, setSecs] = useState(60);
  const [combo, setCombo] = useState(0);

  const [startCh, setStartCh] = useState(randStartCh2()); //useState(String.fromCharCode(Math.floor(Math.random() * ("Z".charCodeAt(0) - "A".charCodeAt(0) + 1)) + "A".charCodeAt(0)));
  const [usedCities, setUsedCities] = useState([]);

  const [hintCity, setHintCity] = useState("");

  const [infoMess, setInfoMess] = useState("");
  const [isComb, setIsComb] = useState(false);
  const [isActive, setIsActive] = useState(false);  //is game running

  const inpRef = useRef();    //used to auto focus input

  const handleChange = (event) => {
    setCityInp(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();   //prev sit from reloading..
    const cityInpLow = cityInp.toLowerCase();
    setSendVal(cityInpLow);
    const startUpper = cityInp.replace(cityInp.charAt(0), cityInp.charAt(0).toUpperCase());
    if ((startCh.toLowerCase() === cityInpLow.charAt(0) && !usedCities.includes(cityInpLow))) {
      checkCity(startUpper);
    } else {
      setCombo(0);
      setAcc(false);
      setIsComb(false)
    }
  }

  useEffect(() => {
    if(!isActive) {
      isStartChValid(randStartCh2());

    } else {
      enableInp()
    }

  }, [isActive]);   //only do it upon initial render

  //passed down to Timer - reset all state
  function stopGame () {
    setCombo(0);
    setCityInp("");
    setSendVal("");
    setAcc(false);
    setIsActive(false);
  }

  function startGame() {
    setScore(0);
    setUsedCities([]);
    setIsActive(true);

  }

  function updateSecs (secFromTimer) {
    setSecs(secFromTimer);
  }

  function setComboFalse() {
    setCombo(false);
    setIsComb(false);
  }

  function enableInp() {
    // debugger
    inpRef.current.focus();
  }


  const checkCity = (cityName) => {
    axios.get('https://democity.azurewebsites.net/' + cityName)
      .then(res => {
        // console.log("checkCity:", res.data);

        setAcc(res.data);
        if(res.data) {
          setCityInp("");
          setScore(score + 1);
          setCombo(combo + 1);
          setUsedCities(oldLst => [...oldLst, cityName.toLowerCase()]);
          if((combo+1) === 3) {
            setCombo(0);
            setIsComb(true);
          }
          // setStartCh(cityName.charAt(cityName.length - 1));
          isStartChValid(cityName.charAt(cityName.length - 1));   //recurse until accep. new rand startCh

          // console.log(cityName.charAt(cityName.length - 1));
        }
    });
  }

  //recurses until new usable startCh is generated - then changes state
  const isStartChValid = (stCh) => {
    axios.get('https://democity.azurewebsites.net/cat/' + stCh.toUpperCase())
    .then(resp =>  {
        const citiesByCh = resp.data.citiesStartCh;

        if (citiesByCh.length > 0) {
          let difference = citiesByCh.filter(x => !usedCities.includes(x));
          setHintCity( difference[Math.floor(Math.random() * difference.length)]);

          // const fil = usedCities.filter(name =>  citiesByCh.includes(name.replace(name.charAt(0), name.charAt(0).toUpperCase())));   //keep items that are in both lsts
          const fil = citiesByCh.filter(name => usedCities.includes(name.toLowerCase()));
          // console.log("cities in both ch:", fil)
          if (fil.length === citiesByCh.length) {   //lsts identical - thus all cities w. that startCh are used
            setInfoMess("Random letter generated \n All cities used with: " + stCh.toUpperCase());
            setTimeout(() => {
              setInfoMess("")
            }, 5000)

            isStartChValid(randStartCh());

          } else {
            // setLatestActiveStCh(stCh)
            setStartCh(stCh);
          }
        } else {  //no cities w. startCh in API e.g 'Z' - find new rand. startCh
          console.log("gen rand letter!")
          isStartChValid(randStartCh2());
          // isStartChValid('P');   //testing

        }
    })
  }

  const randStartCh = () => {
    const randAZLst = [...Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1).keys()].map(i => i + 'A'.charCodeAt(0));   //[65 .. 90]
    // console.log("randAZ:", randAZLst);
    const randLst = randAZLst.concat(['Æ'.charCodeAt(0), 'Ø'.charCodeAt(0), 'Å'.charCodeAt(0)]);
    // console.log("ÆØÅ", randLst);
    const res = randLst[Math.floor(Math.random() * randLst.length)];

    return String.fromCharCode(res);
  }

  return (
    <div className="container">

      <header>
      </header>
      <main className="main">
        <img className="bg" alt="nyhavn" src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>

        <aside className="left">
        </aside>
        <article className="mainContent">

          <h2 className="title" >City Name Challenge</h2>
          <h2>Denmark</h2>
          <p style={{marginTop: "20px"}}>Enter a danish city that starts with the letter: </p>


          {sendVal ? <p style={{fontSize: "24px", marginTop: "5px"}}> Entered: <span className={acc ? "correctTxt" : "wrongTxt" }>{sendVal}</span></p> : <p></p> }
          <div className="scoreDiv">
            <h1 className="startCh">{startCh.toUpperCase()}</h1>
            <p className={isComb ?  ["secs", "greenTxt"].join(" ") : "secs"}>{sec}s</p>
          </div>
            {infoMess.length === 0 ? <p className="scoreTxt">Score: {score}</p> : <p className={["display-linebreak", "blue-border"].join(" ")}>{infoMess}</p>}
            <p>Combo: {combo }</p>
            <Timer secs={sec} stopFunc={stopGame} startFunc={startGame} updateTime={updateSecs} setCombFalse={setComboFalse}
                isCombo={isComb}  />


            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="inpDiv">
                      <input type="text" onChange={handleChange} value={cityInp}
                          // disabled={ sec === 0 || sec === 20} ref={inpRef}/>
                          disabled={!isActive} ref={inpRef}/>

                      {/* <button type="submit">Submit city</button> */}
                      {isActive ? <button className="submitButton" type="submit" disabled={!isActive}>Submit city</button>
                        : ""}

                    </div>
                </form>
            </div>
            {!isActive && usedCities.length > 0 ? <p className="hintTxt">Hint: {hintCity}</p> : ""}
            {usedCities.length > 0 ? <h2 style={{marginBottom:"7px"}}>Entered cities</h2> : ""}
            <ResultTable cities={usedCities} />

        </article>

        <nav className="right">
        </nav>

      </main>



     <footer className="footer"></footer>
    </div>

  );
}

export default App;
