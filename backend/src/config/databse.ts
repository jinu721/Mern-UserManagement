import { Sequelize } from "sequelize";


class Database {
    private static instance:Sequelize;

    private constructor(){}

    public static getInstance():Sequelize{
        if(!Database.instance){
            Database.instance = new Sequelize(
                process.env.DB_NAME as string || 'postgres',
                process.env.DB_USER as string || 'postgres',
                process.env.DB_PASS as string || 'postgres',
                {
                    host:process.env.DB_HOST || 'localhost',
                    dialect:'postgres',
                    logging:false
                }
            )
        }
        return Database.instance;
    }
}

export default Database.getInstance();