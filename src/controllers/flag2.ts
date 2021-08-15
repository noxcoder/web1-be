import { Request, Response } from "express";

const flag2: any = process.env.FLAG_2 || "dummy flag 2";

export const flag2Controller = {
    getFlag2: (req: Request, res: Response) => {
        return res.status(200).json({flag2: flag2 });
    }
};