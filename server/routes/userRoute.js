const express = require("express");
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const user = require('../model/userModel');
const client = new OAuth2Client("89374715760-1elsiqujg5ti455h4kf82c8h9ipjci69.apps.googleusercontent.com");


router.post("/register", (req, res) => {
  user.find({ email: req.body.email }, (error, data) => {
    if (data.length > 0) {
      return res.status(200).json({
        message: "user already register",
      });
    } else {
      const { name, email, password } = req.body;
      const _user = new user({
        name,
        email,
        password,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(200).json({
            message: "User created successfully",
          });
        }
      });
    }
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
});

router.post("/login", (req, res) => {
  user
    .find({ email: req.body.email, password: req.body.password })
    .exec((error, user) => {
      //if (error) return res.status(400).json({ error });
      if (user.length > 0) {
        const users = {
          id: user[0]._id,
          name: user[0].name,
          email: user[0].email,
        };
        res.send(users);

        //  return res.status(200).json({

        //   });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    });
});

router.get("/getallusers", (req, res) => {
  user.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({
        message: "something sent worng",
      });
    } else {
      res.send(docs);
    }
  });
});


router.post('/deleteuser', (req, res) => {
  user.findByIdAndRemove(req.body.userid, (err) => {


    if (err) {
      return res.status(400).json({
        message: "something sent worng",
      });
    } else {
      res.send("user deleted successfully");
    }



  })
});

router.post('/update', (req, res) => {
  const { userid, updateduser } = req.body
  console.log(userid)
  user.findByIdAndUpdate(userid, {
    name: updateduser.name,
    email: updateduser.email,
    password: updateduser.password,


  }, (err) => {
    if (err) {
      return res.status(400).json({ message: "something went worng" + err })
    } else {
      res.send("userdetail updated successfully")

    }
  })
});


router.post('/googlelogin', (req, res) => {
  const response = req.body;
  const tokenId = response.tokenId
  client.verifyIdToken({ idToken: tokenId, audience: "89374715760-1elsiqujg5ti455h4kf82c8h9ipjci69.apps.googleusercontent.com" }).then(response=> {
    const { email_verified, name, email } = response.payload;
   // console.log(res.payload)
    if(email_verified){
    
      //console.log("user verified")
      user.findOne({ email }).exec((error, data) => {
        if (error) {
          return res.status(400).json({
            error: "something went wrong"
          })
        } else {
          if (data) {
            const users = {
              id: data._id,
              name: data.name,
              email: data.email
            }
            
            res.send(users)
          }
          else {
            let password = email + Math.random();
            const _user = new user({
              name,
              email,
              password

            });

            _user.save((error, data) => {
              if (error) {
                return res.status(400).json({
                  message: "Something went wrong",
                });
              }

              if (data) {

                const users = {
                  _id: data._id,
                  name: data.name,
                  email: data.email
                }
                res.send(users)
                // console.log(users)
                // console.log("login success")
                
              }
            })
          }
        }
      })
    }
  })
  //console.log(tokenId)

});

module.exports = router;
