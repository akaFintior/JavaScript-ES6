const cart = require('./cart');
const fs = require('fs');
const moment = require('moment');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
                        if (err) {
                            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                        } else {
                            let newData = JSON.parse(data);
                            let stats = {
                                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                operation: action,
                                item: req.body.product_name || +req.params.id
                            };
                            newData.push(stats);
                            newData = JSON.stringify(newData, null, 3);
                            fs.writeFile('server/db/stats.json', newData, (err) => {
                                if (err) {
                                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                                } else {
                                    res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}))
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};

module.exports = handler;