import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import notFound from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/error-handler";

const app = express();

//----External Middleware Configuration----//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//-----------------------------------------//

//----Routes----//
app.use("/api/v1/users", userRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
//---------------//

//----Test Route----//
/* 
app.get("/", (req, res)=>{
    res.send("Hello mom")
})
*/
//------------------//

export default app;
