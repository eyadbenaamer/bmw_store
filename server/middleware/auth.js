import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json("login first");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimStart();
    }
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      if (process.env.USER_NAME === result.userName) {
        next();
      }
    } catch (error) {
      return res.status(401).json("invalid token or user doesn't exist");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ ما. الرجاء المحاولة في وقت لاحق." });
  }
};
