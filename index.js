const express = require("express");
const PORT = 3000;
const app = express();
const swaggerUi= require('swagger-ui-express');
const swaggerJsdoc= require('swagger-jsdoc');
const { JSONFilePreset } = require("lowdb/node");
const { v4: uuidv4 } = require('uuid');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['index.js'], // files containing annotations as above
};
const swaggerSpec= swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// /**
//  * @swagger
//  * /leeank:
//  *   get:
//  *     summary: Lấy danh sách người dùng
//  *     responses:
//  *       200:
//  *         description: Thành công
//  */
app.get('/', (req,res)=> {res.status(200).send("Home page")});
app.get("/users", (req,res)=> {res.json(db.data.users)});
app.get("/users/:id", (req,res) => {
  const {id}=req.params;
  const user = db.data.users.find(user => user.id == id)
  if (!user){
    res.json(user);
  }
});
app.post("/users",async (req,res)=>{
  if (!req.body?.email){
    return res.status(400).json({message: "Email is required"});
  }
  const user={
    id : uuidv4(),
    name: req.body?.name ?? "Annonymous",
    age: req.body?.address?? null,
    address: req.body?.address ?? null,
    email: req.body.email,
    phone: req.body?.phone ?? null
  };
  const foundEmail= db.data.users.find(user => user.email == req.body.email);
  if (foundEmail){
    return res.status(400).json({message: "Email is already used"})
  }
  await db.update(data => {data.users.push( user)});
  res.json(db.data.users);
});
app.patch("/users/:id",async (req,res)=>{
  const user = db.data.users.find(user => user.id == req.params.id);
  if (!user){
    return res.status(400).json({message:"User not found"});
  }
  if (req.body?.email){
    return res.status(400).json({ message: "Email is not allowed to be updated" });
  }
  if (req.body?.id){
    return res.status(400).json({ message: "Id is not allowed to be updated" });
  }
  const index = db.data.users.indexOf(user);
  let updated ={
    ...user,
    ...req.body
  };
  await db.update(data => {data.users[index] = updated;});
  res.json(db.data.users[index]);
})

// app.get('/leeank', (req,res) => {
//     res.status(200).send({
//         name:'Lee Ank',
//         age: 19
//     })
// });
// app.post('/leeank/:id', (req,res) => {
//     const {id} = req.params;
//     const  {name, age} = req.body;
//     const user = [{Id: id, Name: name, Age: age}]
//     if (age<18){
//         res.status(400).send({warning:'you are not old enough'})
//     }
//     res.send(user);
// })
let db;
async function startServer(){
  db= await JSONFilePreset('db.json', { toDoList: [], users:[] });
  app.listen(PORT,() => console.log(`its alive on http://localhost:${PORT}`))
}
startServer()