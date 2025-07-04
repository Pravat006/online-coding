import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    throw new ApiError(401, "Unauthorized - Please login first");
}
export default isAuthenticated;