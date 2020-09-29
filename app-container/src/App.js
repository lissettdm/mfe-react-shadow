import React, { useRef, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import useDinamycImport from "./hooks/useDynamicImport";
import ShadowContainer from "react-shadow-portal";
import { useDebugValue } from "react";

export const AppContext = createContext(null);

const URL = "http://localhost:5000/static/index.js";
const URL2 = "http://localhost:5005/static/index.js";

const App = () => {
  const Card = useDinamycImport(URL, false);
  // const Card2 = useDinamycImport(URL2, false);

  useEffect(()=> {
    import(/* webpackIgnore: true*/ URL2)
    .then((_exports) => {
      console.log(_exports);
      setTimeout(() => {
        if(document.querySelector('tag-card')) {
          window.customElements.define("tag-card", _exports.default)
        }
        ReactDOM.render(<tag-card></tag-card> ,document.querySelector("#remote-card"))
        document.addEventListener('onClick', ()=> {
          alert('hi')
;        });


      }, 2000);
    })
    .catch((err) => {
      console.log(err)
    });
  });


  return (
      <div className="App">
        <div className="App__header">
          <h1 className="App__header-title">Componentes web</h1>
          <div className="App__container">
            <div className="App__card-1">
              <div className="card">My Card</div>
            </div>
            <div id="remote-card">

            </div>
            <ShadowContainer.section className="App__card-2">
              <Card text="Description" onClick={()=> alert('')}/>
            </ShadowContainer.section>

          </div>
        </div>
      </div>
  );
};

export default App;
