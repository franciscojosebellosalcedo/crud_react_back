import { Request, Response } from "express";
import app from "./app";
import { connectionToDB } from "./config/db";

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      code: 200,
      message: "Bienvenido a mi API",
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: "Error en la aplicación",
    });
  }
});

const main = async () => {
  try {
    app.listen(process.env.PORT);
    console.log("server run on port ", process.env.PORT);
    connectionToDB();
  } catch (error) {
    console.log(error)
  }
};
main()
