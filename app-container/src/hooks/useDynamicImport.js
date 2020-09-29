import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";

export const INITIAL_STATE = { Component: ()=> <span>...Loading</span> };

export const updateState = (state, props) => {
  return { ...state, ...props };
};

export const errorHandler = (error) => `Unable to load the file: ${error}`;

const getUUID = () => new Date().getTime();

export const getPath = (path, cache = false) => {
  let filePath = path;
  if (!cache) {
    return filePath + `?t=${getUUID()}`;
  }
  return path;
};

const useDinamycImport = (path, cache = true) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    importExternal();
  }, []);

  const importExternal = () => {
    import(/* webpackIgnore: true*/ getPath(path, cache))
    .then((_exports) => {
      setTimeout(() => {
        setState((prev) =>
          updateState(prev, { Component: _exports.default })
        );
      }, 2000);
    })
    .catch((err) => {
      setState({ Component: ()=><span>...:(</span> });
    });
    
  };

  return state.Component;
};

export default useDinamycImport;
