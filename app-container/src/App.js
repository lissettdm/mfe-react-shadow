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
  const Card2 = useDinamycImport(URL2, false);



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
            <ShadowContainer.section className="App__card-2">
              <Card2 text="Description card 2" onClick={()=> alert('')}/>
            </ShadowContainer.section>

          </div>
        </div>
      </div>
  );
};

export default App;
