const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ file: req.file });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.removeImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.id);

    if (result.result === "not found") {
      throw new Error("delete images failed");
    }
    return res.status(200).json({ message: "Delete image successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
