const jwt = require('jsonwebtoken');

const generateToken = (payload, optionsToken) => {
    return jwt.sign(payload, 'shhh', optionsToken);
};

const verifyToken = (req, res, next) => {
    const [, token] = req.get('authorization') ? req.get('authorization').split(' ') : [];

    if (!token) {
        return res.status(401).json({
            code: 110,
            message: "Token no encontrado"
        });
    }

    jwt.verify(token, 'shhh', (err, decoded) => {
        if (err) {
            res.status(401).json({
                code: 110,
                message: "Token inválido"
            });
        } else {
            const { userId } = decoded;
            req.userId = userId;
            next();
        }
    });
};

const loginController = (req, res, next) => {
    const { user } = req.body;
    const token = generateToken(user, {});
    res.status(201).json({
        code: 0,
        message: { token, user }
    })
};

module.exports = { generateToken, verifyToken, loginController };
