import express from "express";
import connectDb from "../mysql/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

//creating database connection
const db = await connectDb();

router.post("/register", async (req, res) => { 
  try {
    const { username, email, mobile, password } = req.body;
    

    if (!username || !email || !mobile || !password) {
      return res.status(400).json({ msg: "all fileds are required" });
    }

    //checking duplicate email
    const [existingUser] = await db.execute(
      `select * from users where email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `insert into users(username,email,mobile,password) values(?,?,?,?)`,
      [username, email, mobile, hashedPassword]
    );
    res.status(201).json({ msg: "user registered successfully" });
  } catch (error) {
    console.log("error during registration", error);
    res.status(500).json({ msg: "server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const [rows] = await db.execute(`select * from users where email = ?`, [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }
    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }
    const token = jwt.sign({user_id:user.user_id,username:user.username, email: user.email, mobile:user.mobile }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "login successfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

export default router;
