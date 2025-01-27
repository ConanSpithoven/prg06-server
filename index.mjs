import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import Routeboss from "./routes/bosses.mjs";
import mongoose from "mongoose";
mongoose.connect(process.env.ATLAS_URI);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Load the /bosses routes
app.use("/bosses", Routeboss);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});