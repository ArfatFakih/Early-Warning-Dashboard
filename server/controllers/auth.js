const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json({message: "All fields are required"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json("Signup successful");
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; 
            return res.status(400).json({
              success: false,
              message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            });
        }
    }
}

module.exports = {
    signUp
}