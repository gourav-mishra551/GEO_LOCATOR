const store = require('../models/store');

exports.getStore = async (req, res , next)=> {
   try {
    const stores = await store.find();

    return res.status(200).json({
        sucess: true,
        count: stores.length,
        data: stores
    })
   } catch (error) {
    console.error(error);
    res.status(500).json( {error: "server error"})
   }
}

// @desc  Create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
    try {
      const store = await Store.create(req.body);
  
      return res.status(201).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'This store already exists' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };