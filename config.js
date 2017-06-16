
exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
     'mongodb://admin:admin@ds127982.mlab.com:27982/final-capstone-yoda-quotes' :
     'mongodb://admin:admin@ds127982.mlab.com:27982/final-capstone-yoda-quotes');
exports.PORT = process.env.PORT || 3004;

