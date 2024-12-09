const express = require('express')
const app = express();
var cors = require('cors')
require('dotenv').config()
const port =process.env.PORT||3000
app.use(cors());
app.use(express.json());;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mngo1.mrkjr.mongodb.net/?retryWrites=true&w=majority&appName=mngo1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //database and collection
    const database = client.db("VisaNavigator");
    const visaCollection = database.collection("visas");
    const AppliedVisa=database.collection('applications');
    const userCollection=database.collection('users')

    //get all visa data from server
    app.post('/visas',async(req,res)=>{
        const visa=req.body;
        const result=await visaCollection.insertOne(visa);
        res.send(result);

    })

    //read all visa data
    app.get('/visas',async(req,res)=>{
      const cursor=visaCollection.find();
      const result=await cursor.toArray();
      res.send(result);
  })

    //get all user data from server
    app.post('/users',async(req,res)=>{
      const user=req.body;
      const result=await userCollection.insertOne(user);
      res.send(result);

  })
  //read all applied data and search
  app.get('/application',async(req,res)=>{
    const {searchParams}=req.query;
    let option={};
    if(searchParams){
      option={"detailsData.name":{$regex:searchParams,$options:"i"}};
    }
    
    
    const cursor=AppliedVisa.find(option);
    const result=await cursor.toArray();
    res.send(result);
})
   //get all applied data from server
   app.post('/application',async(req,res)=>{
    const apply=req.body;
    const result=await AppliedVisa.insertOne(apply);
    res.send(result);

})
    

    //single visa data
    app.get('/visas/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result=await visaCollection.findOne(query);
      res.send(result);
  })

    //read latest visa data
    app.get("/latest-visa", async (req, res) => {
      const cursor = visaCollection.find()
        .sort({ _id: -1 }) 
        .limit(6); 
      const result = await cursor.toArray(); 
      res.send(result); 
    });

    //my added visa
    app.get("/added-visa", async (req, res) => {
      const email = req.query.email; 
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }
      try {
        const query = { userEmail: email }; 
        const result = await visaCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching visas:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    
   // delete my added data
    app.delete("/added-visa/:id",async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result=await visaCollection.deleteOne(query);
      res.send(result)
    })

    //Update Added Visa
    app.put("/added-visa/:id", async (req, res) => {
      const id=req.params.id;
      const visa=req.body;
      const filter={_id:new ObjectId(id)};
      const options={upsert:true}
      const updatedVisa={
        $set:{
          name:visa.name,
          image:visa.image
        }
      }
      const result=await visaCollection.updateOne(filter,updatedVisa,options)
    });
    

    //update functionality for my added data=============
    app.get('/update-visa/:id',async(req,res)=>{
      const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await visaCollection.findOne(query);
        res.send(result);
  })
    // Update Visa data
    app.put("/update-visa/:id", async (req, res) => {
      const id = req.params.id;
      const updatedVisa = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedVisa,
      };
      const result = await visaCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    

   //update functionality for my added data=============
    

    //Applied Visa data
    app.get('/added-visa',async(req,res)=>{
      const cursor=visaCollection.find();
        const result=await cursor.toArray();
        res.send(result);
  })

  //delete applied data
  app.delete("/application/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:new ObjectId(id)};
    const result=await AppliedVisa.deleteOne(query);
    res.send(result)
  })
    //Read User Data
    app.get('/users',async(req,res)=>{
      const cursor=userCollection.find();
        const result=await cursor.toArray();
        res.send(result);
  })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


