const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books= [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H.G Wells',
        read: false
    },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark Mode',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'Dark Knight',
        genre: 'Fantasy',
        author: 'Batman',
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahme',
        read: false
    },
    {
        title: 'Life of Missippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'If I had Know',
        genre: 'Biography',
        author: 'Oniodunayo',
        read: false
    },
    {
        title: 'The Saint',
        genre: 'Novel',
        author: 'Tade Adegbindin',
        read: false
    },
    {
        title: 'Romance with Death',
        genre: 'Fantasy',
        author: 'J.A Ajayi',
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