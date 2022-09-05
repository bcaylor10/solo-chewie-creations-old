import mongoose from "mongoose";

// @ts-ignore
const connect = () => mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB
});

export default connect;