const express = require("express");

const router = express.Router();

const UserDetail = require("../models/userDetail.model");
const City = require("../models/city.model");

router.get("/", async (req, res) => {
  try {
    const user = await UserDetail.find()
      .populate({ path: "city", select: "name" })
      .exec()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error(error);
      });

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, city } = req.body;

    // Find the corresponding city by name
    let cityData = await City.findOne({ name: city });

    if (!cityData) {
      //   return res.status(400).json({ message: 'City not found' });
      cityData = await City.create({ name: city });
    }

    // Create a new user detail object with the city reference
    const userDetail = new UserDetail({ name, email, city: city._id });

    // Save the user detail to the database
    await userDetail.save();

    res
      .status(201)
      .json({ message: "User detail created successfully", userDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
