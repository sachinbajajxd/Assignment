const mongoose = require('mongoose');
const UserDetails = require('../models/UserDetails');
const nodemailer=require('nodemailer');

module.exports.Home = (req, res) => {
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

        const { name, email, phone, hobbies } = req.body;


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


module.exports.sendMails = async (req, res) => {
    const { selectedRows } = req.body;


    console.log(selectedRows);

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cierra79@ethereal.email',
            pass: '9eC475HuywDDnmY3xq'
        }
    });

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" sachinbajajsmtp@gmail.com', // sender address
          to: "info@redpositive.in", // list of receivers
          subject: "Selected User data", // Subject line
          text: "Hello world", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
      }
      
      main().catch(console.error);
      

      
   res.json({ message: 'Emails sent successfully' });
}
