import express from "express";
import connectDB from "../mysql/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const db = await connectDB();

router.get("/home", auth, async (req, res) => {
  try {
    const { username, email } = req.user;

    const [shopsList] = await db.execute(`select * from salons`);
    if (shopsList.length == 0) {
      return res.json({ msg: "no data about saloon shops" });
    }
    res
      .status(201)
      .json({ msg: "saloon data fetched successfully", shopsList: shopsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/saloon/:salon_id", auth, async (req, res) => {
  try {
    const { salon_id } = req.params;

    const [salonData] = await db.execute(
      ` select s.name as salon_name, s.image_url as logo, s.address as address,sr.*
        from salons s inner join services sr
        on s.salon_id = sr.salon_id
        where s.salon_id = ?`,
      [salon_id]
    );
    if (salonData.length == 0) {
      return res.status(400).json({ msg: "no data found" });
    }
    res.status(201).json({ msg: "data successfully fetched", salonData: salonData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});





router.post("/appointment", auth, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { salon_id, service_ids, appointment_date, appointment_time, status } = req.body;

    if (!salon_id || !service_ids || !appointment_date || !appointment_time) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // For multiple services, insert multiple rows
    for (const service_id of service_ids) {
      await db.execute(
        `INSERT INTO appointments (user_id, salon_id, service_id, appointment_date, appointment_time, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, salon_id, service_id, appointment_date, appointment_time, status || "confirmed"]
      );
    }

    res.status(201).json({ msg: "Appointment(s) booked successfully!" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ msg: "Server error while booking appointment" });
  }
});







router.get("/bookings", auth, async (req, res) => {
  try {
    const { user_id, username, email } = req.user;

    const [bookingsData] = await db.execute(
      `select s.name as saloon_name, s.image_url as logo, s.address as address, 
		    a.appointment_date ,a.appointment_time,
            sr.name as service_name, sr.duration_minutes as duration, sr.price as price
        from salons s inner join appointments a inner join services sr
        on s.salon_id = a.salon_id and a.service_id = sr.service_id
        where a.user_id = ?`,
      [user_id]
    );

    res
      .status(201)
      .json({ msg: "data fetched successfully", bookings: bookingsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.put("/update", auth, async (req, res) => {
  const { user_id } = req.user;
  const { username, email, mobile } = req.body;

  const [data] = await db.execute(
    `
        update users
        set username=?, email= ?, mobile = ?
        where user_id = ?`,
    [username, email, mobile, user_id]
  );

  res.status(200).json({ msg: "data updated successfully", data: data });
});

export default router;
