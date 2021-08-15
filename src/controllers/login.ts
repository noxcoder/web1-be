import { Request, Response } from 'express';
import { sanitize }  from 'sanitizer';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserModel } from 'src/database/user/user.model';

const secret: any = process.env.JWT_SECRET;

export const login = {
    loginUser: (req: Request, res: Response) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("All fields are required.");
        } else {
            UserModel.findOne({ email: sanitize(req.body.email) }, (err: Error, user: any) => {
                if (err) {
                    return res.status(500).send(err.message);
                } else if (!user) {
                    return res.status(401).send("Incorrect username or password.");
                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const email = sanitize(req.body.email);
                        const token = jwt.sign({
                            email
                        },
                        secret,
                        {
                            algorithm: "HS256",
                            expiresIn: 3600
                        }
                        );
                        const data = {
                            email: user.email,
                            username: user.username,
                            token: token
                        };
                        return res.status(200).json(data);
                    } else {
                        return res.status(401).send("Incorrect username or password.");
                    }
                }
            });
        }
    }
};