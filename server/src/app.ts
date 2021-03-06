import express, { Application } from 'express';
import mongoose, { Connection } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// Routers
import sampleRouter from './routes/sample';

class App {
    private app: Application;
    private db: Connection;
    private databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@generator.ut7yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    constructor() {
        mongoose.connect(this.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        this.db = mongoose.connection;
        this.db.on('error', (error) => console.log(error));
        this.db.on('open', () => console.log('Successfully connected to Mongoose.'));

        this.app = express();

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(fileUpload());
        this.app.use(sampleRouter);

        this.app.listen(process.env.SERVER_PORT || 3000, () => {
            console.log('App initialised!');
        })
    }
}

export default App;