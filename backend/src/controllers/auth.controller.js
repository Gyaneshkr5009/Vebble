import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js'; // Import the token generation function
import cloudinary from '../lib/cloudinary.js'; // Import cloudinary for image upload


//controller for signup
export const signup = async (req, res) => {
    // Extracting user details sent from the frontend (usually via a form)
    const {fullName , email , password} = req.body;
    try{
        //checking if all the fields are filled
        if(!fullName || !email || !password){
            return res.status(400).send({ message: "All fields are required" });
        }

        //checking if the password is too short
        if(password.length < 6){
            return res.status(400).send({ message :"Password must be at least 6 characters long"});
        }

        // Check if a user with the same email already exists in the database
        const user = await User.findOne({ email });

        // If user is found, it means the email is already registered
        if(user) return res.status(400).json({ message :"User already exists"});

        // Generate a unique salt (random string) to make the password hash stronger
        // Combine (hash) the plain password with the salt to make it secure
        // Cause two or more user can have same password but their hashed password will be different
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUser = new User({
            fullName: fullName,
            email : email,
            password: hashedPassword, // Store the hashed password
        });

        if(newUser){
            //generate a jwt token for the user
            generateToken(newUser._id, res); // mongodb store id as _id not id
            await newUser.save(); // Save the new user to the database
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
        else{
            return res.status(400).json({ message: "User creation failed"});
        }
    }catch(error){
        console.error("Error during signup constroller:", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
};

// controller for login
export const login = async (req, res) => {
    // Extracting user details sent from the frontend (usually via a form)
    const {email, password} = req.body;
    // Check if all fields are filled
    if(!email || !password){
        return res.status(400).send("Please fill all the fields");
    }

    try {
        const user = await User.findOne({ email });

        // If user is not found, return an error
        if(!user) return res.status(400).json({ message: "User not found" });

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // If the password is incorrect, return an error
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // If the user is found and the password is correct, generate a JWT token
        generateToken(user._id, res); // mongodb store id as _id not id

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.error("Error during login controller:", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
};

// controller for logout
export const logout = (req, res) => {
    //if the user is logged out, we will clear the cookie
    try {
        res.cookie("jwt", "", {maxAge: 0}); // Set the cookie to expire immediately
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout controller:", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
};

export const updateProfile = async (req, res) => {
    //now after the user is authenticated, we can update the profile pic
    //for able to do that we require cloudinary to upload the image
    try {
        const {profilePic} = req.body;
        const {newName} = req.body; // Assuming you want to update the user's name as well
        const userId = req.user._id; // Get the authenticated user's ID from the request object

        // Check if the profilePic is provided
        if(!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        if(!newName) {
            return res.status(400).json({ message: "New name is required" });
        }

        // Upload the profile picture to Cloudinary
        // Note: Ensure that the profilePic is a valid image URL or base64 string
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        //now we will get the response from cloudinary which contains the secure_url of the uploaded image to store it in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                profilePic: uploadResponse.secure_url,
                fullName: newName 
            },
            { new: true }
        ); // please hover over the new: true to understand what it does
                    

        res.status(200).json({updatedUser});
    } catch (error) {
        console.error("Error during updateProfile controller:", error.message);
        res.status(500).json({message : "Internal Server Error"});  
    }
};

//this controller is used to check if the user is authenticated or not used in cases like reloading the page or refreshing the page
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user); // If the user is authenticated, send the user data
    } catch (error) {
        console.error("Error during checkAuth controller:", error.message);
        res.status(500).json({message : "Internal Server Error"});  
    }
};