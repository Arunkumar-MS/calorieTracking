
require('./global');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const trackerRouter = require('./routes/tracker');
const { authRouter } = require('./routes/auth');
const authenticate = require('./middleware/auth')
const port = 3001
const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/tracker", authenticate, trackerRouter)

app.listen((port), () => {
    console.log("Server is Running @", port);
})