import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies like react
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json", // Use your tsconfig.json
      exclude: ["**/__tests__", "**/*.test.ts", "**/*.test.tsx"],
    }),
    postcss({
      extract: true, // Extracts CSS into a separate file
      minimize: true,
      modules: false
    }),
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
};
