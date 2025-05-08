import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CodeStatus } from "../utils/index.js";
dotenv.config();

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'] || req.cookies.token;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
