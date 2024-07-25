const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = /jpeg|jpg|png|gif|webp/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(new Error("file not supported"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: fileFilter,
});

router.post("/upload", (req, res, next) => {
  const uploadHandler = upload.single("image");

  uploadHandler(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Kesalahan karena batas ukuran file
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(413)
          .json({ error: "File size exceeds the limit of 1MB" });
      }
      // Kesalahan multer lainnya
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Kesalahan umum lainnya
      return res.status(400).json({ error: err.message });
    }
    // Jika tidak ada kesalahan, lanjutkan dengan proses berikutnya
    res.json({ file: req.file });
  });
});

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

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
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
    { expiresIn: "1h" }
  );

  res.json({ accessToken });
});

router.get("/users", authToken, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

module.exports = router;
