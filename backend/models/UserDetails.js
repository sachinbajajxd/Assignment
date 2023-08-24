const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      phone: {
        type: String,
        unique: true,
        required: true,
      },
      hobbies: {
        type: String,
        required: true,
      }
});

const Form = mongoose.models.forms || mongoose.model('forms', formSchema);

module.exports = Form;