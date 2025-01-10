import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const data = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(data, decodedToken)
        if (!data) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = data
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token")
    }
})

export { verifyJWT }