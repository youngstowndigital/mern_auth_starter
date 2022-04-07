import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDb = async () => {
    let uri;
    const mongod = await MongoMemoryServer.create();
    uri = await mongod.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    });
}

export default connectDb;
