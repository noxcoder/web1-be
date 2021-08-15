import { Request, Response } from "express";

const flag3: any = process.env.FLAG_3;

export const flag3Controller = {
    getFlag3: (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).send("Unauthorized. Please login to continue.");
        } else {
            const currentUser = req.cookies["currentUser"];
            if (currentUser === "web1-admin") {
                return res.status(200).json({flag3: flag3 });
            } else {
                return res.status(200).json({msg: "Are you sure you have enough permissions? "});
            }
        }
    }
};