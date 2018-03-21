var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    Book = require("./models/books"),
    issueBook = require("./models/issuebooks"),
    cors=require("cors"),
    bcrypt=require("bcryptjs"),
    jwt =require("jsonwebtoken"),
    ExtractJwt =require('passport-jwt').ExtractJwt,
    JwtStrategy= require('passport-jwt').Strategy;


//mongoose.connect("mongodb://rishi:rishi@ds239047.mlab.com:39047/bookyard");
mongoose.connect("mongodb://localhost/lib2");


app.use(cors());
app.use(bodyParser.json());
app.use(require('method-override')('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); 
app.set("view engine","ejs");




app.use(require("express-session")({
    secret: "Naruto Uzumaki",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });


app.get("/",function(req,res){
    res.render("start");
});
app.get("/user",isLoggedIn,function(req,res){
    res.render("user");
});

app.get("/newbook",function(req,res){
    res.render("newbook");
});
app.post("/newbook",function(req,res){
    Book.create({
        name:req.body.name,
        publisher:req.body.publisher,
        author:req.body.author,
        units:req.body.units,
        issuedunits:req.body.issuedunits,
        availableunits:req.body.availableunits,
        description:req.body.description
    },function(err,createdBook){
        if(err){
            console.log(err)
        }
        else{
            res.json(createdBook);
        }
    });
});

app.put("/request/:bookid/:userid",function(req,res){
    User.findById(req.params.userid,function(err,foundUser){
        if(err){
            console.log(err)
        } else {
            Book.findById(req.params.bookid,function(err,foundBook){
                if(err){
                    console.log(err);
                }
                else{
                    issueBook.create({
                        bookID:foundBook._id,
                        bookname:foundBook.name,
                        userID:foundUser._id,
                        username:foundUser.name
                    },function(err,issbook){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(issbook);
                        }
                    });
                    foundBook.availableunits=(foundBook.availableunits-1);
                    foundBook.issuedunits=(foundBook.issuedunits+1);
                    foundBook.save((err,book)=>{
                       
                        return res.json(book);

                    });
                
                }
            }); 
        }
               
    })
});

app.delete("/accept/:bookid/:userid",function(req,res){
    
    issueBook.findByIdAndRemove(req.params.bookid,function(err,foundBook){
        if(err){
            console.log(err);
        }
        else{
            Book.findById(foundBook.bookID,function(err,ibook){
                if(err){
                    console.log(err)
                }
                else{
                    User.findById(req.params.userid,function(err,foundUser){
                        if(err){
                            console.log(err)
                        }
                        else{ 
                            var book = {id:ibook._id,name:ibook.name,issuedon: new Date()};
                            foundUser.booksissued.push(book);
                            foundUser.save();
                            console.log(foundUser.booksissued);
                        }
                    })
                }
            })
            issueBook.find(function(err,books){
                res.json(books);
            })
        }
    });
    
    
});

app.get("/allbooks",function(req,res){
    Book.find({},function(err,books){
        if(err){
            console.log(err)
        }
        else{
            issueBook.find({},function(err,issuebooks){
                if(err){
                    console.log(err)
                }
                else{
                        res.json(books)
                    } 
            });          
        }
    });
});

app.get("/issuedbooks/:id",function(req,res){
    User.findById(req.params.id,function(err,foundUser){
        if(err){
            console.log(err)
        }
        else{
            res.json(foundUser.booksissued);
        }
    })
});

app.put("/return/:rbookid/:userid",function(req,res){
    console.log('====',req.params.rbookid)
    console.log('====!!!!',req.params.userid)
    User.findById(req.params.userid,function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            
            var bookissue = foundUser.booksissued;
            
            bookissue.forEach(function(id){
                console.log("id",id.id);
                if(id._id.equals(req.params.rbookid)){
                    Book.findById(id.id,function(err,foundBook){
                        if(err){
                            console.log(err);
                        }
                        else{
                            
                            foundBook.availableunits=(foundBook.availableunits+1);
                            foundBook.issuedunits=(foundBook.issuedunits-1);
                            foundBook.save();
                        
                        }
                    })
                } 
            });
            foundUser.booksissued.remove({_id:req.params.rbookid});
            foundUser.save();   
            res.json(foundUser.booksissued);      
            
            
        }
        
    });
});

app.get("/bookdetails/:id",function(req,res){
    Book.findById(req.params.id,function(err,foundBook){
        if(err){
            console.log(err);
        }
        else{
            res.json(foundBook);
        }
    })
    
})
app.post("/search",function(req,res){
    Book.find({},function(err,books){
        if(err){
            console.log(err)
        }
        else{
            
            res.json(books);
        }
    });
});
app.post("/sort",function(req,res){
    
    Book.find((err, books) => {
        if (err) {
          console.log(err);
        } else {
        res.json(books)
        }
      }).sort({ name: 'asc' });
    
});


app.get("/adminallbooks",function(req,res){
    Book.find({},function(err,books){
        if(err){
            console.log(err);
        }
        else{

            res.json(books);

        }
    });
});

app.put("/update/:id",function(req,res){
    
    Book.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,book){ 
        if(err){
            console.log(err);
        }
        else{
            res.json(book);
        }
    });
});


app.delete("/delete/:id",function(req,res){
    Book.findByIdAndRemove(req.params.id,function(err,deletedBook){
        if(err){
            console.log(err);
        }
        else{

            res.json(deletedBook);
        }
    });
});

app.get("/admin",function(req,res){
    issueBook.find({},function(err,books){
        if(err){
            console.log(err)
        }
        else{
            res.json(books);
        }
    })
});


app.get("/signup",passport.authenticate('jwt',{session:false}),function(req,res){
    res.json(req.user);

});

app.post("/signup",function(req,res)
	{   console.log('req.body',req.body);
		var newUser=new User(req.body);
		var password=req.body.password;
             bcrypt.genSalt(10,(err,salt)=>{
             	bcrypt.hash(password,salt,(err,hash)=>{
             		if(err) throw err;
             		newUser.password=hash;
					 newUser.save((err,user)=>{
						 if(err)
						return res.json({success:false,msg:"This username is already registered !"});
						 if(user)
					    res.json({success:true,msg:"You are Registered"});				 
					 });
             	});
             });	
	});


app.get("/login",function(req,res){
    res.render("login");
});

app.post('/login',(req,res,next)=>{
    const username =req.body.username;
	const password =req.body.password;
    
	User.findOne({username:username},(err,user)=>{
        if(err) 
        {
            res.json({success:false, msg:"Somthing went wrong"});
            
            throw err;
        }
		if(!user)
		{
            return res.json({success:false, msg:"User not found !"});
		}
		User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) {
                res.json({success:false, msg:"Somthing went wrong"});
                throw err;
            }
            if(isMatch)
            {
                console.log('logged in');
                const token=jwt.sign({data: user},'Hello world',{
                    expiresIn:604800  // 1 Week
                });       
			res.json({
				success:true, 
				msg:"Successfully login",
				token:`Bearer ${token}`,
				user:{
                    _id        :   user._id,
                    name      :   user.name,
                    username  :   user.username,
                    branch      :   user.branch,
                    booksissued:[] =   user.booksissued
                } 
			});	
		}
		else
		{
			return res.json({success:false,msg:"Wrong password"});
		}
		});
	});

});

app.get("/logout", function(req, res){

    req.logout();
    console.log("User Logged Out!!");
    res.json();
});


function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.username==="admin"){
                res.redirect("/admin");
            }else{
                return next();
            }  
            }
        else{
            res.redirect("/login");
        }
    }
    


app.listen(3000||process.env.PORT,function(err){
    console.log("server started");
})