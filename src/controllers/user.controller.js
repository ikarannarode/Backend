import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    //get user input from fromntend
    // validation - not empty
    // check user already exists
    //check for images, checks for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    // remove password and refresh token from user object
    //check for user creation 
    // return response
    const { username, fullName, email, password } = req.body
    if ([username, fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are required")
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while user registeration")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )


})





export { registerUser }