import { randomBytes } from "crypto";

export function getRandomToken(): Promise<string>{
    return new Promise((resolve, reject) => {
        const bytes = randomBytes(128, (err, buff) => {
            if(err){
                reject(err);
            } else{
                resolve(buff.toString('hex'));
            }
        })
    })
}