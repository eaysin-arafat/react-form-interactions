export const isObjEmpty = (object: Record<string, unknown>) =>
  Object.keys(object).length === 0;

export const deepClone = <T>(object: T): T =>
  JSON.parse(JSON.stringify(object));
