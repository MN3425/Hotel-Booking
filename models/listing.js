const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    // },
    // description: String,
    // image:{
    //     type: String,
    //     default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fshameemullahs.wordpress.com%2F2014%2F01%2F21%2Fhow-to-insert-data-into-mysql-database-using-jquery-ajax-php%2F&psig=AOvVaw0cUcQ8dMh8UVGEVy6re9qo&ust=1718854597650000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCftcbe5oYDFQAAAAAdAAAAABAJ",
    //     set:(v)=>v===""?"https://plus.unsplash.com/premium_photo-1718198503159-74739a4e78d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    // },
    // price: Number,
    // location: String,
    // country: String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;