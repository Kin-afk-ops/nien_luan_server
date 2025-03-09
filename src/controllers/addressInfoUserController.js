const AddressInfoUser = require("../models/AddressInfoUser");
const Users = require("../models/Users");

exports.createAddressInfoUser = async (req, res) => {
  const checkInfoUser = await Users.findById(req.params.id);

  if (!checkInfoUser) {
    res.status(409).json({
      message: "Tài khoản không tồn lại",
    });
  } else {
    const newAddressInfoUser = new AddressInfoUser({
      userId: req.params.id,
      ...req.body,
    });
    try {
      const saveAddressInfoUser = await newAddressInfoUser.save();
      res.status(200).json(saveAddressInfoUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

exports.readAddressInfoUser = async (req, res) => {
  try {
    const addressInfoUser = await AddressInfoUser.find({
      userId: req.params.id,
    });
    res.status(200).json(addressInfoUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.UpdateAddressInfoUser = async (req, res) => {
  try {
    const updateAddress = await AddressInfoUser.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateAddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAddressInfoUser = async (req, res) => {
  try {
    await AddressInfoUser.findByIdAndDelete(req.params.id);
    res.status(200).json("Address Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteAllAddressInfoUser = async (req, res) => {
  try {
    await AddressInfoUser.deleteMany();
    res.status(200).json("All Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
