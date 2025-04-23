import {JwtHeader} from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import childProcess from "child_process";
import {JWTParts} from "./types.js";


export function decodeJWT(token: string, type: JWTParts): string {
    try {
        switch (type) {
            case JWTParts.HEADER: {
                return decodeHeader(token);
            }
            case JWTParts.PAYLOAD: {
                return decodePayload(token);
            }
            case JWTParts.SIGNATURE: {
                return decodeSignature(token);
            }
        }
    } catch (error) {
        return "Error decoding JWT part";
    }
}

export function copy(content: string) {
    childProcess.spawn("clip").stdin.end(content);
}

function decodeHeader(token: string): string {
    const header: JwtHeader | undefined = jwt.decode(token, {complete: true})?.header;

    if (!header) {
        return "Invalid JWT";
    }
    return JSON.stringify(header);
}

function decodePayload(token: string): string {
    const payload = jwt.decode(token);

    if (!payload) {
        return "Invalid JWT";
    }
    return JSON.stringify(payload);
}

function decodeSignature(token: string): string {
    const signature = jwt.decode(token, {complete: true})?.signature;

    if (!signature) {
        return "Invalid JWT";
    }
    return signature.toString();
}