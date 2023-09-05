import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import checkUserRole from "../middlewares/roleCheck.js";
import jwt from "jsonwebtoken";
import checkAuth from "../middlewares/authCheck.js";

const router = express.Router();

const JWT_SECRET = "zC769";

//Get Router
router.get("/", checkAuth(), checkUserRole(1), async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//For getting a single item
router.get("/:id", getUser, (req, res) => {
  const userWithoutPassword = { ...res.user.toObject() };
  delete userWithoutPassword.password;

  res.send(userWithoutPassword);
});

//For Posting an item
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: await bcrypt.hashSync(req.body.password, 10),
    picture: req.body.picture ? req.body.picture : "",
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Login route with token generation
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ message: "Invalid username" });

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).send({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time (adjust as needed)
    );

    // Send the JWT token in the response
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//For Updating an item
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name) res.user.name = req.body.name;
  if (req.body.email) res.user.email = req.body.email;
  if (req.body.role) res.user.role = req.body.role;
  if (req.body.password) {
    res.user.password = await bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.picture) res.user.picture = req.body.picture;

  try {
    const updatedUser = await res.user.save();
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Middleware to get a user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "Cannot find user" });

    res.user = user; // Store the retrieved user in the request object
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

// Delete user route
router.delete(
  "/:id",
  getUser,
  checkAuth(),
  checkUserRole(3),
  async (req, res) => {
    try {
      const deletedUser = await User.deleteOne({ _id: res.user._id });
      if (deletedUser.deletedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ message: "Deleted User" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

export default router;
