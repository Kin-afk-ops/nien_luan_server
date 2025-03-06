const router = require("express").Router();

const Users = require("../models/Users");
// const Books = require("../models/Books");
// const Order = require("../models/Order");
// const Notification = require("../models/Notification");
// const {
//   verifyTokenAndAdminStaff,
//   verifyTokenBossAndStaff,
// } = require("../jwt/verifyTokenStaff");
// const {
//   verifyTokenAnhAuthorizationUser,
//   verifyTokenUser,
// } = require("../jwt/verifyTokenUser");

// //UPDATE
// router.put("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
//   const user = await Users.findById(req.params.id);
//   !user && res.status(401).json("Wrong credential");

//   const hashedPassword = CryptoJS.AES.decrypt(
//     user.password,
//     process.env.PASS_SEC
//   );
//   const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//   OriginPassword !== req.body.password &&
//     res.status(401).json("Wrong credential");

//   if (req.body.newUser.password) {
//     req.body.newUser.password = CryptoJS.AES.encrypt(
//       req.body.newUser.password,
//       process.env.PASS_SEC
//     ).toString();
//   }
//   try {
//     const updateUser = await Users.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body.newUser,
//       },
//       { new: true }
//     );
//     const { password, ...others } = updateUser._doc;
//     res.status(200).json(others);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //Update order
// router.put("/order/:id", verifyTokenUser, async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //Notification

// router.put("/notification/:id", verifyTokenUser, async (req, res) => {
//   try {
//     const updateNotification = await Notification.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updateNotification);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//DELETE

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

// //GET USERS STATS
// router.get("/stats", verifyTokenBossAndStaff, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await Users.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL BOOK USER
// router.get("/book", verifyTokenUser, async (req, res) => {
//   const qNew = req.query.qNew;
//   const qCategory = req.query.qCategory;
//   try {
//     let books;
//     if (qNew) {
//       books = await Books.find().sort({ createdAt: -1 }).limit(5);
//     } else if (qCategory) {
//       books = await Books.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       books = await Books.find().sort({ createdAt: -1 });
//     }

//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //GET CATEGORIES USER
// router.get("/categories", verifyTokenUser, async (req, res) => {
//   try {
//     const cats = await Categories.find().sort({ createdAt: -1 });
//     res.status(200).json(cats);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
