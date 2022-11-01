
import bizContactsModel from '../../models/bizcontacts.js'

export function GetList(req, res, next){
    bizContactsModel.find((err, bizContactsCollection) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            movies: bizContactsCollection, 
            user: req.user
        });
    });
}

export function Get(req, res, next){
    let id = req.params.id;

    bizContactsModel.findById(id, (err, movie) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        return res.json({
            success: true, 
            msg: 'Success',
            movie, 
            user: req.user
        })
    })
}

export function Add(req, res, next){
    let newBizContact = new bizContactsModel({
        ...req.body
    });

    bizContactsModel.create(newBizContact, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        // movie added successfully
        res.json({
            success: true, 
            msg: 'Success',
            movie: newBizContact
        })
    })
}

export function Edit(req, res, next){
    let id = req.params.id;

    let updatedBizContact = new bizContactsModel({
        "_id": id, 
        ...req.body
    });

    bizContactsModel.updateOne({_id: id}, updatedBizContact, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Success',
            movie: updatedBizContact
        })
    })

   
}

export function Delete(req, res, next){
    let id = req.params.id;

    bizContactsModel.remove({_id: id}, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({
            success: true,
            msg: 'Deleted Succesfully'
        })
    })
}