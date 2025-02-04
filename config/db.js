import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const dbURI = 'mongodb+srv://user2000:test1234@cluster22.bvyhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster22';
        
        mongoose.set('debug', true);  // Enable mongoose debugging

        await mongoose.connect(dbURI, {
           
        });

        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
