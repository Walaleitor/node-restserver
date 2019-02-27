const jwt = require('jsonwebtoken');

// ===============
// Verifica  token
// ===============
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();

    })


};

// ===============
// Verifica  AdminRole
// ===============

let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.status(404).json({
            ok: false,
            err: {
                message: 'Usuario no es ADMIN'
            }
        })
    }


};


module.exports = {
    verificaToken,
    verificaAdminRole
}