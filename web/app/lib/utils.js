export const jwt = {
    decode: (token) => {
        if (!token) return;
        console.log(JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()))
        return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    },
};
