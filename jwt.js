import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  // First check if the request header has authorization or not.
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }

  //Extract JWT Token from Request Headers
  const token = req.headers.authorization.split(" ")[1]; //Extract token from Request Headers as it is in like Bearer fhjfkjefkkfetc.

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify  that the token is valid.
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        req.decoded = decoded; // NOTE: req.decoded means we are creating a new decoded key.
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ error: "invalid Token" });
  }
};

// function to generate Token.
export const generateToken = (userData) => {
  // Generate a new token using userData
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 14400 }); //NOTE: 4 hours = 14400secs. pass this param in seconds.
};

export default jwtAuthMiddleware;
