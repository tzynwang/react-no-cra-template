/* Packages */
import path from 'path';

/* Tools */
import { resolvePath } from '../../tool/resolvePath';

/* Data */
import tsConfig from '../../tsconfig.json';

/* Main */
const baseUrl = tsConfig.compilerOptions.baseUrl.replace('./', '');
const paths = Object.entries(tsConfig.compilerOptions.paths).map((pathPair) => {
  const [pathKey, pathValue] = pathPair;
  /*
  將 tsconfig 中的 "@Asset/*" 調整為 "@Asset"
  將 tsconfig 中的 ["asset/*"] 調整為 "asset" 並透過 path.join() 組合成 "src/asset"
  */
  return [
    pathKey.replace('/*', ''),
    path.join(baseUrl, pathValue.join().replace('/*', '')),
  ];
});
const alias = paths.reduce((reducedValue, currentValue) => {
  /* 這裡的 key 與 pathToResolve 分別對應到上方 paths 整理好的 ["@Asset", "src/asset"] */
  const [key, pathToResolve] = currentValue;
  return {
    ...reducedValue,
    [key]: resolvePath(pathToResolve),
  };
}, {});

export default alias;
