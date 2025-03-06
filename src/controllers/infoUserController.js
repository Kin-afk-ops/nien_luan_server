const InfoUsers = require("../models/InfoUsers");

exports.createInfoUser = async (req, res) => {
  const checkInfoUser = await InfoUsers.findOne({
    userId: req.params.id,
  });

  if (checkInfoUser) {
    res.status(409).json({
      message: "Đã tạo thông tin",
    });
  } else {
    const newInfoUser = new InfoUsers({
      userId: req.params.id,
      ...req.body,
    });
    try {
      const saveInfoUser = await newInfoUser.save();
      res.status(200).json(saveInfoUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

exports.readInfoUser = async (req, res) => {
  try {
    const infoUser = await InfoUsers.findOne({ userId: req.params.id });
    res.status(200).json(infoUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateInfoUser = async (req, res) => {
  try {
    const updateInfoUser = await InfoUsers.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteInfoUser = async (req, res) => {
  try {
    await InfoUsers.findOneAndDelete({ userId: req.params.id });
    res.status(200).json("Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllInfoUser = async (req, res) => {
  try {
    await InfoUsers.deleteMany();
    res.status(200).json("All Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
