import {Flow} from 'flow-plugin';
import {copy, decodeJWT} from "./functions.js";
import {JWTParts} from "./types.js";

const flow = new Flow({keepOrder: true, icon: "./icon.png"});

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

        const decodedHeader = decodeJWT(prompt, JWTParts.HEADER);
        response.add({
            title: "Decoded header",
            subtitle: decodedHeader,
            jsonRPCAction: {
                method: "copy_result",
                parameters: [decodedHeader],
            }
        });

        const decodedPayload = decodeJWT(prompt, JWTParts.PAYLOAD);
        response.add({
            title: "Decoded payload",
            subtitle: decodedPayload,
            jsonRPCAction: {
                method: "copy_result",
                parameters: [decodedPayload],
            }
        });

        const decodedSignature = decodeJWT(prompt, JWTParts.SIGNATURE);
        response.add({
            title: "Decoded signature",
            subtitle: decodedSignature,
            jsonRPCAction: {
                method: "copy_result",
                parameters: [decodedSignature],
            }
        });

    } catch (error) {
        response.add({
            title: "Error decoding JWT",
            subtitle: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

flow.on("copy_result", ({parameters}) => {
    copy(parameters.toString());
});