// import node modules
import express from 'express';
import morgan from 'morgan';
import hbs from 'express-handlebars';
import path from 'path';

// import routers
import IndexRouter from '../routers/index.router';
import TasksRouter from '../routers/tasks.router';

// app class
class Application {

    app: express.Application

    constructor() {
        // initializations
        this.app = express();
        // uses configs
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.resolve(__dirname, '../views'));
        this.app.engine('hbs', hbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', 'hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        this.app.use(IndexRouter);
        this.app.use('/tasks', TasksRouter);

        // statics files
        this.app.use(express.static(path.resolve(__dirname, '../public')))
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`>>> Server on port ${this.app.get('port')} <<<`);
        })
    }
}

export default Application;
