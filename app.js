const express = require('express')
const mongoose=require('mongoose')
var bodyParser = require('body-parser');
const { doesNotMatch } = require('assert');
const { Timestamp } = require('bson');
user=[];
searchresults=[];
driverdetails=[];
mongoose.connect("mongodb://0.0.0.0:27017/wheeldeal",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const signup_schema=new mongoose.Schema({
  username:{type:String,required:true},
  phonenum:{type:Number,required:true},
  address:{type:String,required:true},
  password:{type:String,required:true}
},{collection:"signup"})
const car_schema=new mongoose.Schema({
    carname:{type:String,required:true},
    cartype:{type:String,required:true},
    city:{type:String,required:true},
  },{collection:"car"})
const driver_schema=new mongoose.Schema({
     name:{type:String,required:true},
    carnum:{type:String,required:true},
    cartype:{type:String,required:true},
    phnum:{type:Number,required:true},
    city:{type:String,required:true},
    available:{type:Boolean,required:true}
  },{collection:"driver"});
const booking_schema=new mongoose.Schema({
    username:{type:String,required:true},
    cartype:{type:String,required:true},
    drivername:{type:String,required:true},
    carnum:{type:String,required:true},
    city_from:{type:String,required:true},
    city_to:{type:String,required:true},
    date:{type:Date,required:true},
    drivernum:{type:Number,required:true}
  },{collection:"booking"})
const signup_model=mongoose.model('signup',signup_schema);
const car_model=mongoose.model('car',car_schema);
const driver_model=mongoose.model('driver',driver_schema);
const booking_model=mongoose.model('booking',booking_schema);
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use( express.static( "public" ) );
const port = 3000
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/home')
})
app.get('/login', (req, res) => {
    res.render('pages/login')
})
app
app.get('/team', (req, res) => {
    res.render('pages/team')
})
app.get('/contact', (req, res) => {
    res.render('pages/contact')
})
app.get('/signup', (req, res) => {
    res.render('pages/signup')
})
app.post('/signup',(req,res)=>{
    console.log(req.body);
    var uname=req.body.uname;
    var phone=req.body.phone;
    var address=req.body.address;
    var password=req.body.password;
    var value=new signup_model({"username":uname,"phonenum":phone,"address":address,"password":password});
    value.save(function(){
        done();
    });
})
app.post('/login',async(req,res)=>{
        try{
    console.log(req.body);
    var uname=req.body.Uname;
    var password=req.body.Pass;
    user[0]=uname;
    let x=await signup_model.findOne({'username':uname,'password':password});
    console.log(x);
    if(x==null){
        res.redirect(301,'/signup');
    }
    else{
        res.redirect(301,'/validlogin');
    }
    }catch(err){
        console.log(err);
        res.render('pages/error');
    }
});
app.get('/validlogin',(req,res)=>{
    uname=user[0];
    res.render('pages/validlogin',{uname});
})
app.post('/validlogin',async(req,res)=>{
    try{
        console.log(req.body);
        var type=req.body.cartype;
        var city=req.body.location;
        var dcity=req.body.dlocation;
        var date=req.body.date;
        let x=await car_model.find({'cartype':type,'city':city});
        console.log(x);
        let y=x.length;
        searchresults[0]=type;
        searchresults[1]=y;
        searchresults[2]=city;
        searchresults[3]=dcity;
        searchresults[4]=date;
        res.redirect(301,'/search_results');}
        catch(err){
            console.log(err);
            res.render('pages/error');
        }
})
app.get('/search_results',(req,res)=>{
    type=searchresults[0];
    y=searchresults[1];
    res.render('pages/search_results',{type,y});
})
app.post('/search_results',async(req,res)=>{
   try{
    var cartype=searchresults[0];
    var city=searchresults[2];
    var dcity=searchresults[3];
    var date=searchresults[4];
    let u=await driver_model.findOneAndUpdate({'cartype':cartype,'city':city,'available':true},{'available':false});
    console.log(u);
    var drivername=u.name;
    var carnum=u.carnum;
    var drivernum=u.phnum;
    var new_book=new booking_model({'username':user[0],'cartype':cartype,'drivername':drivername,'carnum':carnum,'city_from':city,'city_to':searchresults[3],'date':searchresults[4],'drivernum':drivernum});
    new_book.save();
    res.render('pages/book',{drivername,drivernum,cartype,carnum,city,dcity,date});
   }
   catch(err){
    console.log(err);
    res.render('pages/error');
   }
})
app.get('/profile',async(req,res)=>{
    try{
        var uname=user[0];
        let r=await signup_model.findOne({'username':uname});
        res.render('pages/profile',{r});
    }catch(err){
        console.log(err);
        res.render('pages/error');
    }
})
app.get('/bookings',async(req,res)=>{
    try{
        var uname=user[0];
        let y=await booking_model.find({'username':uname});
        console.log(y);
        res.render('pages/bookings',{y});
    }
    catch(err){
        console.log(err);
        res.render('pages/error');
    }
})
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})