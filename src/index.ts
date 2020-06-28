// import classes 
import App from './classes/app';

// import db
import db from './databases/db';

// initializations
db();
const app = new App();

// start server
app.start();