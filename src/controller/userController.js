const userData = require('../models/UserDataTest');

const getAllUsers = (req, res) => {
    res.json(userData);
};

exports.getSellerById = (req, res) => {
    const { id } = req.params;
    const sellerId = parseInt(id);
    const seller = userData.find(u => u.id === sellerId);
    if (!seller) return res.status(404).json({ message: "Người dùng không tồn tại" });
    res.json(seller);
};


exports.createUser = (req, res) => {
    const newUser = req.body;
    userData.push(newUser);
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const userIndex = userData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        userData[userIndex] = { ...userData[userIndex], ...req.body };
        res.json(userData[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    const userIndex = userData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
};
