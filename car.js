const mongoose=require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/wheeldeal",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const car_schema=new mongoose.Schema({
    carname:{type:String,required:true},
    cartype:{type:String,required:true},
    city:{type:String,required:true},
  },{collection:"car"})
const car_model=mongoose.model('car',car_schema);
var c1=new car_model({'carname':'Indica','cartype':'Mini','city':'Bengaluru'});
var c2=new car_model({'carname':'Ertiga','cartype':'Mini','city':'Bengaluru'});
var c3=new car_model({'carname':'WagornR','cartype':'Mini','city':'Bengaluru'});
var c4=new car_model({'carname':'Swift','cartype':'Mini','city':'Bengaluru'});
c1.save();
c2.save();
c3.save();
c4.save();

