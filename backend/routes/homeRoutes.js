import express from 'express';
import connectDB from '../mysql/db.js';
import auth from '../middleware/auth.js'

const router = express.Router();

const db = await connectDB();

router.get('/home',auth, async (req,res)=>{
    try{
        const {username,email} = req.user;
        

        const [shopsList] = await db.execute(`select * from salons`)
        if (shopsList.length == 0){
            return res.json({msg:"no data about saloon shops"})
        }
        res.status(201).json({msg:"saloon data fetched successfully", shopsList:shopsList})
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"server error"})
        
    }
})

router.get('/saloon/:salon_id',auth, async(req,res)=>{
    try {
        const{salon_id} = req.params;

        const [salonData] = await db.execute(`select * from services where salon_id = ?`,[salon_id]);
        if (salonData.length == 0){
            return res.status(400).json({msg:"no data found"})
        }
        res.status(201).json({msg:'data successfully fetched', data:salonData});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"server error"})
    }
})

router.get('/bookings',auth, async(req,res)=>{
    try {
        const{user_id,username,email} = req.user

        const [userBokings] = await db.execute(
            `select * 
            from services
            where service_id in(select service_id
                                from appointments
                                where user_id = ?)`,[user_id]
        ) 

        const [salonData] = await db.execute(
            `
            select *
            from salons
            where salon_id in (select salon_id
                            from appointments
                            where user_id = ?)`,[user_id]
        )

        res.status(201).json({msg:"data fetched successfully",bookings:userBokings, salons:salonData})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"server error"})
    }
})


router.put('/update',auth, async(req,res)=>{
    const{user_id} = req.user 
    const{username,email,mobile} = req.body

    const [data] = await db.execute(`
        update users
        set username=?, email= ?, mobile = ?
        where user_id = ?`,[username,email,mobile,user_id])

    res.status(200).json({msg:'data updated successfully',data:data})
})



export default router;