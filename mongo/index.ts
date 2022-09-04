import mongoose from "mongoose";

const connect = () => mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB
});

export default connect;