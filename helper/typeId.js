exports.isMongoId = (id) => {
  // Kiểm tra định dạng của MongoDB ObjectId (24 ký tự hex)
  return /^[0-9a-fA-F]{24}$/.test(id);
};

exports.isFirebaseId = (id) => {
  // Kiểm tra định dạng Firebase UID (thường dài hơn và có ký tự đặc biệt)
  return /^[a-zA-Z0-9_-]{28,36}$/.test(id);
};
