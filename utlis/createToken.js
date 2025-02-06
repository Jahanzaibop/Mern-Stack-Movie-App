import jwt from 'jsonwebtoken';

const jwtsecret = 'wejowejaklnsgkladasdasd';

const generateToken = (res, userId) => {
    // Generate the JWT token
    const token = jwt.sign({ userId }, jwtsecret, { expiresIn: '30d' });

    // Set the token in a cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Secure in production
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

   

    return token;
};

export default generateToken;
