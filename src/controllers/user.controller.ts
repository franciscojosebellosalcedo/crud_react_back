import { Request, Response } from "express";
import { isValueDataEmpty } from "../utils/validateData";
import { User } from "../entities/user.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (isValueDataEmpty(user)) {
      return res.status(400).json({
        code: 400,
        message: "Complete los datos",
        response: false,
      });
    }
    const userCreated = await User.save(user);
    if (!userCreated) {
      return res.status(400).json({
        code: 400,
        message: "Error al agregar a la persona",
        response: false,
      });
    }
    return res.status(201).json({
      code: 201,
      message: "Persona agregada correctamente",
      response: true,
      data: { ...userCreated },
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error al agregar a la persona",
      response: false,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const dataNew = req.body;
    if (isValueDataEmpty(dataNew)) {
      return res.status(400).json({
        code: 400,
        message: "No puedes dejar datos vacios",
        response: false,
      });
    }
    const userUpdated = await User.update(id, dataNew);
    
    if (!userUpdated ) {
      return res.status(400).json({
        code: 400,
        message: "Error al editar a la persona",
        response: false,
      });
    }else if(userUpdated.affected as any === 0){
      return res.status(400).json({
        code: 400,
        message: "Error al editar a la persona",
        response: false,
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Persona editada correctamente",
      response: true,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error al editar a la persona",
      response: false,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data=await User.find();
    return res.status(200).json({
      code: 200,
      message: "Personas",
      response: true,
      data:data
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error al obtener todos los registros",
      response: false,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id);
    const registerFound=await User.findOneBy({id});
    if(!registerFound){
      return res.status(400).json({
        code: 400,
        message: "Error al obtener a la persona",
        response: false,
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Persona encontrada",
      response: true,
      data:{...registerFound}
    });
    
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error al obtener a la persona",
      response: false,
    });
  }
};

export const deleteOneUserById = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id);
    const responseDeleted=await User.delete(id);
    if(responseDeleted.affected ===0){
      return res.status(400).json({
        code: 400,
        message: "Error al eliminar a la persona",
        response: false,
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Persona eliminada",
      response: true,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error al eliminar a la persona",
      response: false,
    });
  }
};
