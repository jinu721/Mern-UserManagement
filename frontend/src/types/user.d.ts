export interface UserIF {
    id:number;
    username:string;
    email:string;
    role:'admin' | 'user';
    avatar?:string;
    joinDate:Date;
};