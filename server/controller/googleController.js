// const express = require("express");
const firebase = require("firebase");
const admin = require('firebase-admin');

// const app = express();
// app.use(express.json());

const auth=require("firebase")




const firebaseConfig = {
  apiKey: "AIzaSyB8Xxx69kJQNE4Ngngc3gKDGBFcW8bY_0g",
  authDomain: "voosh-f14c5.firebaseapp.com",
  projectId: "voosh-f14c5",
  storageBucket: "voosh-f14c5.appspot.com",
  messagingSenderId: "257372168294",
  appId: "1:257372168294:web:602c369fae3a2e4dffcda7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");




//------------------signup with email verification--------------------------------

exports.signup=async(req,res)=>{
    try{
      if(!req.body.email||!req.body.password){
            return res.send({ success: false, msg:"Email and Password not found"})
          }
          else{
          const result= await firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.password)
        await result.user.updateProfile({
          displayName:"User"
        })
            await result.user.sendEmailVerification()
            console.log(result);             
             return res.status(200).json({success: true,status:"Registration Successfull"})
              // console.log(result);
          }
    }catch(e){
      res.status(401).send(e)
    }
  }

//------------------signin----------------------------------------
exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Both email and password are required' });
      }
  
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          return res.status(200).json({ success: true, message: 'Successfully signed in' });
        })
        .catch(function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;
  
          if (errorCode === 'auth/user-not-found') {
            return res.status(401).json({ error: 'User not found' });
          } else {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
        });
    } catch (error) {
      // Handle other errors, if any
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  