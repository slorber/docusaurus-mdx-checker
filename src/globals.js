import * as periscopic from "periscopic";
import * as acorn from "acorn";
import _ from "lodash";

function getGlobals(str) {
  const ast = acorn.parse(str, {
    ecmaVersion: 2019,
    sourceType: "module",
  });
  const analyzeResult = periscopic.analyze(ast);
  // console.log("analyzeResult", analyzeResult);
  const globals = Array.from(analyzeResult.globals.keys());
  globals.sort();
  return globals;
}

export function getUnknownGlobals(str, globals) {
  const foundGlobals = getGlobals(str);
  return _.difference(foundGlobals, globals);
}
