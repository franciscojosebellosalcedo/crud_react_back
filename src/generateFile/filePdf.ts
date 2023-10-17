import PDFDocument from "pdfkit";
import { typeContentBeforeBody, typeContentFooter, typeHeader, typeTable } from "../types/typesFilePdf";


const addContentPrevious=(doc:any,x:number,y:number,header?:typeHeader | null)=>{
  doc.fillOpacity(0.8);
  if(header){
    header.logo &&  doc.image(header.logo,100,y, {width:50});
    header.textSmall &&  doc.fontSize(6).text(header.textSmall,500,10,{width: 100 });
    y+=30;
    if(header.titleMain){
      doc.font('Helvetica').fontSize(10).text(header.titleMain, 175,y,{ align: 'center',width: 290 });
      y += 70;
    }
    x=30;
  }else{
    y=30;
    x=30;
  }
  return [x,y];
}

const addContentBeforeBody=(doc:any,x:number,y:number,headerPdf?:typeHeader | null,contentAditional?:typeContentBeforeBody | null)=>{
  if(contentAditional){
    const {headers,values}:any=contentAditional;
    [x,y]=addContent(doc,x,y,headers,values);
  }else{
    return [x,y];
  }
  return [x,y]

}

const validateSize=(list:any[])=>{
  if(list.length <= 3 ){
    return true;
  }
  return false;
}

const incrementX=(currentValue:number,value:number)=>{
  currentValue+=value;
  return [currentValue];
}

const addContent=(doc:any,x:number,y:number,headers?:string [] | null ,values?:string[] | null)=>{
  let aux=0;
  if(headers && values){

    if(headers.length < values.length || values.length < headers.length){
      throw new Error("The number of titles and values ​​must be the same");
    }else{
      if(validateSize(headers)){
        x=140;
      }else{
        x=40
        aux=1;
      }
      headers.map((title)=>{
        doc.fillColor("blue").fillOpacity(0.5);
        doc.font('Helvetica-Bold').fontSize(10).text(title,x,y,{width:250});
        aux > 0 ? [x]=incrementX(x,140) : [x]=incrementX(x,130);
        doc.fillColor("black").fillOpacity(0.8);
      });
      y+=20;
      validateSize(values) ? x=140: x=40;
      values.map((value)=>{
        doc.fillColor("black").fillOpacity(0.8);
        doc.font('Helvetica').fontSize(10).text(value,x,y,{width:250});
        aux > 0 ? [x]=incrementX(x,140) : [x]=incrementX(x,130);
      });
    }
    y+=50;
    x=30;
    return [x,y];

  }else if(headers){
    validateSize(headers) ? x=85: x=15;
    headers.map((title)=>{
      doc.fillColor("blue").fillOpacity(0.5);
      doc.font('Helvetica-Bold').fontSize(12).text(title,x,y,{width:300});
      aux > 0 ? [x]=incrementX(x,100) : x+=200;
      doc.fillColor("black").fillOpacity(0.8);
    });

    y+=40;
    x=30;
  return [x,y];

  }else if(values){
    validateSize(values) ? x=85: x=40 ; aux=1;
    values.map((value)=>{
      doc.fillColor("black").fillOpacity(0.8);
      doc.font('Helvetica').fontSize(12).text(value,x,y,{width:300});
      aux > 0 ? [x]=incrementX(x,100) : x+=200;
    });
    y+=40;
    x=30;
    return [x,y];
  }else{
    return [x,y];
  }
}

const addHeadersTable=(doc:any,x:number,y:number,headers?:string[] | null)=>{
  headers?.map((header,index)=>{
    if(index===1){
      x=50;
      doc.fontSize(10).font('Helvetica-Bold').fillColor("black").text(header, x , y,{width:80});
    }else{
      doc.fontSize(10).font('Helvetica-Bold').fillColor("black").text(header, x , y,{width:85});
    }
    x+=95;
  });
  x=30;

  return [x,y]
}

const addContentBody=(doc:any,x:number,y:number,headerPdf?:typeHeader | null,contentFooter?:typeContentFooter | null,bodyTable?:typeTable | null)=>{
  if(bodyTable){
    const {headersTable,valuesTable}=bodyTable;
    if(headersTable && valuesTable){
      let aux=0;
      let amountRegisterByPage=0;
      [x,y]=addHeadersTable(doc,x,y,headersTable);
      valuesTable.map((item)=>{
        y+=45;
        item.map((value,index)=>{
          if(index===1){
            x=50;
            doc.fontSize(8.5).font('Helvetica').fillColor("black").text(value, x , y,{width:80});
          }else{
            if(index===item.length-1){
              doc.fontSize(8.5).font('Helvetica').fillColor("black").text("hola", x , y,{width:50});
            }else{
              doc.fontSize(8.5).font('Helvetica').fillColor("black").text(value, x , y,{width:85});
            }
          }
          x+=95;
        });
        amountRegisterByPage++;

        x=30;
        if(amountRegisterByPage > 7 && aux===0 ){
          [x,y]=addNextPage(doc,x,y,headerPdf,headersTable,contentFooter);
          aux++;
          amountRegisterByPage=0;
        }
        else if(amountRegisterByPage > 9 && aux > 0 ){
          [x,y]=addNextPage(doc,x,y,headerPdf,headersTable,contentFooter);
          amountRegisterByPage=0;
        }
      });

    }
    return [x,y];
  }else{
    return [x,y];
  }
}

const addNextPage=(doc:any,x:number,y:number,headerPdf?:typeHeader | null,headersTable?:string[],contentFooter?:typeContentFooter | null)=>{
  doc.addPage();
  x=30;
  y=30;
  [x,y]=addContentPrevious(doc,x,y,headerPdf);
  [x,y]=addHeadersTable(doc,x,y,headersTable);
  addContentFooter(doc,x,y,contentFooter);
  return [x,y];
}

const addContentFooter=(doc:any,x:number,y:number,contentFooter?:typeContentFooter | null)=>{
  if(contentFooter){
    const {content,aditional}=contentFooter;
    if(content){
      y=680;
      x=80;
      content.map((item)=>{
        doc.fontSize(9).font('Helvetica-Bold').fillColor("black").text(item.title, x , y);
        if(item.info){
          y+=10;
          item.info.map((valueInfo)=>{
            doc.fontSize(8).font('Helvetica').fillColor("black").text(valueInfo, x , y);
            y+=10
          });
        }
        y=680;
        x+=280;
      });
      if(aditional){
        aditional.map((data)=>{
          doc.fontSize(8).font('Helvetica').fillColor("black").text(data, x , y);
          y+=10
        });
      }
    }
  }
  x=30;
  y=30;
  return [x,y]
}

const nameDocument = (name?:string | null) => {
  const regex = /\.pdf$/i;
  if (name===null || name===undefined ) {
    return "qualty-document.pdf";
  } else if (name.length === 0) {
    return "qualty-documento.pdf";
  } else if (name.endsWith(".pdf".toLowerCase())) {
    if (regex.test(name)) {
      return name;
    } else {
      throw new Error("Not is name valid");
    }
  } else {
    name=`${name}.pdf`;
    if (regex.test(name)) {
      return name;
    } else {
      throw new Error("Not is name valid");
    }
  }
};

export const generateFilePdf=(
    res:any,
    nameFile:string | null | undefined,
    headerPdf?:typeHeader | null,
    titleAditional?:string | null | undefined,
    contentBeforeBodyPdf?:typeContentBeforeBody | null,
    bodyTablePdf?:typeTable | null,
    contentFooter?:typeContentFooter | null
  )=>{
    const doc = new PDFDocument();
    doc.pipe(res);

  doc.fillOpacity(0.8);
  let x = 30;
  let y = 30;
  
  [x,y]=addContentPrevious(doc,x,y,headerPdf);
  titleAditional !==null?  doc.fontSize(11).font('Helvetica').fillColor("black").text(titleAditional as string, 175 , y,{ align: 'center',width: 290}):"";
  titleAditional !==null? y+=60 :"";

  [x,y]=addContentBeforeBody(doc,x,y,headerPdf,contentBeforeBodyPdf);

  addContentFooter(doc,x,y,contentFooter);
  [x,y]=addContentBody(doc,x,y,headerPdf,contentFooter,bodyTablePdf);

  doc.end();
  res.setHeader("NameFile",nameDocument(nameFile));

}
