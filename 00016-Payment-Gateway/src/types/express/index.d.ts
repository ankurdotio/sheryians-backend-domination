import type { AuthenticatedUser } from "../user/user.types.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export {};