
  export const organizeDate=(date:Date |  null | undefined,array:any[] | null)=>{
    const year = date?.getFullYear();
    const month = String(date?.getMonth() !=null ? date?.getMonth() + 1:"").padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
    const hours = String(date?.getHours()).padStart(2, '0');
    const minutes = String(date?.getMinutes()).padStart(2, '0');
    const seconds = String(date?.getSeconds()).padStart(2, '0');
  
    let amPmIndicator:string;
  
    if (parseInt(hours) >= 0 && parseInt(hours) < 12) {
      amPmIndicator = 'AM';
    } else {
      amPmIndicator = 'PM';
    }
    let formattedHours = (parseInt(hours)  % 12 === 0) ? 12 : parseInt(hours)  % 12;
    if(array){
      array.push(`${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${amPmIndicator}`);
      return array;
    }
    return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${amPmIndicator}`;
  }
  
  export const jsonDataConvertToArray=async (arrayJson:any[] | null | undefined,properties:string[]) =>{
    let arrayParent:any[]=[];
    if(arrayJson){
      for (let indexJson = 0; indexJson < arrayJson.length; indexJson++) {
        const item:any = arrayJson[indexJson];
        let arrayItem:any[]=[];
        arrayItem.push(indexJson+1);
        for (let i = 0; i < properties.length; i++) {
          const property:string = properties[i];
          if(property==="createdAt"){
            organizeDate(new Date(item[`${property}`]),arrayItem);
          }
          arrayItem.push(item[`${property}`]);
        }
        arrayParent.push(arrayItem);
        arrayItem=[];
      }
    }
    return arrayParent;
  }