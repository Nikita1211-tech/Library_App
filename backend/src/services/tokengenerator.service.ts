const jwt = require("jsonwebtoken");
function tokengenerator(email: string) {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  return token;
}
export { tokengenerator };
