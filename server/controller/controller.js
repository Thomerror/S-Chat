import userDB from '../model/model.js';

//create and save new user
export const create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content motherfucker! do you have it?"});
        return;
    }

    //new user
    const user = new userDB({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });

    //save user into DB
    user
        .save(user)
        .then(data=>{
            //res.send(data);
            res.redirect("/");
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "some error occured while creating new user"
            });
        });
};

// retreive and return all users/single user
export const find = (req,res)=>{
    
    if(req.query.id){
        const id = req.query.id;
        userDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Not found user with id ${id}`});
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error with retreiving user"});
        })
    }
    else{
    userDB.find()
    .then(user => res.send(user))
    .catch(err => res.status(500).send({message:err.message || "Error occur while retreiving information"}));
    }
};

// update user
export const update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Empty data request"});
    }
    const id = req.params.id;
    userDB.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot update user with id ${id}. Perhaps user not found!`})
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Error while updating user information"});
    });
};

//delete user
export const Delete = (req,res)=>{
    const id = req.params.id;
    userDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete user with id ${id}. Perhaps id is wrong!`});
        }
        else{
            res.send({message:"User deleted succesfully!"});
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Cound not delete user with id: " + id});
    });
};

