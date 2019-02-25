/// ====================
/// Puerto
/// ====================
process.env.PORT = process.env.PORT || 3000;

/// ====================
/// ENVIROMENT
/// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/// ====================
/// DATABASE
/// ====================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = 'mongodb+srv://seba:1q2w3e@cafe-qvfbm.mongodb.net/test?retryWrites=true';
}

//urlDB = 'mongodb+srv://seba:1q2w3e@cafe-qvfbm.mongodb.net/test?retryWrites=true';


process.env.URLDB = urlDB;