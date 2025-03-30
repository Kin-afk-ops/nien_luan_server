const AddressInfoUser = require("../models/AddressInfoUser");
const Users = require("../models/Users");
const admin = require("../../utils/firebaseAdmin");
const typeId = require("../../helper/typeId");

exports.createAddressInfoUser = async (req, res) => {
  let checkInfoUser;
  if (typeId.isMongoId(req.params.id)) {
    checkInfoUser = await Users.findById(req.params.id);
  } else {
    checkInfoUser = await admin.auth().getUser(req.params.id);
  }

  try {
    if (!checkInfoUser) {
      res.status(409).json({
        message: "Tài khoản không tồn lại",
      });
    } else {
      if (req.body.default) {
        await AddressInfoUser.updateMany(
          { userId: req.params.id, default: true },
          { $set: { default: false } }
        );
      }

      const newAddressInfoUser = new AddressInfoUser({
        userId: req.params.id,
        ...req.body,
      });

      const saveAddressInfoUser = await newAddressInfoUser.save();
      res.status(200).json(saveAddressInfoUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readAddressInfoUser = async (req, res) => {
  try {
    const addressInfoUser = await AddressInfoUser.find({
      userId: req.params.id,
    }).sort({ createdAt: -1 });
    res.status(200).json(addressInfoUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.UpdateAddressInfoUser = async (req, res) => {
  try {
    if (req.body.default) {
      await AddressInfoUser.updateMany(
        { userId: req.query.userId, default: true },
        { $set: { default: false } }
      );
    }

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
