const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const perfumeRoutes = require("./routes/perfume.route")
const scentedCandleRoute = require("./routes/scented-candle.route")
const perfumeWaxRoute = require("./routes/perfume-wax.route")
const orderRoute = require("./routes/order.route")
const userRoute = require("./routes/user.route")
const {initMailer} = require("./nodemailer/send-email")

dotenv.config();
connectDB();
initMailer();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
const whiteList = ["http://localhost:5173", "http://localhost:5174","https://urgefragrances.com"];
const corsOptions = {
  credentials: true,
  origin: whiteList,
};
app.get("/check-me", (_, res) => {
  res.json({ message: `Hello World!` });
});
app.use(cors(corsOptions));
app.use("/api/perfumes",perfumeRoutes)
app.use("/api/scented-candles",scentedCandleRoute)
app.use("/api/perfume-wax",perfumeWaxRoute)
app.use("/api/order",orderRoute)
app.use("/api/user",userRoute)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})