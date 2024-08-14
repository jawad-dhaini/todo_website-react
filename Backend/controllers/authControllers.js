const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
// const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const { checkRecordExists, insertRecord } = require("../utils/sqlFunctions");
// const { createTable } = require("../utils/sqlFunctions");

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
}

async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  };
  try {
    // await createTable(userSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }
    await insertRecord("users", user);
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (!existingUser || !existingUser.password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    await res.status(200).json({
      accessToken: generateAccessToken(existingUser.userId),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
