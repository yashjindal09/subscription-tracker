import mongoose from "mongoose";
import { NODE_ENV,MONGO_DB_URL } from "../config/env.js";

if(!MONGO_DB_URL){
  throw new Error('NO MONGO_DB_URL FOUND');
}

const connecttoDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log(`connected in ${NODE_ENV} mode`);
    
  } catch (error) {
    console.error('Could not connect to database:', error);

    process.exit(1);
    
  }
}

export default connecttoDatabase;