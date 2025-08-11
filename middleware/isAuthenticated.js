import jwt from "jsonwebtoken"


const isAuthenticated = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

const decode = await jwt.verify(token,process.env.SECRET_KEY)

if (!decode) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }

req.id = decode.user
next()
};


export default isAuthenticated;