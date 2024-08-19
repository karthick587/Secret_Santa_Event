const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors());
const adminRoute = require("./routes/admin");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api', adminRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      message: 'Something went wrong!',
      error: err.message || 'Internal Server Error'
    });
  });
app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

