const express = require('express');
const morgan = require('morgan');
const app = express();

const db = require('./db')

require('dotenv').config()

app.use(morgan("dev"))
app.use(express.json())
const PORT = process.env.PORT || 3005;


//get all restaurant
app.get('/api/v1/getRestaurants',async (req, res)=>{

   try{
     const results =await db.query("select * from restaurant");
    
    res.status(202).json({status: "success", results:results.rows.length,
     data:{restaurant: results.rows}, 
     message:"Request Successfull"});
   }catch(error){
    res.status(500).json(error);
   }
})
//get a restaurant
app.get('/api/v1/getRestaurants/:id', async(req, res)=>{
    
    try{
        const results = await db.query(
          'SELECT * FROM restaurant WHERE id = $1',[req.params.id]
        );
        if(results.rowCount === 0){

             res
               .status(404)
               .json({ Message: 'Not found this restaurant in the database' });
        }
        else{
            res.status(200).json({
              status: 'sucsess',
              data: { restaurant: results.rows[0] },
              message: 'Found',
            });
        }
    }catch(error){
        res.status(500).json(error)
    }
})

//Create a restaurants 

app.post('/api/v1/restaurants', async(req,res)=>{
    const {name, location, price_range}= req.body;
    try{
        const results = await db.query("INSERT INTO restaurant (name, location, price_range) values($1, $2, $3) returning *",
        [name, location, price_range]);
        console.log("Result",results)
        res
        .status(201)
        .json({ status: 'success',data:{
            restaurant: results.rows[0]
        }, message: 'Restaurant Created' });
    }catch(error){
        res.status(500).json(error);
    }
    
})

//Update Restaurants

app.put('/api/v1/restaurants/:id',async(req, res)=>{
    console.log(req.params.id)
    const {name, location, price_range}= req.body;
   try{
    const results = await db.query(
      'UPDATE restaurant SET name=$1, location=$2, price_range=$3 WHERE id =$4 returning *',
      [name, location, price_range, req.params.id]
    );
     res.status(200).json({
       status: 'success',
       data: {
        restaurent: results.rows[0]
       },
       message: 'Restaurant Updated',
     });
   }catch(error){
    res.status(500).json(error);
   }
})

//Delete Restaurent
app.delete("/api/v1/restaurants/:id",async(req,res)=>{
    console.log(req.params.id)
   try{
    const results = await db.query("DELETE FROM restaurant WHERE id =$1",[req.params.id]);
    console.log(results)
     res.status(202).json({status:"Success",  message:"restaurant delete succussfully"})
   }catch(error){
    res.status(500).json(error);
   }
});

app.listen(PORT,()=>{
    console.log(`server is up and listening on port ${PORT}`);
})