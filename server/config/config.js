/// ====================
/// Puerto
/// ====================
process.env.PORT = process.env.PORT || 3000;

/// ====================
/// ENVIROMENT
/// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/// ====================
/// Vencimiento Token
/// ====================
// 60 segundos * 60 minutos * 24 horas * 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/// ====================
/// AUTH SEED
/// ====================

process.env.SEED = process.env.SEED || 'este-es-el-secret-dev'

/// ====================
/// DATABASE
/// ====================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


/// ====================
/// GOOGLE CLIENT ID
/// ====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '410936902703-d7kic7r3nm3n78crumsoosgl7s8goptv.apps.googleusercontent.com';