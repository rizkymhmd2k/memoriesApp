import dotenv from "dotenv"
dotenv.config()
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import User from '../models/user.js';
import Usergoogle from '../models/userGoogle.js';




export const signinController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // gogole-auth
        const { googleAccessToken } = req.body;
        console.log('token', googleAccessToken);

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;
                console.log('response data bro', response.data);

                const existingUser = await Usergoogle.findOne({ email })
                console.log('existingUser', existingUser);
                if (!existingUser)
                    return res.status(404).json({ message: "User don't exist!" })
                //store the token to the front end    
                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, process.env.JWT_SECRET, { expiresIn: "1h" })

                res
                    .status(200)
                    .json({ result: existingUser, token })

            })
            .catch(err => {
                res
                    .status(400)
                    .json(err)
            })
    } else {
        // normal-auth
        const { email, password } = req.body;
        if (email === "" || password === "")
            return res.status(400).json({ message: "Invalid field!" });
        try {
            const existingUser = await User.findOne({ email })

            if (!existingUser)
                return res.status(404).json({ message: "User don't exist!" })

            const isPasswordOk = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordOk)
                return res.status(400).json({ message: "Invalid credintials!" })

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, process.env.JWT_SECRET, { expiresIn: "1h" })

            res
                .status(200)
                .json({ result: existingUser, token })
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" })
        }
    }

}

export const signupController = async (req, res) => {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        console.log(googleAccessToken);

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                // console.log('response xxxxxxx', response);

                const existingUser = await Usergoogle.findOne({ email })

                if (existingUser)
                    return res.status(400).json({ message: "User already exist!" })

                const result = await Usergoogle.create({ verified: "true", email, name: `${firstName} ${lastName}`, profilePicture: picture })

                // console.log('result xxxx', result);

                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, process.env.JWT_SECRET, { expiresIn: "1h" })

                res.status(200).json({ result, token })
            })
            .catch(err => {
                res.status(400).json({ message: "Invalid access token!" })
                console.log(err);
            })

    } else {
        // normal form signup
        const { email, password, confirmPassword, firstName, lastName } = req.body;
        console.log('req body', req.body);

        try {
            if (email === "" || password === "" || firstName === "" || lastName === "" && password === confirmPassword && password.length >= 4)
                return res.status(400).json({ message: "Invalid field!" })

            const existingUser = await User.findOne({ email })

            if (existingUser)
                return res.status(400).json({ message: "User already exist!" })
            if (password !== confirmPassword)
                return res.status(400).json({ message: "Passwords don't match" });

            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, process.env.JWT_SECRET, { expiresIn: "1h" })


            res
                .status(200)
                .json({ result, token })
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" })
                console.log(err);
        }

    }
}
