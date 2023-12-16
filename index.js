const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 3000;

// parser
app.use(cors());
app.use(express.json()); //req body parser

//TaskManagmentSystem
//kRg5V9h2Kcrd8uiC

const uri =
  "mongodb+srv://TaskManagmentSystem:kRg5V9h2Kcrd8uiC@cluster0.oc9fgut.mongodb.net/?retryWrites=true&w=majority";

console.log(process.env.DATABASE_URL);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("online-task-manegment-system");
    const tasks = database.collection("tasks");

    // Create a document to insert
    const doc = {};

    app.post("/users", async (req, res) => {
      const addTaskDataFromClient = req.body;
      console.log(addTaskDataFromClient);

      const result = await tasks.insertOne(addTaskDataFromClient);
      res.status(200).json({
        success: true,
        message: "Task added successfully",
        data: result,
      });
    });

    const result = await tasks.insertOne(doc);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Online task management is working...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
