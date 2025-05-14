import { User } from "../models/index.js";
import { CodeStatus, HashBcrypt } from "../utils/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserController from "./UserController.js";

dotenv.config();


const AuthController = {

    register: async (req, res, next) => {

        try {

            UserController.create(req, res, next);

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {

            const { email, password } = req.body;
            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(CodeStatus.Unauthorized).json({ message: "Invalid email or password" });
            }

            const isMatch = await HashBcrypt.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(CodeStatus.Unauthorized).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 2, // 2 horas
            });

            const userData = User.toJSONSafe(user);
            res.status(CodeStatus.OK).json({
                message: "Login successful",
                token,
                data: userData
            });

        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },


    logout: async (req, res, next) => {
        try {
            res.clearCookie("token", { httpOnly: true, secure: true });
            res.status(CodeStatus.OK).json({ message: "Logout successful" });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    },

    profile: async (req, res, next) => {
        try {
            const user = req.user;
            res.status(CodeStatus.OK).json({ message: "User profile", user });
        } catch (error) {
            error.code = error.code || CodeStatus.ServerError;
            next(error);
        }
    }

}

export default AuthController;