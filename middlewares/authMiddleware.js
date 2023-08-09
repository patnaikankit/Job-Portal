// two factor authentication - basically this middleware is used to make sure that if a user is trying to access any route he should be authenticated to do the same
import JWT from "jsonwebtoken";

const userAuth = (req, res, next) => {
    // in the header section authorization tokens are passed which will be extracted for authentication
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer")){
        next("Authorization Failed!");
    }
    // follows a format of {Bearer, token} - extracting the token
    const token = header.split(" ")[1];
    try{
        // if the token is from a trusted user(logged in) he is allowed to pass 
        const payload = JWT.verify(token, process.env.SECRET_KEY);
        req.user = {userId: payload.userId}
        next()
    }
    catch(error){
        next("Authorization Failed!");
    }
}

export default userAuth;