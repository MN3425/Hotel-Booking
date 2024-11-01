const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

// Use MongoDB Atlas connection string
const MONGO_URL = "mongodb+srv://pacificnano:sahil100@cluster1.gddgs.mongodb.net/wanderlust?retryWrites=true&w=majority";

mongoose.set('debug', true); // Enable Mongoose debugging to help diagnose connection issues

// Database connection function with improved error handling and timeout options
async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Server selection timeout
      socketTimeoutMS: 45000,          // Socket timeout
      connectTimeoutMS: 30000          // Initial connection timeout
    });
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process if the connection fails
  }
}

main(); // Call database connection

// App setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Incoming request to: ${req.path}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings"); // Redirect root to listings
});

app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

app.post("/listings", wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

// 404 error handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "some error" } = err;
  res.status(statusCode);
  res.render("error.ejs", { err });
});

// Start server
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
