'use strict';


exports.getIndex = (req, res) => {
    res.status(200).sendFile('../public/index.html');
};

