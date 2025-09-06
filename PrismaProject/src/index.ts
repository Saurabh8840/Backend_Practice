//
// what is did 

// commands
// npm init -y  backend setup 

// postgresql://neondb_owner:npg_rKOfUAF6wzC1@ep-cool-tree-a1gnrd5o-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

//npm install prisma typescript ts-node @types/node --save-dev

//npx tsc --init

//edit tsconfig.json
//rootdir->./src to tool for .ts files
//outdir ->./dis to look for js files

//setting up prisma
// npx prisma init



//npx prisma migrate dev --name init 

//generate clinet
//npx prisma generate


// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function insertUser(username: string, password: string, firstname: string, lastname: string) {
//   const res = await prisma.user.create({
//     data: { username, password, firstname, lastname },
//   });
//   console.log("Inserted:", res);
// }

// async function updateUser(username: string, { firstname, lastname }: { firstname: string; lastname: string }) {
//   const res = await prisma.user.update({
//     where: { username },
//     data: { firstname, lastname },
//   });
//   console.log("Updated:", res);
// }

// async function getUser(username: string) {
//   const user = await prisma.user.findFirst({ where: { username } });
//   console.log("Fetched:", user);
// }

// async function main() {
//   await insertUser("admin1", "123456", "saurabh", "tripathi");
//   await updateUser("admin1", { firstname: "new name", lastname: "singh" });
//   await getUser("admin1");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());


//import {PrismaClient} from "@prisma/client"

import {PrismaClient} from "@prisma/client"

const prisma=new PrismaClient();


// async function insertUser(username:string,password:string,firstname:string,lastname:string){

//     const res=await prisma.user.create({
//           data:{
//               username,
//               password,
//               firstname,
//               lastname
//           }
//     })
//     console.log("Inserted ",res);

// }

// async function getUser(username:string) {
//     const res=await prisma.user.findFirst({
//         where:{
//             username,
//         }
//     })
//     console.log("Fetched",res);
// }

// async function updateUser(username:string,firstname:string,lastname:string){
//     const res=await prisma.user.update({
//         where:{
//             username
//         },
//         data:{
//             firstname,lastname
//         }
//     })
//     console.log("updated",res);
// }


// async function getAllUser() {
//     const users=await prisma.user.findMany();
//     console.log("All users;",users);
// } 

// async function deleteUser(username: string) {
//     const deleteUser = await prisma.user.delete({
//         where: { username }
//     });
//     console.log("Deleted user:", deleteUser);
// }
//----------------------------------------------------------

async function InsertUser(username:string,password:string,firstname:string,lastname:string) {
   

    try {
        const res =await prisma.userji.create({
            data:{
                username,
                password,
                firstname,
                lastname
            }
        })
        console.log("inserted data",res)
    } catch (error) {
        console.error("error while inserting",error);
    }
    
} 

async function getUser(username:string) {
    
    try {
        const res=await prisma.userji.findUnique({
            where:{
                username
            }
        })
        console.log("user detail",res);
    } catch (error) {
        console.log("erro while getuser",error);
    }
}


//update user
async function updateUser(username:string,firstname:string,lastname:string){

    const res=await prisma.userji.update({
        where:{
            username
        },
        data:{
            firstname,
            lastname
        }
    })
}

//getuser
async function getAllUser(){
    const res= await prisma.userji.findMany();
    console.log("all detail :",res);
}

//delete user
async function deleteUser(username:string) {
    const res=await prisma.userji.delete({
        where:{
            username
        }
    })

}

async function  main() {
    // await insertUser("saurabh1","123456","saurabh","tripathi");
    // await updateUser("saurabh1","saurabhji","tripathiji");
//     await  getUser("saurabh1");
//     await deleteUser("admin1");
//     await getAllUser(); 
       //insert single data in table 
       await InsertUser("smriti1","123456","smritiji","tripathi");
       //review data 
       await getUser("smriti1");
       //insert few data 
       await InsertUser("akriti1","123456","akritiji","tripathi");
       await InsertUser("saurabh1","123456","saurabhiji","tripathi");
       await InsertUser("sakshi1","123456","sakshiji","tripathi");
       //update data
       await updateUser("sakshi1","sakshiBahini","paglu");
       // get all data
       await getAllUser();
       //delete
       await deleteUser("sakshi1");
       //get all data
       await getAllUser();
}

main()
 .catch((e)=>{console.error(e)})
 .finally(async () => await prisma.$disconnect());
