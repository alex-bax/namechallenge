import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Components/Timer';

var App = () => {
  const [cityInp, setCityInp] = useState("");
  const [sendVal, setSendVal] = useState("");   //final val being sent
  const [score, setScore] = useState(0);
  const [acc, setAcc] = useState(false);    //if sent city was accepted
  const [sec, setSecs] = useState(10);

  // const [isLoading, setLoading] = useState(true);
  const [startCh, setStartCh] = useState('Æ') //useState(String.fromCharCode(Math.floor(Math.random() * ("Z".charCodeAt(0) - "A".charCodeAt(0) + 1)) + "A".charCodeAt(0)));
  const [usedCities, setUsedCities] = useState(["Præstø","Pedersker","Padborg","Pjedsted","Pindstrup","Pårup","Præstbro","Pandrup","Poulstrup"]); //useState([]);
  const [infoMess, setInfoMess] = useState("");
  // const [citiesByStartCh, setCitiesByStartCh] = useState([]);

  const handleChange = (event) => {
    setCityInp(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();   //prev sit from reloading..
    setSendVal(cityInp);
    const cityInpLow = cityInp.toLowerCase();
    isStartChValid('W');  //test
    if ((startCh.toLowerCase() === cityInpLow.charAt(0) && !usedCities.includes(cityInpLow))) {
      checkCity(cityInp);
    } else {
      setAcc(false);
    }
  }

  const getAll = () => {
    axios.get('https://localhost:44334/city')
      .then(res => {
        console.log(res.data);
        setScore(res.data);
        // debugger;
      }).catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
    }

  //passed down to Timer - reset all state
  function stopGame (inp) {
    if(!inp) {
      setScore(0);
      setUsedCities([]);
      setCityInp("");
      setSendVal("");
      setAcc(false);
    }
  }

  function updateSecs (secFromTimer) {
    setSecs(secFromTimer);
  }

  const checkCity = (cityName) => {
    axios.get('https://localhost:5001/city/' + cityName)
      .then(res => {
        console.log("checkCity:", res.data);
        // setLoading(false);
        setAcc(res.data);
        if(res.data) {
          setCityInp("");
          setScore(score + 1);
          setUsedCities(oldLst => [...oldLst, cityName.toLowerCase()]);
          // setStartCh(cityName.charAt(cityName.length - 1));
          isStartChValid(cityName.charAt(cityName.length - 1));   //recurse until accep. new rand startCh

          // console.log(cityName.charAt(cityName.length - 1));
        }
    });
  }

  //recurses until new usable startCh is generated - then changes state
  const isStartChValid = (stCh) => {
    axios.get('https://localhost:5001/cat/' + stCh.toUpperCase())
    .then(resp =>  {
        const citiesByCh = resp.data.citiesStartCh;
        console.log(stCh+" startCh: ", citiesByCh);
        debugger;
        if (citiesByCh.length > 0) {
          const fil = usedCities.filter(name => citiesByCh.includes(name));   //keep items that are in both lsts
          if (fil.length === citiesByCh.length) {   //lsts identical - thus all cities w. that startCh are used
            setInfoMess("Random letter generated \n No cities left starting with: " + stCh);
            setTimeout(() => {
              setInfoMess("")
            }, 5000)
            isStartChValid(randStartCh());

          } else {
            setStartCh(stCh);
          }
        } else {  //no cities w. startCh in API e.g 'Z' - find new rand. startCh
          debugger;
          // isStartChValid(randStartCh());
          isStartChValid('P');

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
          <h1>Denmark</h1>
          <p style={{marginTop: "20px"}}>Enter a danish city that starts with the letter: </p>


          {sendVal ? <p style={{fontSize: "24px", marginTop: "5px"}}> Entered: <span className={acc ? "correctTxt" : "wrongTxt" }>{sendVal}</span></p> : <p></p> }
          <div className="scoreDiv">
            <h1 className="startCh">{startCh.toUpperCase()}</h1>
            <p className="secs">{sec}s</p>
          </div>
            {infoMess.length === 0 ? <p>Score: {score}</p> : <p className={["display-linebreak", "blue-border"].join(" ")}>{infoMess}</p>}
            <Timer secs={sec} stopFunc={stopGame} updateTime={updateSecs}/>


            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="inpDiv">
                      <input type="text" onChange={handleChange} value={cityInp} disabled={ sec === 0 || sec === 10}/>
                      {/* <button type="submit">Submit city</button> */}
                      <button className="submitButton" type="submit" disabled={sec === 0 || sec === 10}>Submit city</button>

                    </div>
                </form>
            </div>

        </article>

        <nav className="right">
        </nav>

      </main>



     <footer className="footer"></footer>
    </div>

  );
}

export default App;
