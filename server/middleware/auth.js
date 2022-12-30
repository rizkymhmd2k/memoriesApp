import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//next means do something and move to the next thing.. which is controllers in this case
const auth = async (req, res, next) => {
    //when the user signin or signup, we sign a token in controller
    try {
        console.log('AUTH', req.headers.authorization); //from API
        // Check if the user is who they claim to be using JWT
        const token = req.headers.authorization.split(" ")[1];
        // Check if the token is from Google sign-in or our own - less than 500 is our own
        const isCustomAuth = token.length < 500;

        let decodedData;
        // If we're working with our own token
        if (token && isCustomAuth) {
            //now we get the data of email, name and id from token
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            //store the id
            req.userId = decodedData?.id
            console.log('requserfrommiddleware', req.userId);
            //   Else we're working with google OAuth token
        } else {
            decodedData = jwt.decode(token)
            // Set userId to Google unique user identification, differentiating google users
            req.userId = decodedData.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};
export default auth;

