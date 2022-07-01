export const makeDuplicateArray = <T>(arr: T): T => {
  return JSON.parse(JSON.stringify(arr));
};
