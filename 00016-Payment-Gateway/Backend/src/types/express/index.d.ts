import type { AuthenticatedUser } from "../user/user.types.ts";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export {};