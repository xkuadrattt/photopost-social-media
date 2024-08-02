const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const upload = require("../middleware/upload.js");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    console.log("no token");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("token verification failed");
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

router.post("/status", authToken, upload.single("image"), async (req, res) => {
  const userId = req.user.id;
  const imageUrl = req.file ? `/uploads/${userId}/${req.file.filename}` : null;

  try {
    const status = await prisma.status.create({
      data: { content, imageUrl, userId },
    });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "error creating status" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "email already register" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "user not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "password invalid" });

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ accessToken });
});

router.put(
  "/users/:id/avatar",
  authToken,
  upload.single("avatar"),
  async (req, res) => {
    const userId = req.params.id;
    const fileUrl = `/uploads/${req.user.id}/${req.file.filename}`;

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          profile_image_url: fileUrl,
        },
      });
      res
        .status(200)
        .json({ message: "avatar updated successfully", avatarUrl: fileUrl });
    } catch (err) {
      res.status(500).json({ err: "an error occured" });
    }
  },
);

router.get("status", authToken, async (req, res) => {
  try {
    const statuses = await prisma.status.findMany({
      include: {
        user: true,
        comments: {
          user: true,
        },
      },
    });
    res.json(statuses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/users", authToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

module.exports = router;
