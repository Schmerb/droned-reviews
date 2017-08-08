'use strict';

const router     = require('express').Router(),
      fs         = require('fs'),
      mongoose = require('mongoose');

let Grid = require('gridfs-stream');
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;


conn.once('open', () => {
    gfs = Grid(conn.db);

    // GET '/file'
    router.get('/', (req, res) => {
        res.send('Hello Mike!');
    });

    // GET '/file/img/:imgname'
    router.get('/img/:imgname', (req, res) => {
        gfs.files.find({
            filename: req.params.imgname
        }).toArray((err, files) => {

            if (files.length === 0) {
                return res.status(400).send({
                    message: 'File not found'
                });
            }
            console.log('FILES:', files);
            let data = [];
            let readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', (chunk) => {
                data.push(chunk);
            });

            readstream.on('end', () => {
                data = Buffer.concat(data);
                console.log('filename:', req.params.imgname);
                let img = 'data:image;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', (err) => {
                console.log('An error occurred!', err);
                throw err;
            });
        });
    });

    // POST '/img'
    router.post('/img', (req, res) => {
        let part = req.files.file;
        let writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });

        writeStream.write(part.data);

        writeStream.end();
    });

});

module.exports = router;