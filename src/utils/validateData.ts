import { configExcel } from "../config/configFileGenerate";

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

export const convertObjetToArray=(data:any[]):any[]=>{
  let array=[];
  array.push(configExcel.headers);
  data.map((item:any)=>{
    const keys=Object.keys(item);
    let dataArray:any=[];
    keys.map((key:string)=>{
      if(key !== "id") dataArray.push(item[`${key}`]);
    });
    array.push(dataArray);
    dataArray=[];
  });
  return array;
}

