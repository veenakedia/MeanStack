var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://veena:veena@ds111922.mlab.com:11922/meantodos_vk', ['todos']);

//get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        }
        else{
            res.json(todos);
        }
    });
})


//get single todo
router.get('/todo/:id', function(req, res, next){
    console.log(req.params._id);
    db.todos.findOne({
        _id:mongojs.ObjectId(req.params.id)
    },function(err, todo){
        if(err){
            res.send(err);
        }
        else{
            res.json(todo);
        }
    });
})

//save  todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error":"invalid data"
        })
    }else{
        db.todos.save(todo, function(err,result){
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        })
    }
})


//update  todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};
    if(todo.text){
        updObj.text = todo.text;
    }

    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(!updObj)
    {
        res.status(400);
        res.json({
            "error": "invalid data"
        });
    }else{
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj,function(err,result){
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        });
    }

})

//delete  todo
router.delete('/todo/:id', function(req, res, next){

    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'',function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }
    });

})
module.exports = router;