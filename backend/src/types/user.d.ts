export interface UserIF {
    id:number;
    username:string;
    email:string;
    avatar?:string;
    password:string;
    role:string;
    createdAt?:Date;
    updatedAt?:Date;
}
