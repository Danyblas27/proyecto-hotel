import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CodeStatus } from "../utils/index.js";

dotenv.config();


class AuthMiddleware {

    static verifyToken = async (req, res, next) => {

        const authHeader = req.headers['authorization'] || req.cookies.token;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            return res.status(CodeStatus.Unauthorized).json({ 
                status: CodeStatus.Unauthorized,
                code: "TOKEN_NOT_PROVIDED",
                message: "No token provided" 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(CodeStatus.Forbidden).json({ 
                status: CodeStatus.Forbidden,
                code: "INVALID_TOKEN",
                message: "Invalid or expired token" 
            });
        }
    }

    static requireRole = async (role) => {
        return (req, res, next) => {
            if (!req.user || req.user.role !== role) {
                return res.status(CodeStatus.Forbidden).json({ 
                    status: CodeStatus.Forbidden,
                    code: "UNAUTHORIZED_ACCESS",
                    message: "Acceso no autorizado: rol insuficiente" 
                });
            }
            next();
        };
    }

    static requireSelfOrAdmin = async (req, res, next) => {

        const userId = parseInt(req.user.id);
        const requestId = parseInt(req.params.id);    
        const isAdmin = req.user.role === 'Admin';

        if (userId !== requestId && !isAdmin) {
            return res.status(CodeStatus.Forbidden).json({ 
                status: CodeStatus.Forbidden,
                code: "UNAUTHORIZED_ACCESS",
                message: "Acceso no autorizado: solo el usuario o un administrador pueden acceder a este recurso" 
            });
        }
        next();
    }
}

export default AuthMiddleware;