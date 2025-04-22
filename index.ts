import {Flow} from 'flow-plugin';
import * as jwt from 'jsonwebtoken';
import {JwtHeader} from "jsonwebtoken";

const flow = new Flow({keepOrder: true, icon: "./icon.png"});

enum JWTParts {
    HEADER = 0,
    PAYLOAD = 1,
    SIGNATURE = 2,
}

flow.on('query', ({prompt}, response) => {

    if (!prompt || prompt.trim() === '') {
        response.add({
            title: "JWT Decoder",
            subtitle: "Enter a JWT token to decode",
        });
        return;
    }

    try {
        if (!prompt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)) {
            response.add({
                title: "Invalid JWT format",
                subtitle: "Please enter a valid JWT token (header.payload.signature)",
            });
            return;
        }

        response.add({
            title: "Decoded header",
            subtitle: decodeJWT(prompt, JWTParts.HEADER),
        });

        response.add({
            title: "Decoded payload",
            subtitle: decodeJWT(prompt, JWTParts.PAYLOAD),
        });

        response.add({
            title: "Decoded signature",
            subtitle: decodeJWT(prompt, JWTParts.SIGNATURE),
        });

    } catch (error) {
        response.add({
            title: "Error decoding JWT",
            subtitle: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

function decodeJWT(token: string, type: JWTParts): string {
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