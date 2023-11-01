import { Request, Response } from "express";
import { isValueDataEmpty } from "../utils/validateData";
import { Users } from "../entities/user.entity";
import { handlerResponseHttp } from "../utils/response.handler";
import { generateFilePdf } from "../generateFile/filePdf";
import { jsonDataConvertToArray } from "../utils/file.utils";
import { configPdf } from "../config/configFileGenerate";

export const deleteAll=async (req:Request,res:Response)=>{
  try {
    const allUsers=await Users.find();
    allUsers.map(async (user)=>{
      await Users.deleteOne({_id:user.id});
    });
    return res
    .status(200)
    .json(handlerResponseHttp(200, "Registros eliminados", true));
    
  } catch (error) {
    return res
    .status(400)
    .json(handlerResponseHttp(400, "Error al eliminar todos los registros", false));
  }
}

export const generatedFilePdf = async (req: Request, res: Response) => {
  try {
    const {data}=req.body;
    const dataTableFilePDf=await jsonDataConvertToArray(data,["name","lastName","sexo","city","age","createdAt"]);
    generateFilePdf(res, configPdf.nameFile, 
      {
        logo: configPdf.image,
        titleMain: configPdf.title,
      },
      null,
      {
        headers:["TOTAL DE REGISTRO:"],
        values:[data.length]
      },
      {
        headersTable:configPdf.headers,
        valuesTable:dataTableFilePDf
      },
      configPdf.footer
    )
  } catch (error) {
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al generar archivo pdf de los registros", false));
  }
};

export const filterUsers = async (req: Request, res: Response) => {
  try {
    const options = req.body;
    if (!options) {
      return res
        .status(400)
        .json(
          handlerResponseHttp(400, "Error al filtrar a las persona", false)
        );
    }
    let result=null;
    if (options.field !== "age") {
      result = await Users.find({[`${options.field}`]: { $regex: new RegExp(options.value, 'i') }});
    } else {
      result = await Users.find({[`${options.field}`]: { [`${options.operator}`]: options.value }});
    }
    return res
      .status(200)
      .json(handlerResponseHttp(200, "Datos filtro", true, result));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al filtrar a las persona", false));
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (isValueDataEmpty(user)) {
      return res
        .status(400)
        .json(handlerResponseHttp(400, "Complete los datos", false));
    }
    const userNew = new Users(user);
    const userCreated=await userNew.save();
    if (!userCreated) {
      return res
        .status(400)
        .json(handlerResponseHttp(400, "Error al agregar a la persona", false));
    }
    return res.status(201).json(handlerResponseHttp(201, "Persona agregada correctamente", true, userCreated));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al agregar a la persona", false));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dataNew = req.body;
    if (isValueDataEmpty(dataNew)) {
      return res
        .status(400)
        .json(handlerResponseHttp(400, "No puedes dejar datos vacios", false));
    }
    const userUpdated = await Users.updateOne({_id:id},dataNew);
    if (userUpdated.modifiedCount=== 0) {
      return res
        .status(400)
        .json(handlerResponseHttp(400, "Error al editar a la persona", false));
    }
    return res
      .status(200)
      .json(handlerResponseHttp(200, "Persona editada correctamente", true));
  } catch (error) {
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al editar a la persona", false));
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await Users.find();
    return res
      .status(200)
      .json(handlerResponseHttp(200, "Personas", true, data));
  } catch (error) {
    return res
      .status(400)
      .json(
        handlerResponseHttp(400, "Error al obtener todos los registros", false)
      );
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const registerFound = await Users.findById(id);
    if (!registerFound) {
      return res
        .status(400)
        .json(handlerResponseHttp(400, "Error al obtener a la persona", false));
    }
    return res.status(200).json(
      handlerResponseHttp(200, "Persona encontrada", true,registerFound)
    );
  } catch (error) {
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al obtener a la persona", false));
  }
};

export const deleteOneUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const responseDeleted = await Users.deleteOne({_id:id});
    if (responseDeleted.deletedCount===0) {
      return res
        .status(400)
        .json(
          handlerResponseHttp(400, "Error al eliminar a la persona", false)
        );
    }
    return res
      .status(200)
      .json(handlerResponseHttp(200, "Persona eliminada", true));
  } catch (error) {
    return res
      .status(400)
      .json(handlerResponseHttp(400, "Error al eliminar a la persona", false));
  }
};
