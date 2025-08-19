// import {v2 as cloudinary} from "cloudinary"
// import dotenv from "dotenv"
// dotenv.config()
// //filesystem
// //read write remove when need to manage file use filesystem
// import fs from "fs"

// cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });


// const uploadOnCloudinary= async(localFilePath)=>{
//     try{
//         if(!localFilePath) return null;
//         //upload the file on cloudinary
//         const response =await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         //file has been uploaded successfully 
//         console.log("file is uploaded on cloudinary",response.url);
//         return response;


//     }
//     catch(error){
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file saved temporary fiel as the upload operation got failed 
//         return null;
//     }
// }

// export {uploadOnCloudinary}

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("file is uploaded on cloudinary", response.url);

    // optional: remove file after successful upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // remove temp file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};

export { uploadOnCloudinary };
