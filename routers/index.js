var express = require('express');
var db = require('../models/db.js');
var router = express.Router();

router.post('/submit', function(req, res) {
    var date = new Date();
    var time = date.getTime();
    var msg = {
        msg: req.body.msg,
        used:false,
        time:time
    };
    console.log(msg)
    var newMsg = new db(msg);
    newMsg.save(function(err, msg) {
        if (err) {
            console.log('err');
            res.json({
                succ: false,
                msg:'提交失败'
            })
        };console.log(msg)
        if (msg.msg == req.body.msg) {
            res.json({
                succ:true
            });
        };
    });
});
router.get('/query',function(req,res){
    var updt = function(msg){
        msg.used=true;
        msg.flg = msg._id;
        var newMsg = new db(msg);
        newMsg.update(function(err,succ){
            if (err) {
                console.log(err);
            }
        }) 
    }
    var ndb = new db({});
    ndb.query(function(err,msgs){
        if (err) {
            console.log(err);
            res.json({
                succ:false
            });
        };
        if (msgs.length ===0) {
            res.json({
                succ:false,
                msg:'无坑'
            });
        }
        if (msgs.length >1) {
            var num = Math.round(Math.random()*msgs.length);
            num>1? true:num =1;
            res.json({
                succ:true,
                msg:msgs[num-1]
            });
            updt(msgs[num-1]);
        };
        if (msgs.length ===1) {
            res.json({
                succ:true,
                msg:msgs[0]
            })
            updt(msgs[0]);
        };
    })
});
module.exports = router;
