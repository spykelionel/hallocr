const Hostel = require('../models/Hostel')

module.exports = {
   create: async (req, res, next) =>{
    Hostel?.exists({hostelNumber:req.body.hostelNumber}).then(async(result)=>{
        if(!result){
            try {
                const hostel = new Hostel({...req.body})
                await hostel.save().then(result=>res.status(201).send(result))
                .catch(err=>res.status(409).send(err))
            } catch (error) {
                console.log(error)
            }
        } else {
            res.status(409).json({
                message: "Resource Exist"
            })
        }
        
    }).catch(err=>console.error(err))
    },

    getAll: async function(req, res, next) {
        await Hostel.find({}).lean().then(result=>res.status(200).send(result))
            .catch(err=>res.status(503).send(err))
            
    },

    getOne: async(req,res) =>{
        await Hostel.findOne({_id:req.params.id})
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    }

}
