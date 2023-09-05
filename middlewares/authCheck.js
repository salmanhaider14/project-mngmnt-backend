import jwt from "jsonwebtoken";
const JWT_SECRET = "zC769";

// JWT Authorization Middleware
export default function checkAuth() {
  return (req, res, next) => {
    // Get the JWT from the request headers
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).send({ message: "Authentication required" });
    }

    try {
      // Verify the JWT using the secret key
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach the user's ID and role to the request object
      req.userId = decoded.userId;
      req.userRole = decoded.role;

      next();
    } catch (error) {
      res.status(403).send({ message: error.message });
    }
  };
}
