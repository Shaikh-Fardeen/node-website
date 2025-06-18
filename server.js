// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Serve public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Load routes
// const mainRoutes = require('./routes/mainRoutes');
// app.use('/', mainRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`✅ Server running at http://localhost:${port}`);
// });



// ============================================================================================

// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware to serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Import routes
// const mainRoutes = require('./routes/mainRoutes');
// app.use('/', mainRoutes);

// // Handle contact form submission
// app.post('/send-message', (req, res) => {
//   const { name, email, message } = req.body;
  
//   // You can log or save the data here
//   console.log('📨 Message Received:');
//   console.log(`Name: ${name}`);
//   console.log(`Email: ${email}`);
//   console.log(`Message: ${message}`);

//   // Redirect to thank-you page
//   res.redirect('/thank-you');
// });

// // Thank-you page route
// app.get('/thank-you', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/thank-you.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`✅ Server running at http://localhost:${port}`);
// });






// mongodb+srv://shaikhfardeen:2454sk36@cluster-is-mine.f497i5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-is-mine




// ================================================================================================

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://shaikhfardeen:<db_password>@cluster-is-mine.f497i5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-is-mine";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);





// ==========================================================================================

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Message = require('./models/Message'); // <- new

const app = express();
const port = 3000;

// MongoDB connection (replace with your own URI)
mongoose.connect('mongodb+srv://shaikhfardeen:2454sk36@cluster-is-mine.f497i5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-is-mine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Handle contact form submission
app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMsg = new Message({ name, email, message });
    await newMsg.save();
    console.log('📨 Message saved to DB:', newMsg);
    res.redirect('/thank-you');
  } catch (error) {
    console.error('❌ Error saving message:', error);
    res.status(500).send('Something went wrong!');
  }
});

// Thank-you page
app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/thank-you.html'));
});


const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);



app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
