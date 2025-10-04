const express = require("express");
const PORT = 3000;
const app = express();
app.listen(
    PORT,() => console.log(`its alive on http://localhost:${PORT}`)
)
app.use(express.json());
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