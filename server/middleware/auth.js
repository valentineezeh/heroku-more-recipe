import jwt from 'jsonwebtoken';
import db from '../models/';

// require('dotenv').config();

import all from '../controller/user';

const secret = 'thelordismyhelperishallnotwant';
//const User = db.User;

const Auth = {
  
  // function to authenticate access to users with a token
   verify: (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;
    //console.log(authorizationHeader)

    if(authorizationHeader){
      token = authorizationHeader.split(' ')[1];
      //console.log(token)
    }
      
    if(token){
      jwt.verify( token, secret, (err, decoded) => {
        if(err){
          res.status(401).json({ error: 'Failed to authenticate.'})
        }else{
          
         req.decoded = decoded;
         console.log(decoded)
         next();
        }
      });
    }else{
      res.status(403).json({
        error: 'No Token Provided.'
      })
    } 



  // verify(req, res, next) {
  //   const token = req.headers.Authorization;
  //   if (token) {
  //     jwt.verify(token, secret, (err, decoded) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(401).send({ message: 'You do not have Permission to this Page' });
  //       } else {
  //         // if everything is good, save to request for use in other routes
  //         req.decoded = decoded;
  //         next();
  //       }
  //     });
  //   } else {
  //     res.status(401).send({ message: 'No token provided' });
  //   }
  // },
}

}

export default Auth;
