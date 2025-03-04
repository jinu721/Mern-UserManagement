import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './config/databse';
import userRoutes from './routes/UserRoutes';
import adminRoutes from './routes/AdminRoutes';

const app:Application = express();

(async ()=>{
    try{
        await db.sync();
        console.log('DB Successfully Connected');
    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error('An Unexpected Error Occured');
        }
    }
})();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.use('/users', userRoutes);
app.use('/admin', adminRoutes);




export default app;