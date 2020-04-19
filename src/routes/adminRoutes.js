const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books= [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        bookId: 745,
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        bookId: 7455,
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H.G Wells',
        bookId: 870,
        read: false
    },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        bookId: 985,
        read: false
    },
    {
        title: 'The Dark Mode',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        bookId: 854,
        read: false
    },
    {
        title: 'Dark Knight',
        genre: 'Fantasy',
        author: 'Batman',
        bookId: 1054,
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahme',
        bookId: 9541,
        read: false
    },
    {
        title: 'Life of Missippi',
        genre: 'History',
        author: 'Mark Twain',
        bookId: 2054,
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        bookId: 5478,
        read: false
    },
    {
        title: 'If I had Know',
        genre: 'Biography',
        author: 'Oniodunayo',
        bookId: 6578,
        read: false
    },
    {
        title: 'The Saint',
        genre: 'Novel',
        author: 'Tade Adegbindin',
        bookId: 1054,
        read: false
    },
    {
        title: 'Romance with Death',
        genre: 'Fantasy',
        author: 'J.A Ajayi',
        bookId: 3654,
        read: false
    },
];
// eslint-disable-next-line no-unused-vars
function router(nav){
    adminRouter.route('/')
    .get((req, res) => {
    const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo (){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const response = await db.collection ('books').insertMany(books);
                res.json(response)
            // eslint-disable-next-line no-empty
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());

    });
    return adminRouter;
}

module.exports = router;