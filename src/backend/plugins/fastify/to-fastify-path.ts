export const toFastifyPath = (path: string): string => {
  const params = path.match(/{(\w+)}/g);
  if (params == null) {
    return path;
  }
  let acc = path;
  for (const param of params) {
    acc = acc.replace(param, `:${param.slice(1, -1)}`);
  }
  return acc;
};
