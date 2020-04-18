const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const CookieParser = require('cookie-parser');
const session = require('express-session')
// const sql = require ('mssql');

const app = express();
const port = process.env.PORT || 3000;

// const config = {
//     user: 'library',
//     password: 'Sanni4luv',
//     server: 'pslibrary-1.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
//     database: 'PSLibrary',

//     options: {
//         encrypt: true  // Use this if you're on windows Azure 
//     }
// };

// sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(session({ secret: 'library' }))

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views',"./src/views");
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')

const nav = [
    {link:'/books',title:'Book'},
    {link:'/authors', title: 'Author'}
] ;

const bookRouter = require('./src/routes/bookRoute')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav)


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get ('/', (req, res) => {
    res.render(
        'index', 
    {
         nav: [{link:'/books',title:'Books'},
         {link:'/authors', title: 'Authors'}] ,
         title: 'Library'
        }
         );
    // res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.listen(port, () => {
    debug(`listening @ port ${chalk.red(port)}`) 
});