import { Request, Response } from "express";
import { isValueDataEmpty } from "../utils/validateData";
import { User } from "../entities/user.entity";
import { handlerResponseHttp } from "../utils/response.handler";

export const create = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (isValueDataEmpty(user)) {
      return res.status(400).json(handlerResponseHttp(400,"Complete los datos",false));
    }
    const userCreated = await User.save(user);
    if (!userCreated) {
      return res.status(400).json(handlerResponseHttp(400,"Error al agregar a la persona",false));
    }
    return res.status(201).json(handlerResponseHttp(201,"Persona agregada correctamente",true,{...userCreated}));
  } catch (error) {
    return res.status(400).json(handlerResponseHttp(400,"Error al agregar a la persona",false));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const dataNew = req.body;
    if (isValueDataEmpty(dataNew)) {
      return res.status(400).json(handlerResponseHttp(400,"No puedes dejar datos vacios",false));
    }
    const userUpdated = await User.update(id, dataNew);
    if (!userUpdated || userUpdated.affected as any === 0 ) {
      return res.status(400).json(handlerResponseHttp(400,"Error al editar a la persona",false));
    }
    return res.status(200).json(handlerResponseHttp(200,"Persona editada correctamente",true));
  } catch (error) {
    return res.status(400).json(handlerResponseHttp(400,"Error al editar a la persona",false));
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data=await User.find();
    return res.status(200).json(handlerResponseHttp(200,"Personas",true,data));
  } catch (error) {
    return res.status(400).json(handlerResponseHttp(400,"Error al obtener todos los registros",false));
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id);
    const registerFound=await User.findOneBy({id});
    if(!registerFound){
      return res.status(400).json(handlerResponseHttp(400,"Error al obtener a la persona",false));
    }
    return res.status(200).json(handlerResponseHttp(200,"Persona encontrada",true,{...registerFound}));
  } catch (error) {
    return res.status(400).json(handlerResponseHttp(400,"Error al obtener a la persona",false));
  }
};

export const deleteOneUserById = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id);
    const responseDeleted=await User.delete(id);
    if(responseDeleted.affected ===0){
      return res.status(400).json(handlerResponseHttp(400,"Error al eliminar a la persona",false));
    }
    return res.status(200).json(handlerResponseHttp(200,"Persona eliminada",true));
  } catch (error) {
    return res.status(400).json(handlerResponseHttp(400,"Error al eliminar a la persona",false));
  }
};
