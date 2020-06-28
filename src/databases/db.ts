// import node modules
import mongoose from 'mongoose';

// database conn
export default async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/typescriptmongodb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('>>> Database is connected <<<')
    } catch {
        console.log('Error');
    }
}