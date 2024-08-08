const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const jjj = jwt.sign(
  "f5d163d3-2fa3-4b02-a9f1-a56b3118e6af",
  process.env.JWT_SECRET
);
console.log(jjj);

console.log(
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWQxNjNkMy0yZmEzLTRiMDItYTlmMS1hNTZiMzExOGU2YWYiLCJpYXQiOjE3MjI2MzUxMTJ9.jFsEfB5rMhX-u6ANJRG-jAlkCjts4Ix0ym-j9qnI-6o",
    process.env.JWT_SECRET
  )
);
