import { Router } from "express";
import { create, deleteOneUserById, getAllUser, getOneUser, updateUser } from "../controllers/user.controller";

const userRouter=Router();

userRouter.post("/create",create);
userRouter.put("/update/:id",updateUser);
userRouter.get("/",getAllUser);
userRouter.get("/:id",getOneUser);
userRouter.delete("/:id",deleteOneUserById);

export default userRouter;