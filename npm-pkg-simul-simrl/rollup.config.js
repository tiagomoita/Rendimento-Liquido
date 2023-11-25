import fs from "fs";
import path from "path";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import postCSS from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import json from "@rollup/plugin-json";
import svgr from "@svgr/rollup";
import pkg from "./package.json";

const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach((dir) => {
    const contextPath = `${entry}/${dir}`;

    if (fs.lstatSync(contextPath).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(contextPath, extensions, excludeExtensions),
      ];

      return;
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(contextPath);
    }
  });

  return fileNames;
};

const extensions = [".ts", ".tsx"];
const excludeExtensions = [".stories.tsx", ".test.tsx"];
const srcDir = path.resolve(__dirname, "src");
const libDir = path.resolve(__dirname, "lib");

export default {
  input: [...getFiles(srcDir, extensions, excludeExtensions)],
  treeshake: "recommended",
  output: {
    format: "esm",
    dir: libDir,
    preserveModules: true,
    preserveModulesRoot: srcDir,
    sourcemap: false,
  },
  external: [...Object.keys({ ...pkg.peerDependencies })],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
      declaration: true,
      declarationDir: "lib",
    }),
    postCSS({
      minimize: true,
      sourceMap: false,
      plugins: [autoprefixer()],
    }),
    json({
      compact: true,
    }),
    svgr({
      icon: false,
      svgoConfig: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
        ],
      },
    }),
    terser({
      compress: true,
    }),
  ].filter(Boolean),
};
