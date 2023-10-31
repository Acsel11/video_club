const express = require('express');
const Member = require('../models/member')


function create(req,res,next){
    res.send('members create');
    let name = req.body.name;
    let lastName = req.bode.lastName;
    let phone = req.bode.phone;

    let address = new Object();
    address.street = red.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    });
    member.save().then(obj => res.status(200).json({
        msg: "socio creado bien",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"no furula",
        obj: ex
    }));
}

function list(req,res,next){
    res.send('members list');
}

function index(req,res,next){
    res.send('members index');
}

function replace(req,res,next){
    res.send('members replace');
}
function update(req,res,next){
    res.send('members update');
}

function destroy(req,res,next){
    res.send('members destroy');
}


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};