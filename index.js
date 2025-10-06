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
/**
 * @swagger
 * /leeank:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     responses:
 *       200:
 *         description: Thành công
 */

app.get('/leeank', (req,res) => {
    res.status(200).send({
        name:'Lee Ank',
        age: 19
    })
});
app.post('/leeank/:id', (req,res) => {
    const {id} = req.params;
    const  {name, age} = req.body;
    const user = [{Id: id, Name: name, Age: age}]
    if (age<18){
        res.status(400).send({warning:'you are not old enough'})
    }
    res.json(user);
})

app.listen(
    PORT,() => console.log(`its alive on http://localhost:${PORT}`)
)