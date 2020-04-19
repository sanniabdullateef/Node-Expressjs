const express = require('express');
const bookServices = require('../services/goodreadService')

const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
// const sql = require('mssql');
// const debug = require('debug')('app:bookRoute')

function router(nav){
    const { getIndex, getById, middleware } = bookController(bookServices, nav);
    bookRouter.use(middleware);
    bookRouter.route('/')
    .get(getIndex);
        // (async function query(){
        // const request = new sql.Request();
        // const { recordset } = await request.query('select * from books');
            
        // }());

    
    bookRouter.route('/:id')
    .get(getById)
    return bookRouter
    // .all((req, res, next) => {
    //         (async function query(){
    //         const {id}=req.params;
    //         const request = new sql.Request();
    //         const {recordset} = 
    //         await request.input('id', sql.Int, id) 
    //         .query('select * from books where id = @id');
    //         [req.book] = recordset;
    //         next();
    //         }());
    // })
}

module.exports = router;