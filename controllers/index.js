const express = require('express');
const jwt = require('jsonwebtoken');
const User = express.Router();
const controller = require('../controllers/index');



function create(req,res,next){
    res.send('Users create');
}

function list(req,res,next){
    res.send('Users list');
}

function index(req,res,next){
    res.send('Users index');
}

function replace(req,res,next){
    res.send('Users replace');
}
function update(req,res,next){
    res.send('Users update');
}

function destroy(req,res,next){
    res.send('Users destroy');
}

function login(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = '8b5ebce86dd0f21f849c7d010b56e8ce';
    User.findOne({"_email":email}).then(user => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash) =>{
                if(err){
                    //regresa el error 403
                    res.status(403).json({
                        msg : "usuario y contraseña incorrecto",
                        obj : err

                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        msg: 'Login ok',
                        obj: jwt.sign({data:user.data, exp: Math.floor(Date.now()/1000)+60}, JwtKey)
                    });
                }else{
                    res.status(403).json({
                    msg : "usuario y contraseña incorrecto",
                    obj : null

                    });
                }
            });
                    //regresa el error 403
        }else{
            res.status(403).json({
                msg : "usuario y contraseña incorrecto",
                obj : null

            });
        }
    }).catch(ex => res.status(403).json({
        msg : "usuario y/o contraseña incorrecto",
        obj : ex

    }));
}


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};