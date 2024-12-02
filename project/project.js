const express=require("express");
const app=express();
const cron = require('node-cron');

app.use(express.json());

//Sample API to check working
app.get('/home',(req,res)=>{
    res.send("Successfull")
})

Edata=[]

let expenses = [];

app.post("/expense", (req, res) => {
    const currentDate = new Date();
    const { data } = req.body;

    // Validate if 'data' is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            status: "error",
            error: "Invalid payload. 'data' must be an array."
        });
    }

    // Format and store the expenses in the global array
    expenses = data.map(expense => ({
        id: expense.id,
        name: expense.name,
        category: expense.category,
        amount: expense.amount,
        date: expense.date || currentDate.toLocaleString()
    }));

    // Send the formatted expenses as the response
    res.json({
        status: "success",
        data: expenses,
        error: null
    });
});

// GET route to retrieve all expenses
app.get("/expenses", (req, res) => {
    if (expenses.length === 0) {
        return res.status(404).json({
            status: "error",
            error: "No expenses found."
        });
    }

    res.json({
        status: "success",
        data: expenses,
        error: null
    });
});

//Get to retrieve expenses on bases of category,consider category,i.e for this category so much amount
app .get('/category',(req,res)=>{
    
    result = expenses.map(expense => ({
        category: expense.category,
        amount: expense.amount,
    
    }));
    res.send(result)

})
//Get expenses where amount spent is more than 100
app .get('/costcategory',(req,res)=>{
    
    result = expenses.filter((expense) => expense.amount>=100)
    res.send(result)

})



cron.schedule('* * * * *', () => {
    console.log('Task is running every minute: Your Maximum expenditure is:');
     result = expenses.filter((expense) => expense.amount>=100)
      console.log(result)
});

app.listen(3000,()=>{
    console.log("server Started");
})