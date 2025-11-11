const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

function generateToken(payload) {
  const jti = uuidv4();

  const token = jwt.sign(
    { ...payload, jti },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, jti };
}
