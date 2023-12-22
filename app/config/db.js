
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/node_mongo";
const client = new MongoClient(uri);
async function connectToMongoDB() {
    try {
        await client.connect();
        const database = client.db();
        await database.command({ ping: 1 });
        console.log("Connected to MongoDB!");
        return database; // Return the connected database instance
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return connectToMongoDB(); // Retry connection
    }
}

module.exports = {
    connectToMongoDB,
    url: uri,
};

// const uri = "mongodb+srv://root:aWKx9YCE87FSy1A6@cluster0.cu5qgig.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB! DB js ");
//         // return client.db();
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
