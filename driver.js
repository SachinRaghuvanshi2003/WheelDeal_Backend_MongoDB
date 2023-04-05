const mongoose=require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/wheeldeal",{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const driver_schema=new mongoose.Schema({
    name:{type:String,required:true},
   carnum:{type:String,required:true},
   cartype:{type:String,required:true},
   phnum:{type:Number,required:true},
   city:{type:String,required:true},
   available:{type:Boolean,required:true}
 },{collection:"driver"});
const driver_model=mongoose.model('driver',driver_schema);
var d1=new driver_model({name:'Shyam',carnum:'KA23H74',cartype:'Mini',phnum:7384728492,city:'Bengaluru',available:true});
var d2=new driver_model({name:'Kishore',carnum:'KA23G344',cartype:'Mini',phnum:7485930548,city:'Bengaluru',available:true});
var d3=new driver_model({name:'M kurugan',carnum:'KA23KH7344',cartype:'Mini',phnum:9583948293,city:'Bengaluru',available:true});
var d4=new driver_model({name:'Divakar',carnum:'KA23AS354',cartype:'Mini',phnum:9584738493,city:'Bengaluru',available:true});
var d5=new driver_model({name:'Santhosh',carnum:'KA23JH784',cartype:'Mini',phnum:9584839493,city:'Bengaluru',available:true});
d1.save();
d2.save();
d3.save();
d4.save();
d5.save();
