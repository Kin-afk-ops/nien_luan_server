const router = require("express").Router();
const Users = require("../models/Users");

router.delete("/:id", async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Users.deleteMany();
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Users.find().sort({ createdAt: -1 }).limit(5)
      : await Users.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Không thể thêm người dùng", error });
  }
});

module.exports = router;
