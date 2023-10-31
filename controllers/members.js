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

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Member.paginate({}, options)
          .then(objects => res.status(200).json({
            message: "Members list",
            obj: objects
          })).catch(ex => res.status(500).json({
            message: "Members list could not be showed",
            obj: ex
          }));
}

function index(req, res, next) {
    const id = req.params.id;

    Member.findOne({ "_id" : id })
          .then(object => res.status(200).json({
            message: `Information of the Member with id ${id}`,
            obj: object
          })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Member with id ${id}`,
            obj: ex
          }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const phone = req.body.phone ? req.body.phone : "";
    const address = req.body.address ? req.body.address : "";

    let member = new Object({
        _name: name,
        _lastName: lastName,
        _phone: phone,
        _address: address
    });

    Member.findOneAndUpdate({ "_id" : id }, member, { new : true })
          .then(object => res.status(200).json({
            message: "Member replaced correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not replace Member correctly",
            obj: ex
          }));
}

function update(req, res, next) {
    const id = req.params.id

    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const address = req.body.address;

    let member = new Object();

    if (name) member._name = name;
    if (lastName) member._lastName = lastName;
    if (phone) member._phone = phone;
    if (address) member.address = address;

    Member.findOneAndUpdate({ "_id" : id }, member)
          .then(object => res.status(200).json({
            message: "Member updated correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not update Member correctly",
            obj: ex
          }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Member.findOneAndRemove({ "_id" : id })
          .then(object => res.status(200).json({
            message: "Member deleted correctly",
            obj: object
          })).catch(ex => res.status(500).json({
            message: "Could not delete Member correctly",
            obj: ex
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