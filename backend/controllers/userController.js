const mongoose = require('mongoose');
const UserDetails = require('../models/UserDetails');

module.exports.Home = (req, res) => {
    console.log("Checking");
    res.status(200).send('Home');
};

module.exports.getUsers = async (req, res) => {
    try {
      const users = await UserDetails.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports.submitForm = async (req, res) => {

    try{

        // console.log(req.body);

        const { name, email, phone, hobbies } = req.body;

        // console.log(hobbies);

        const details = new UserDetails({
        name,
        email,
        phone,
        hobbies,
        });

        console.log(details);

        const info = await details.save();

        res.status(202).json({
        message: 'sent to db successfully',
        success: true,
        info,
        }); 

    }catch(error){
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
    
}

module.exports.updateUser = async (req, res) => {

    const { id } = req.params;
    const { name, phone, email, hobbies } = req.body;
  
    // if (mongoose.Types.ObjectId.isValid(id)==false)
    //   return res.status(404).send("No user with this id");

    try{

        const updatedUser = { name, phone, email, hobbies, _id: id };
        await UserDetails.findByIdAndUpdate(id, updatedUser, {
        new: true,
        });
    
        res.status(200).json(updatedUser);

    }catch(error){
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const deletedItem = await UserDetails.findByIdAndDelete({_id: id});
        console.log(deletedItem);
    
        res.status(200).json({message: "Item deleted successfully"});
    
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}

// module.exports = pageNotFound;