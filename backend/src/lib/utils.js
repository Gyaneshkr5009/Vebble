import jwt from 'jsonwebtoken';

export const generateToken = (userId , res) => {
    //create a JWT token for the user
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will expire in 30 days
    });

    //sending jwt token in the cookies;
    res.cookie('jwt' , token ,{
        maxAge: 15* 24 * 60 * 60 * 1000, // Cookie will expire in 15 days
        httpOnly: true, // Cookie is not accessible via JavaScript (helps prevent XSS attacks)
        sameSite : 'strict', // Cookie is sent only for same-site requests
        secure : process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
    })

    return token; // Return the generated token
};

/*  {summery for token generation}
 1. creating one toekn contains the uerId as payload with a lifeline for 30 days
    This token is what the server can later verify to authenticate the user.
 2. now next step is to send this token to the client, so that the client can use it for future requests.
    This tells the browser to store the token in a cookie named 'jwt'.
    The cookie itself will automatically expire after 7 days, even though the token inside it is valid for 30 days.
*/