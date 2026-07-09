const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


// =====================
// REGISTER USER
// =====================
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({

                message: "Email already exists"

            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Save user to MongoDB
        const newUser = await User.create({

            name: name,
            email: email,
            password: hashedPassword

        });


        res.status(201).json({

            message: "User Registered Successfully",

            user: {

                id: newUser._id,
                name: newUser.name,
                email: newUser.email

            }

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// =====================
// LOGIN USER
// =====================
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find user from MongoDB
        const user = await User.findOne({ email });


        if (!user) {

            return res.status(401).json({

                message: "Invalid Credentials"

            });

        }


        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({

                message: "Invalid Credentials"

            });

        }


        // Generate JWT token
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );


        res.json({

            message: "Login Successful",

            token: token

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};