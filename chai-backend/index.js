// require('dotenv').config()

// const express=require('express');

// const app=express();



// app.get('/',(req,res)=>{
//     res.send('hello world');
// })

// app.get('/twitter',(req,res)=>{
//     res.send('it is a twitter ');
// }) 

// app.listen(process.env.PORT||3000,()=>{
//     console.log('example app listening ');
// })



// require('dotenv').config();
// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });




require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/twitter', (req, res) => {
  res.send('it is a twitter');
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});


