const express = require('express');
const Director = require('../models/director')


function create(req,res,next){
    const name = req.body.name;
    const lastName = req.body.name;

    const director = new Director({
        name:name,
        lastName: lastName
    });

    director.save().then(obj => res.status(200).json({
        message: "director creado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "no se pudo almacenar al director",
        obj: ex
    }));

}



function list(req,res,next){
    Director.find().then(objs => res.status(200).json({
        msg: "lista de directores",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "no se pudo almacenar la direccion",
        obj: ex
    }));

}

function index(req,res,next){
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Director con el id ${id}`,
        obj: obj

    })).catch(ex => res.status(500).json({
        msg: "no se pudo consultar el director",
        obj: ex

    }));

}

function replace(req,res,next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.name ? req.body.lastName: "";

    let director = new Object({
        _name : name,
        _lastName : lastName

    });

    Director.findOneAndUpdate({"_id": id}, director, {new: true})
        .then(obj => res.status(200).json({
            msg: "director remplazado bien",
            obj: obj

        })).catch(ex => res.status(500).json({
            msg: "no se pudo remplazar el director",
            obj: ex
    
        }));

}
function update(req,res,next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let direccion = new Object();

    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    Director.findOneAndUpdate({"id":id}, director)
            .then(obj => res.status(200).json({
                msg: "director actualizado bien",
                obj: obj
    
            })).catch(ex => res.status(500).json({
                msg: "no se pudo actualizado el director",
                obj: ex
            }));
}

function destroy(req,res,next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg: "director eliminado con exito",
        obj: obj

    })).catch(ex => res.status(500).json({
        msg: "no se pudo eliminar el director",
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