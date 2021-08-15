import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

const secret: any = process.env.JWT_SECRET;

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

import { register } from "../controllers/register";
import { login } from "../controllers/login";
import { flag2Controller } from "../controllers/flag2";
import { flag3Controller } from "../controllers/flag3";

const router = Router();

router.post("/register", multipartMiddleware, register.registerUser);

router.post("/login", multipartMiddleware, login.loginUser);

router.get("/flag2", authenticateToken, flag2Controller.getFlag2);

router.get("/flag3", authenticateToken, flag3Controller.getFlag3);

router.all("**", (req: Request, res: Response) => {
    return res.status(200).send("Page not found.");
});

// Export the base-router
export default router;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if(!token || token == null) {
        return res.status(401).send("Unauthorized. Kindly login to proceed.");
    } else {
        jwt.verify(token, secret, (err: any, user: any) => {
            if (err) {
                return res.status(403).send(err.message);
            } else {
                req.user = user;
                next();
            }
        });
    }
}
