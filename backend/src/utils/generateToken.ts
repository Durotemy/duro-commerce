import json from "jsonwebtoken";

export const generateToken = (id: any) => {
    return json.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
    });
}
