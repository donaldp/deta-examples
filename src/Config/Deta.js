require('./Bootstrap');

const { Deta } = require('deta');

const deta = Deta(process.env.DETA_KEY);

module.exports.Deta = deta;
