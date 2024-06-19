const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("hi,I am root");
});

app.get("/testlisting",async(req,res)=>{
    let sampleListing = new Listing({
        title:"my home",
        description:"this is my home",
        price:100,
        location:"calangut",
        country:"Idia"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
});

app.listen(8080,()=>{
    console.log("server is listening");
});