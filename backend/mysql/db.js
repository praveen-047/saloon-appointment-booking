import mysql from "mysql2/promise";

//1.connect to mysql server

async function connectDB() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456789",
      database: "mydb",
    });
    console.log('Database connected successfully');
    
    return db;
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
}


export default connectDB;

//2.createa db
// await db.execute(`create database saloon`)
// console.log(await db.execute(`show databases`))
// console.log(await db.execute(`show tables`));



//3.create a table
// await db.execute(
// `CREATE TABLE users (
//   user_id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL UNIQUE,
//   mobile VARCHAR(15) NOT NULL UNIQUE,
//   password VARCHAR(100) NOT NULL
// );`
// )



//4.CYRD operations

//[rows-user data, fileds-table meta data]


//* insert operations --not recommended
// insert into users(username,email,mobile,password)
// values('sinchana','s@gmail.com','0987654321','123');

//* insert operations --recommended
// await db.execute(
//   "insert into users(username,email,mobile,password) value(?,?,?,?)",
//   ["dhanush", "d@gmail.com", "1234567890", "123"]
// );

// console.log("database connected successfully");
