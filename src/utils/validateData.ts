export const isValueDataEmpty = (body: any): boolean => {
  const keys: string[] = Object.keys(body);
  keys.map((key: string) => {
    if (typeof body[`${key}`] === "string") {
      body[`${key}`] = body[`${key}`].trim();
    }
  });
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (
      body[`${key}`] === null ||
      body[`${key}`] === undefined ||
      body[`${key}`] === ""
    ) {
      return true;
    }
  }
  return false;
};
