import { Request, Response } from "express";
import { sanitize }  from 'sanitizer';
import * as bcrypt from "bcryptjs";

import { UserModel } from "../database/user/user.model";

export const register = {
    registerUser: (req: Request, res: Response) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("All fields are required.");
        } else {
            const password = bcrypt.hashSync(req.body.password, 10);

            const user = new UserModel({
                username: sanitize(req.body.username),
                email: sanitize(req.body.email),
                password: password
            });

            user.save((err: any) => {
                if (err) {
                    return res.status(500).send(err.message);
                } else {
                    return res.status(201).json({msg: "User created successfully"});
                }
            });
        }
    }
};