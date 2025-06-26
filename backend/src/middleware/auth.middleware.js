import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        //first we need to check if the request has a valid JWT token or not
        const token = req.cookies.jwt;

        //if we dont get a token in the request, we will return an error
        if(!token){
            return res.status(401).json({ message: "Unauthorized-No Token Provided" });
        }

        //before we do anything else ,we need to grab the token for that we gonna use cookie parser middleware
        //we need to decode the token to get the userId
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        //if the token is valid, we will get the userId from the decoded token
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized-Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        //if the user is not found, we will return an error
        if(!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        //if the user is found, we will attach the user to the request object
        req.user = user;
        
        //now we know that the user is authenticated, we can call the next middleware;
        next();

        //about next() function:next() is a built-in function provided by Express.js (not from any third-party package) that is used in middleware to pass control to the next middleware function or route handler in the stack.
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};