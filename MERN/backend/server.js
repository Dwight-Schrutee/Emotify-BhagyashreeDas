const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://bhagya-admin:mongo123@cluster0.ixcjw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const playlistsRouter = require('./routes/playlists');

app.use('/playlists', playlistsRouter); 

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
