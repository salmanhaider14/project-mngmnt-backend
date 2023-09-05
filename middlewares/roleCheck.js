import jwt from "jsonwebtoken";
export default function checkUserRole(role) {
  return (req, res, next) => {
    const { userRole } = req;

    if (!userRole) {
      return res.status(401).send({ message: "Authentication required" });
    }

    if (role && userRole !== role) {
      return res
        .status(403)
        .send({ message: "Access denied. You do not have the required role." });
    }

    next();
  };
}
