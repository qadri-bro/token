const umodal =require("../modal/modal");
const tmodal = require("../modal/task");
const bcrypt= require("bcrypt");
const jsonweb =require("jsonwebtoken");
const fs =require("fs");
module.exports.task= async(req,res)=>{
    
    let usmodal=await umodal;
    let taskmodal=await tmodal;

            let getemail= "naman@gmail.com";

            let emailfind=await usmodal.find({email:getemail});

            if(emailfind == ""){
                res.send("enter valid email")
            }

            else{
                let data =new taskmodal({
                    
                    "email":getemail,
                    "tittle":req.body.tittle,
                    "desc":req.body.desc,
                 
                })
                let savedata =await data.save();
                res.send("task is create successfull");
            }
    }

    module.exports.sav= async (req,res)=>{

        
        let usmodal=await umodal;
        let email = req.body.email;
        let checkemail= email.search('@');
        let checkdotcom = email.search('.com');
    
        let password = req.body.password;
        let conpassword= req.body.conpassword;
    
        if( req.body.uname !== "" && req.body.email && req.body.password !== "" && req.body.conpassword !==""){
    
    
                if( checkemail !== -1 && checkdotcom !== -1 ){
    
    
                    if( password === conpassword ){
    
    
                                    let data = new usmodal({
                                        "uname":req.body.uname,
                                        "email":req.body.email,
                                        "phone":req.body.phone,
                                        "password":req.body.password,
                                        "conpassword":req.body.conpassword,
                                        
                                    });
                                
                                    let savedata =await data.save();
                                    res.send("account creat successfully");
                }
                 else{
                         res.send("please does not match password")
                }
    
            }
            else{
                res.send("Please Enter a valid email");
            }
    
        }
        else {
            res.send("Please fillout all the fields");
        }
        
    }




    module.exports.login= async(req,res)=>{

        let usmodal=await umodal;

    var datagate = await usmodal.findOne({email:req.body.email});


        if(req.body.password === datagate.password){
         

            let userdata ={
                name:datagate.uname,
                email:datagate.email,
            }

            let skey="amaanahmadqadri";

            jsonweb.sign(userdata, skey,(err,token)=>{
                res.send(token)
            })

        }
        else{
            res.send("login is failed");    
        }

    
}
 
    
module.exports.homepage =async (req,res)=>{
    res.send("home page")
}

       
// module.exports.read= async(req,res)=>{

    
//     var taskname = req.body.email;

  
//     file.readFile(taskname,(err,data)=>{
//         if(err){
//             res.send(err);
//         }
//         else{
//             res.send(data);
//         }

   

//     }
// }


module.exports.read= async (req,res)=>{
    let usmodal=await tmodal;
    const email ="naman@gmail.com";
    const update =req.body.tittle;
   
   let readf =await usmodal.updateOne({email},{tittle:update})

   res.send("update email")


}


module.exports.delet= async (req,res)=>{
    let usmodal=await tmodal;
    const email ="naman@gmail.com";
    const update =req.body.tittle;
   
   let readf =await usmodal.deleteMany({email})

   res.send("delet data")


}

module.exports.readfile= async (req,res)=>{
    let usmodal=await tmodal;
    const email ="naman@gmail.com";
    const update =req.body.tittle;
   
   let readf =await tmodal.readFile(email)

   res.send("read file")


}