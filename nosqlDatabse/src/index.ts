//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

///creating a simple nodejs app
//npm init -y
//npx tsc --init
//change rootdir and outdir
//install pg lib
// npm install pg
//npm install @types/pg

// //-----------------------------------------------------------------------------------
// //-----------------------------------------------------------------------------------

// const  { Client } =require('pg');

// async function createUsersTable() {
//     await Client.connect()
//     const result = await Client.query(`
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `)
//     console.log(result)
// }

// createUsersTable();

//psql install ho to dekh skte ho table
//   \dt  se

// time till where i learn is

//normal way to inset data in database okk

// async function insertData() {

//     const client = new Client({
//     connectionString: "postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-winter-poetry-a1lz2rhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//      })

//      try {
//         await client.connect();
//         const insertQuery="INSERT INTO users(username,email,password)VALUES ('SAURABH','saurabh@gmail.com','123456');";
//         const res=await client.query(insertQuery);
//         console.log('Insertion success;',res)

//      } catch (error) {
//         console.log('Insertion success',error);

//      }finally{
//         await client.end();
//      }

// }

// insertData();

//using more secure way to insert data okk dost

// async function insertDatas(p0: string, p1: string, p2: string) {

//     const client=new Client({
//         connectionString:"postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-winter-poetry-a1lz2rhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//     })

//     try {

//         await client.connect()
//         const insertQuery="INSERT INTO users(username,email,password)VALUES($1,$2,$3);";
//         const values=[p0, p1, p2];
//         const result=await client.query(insertQuery,values);
//         console.log('Insertion success:',result);

//     } catch (error) {
//         console.error("error during insertion ",error);
//     }finally{
//         await client.end();
//     }

// }

// insertDatas('username1','username@gmail.com','123456').catch(console.error);

//now is the time of get user data

// async function insertDatas(email:string) {

//     const client=new Client({
//         connectionString:"postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-winter-poetry-a1lz2rhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//     })

//     try {

//         await client.connect()
//         const insertQuery="SELECT * FROM users WHERE email=$1";
//         const values=[email];
//         const result=await client.query(insertQuery,values);
//         console.log('Insertion success:',result);

//         if(result.rows.length>0){
//             console.log('User found:',result.rows[0]);
//             return result.rows[0];
//         }else{
//             console.log('No user found with the given email.')
//             return null;
//         }
//     } catch (error) {
//         console.error("error during insertion ",error);
//     }finally{
//         await client.end();
//     }

// }

// insertDatas('username@gmail.com').catch(console.error);

//realtionship and transactions

//relationship let you store data in diffrerent tables and relate it with each other

//realtionship in mongodb
//since mongodb is a nosql databse you can store any shape of data in it . you can store it in an object that has the address details

//relationship in sql

//sql can not store objects as such we need to define two diffreent table to store this data in .

//users then //addres

// async function addresstable(){

//     const client = new Client({
//         connectionString: "postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-winter-poetry-a1lz2rhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//     });

//     try {
//         await client.connect();
//         const result=await client.query(`
//             CREATE TABLE addresse(
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     country VARCHAR(100) NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     pincode VARCHAR(20),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );
//         `);
//         console.log(result)

//     } catch (error) {
//         console.error("error while creating address table ",error)
//     }

// }

// addresstable();

//insert into realtioon table okk

// async function insertUserandAddress(
//     username:string,
//     email:string,
//     password:string,
//     city:string,
//     country:string,
//     street:string,
//     pincode:string

// ) {
//     const client=new Client({
//         connectionString:"postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-winter-poetry-a1lz2rhe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//     })

//     try {
//         await client.connect();
//         await client.query("BEGIN");
//         const insertUsertext=`INSERT INTO users(username,email,password)VALUES($1,$2,$3) RETURNING id;`;
//         const userRes=await client.query(insertUsertext,[username,email,password]);
//         //userid ki jaruraat
//         const userid=userRes.rows[0].id;

//         const insertAddressText=`INSERT INTO addresses(user_id,city,country,street,pincode)VALUES($1,$2,$3,$4,$5);`;

//         await client.query(insertAddressText,[userid,city,country,street,pincode]);

//         //commit transaction
//         await client.query('COMMIT')
//         console.log('User and address inserted successfully');

//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error("error while entering in relationtable",error)
//         throw error;
//     }finally{
//         await client.end();
//     }
// }

// insertUserandAddress('johndoe','johndoe@gmail.com','securepassword123',
//     'NewYork','USA','123Broadway St','1001'
// );

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

///creating a simple nodejs app
//npm init -y
//npx tsc --init
//change rootdir and outdir
//install pg lib
// npm install pg
//npm install @types/pg

// //-----------------------------------------------------------------------------------
// //-----------------------------------------------------------------------------------
// import {Client} from 'pg'

// const client=new Client({
//     connectionString:"postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-cool-tree-a1gnrd5o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

// })

// async function createUserTable(){

//     await client.connect()

//     const result=await client.query(`
//         CREATE TABLE userji(
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`
//     )
//     console.log(result)
// }

// createUserTable();

// async function   updateDetail(){

//     const result =await client.query(`
//         INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
//         `)

// }

// updateDetail();

//CREATING a simple node.js app

//what i m doing
//  i m doing to learn connecting db using pg
//insertion
//creation
//updationn
//deletion of data

//creating a table
import dotenv from "dotenv";
import { Client } from "pg";


dotenv.config({path:'../.env'})

const client:Client = new Client({
  connectionString: process.env.Database_url
});



async function createTable() {
  try {
    
    //query

    const res = await client.query(`
        CREATE TABLE  userDetail(
        
        id  SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL ,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`);

    console.log("create table :", res);
  } catch (error) {
    console.error("creation failed ", error);
  }
}



//inserting in table

async function insertTable(p0: string, p1: string, p2: string, p3: string) {
  try {
    

    const insertquery = `INSERT INTO userDetail(username ,password,firstname,lastname)VALUES($1,$2,$3,$4)`;
    const values = [p0, p1, p2, p3];
    const res = await client.query(insertquery, values);
    console.log(res);
  } catch (error) {
    console.error("error whiel inserting ", error);
  }
}


//UPDATE IN TABLE

async function updateTable(id:number, firstname:string) {
  try {
    

    const querys = `UPDATE userDetail
            SET firstname=($1)
            WHERE id=($2)`;
    const value = [firstname,id];
    const res=await client.query(querys,value);
    console.log("updated table",res)
  } catch (error) {
    console.log("error while updating in tabel", error);
  }
}




async function selectTable() {

    try {
        const query=`SELECT * FROM  userDetail`;
        const res=await client.query(query);
    
        console.log("full table",res);
    } catch (error) {
        console.error("error in selection ",error);
    }
    
}

async function deleteTable(id:number) {

    try {
      const querys=`DELETE FROM userDetail
WHERE id = ($1);`
      const value=[id]
      const res=await client.query(querys,value)
      
      console.log("delete the row 1",res)

    } catch (error) {
      console.log()  
    }
    
}


async function  createAddTable() {
    
    try {
        const query=`CREATE TABLE Address(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    state  VARCHAR(500) NOT NULL,
                    country  VARCHAR(500) NOT NULL,
                    pincode VARCHAR(20),
                    FOREIGN KEY (user_id) REFERENCES userDetail(id) ON DELETE CASCADE
                    )`;
                    //cascade help in maintain consistency bcz when i delete user it also delete realted table to user in other table .like akriti name delted the her address will also be deleted
        const res=await client.query(query);
        console.log("created add table ",res);
    } catch (error) {
        console.error("error at addresstable ",error);
    }
}

async function insertAddTable(p0:number,p1:string,p2:string,p3:string){

    try {
        const query=`INSERT INTO Address(user_id,state,country,pincode) VALUES ($1,$2,$3,$4)`;
        const value=[p0,p1,p2,p3]
        const res=await client.query(query,value);
        console.log("inserted into address table ",res);
    } catch (error) {
        console.error("error at addd table ",error)
    }

    
}

//transaction
async function  insertUserAndAddress(
  username:string,
  password:string,
  firstname:string,
  lastname:string,
  state:string,
  country:string,
  pincode:string
) {

  try {
    await client.query('BEGIN')

    const query=`INSERT INTO userDetail(username,password,firstname,lastname)
                 VALUES($1,$2,$3,$4)
                 RETURNING id `;
    const value=[username,password,firstname,lastname]
    const res=await client.query(query,value);
    const user_id=res.rows[0].id;
    console.log("inserted in users",res);
    

    const querys=`INSERT INTO Address(user_id,state,country,pincode)VALUES($1,$2,$3,$4)`;
    const values=[user_id,state,country,pincode]
    const addRes=await client.query(querys,values);
    console.log("inserted into add: ",addRes);

    await client.query('COMMIT');
  
  } catch (error) {
    await client.query(`ROLLBACK`); //roll back all transcation on error
    console.error('Error during transaction,rolled back',error);
    throw error;
  }

  
  
}

//join implemented 
async function selectUserAndAddress() {
  

   try {
    //selected rows only

    // const query=`SELECT userDetail.username,userDetail.firstname,Address.state,Address.country,Address.pincode
    //             FROM userDetail 
    //             JOIN Address  ON userDetail.id=Address.user_id
    //             WHERE userDetail.id=$1`;

    //al rows and columen of both table


    const query=`SELECT 
         u.id AS user_id,
         u.username,
         u.password,
         u.firstname,
         u.lastname,
         u.created_at,
         a.id AS address_id,
         a.state,
         a.country,
         a.pincode
      FROM userDetail u
      LEFT JOIN Address a
      ON u.id=a.user_id

    `;
 
  //  const value=[userid];
   const res=await client.query(query)
   console.log("selected join query",res.rows);
   return res.rows;
   } catch (error) {
    console.error("error while join",error);
    throw error ;
   }


}


async function main(){
   await client.connect();
//    await createTable();
//    await insertTable("saurabh_irt", "123456", "saurabh", "tripathi");
//    await updateTable(1,"saurabhji");
//    await selectTable();
//    await insertTable("annu_irt", "123456", "ann", "tripathi");
//    await insertTable("sakshi_irt", "123456", "sakshi", "tripathi");
//    await selectTable();m
//    await deleteTable(3);
  //  await selectTable();
//    await createAddTable();
//    await insertAddTable(2,"uttarpradesh","India","273016");
//    await insertAddTable(1,"madhyapradesh","India","273016");
      
      // Transactions 
     await  insertUserAndAddress("papa_irt","123456","papaji","tripathi","goa","India","273016");
     await selectTable();

    //relationships

     await selectUserAndAddress();
    //  await selectUserAndAddress(1);
     await client.end();
   
}

main().catch(console.error);

//transaction run for happens multiple query together if one fails all will fail



//practice

//try to fetch users details and address 

//SELECT ID,USERNAME,EMAIL FROM users WHERE id=YOUR_USER_ID;

//SELECT CITY,STATE FROM address WHERE user_id=your user id ;



//method-2 using joins

// SELECT user.id,users.username,address.city,address.country,address.street
 // FROM users
// JOIN address ON user.id=address.user_id
// WHERE users.id='1';

 //SELECT userDetail.username,userDetail.firstname,Address.state,Address.pincode
  // FROM userDetail 
  // JOIN Address ON a userDetail.id=address.user_id
  // WHERE userDetail.id=your id 