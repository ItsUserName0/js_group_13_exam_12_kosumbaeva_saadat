const fs = require("fs").promises;
const express = require('express');
const roles = require("../middleware/roles");
const auth = require('../middleware/auth');
const {images} = require('../multer');
const Image = require('../models/Image');
const mongoose = require("mongoose");

const router = express.Router();

router.get('/', roles, async (req, res, next) => {
  try {
    let images;

    if (req.query.user) {
      images = await Image.find({user: req.query.user}, null, {sort: {'_id': -1}}).populate('user', '_id displayName');
    } else {
      images = await Image.find().sort({_id: -1}).populate('user', '_id displayName');
    }

    return res.send(images);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, images.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.file) {
      return res.status(422).send({error: 'Title and image are required!'});
    }

    const imageData = {
      user: req.user._id,
      title: req.body.title,
      image: req.file.filename,
    };

    const image = new Image(imageData);
    await image.save();

    return res.send(image);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      return res.status(422).send(e);
    }
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const image = await Image.findOne({_id: req.params.id});

    if (req.user._id.toString() !== image.user.toString()) {
      return res.status(403).send({error: 'Unauthorized'});
    }

    await Image.deleteOne({_id: req.params.id});
    return res.send({message: `Deleted successful with id=${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;