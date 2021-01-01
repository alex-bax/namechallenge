//used in App.js

export const randStartCh2 = () => {
    const randAZLst = [...Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1).keys()].map(i => i + 'A'.charCodeAt(0));   //[65 .. 90]

    const randLst = randAZLst.concat(['Æ'.charCodeAt(0), 'Ø'.charCodeAt(0), 'Å'.charCodeAt(0)]);

    const res = randLst[Math.floor(Math.random() * randLst.length)];

    return String.fromCharCode(res);
  }



  export default randStartCh2;