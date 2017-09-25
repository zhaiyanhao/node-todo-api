const expect= require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} =require('./../models/todo');

const todos = [{
    text:'First to do'
    },{
        text:'Second to do'
    }];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
    //done();
    Todo.insertMany(todos);
    }).then(()=> done());
});

describe('Post/todos',()=>{
   it('should create new to do',(done)=>{
       var text = "test todo test";

       request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    done();
                });
            });
    }) ;
});

describe('GET/todo',()=>{
    it('should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});