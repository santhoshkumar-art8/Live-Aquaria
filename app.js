let express=require("express");
let app=express();
let mongoose=require("mongoose");
let port=process.env.PORT || 5000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));



const MONGOD_URI='mongodb+srv://santhosh:san123@fish.2tgkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost:27017/fishDB");

mongoose.connection.on('connected',()=>{
    console.log("mongo connected sucessfully");
})

let name="";
let email="";
let address="";
let item="";
let quantity="";

fishSchema={
    name:String,
    email:String,
    address:String,
    item:String,
    quantity:Number
}

let fishmodel=mongoose.model("fish",fishSchema);



app.get('/',(req,res)=>{
res.sendFile(__dirname+"/index.html");
});

app.get('/order.html',(req,res)=>{
    res.render("form");
})

app.post('/',(req,res)=>{
name=req.body.pname;
email=req.body.email;
address=req.body.address;
item=req.body.item;
quantity=req.body.qty;

let fishdoc=new fishmodel({
    name:name,
    email:email,
    address:address,
    item:item,
    quantity:quantity,
    
    })
    
    fishdoc.save();
res.redirect('/sucess');
})

app.get('/sucess',(req,res)=>{
    res.render("sucess");
})

app.listen(port,()=>{
    console.log(`server started on ${port}`);
})


