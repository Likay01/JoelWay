require('dotenv').config();
const {sign, verify} = require('jsonwebtoken');

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    });
}

function verifyAToken(req, res, next){
    try{
        const token = req.cookies["LegitUser"]!== null ? req.cookies["LegitUser"]: "Please register";
        if(token !== "Please Register") {
            isValid = verify(token, process.env.SECRET_KEY);
            if(isValid) {
                req.authenticated = true;
                next();
            }else{
                res.status(400).json({err:"Please reqister"})
            }
        }else{
            res.status(400).json({err:"Please reqister"})
        }
    }catch(e) {
        res.status(400).json({err: e.message});
     
    }
}
module.exports= {createToken, verifyAToken};