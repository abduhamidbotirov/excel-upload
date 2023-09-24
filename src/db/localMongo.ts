import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/test4').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});