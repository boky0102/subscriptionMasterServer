
declare namespace Express{
    export interface Request{
        userId? : string | import("jsonwebtoken").JwtPayload
    }
}