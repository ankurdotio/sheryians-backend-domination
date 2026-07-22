import type { Request, Response } from "express";


type RegisterRequestBody = {
    username: string;
    email: string;
    password: string;
}

type RegisterRequestParams = {
    age: number;
}

export async function register(req: Request<RegisterRequestParams, {}, RegisterRequestBody>, res: Response) {

    req.params.age

}




