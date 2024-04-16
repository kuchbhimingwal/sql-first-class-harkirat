import { Client } from 'pg'
 
const client = new Client({
  connectionString: "postgresql://test_owner:ymZAs4WwUYt0@ep-sparkling-sun-a53cnapa.us-east-2.aws.neon.tech/test?sslmode=require"
})


async function createUserTable (){
  await client.connect();
  const result = await client.query(`
      CREATE TABLE users ( 
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `)
  console.log(result);
  
}

async function insertData(name:string , email:string, password:string){
  try {
  await client.connect();
  const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
  const values = [name, email, password];
  const res = await client.query(insertQuery, values);
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end(); // Close the client connection
  }
}

async function getData(email:string){
  try {
    await client.connect();
    const insertQuery = "SELECT * FROM users WHERE email = $1"
    const values = [email];
    const result = await client.query(insertQuery,values);
    
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

async function createAddress(){
  await client.connect();
  const result = await client.query(`
    CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `)
  console.log(result);
}

async function insertAddress(userId:number, city:string, country:string, street:string, pincode:string) {
  try {
    await client.connect();
    const insertQuery = `INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5);`
    const values = [userId, city, country, street, pincode];
    const res = await client.query(insertQuery, values);
    console.log(res);
    
  } catch (error) {
    console.log(error);
    
  }
}

async function getInfo(id:number){
  try {
    await client.connect();
    const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u
    JOIN addresses a ON u.id = a.user_id
    WHERE u.id = $1;`
    const values = [id];
    const res = await client.query(query, values);
    console.log(res);
  } catch (error) {
    console.log(error);
    
  }
}
// createUserTable();
// insertData("shubham","aadead@gmail.com", "eqwfcwefc")
// getData("aadead@gmail.com")
// createAddress();
getInfo(1);