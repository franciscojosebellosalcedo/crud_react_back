import { Router } from "express";
import { create, deleteAll, deleteOneUserById, filterUsers, generatedFilePdf, getAllUser, getOneUser, updateUser } from "../controllers/user.controller";
import { getFileExcel } from "../generateFile/fileExcel";

const userRouter=Router();

userRouter.post("/filter",filterUsers);
userRouter.post("/get-file-excel",getFileExcel);
userRouter.post("/get-file-pdf",generatedFilePdf);
userRouter.post("/create",create);
userRouter.put("/update/:id",updateUser);
userRouter.get("/",getAllUser);
userRouter.get("/:id",getOneUser);
userRouter.delete("/delete-all-users",deleteAll);
userRouter.delete("/:id",deleteOneUserById);

export default userRouter;