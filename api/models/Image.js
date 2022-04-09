const mongoose = require('mongoose');
const path = require("path");
const Schema = mongoose.Schema;

const imageExtensions = ['.jpg', '.jpeg', '.png', '.jfif', '.pjpeg' , '.pjp', '.gif', '.avif'];

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const ext = path.extname(value);
        return imageExtensions.includes(ext);
      },
      message: 'Image file format is incorrect!',
    }
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;