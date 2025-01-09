import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    //get user input from fromntend
    // validation - not empty
    // check user already exists
    //check for images, checks for avatar
    //upload them to cloudinary
    const { username, } = req.body

    res.status(200).json({
        message: "Ok",
        success: true,
    })
})





export { registerUser }