const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { v4: uuid } = require("uuid");

const { getUsers, saveUsers } = require("../models/userModel");

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const users = getUsers();

    const existing = users.find(user => user.email === email);

    if (existing) {

        return res.status(400).json({

            message: "Email already exists"

        });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {

        id: uuid(),

        name,

        email,

        password: hashedPassword

    };

    users.push(newUser);

    saveUsers(users);

    res.status(201).json({

        message: "User Registered Successfully"

    });

};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const users = getUsers();

    const user = users.find(u => u.email === email);

    if (!user) {

        return res.status(401).json({

            message: "Invalid Credentials"

        });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

        return res.status(401).json({

            message: "Invalid Credentials"

        });

    }

    const token = jwt.sign(

        {

            id: user.id,

            email: user.email

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "1h"

        }

    );

    res.json({

        message: "Login Successful",

        token

    });

};
