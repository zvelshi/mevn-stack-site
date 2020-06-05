const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Cars
router.get('/', async (req, res) => {
    const cars = await loadCarsCollection();
    res.send(await cars.find({}).toArray());
  });

//By Id
router.get('/:id', async (req, res) => {
  const cars = await loadCarsCollection();
  res.send(await cars.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray());
});

// Add Car
router.post('/', async (req, res) => {
    const cars = await loadCarsCollection();
    await cars.insertOne({
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      bodytype: req.body.bodytype,
      mileage: req.body.mileage,
      mileageunit: req.body.mileageunit,
      drivetrain: req.body.drivetrain,
      transmission: req.body.transmission,
      price: req.body.price,
      engineinfo: req.body.engineinfo,
      colour: req.body.colour,
      description: req.body.description,
      createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Car
router.delete('/:id', async (req, res) => {
  const cars = await loadCarsCollection();
  await cars.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadCarsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://admin:admin@mevn-isp-9fagh.mongodb.net/test?retryWrites=true&w=majority' ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('mevn-isp').collection('cars');
}

module.exports = router;