const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');



// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    message: req.body.message
  });

  newItem.save(function(err, item) {
    if(err) return res.status(500)
    res.status(200).json(item)
  })
});


// @route GET api/items
// @desc Read All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
  .sort({date: -1})
  .then(items => res.status(200).json(items))
  .catch(err => res.status(500))
});



// @route PUT api/items/:id
// @desc Update An Item
// @access Public
router.put('/:id', (req, res) => {
  let _id = req.body._id
  let message = req.body.message

  Item.findByIdAndUpdate(_id, { $set: { message: message }}, { new: true }, function (err, item) {
  if (err) return console.log(err.message);
  res.send(item.message);
  });
});



// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});



module.exports = router;
