import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";

import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const getPluginsConfig = (prod) => {
  const plugins = [
    postcss({
      inject:false,
      use: ["sass"],
    }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    externalGlobals({
      react: "React",
      "react-dom": "ReactDOM",
      "prop-types": "PropTypes"
    }),
    visualizer(),
    terser(), /** minified */
  ];

  return plugins;
};

export default (CLIArgs) => {
  const prod = !!CLIArgs.prod;
  const mini = !!CLIArgs.mini;
  const bundle = {
    input: ["./index.js"],
    output: [
      {
        dir: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
  };
  bundle.external = pkg.peerDependencies;
  bundle.plugins = getPluginsConfig(prod, mini);
  return bundle;
};
