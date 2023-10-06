export const handlerResponseHttp=(statusCode:number,message:string,response:boolean,data?:any):{}=>{
    return {
        code:statusCode,message,response,data
    }
}