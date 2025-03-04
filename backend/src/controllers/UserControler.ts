import { userService } from "../services/UserServices";
import { Request,Response } from "express";
import { HttpStatus } from "../constrains/httpStatus";
class UserController{
    async register(req:Request,res:Response){
        try{
            const {token,user} = await userService.register(req.body);
            res.status(HttpStatus.OK).json({success:true,message:'User Created SUccessfully',user,token});
        }catch(err){
            console.log(err)
            if(err instanceof Error){
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message});
            }else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:'An Unexpected Error Occured'});
            }
        }
    }
    async login(req:Request,res:Response){
      try{
        console.log(`Req Body ${req.body}`);
        const {token,user} = await userService.login(req.body); 
        res.status(HttpStatus.OK).json({success:true,message:'Login Completed Successfully',user,token})
      }catch(err){
        console.log(err)
        if(err instanceof Error){
          console.log(err.message)
          res.status(500).json({success:false,message:err.message});
        }else{
          res.status(500).json({success:false,message:'An Unexpeted Error Occured'});
        }
      }
    }
    async checkUser(req: Request, res: Response) {
      try {
        const { field, value } = req.body;
        const resData = await userService.checkUser(field, value);
  
        if (resData) {
          res.status(400).json({ success: false, message: `${field} Already Exists` });
        }else{
            res.status(200).json({ success: true, message: `${field} Available` });
        }
      } catch (err) {
        console.log(err)
        if (err instanceof Error) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(500).json({ success: false, message: 'An Unexpected Error Occurred' });
        }
      }
    }
    
    async getUserById(req: Request, res: Response) {
      try {
        const {  } = req.body;
        const resData = await userService.checkUser(field, value);
  
        if (resData) {
          res.status(400).json({ success: false, message: `${field} Already Exists` });
        }else{
            res.status(200).json({ success: true, message: `${field} Available` });
        }
      } catch (err) {
        console.log(err)
        if (err instanceof Error) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(500).json({ success: false, message: 'An Unexpected Error Occurred' });
        }
      }
    }
    async updateUser(req: Request, res: Response) {
      try {
          const { id } = req.params;
          let imageFile;
          if (req.file) {
            imageFile = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
          }
          const updatedUser = await userService.updateUser(Number(id), req.body, imageFile);
          
          res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
      } catch (err) {
          console.error('error',err);
          res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'An unexpected error occurred' });
      }
  }
  
}

export const userController = new UserController()



