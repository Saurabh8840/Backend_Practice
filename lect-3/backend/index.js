const express=require('express')
const cors=require('cors')
const app=express();


app.use(cors());
app.get('/',(req,res)=>{
    res.send("server is ready ");
});


//get a list of 5 jokes

app.get('/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'A joke',
            content: "This is a joke"
        },
        {
            id: 2,
            title: 'Another joke',
            content: "This is another joke"
        },
        {
            id: 3,
            title: 'Yet another joke',
            content: "This is yet another joke"
        },
        {
            id: 4,
            title: 'Funny joke',
            content: "This is a funny joke"
        },
        {
            id: 5,
            title: 'Last joke',
            content: "This is the last joke"
        }
    ];
    res.json(jokes);
})


app.listen(3000,()=>{
    console.log("starting ......")
})