import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    // get the token from headers
    const token = req.headers['authorization'];

    // if no token then stop from here only
    if (!token) {
        return res.status(403).json({
            error: "No token provided"
        });
    }

    if (!token.startsWith("Bearer ")) {
        return res.status(403).json({
            error: "Invalid token format: Expected 'Bearer <token>'"
        });
    }
    const authToken = token.split(" ")[1];

    // verify the toeken
    jwt.verify(authToken,"ACCESS_TOKEN",(err,decoded)=>{
        if(err){
            return res.status(401).json({
                error: "Failed to authenticate token"});
        }
        req.userId = decoded.id;
        next();
    });
};