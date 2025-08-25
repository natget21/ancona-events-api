import jwt from 'jsonwebtoken';
import config from '../config/config.js';

let isAuthenticated = (req,res,next) => {
	let bearerHeader = req.headers["authorization"];

	if(typeof bearerHeader !== 'undefined'){
		let bearer = bearerHeader.split(" ");
		let bearerToken = bearer[1];
		jwt.verify(bearerToken,config.JWT_SECRET,function(err,pass){
			if(err){
				res.status(401).send("Authentication Failed");
			}else{
				req.id = pass.id;
				req.role = pass.role;
				req.token = bearerToken
				next();
		    }
	  	});
	}else{
		res.status(401).send("Authentication Failed");
	}
}

let isUser = (req, res, next) => {
	if (req.id == req.params.userId){
		next();
	}else{
		res.status(403).send("Invalid User Token");
	}
}

let isAdmin = (req, res, next) => {
	if (req.role == "admin") {
		next();
	} else {
		res.status(403).send("Role Not Authorized");
	}
}

let isRole = (...roles) => (req, res, next) => {
  if (roles.includes(req.role)) {
    return next();
  }
  return res.status(403).json({ message: 'Role Not Authorized' });
};


export default {
  isAuthenticated,
  isUser,
  isAdmin,
  isRole
};