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
const {httpStatusCodes, getStatusInfo}= require('./https_status_code');
const swaggerSpec= swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static("static"));

// ALL MIDDLEWARES
const findUserById = (req, res, next) => {
  const user = db.data.users.find((user) => user.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = user;
  next();
};

const checkEmail = async (req, res, next) => {
  const foundEmail= db.data.users.find(user => user.email == req.body.email);
  if (!req.body?.email){
    return res.status(400).json({message: "Email is required"});
  }else if (foundEmail){
    return res.status(400).json({message: "Email is already used"});
  }
  next();
};

const idAllowance = (req,res,next)=> {
  if (req.body?.id){
    return res.status(400).json({ message: "Id is not allowed to be updated" });
  }
  next();
}
const emailAllowance = (req,res,next)=> {
  if (req.body?.email){
    return res.status(400).json({ message: "Email is not allowed to be updated" });
  }
  next();
}

const completedAllowance = (req,res,next)=> {
  if (req.body?.completed){
    return res.status(400).json({ message: "Progress is not allowed to be updated" });
  }
  next();
}

const findToDoById = (req, res, next) => {
  const toDo = db.data.todoLists.find(data => data.id == req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Todo not found" });
  }
  req.toDo = toDo;
  next();
};
//
//
app.get('/', (req,res)=> {res.status(200).send("Home page")});
app.get("/users", (req,res)=> {res.json(db.data.users)});
app.get("/users/:id",findUserById, (req,res) => {
  res.json(req.user);
});

app.post("/users",checkEmail, async (req,res)=>{
  res.json(req.user);
});

app.patch("/users/:id", checkEmail, findUserById, idAllowance, async (req,res)=>{
  const index = db.data.todoLists.indexOf(todoList);
  let updated = {
    ...todoList,
    ...req.body,
  };
  await db.update(({ todoLists }) => {
    todoLists[index] = updated;
  });
  res.json(updated);
})

app.delete("/users/:id", findUserById, async(req,res)=>{
  const index= db.data.users.indexOf(req.user);
  await db.update(data => {data.users.splice(index,1)});
  res.json({users_remain: db.data.users, message: "User deleted"});
});

app.get("/status_code", (req,res)=>{
  res.json(httpStatusCodes)
})
app.get("/status_code/:id", (req,res) => {
  const {id}= req.params;
  let statusInfo = getStatusInfo(id);
  console.log("params id: "+id);
  console.log(statusInfo);
  if (!statusInfo){
    return res.status(400).json({message:" not valid status code"})
  }
  res.json(statusInfo);
})
//

let db;
async function startServer(){
  db= await JSONFilePreset('db.json', { toDoList: [], users:[] });
  app.listen(PORT,() => console.log(`its alive on http://localhost:${PORT}`))
}
startServer()