(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{23:function(e,t,c){},24:function(e,t,c){},43:function(e,t,c){},44:function(e,t,c){},45:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(1),s=c.n(a),r=c(17),o=c.n(r),i=(c(23),c(5)),l=c(2),j=(c(24),c(7)),u=c.n(j),b=(c(43),function(e){var t=Object(a.useState)(!1),c=Object(l.a)(t,2),s=c[0],r=c[1],o=Object(a.useRef)(e.secs),i=function(){j(),o.current=30,r(!1),e.updateTime(o.current),e.stopFunc()},j=function(){window.clearInterval(o.current)};return Object(a.useEffect)((function(){if(s){var t=setInterval((function(){0===o.current?i():e.isCombo?(j(),o.current=o.current+10,e.setCombFalse()):o.current=o.current-1,e.updateTime(o.current)}),1e3);return function(){return clearInterval(t)}}}),[s,e.isCombo]),Object(n.jsx)("div",{className:"timer",children:Object(n.jsxs)("div",{children:[s?"":Object(n.jsx)("button",{disabled:0===o.current,onClick:function(){r(!0),e.startFunc()},className:"button",children:"Start"}),s?Object(n.jsx)("button",{onClick:i,className:"button",children:"Reset"}):""]})})}),h=function(){var e=Object(i.a)(Array("Z".charCodeAt(0)-"A".charCodeAt(0)+1).keys()).map((function(e){return e+"A".charCodeAt(0)})).concat(["\xc6".charCodeAt(0),"\xd8".charCodeAt(0),"\xc5".charCodeAt(0)]),t=e[Math.floor(Math.random()*e.length)];return String.fromCharCode(t)},d=(c(44),function(e){return Object(n.jsx)("div",{className:"content",children:Object(n.jsx)("div",{class:"columns",children:Object(n.jsx)("ul",{className:"table",children:e.cities.map((function(e){return Object(n.jsx)("li",{className:"item",children:e.replace(e.charAt(0),e.charAt(0).toUpperCase())},e.id)}))})})})}),O=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),c=t[0],s=t[1],r=Object(a.useState)(""),o=Object(l.a)(r,2),j=o[0],O=o[1],m=Object(a.useState)(0),f=Object(l.a)(m,2),p=f[0],x=f[1],C=Object(a.useState)(!1),g=Object(l.a)(C,2),v=g[0],A=g[1],N=Object(a.useState)(30),S=Object(l.a)(N,2),y=S[0],w=S[1],T=Object(a.useState)(0),k=Object(l.a)(T,2),M=k[0],D=k[1],E=Object(a.useState)(""),F=Object(l.a)(E,2),B=F[0],U=F[1],I=Object(a.useState)([]),R=Object(l.a)(I,2),H=R[0],L=R[1],G=Object(a.useState)(""),J=Object(l.a)(G,2),Z=J[0],q=J[1],z=Object(a.useState)(!1),V=Object(l.a)(z,2),W=V[0],X=V[1],Y=Object(a.useState)(!1),K=Object(l.a)(Y,2),P=K[0],Q=K[1],$=Object(a.useRef)();Object(a.useEffect)((function(){P?(console.log("enable!"),$.current.focus()):ee(h())}),[P]);var _=function(e){u.a.get("https://localhost:5001/city/"+e).then((function(t){console.log("checkCity:",t.data),A(t.data),t.data&&(s(""),x(p+1),D(M+1),L((function(t){return[].concat(Object(i.a)(t),[e.toLowerCase()])})),console.log("combo",M),M+1===2&&(D(0),X(!0)),ee(e.charAt(e.length-1)))}))},ee=function e(t){u.a.get("https://localhost:5001/cat/"+t.toUpperCase()).then((function(c){var n=c.data.citiesStartCh;(console.log(t+" startCh: ",n),n.length>0)?H.filter((function(e){return n.includes(e)})).length===n.length?(q("Random letter generated \n All cities used with: "+t.toUpperCase()),setTimeout((function(){q("")}),5e3),e(te())):U(t):e(h())}))},te=function(){var e=Object(i.a)(Array("Z".charCodeAt(0)-"A".charCodeAt(0)+1).keys()).map((function(e){return e+"A".charCodeAt(0)})).concat(["\xc6".charCodeAt(0),"\xd8".charCodeAt(0),"\xc5".charCodeAt(0)]),t=e[Math.floor(Math.random()*e.length)];return String.fromCharCode(t)};return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("header",{}),Object(n.jsxs)("main",{className:"main",children:[Object(n.jsx)("img",{className:"bg",alt:"nyhavn",src:"https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}),Object(n.jsx)("aside",{className:"left"}),Object(n.jsxs)("article",{className:"mainContent",children:[Object(n.jsx)("h2",{className:"title",children:"City Name Challenge"}),Object(n.jsx)("h2",{children:"Denmark"}),Object(n.jsx)("p",{style:{marginTop:"20px"},children:"Enter a danish city that starts with the letter: "}),j?Object(n.jsxs)("p",{style:{fontSize:"24px",marginTop:"5px"},children:[" Entered: ",Object(n.jsx)("span",{className:v?"correctTxt":"wrongTxt",children:j})]}):Object(n.jsx)("p",{}),Object(n.jsxs)("div",{className:"scoreDiv",children:[Object(n.jsx)("h1",{className:"startCh",children:B.toUpperCase()}),Object(n.jsxs)("p",{className:W?["secs","greenTxt"].join(" "):"secs",children:[y,"s"]})]}),0===Z.length?Object(n.jsxs)("p",{className:"scoreTxt",children:["Score: ",p]}):Object(n.jsx)("p",{className:["display-linebreak","blue-border"].join(" "),children:Z}),Object(n.jsxs)("p",{children:["Combo: ",M]}),Object(n.jsx)(b,{secs:y,stopFunc:function(){D(0),s(""),O(""),A(!1),Q(!1)},startFunc:function(){x(0),L([]),Q(!0)},updateTime:function(e){w(e)},setCombFalse:function(){console.log("app - set comb false"),D(!1),X(!1)},isCombo:W}),Object(n.jsx)("div",{className:"form",children:Object(n.jsx)("form",{onSubmit:function(e){e.preventDefault();var t=c.toLowerCase();O(t);var n=c.replace(c.charAt(0),c.charAt(0).toUpperCase());B.toLowerCase()!==t.charAt(0)||H.includes(t)?(D(0),A(!1),X(!1)):_(n)},children:Object(n.jsxs)("div",{className:"inpDiv",children:[Object(n.jsx)("input",{type:"text",onChange:function(e){s(e.target.value)},value:c,disabled:!P,ref:$}),P?Object(n.jsx)("button",{className:"submitButton",type:"submit",disabled:!P,children:"Submit city"}):""]})})}),H.length>0?Object(n.jsx)("h2",{style:{marginBottom:"7px"},children:"Entered cities"}):"",Object(n.jsx)(d,{cities:H})]}),Object(n.jsx)("nav",{className:"right"})]}),Object(n.jsx)("footer",{className:"footer"})]})};o.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(O,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.c7ff40b4.chunk.js.map