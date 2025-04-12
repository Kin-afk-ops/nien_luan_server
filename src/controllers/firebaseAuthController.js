const admin = require("../../utils/firebaseAdmin");

exports.findFirebaseUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email không được để trống" });
  }

  try {
    // Tìm người dùng theo email trong Firebase
    const userRecord = await admin.auth().getUserByEmail(email);

    if (userRecord) {
      return res
        .status(200)
        .json({ check: true, message: "Email đã tồn tại trong ." });
    }
  } catch (error) {
    // Firebase sẽ ném lỗi nếu email không tồn tại
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({
        exists: false,
        message: "Email không tồn tại trong Firebase.",
      });
    }

    console.error("Error checking email:", error);
    return res.status(500).json({ error: "Đã xảy ra lỗi khi kiểm tra email." });
  }
};
