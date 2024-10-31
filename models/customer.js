const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(()=>console.log("connection successful"))
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new mongoose.Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders:[
        {type:Schema.Types.ObjectId,
            ref:"Order",
        },
    ],
});

const Order = mongoose("Order", orderSchema);
