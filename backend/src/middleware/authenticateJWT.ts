import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../constants/httpStatus";


export const authenticateJWT = (req:Request,res:Response,next:NextFunction):void=>{
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(HttpStatus.UNAUTHORIZED).json({message:'Token Not Provided'});
        return;
    }
    const token = authHeader.split(" ")[1].replace(/"/g,"");
    console.log(token)
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    }catch(err){
        console.log(err)
        if(err instanceof Error){
            res.status(HttpStatus.FORBIDDEN).json({message:err.message});
        }else{
            res.status(HttpStatus.FORBIDDEN).json({message:'Invalid or Expired the token'});
        }
        return;
    };
};