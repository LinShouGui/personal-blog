const express=require('express');
const router=express.Router();
const api=require('../api');
const checkToken=require('../middleWares/checkToken.js');

router.post('/updateUserAva',checkToken,function(req,res,next){
    let name = req.body.name,
        imgBase = req.body.file;
    var user = {
        avatar:imgBase
    }
    if(name&&user){
        api.updateUserByName(name,user).then(({result:{ok,n}})=>{
            if(ok&&n>0){
                return res.json({
                    code:200,
                    message:'更改用户头像成功'
                });
            }
            return res.json({
                code:-200,
                message:'更改用户头像失败',
            })
        }).catch(err=>{
            if(err.message.match('E11000 dulplicate key')){
                return res.json({
                    code:-200,
                    message:'用户名重复'
                });
            }
            return res.json({
                code:-200,
                message:err.toString()
            });
        });
    }
});
router.post('/getOneUserAva',checkToken,function(req,res,next){
      
      let name = req.body.name;
      if(!name){
          return res.json({
              code:-200,
              user:null
          })
      }
     api.getPersonByName(name).then((user)=>{
          if(user){
             // let imgData = user.avatar;
              return res.json({
                  code:200,
                  user:user
              })
          }
          return res.json({
              code:-200,
              user:null
          })
     }).catch(err=>{
         return res.json({
             code:-200,
             user:err.toString()
         })
     });
});
module.exports=router;