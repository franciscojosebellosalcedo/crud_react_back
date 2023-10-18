import Xlsx from "xlsx";
import fs from "fs";
import {  convertObjetToArray } from "../utils/validateData";
import { configExcel } from "../config/configFileGenerate";
import { Request, Response } from "express";
import { handlerResponseHttp } from "../utils/response.handler";

export const getFileExcel = (req: Request, res: Response) => {
    try {
      const  {data}  = req.body;
      const dataArray = convertObjetToArray(data);
      
      // // Crear un libro de Excel
      const workbook = Xlsx.utils.book_new();
      const sheet = Xlsx.utils.aoa_to_sheet(dataArray);
  
      // Añadir la hoja al libro
      Xlsx.utils.book_append_sheet(workbook, sheet, configExcel.nameSheet);
  
      // Escribir el libro en un archivo
      const fileBinary = Xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // const fileData = fs.readFileSync(configExcel.nameFile);
      // const blob = Buffer.from(fileData);
      res.send(fileBinary);
      // fs.unlinkSync(configExcel.nameFile);
    } catch (error) {
      console.log(error)
      return res.status(400).json(handlerResponseHttp(400, "Error al generar el archivo", false));
    }
  };