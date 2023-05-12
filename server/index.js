import Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import UD from  './UserDetails.model.js'
import fs from 'fs';
import ObjectsToCsv from 'objects-to-csv';

const PORT=8000
const app=Express()

app.use(Express.json())


app.use(cors());

dotenv.config()

const uri = process.env.DB_URL

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open',
  () => {
    console.log('connected');
  }
)



 
//UD.insertMany(users)
//.then(docs => console.log(`Inserted ${docs.length} users into the database`))
//.catch(err => console.error(err))
//.finally(() => mongoose.disconnect());



app.get('/users', async (req, res) => {
    try {
     
      const userDetails = await UD.find();
      res.status(200).json(userDetails);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  })

  app.put('/users/:id', async (req, res) => {
    try {
      const result = await UD.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
      });
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
app.post("/users", async (req, res) => {
    try {
      const userDetails = new UD(req.body);
      const result = await userDetails.save();
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  
app.delete('/users/:id',async(req,res)=>{
    try {
        const result = await UD.findByIdAndDelete(req.params.id);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
      }
})





app.get('/csv', async (req, res) => {
  try {
    const users = await UD.find();
    const csv = new ObjectsToCsv(users);
    const csvData = await csv.toString();
    const fileName = 'users.csv';

    fs.writeFileSync(fileName, csvData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(csvData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT,()=>console.log("running"))


