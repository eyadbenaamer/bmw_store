import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    let { userName, password } = req.body;
    if (!password && !userName) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    if (userName !== process.env.USER_NAME) {
      return res.status(401).json({ message: "اسم مستخدم غير صحيح." });
    }
    if (password !== process.env.PASSWORD) {
      return res.status(401).json({ message: "كلمة مرور غير صحيحة." });
    }
    const token = jwt.sign(
      { userName: process.env.USER_NAME },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
    res.cookie("token", token, { maxAge: 500000, signed: true });
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. try again later." });
  }
};
