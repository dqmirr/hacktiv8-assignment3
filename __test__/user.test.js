const request = require("supertest")
const app = require("../app")
const {User} = require("../models")
const {generateToken} = require("../helpers/jwt")

describe("POST /user/register", ()=>{

    it("should be response 201", (done)=>{
        request(app)
        .post("/users/register")
        .send({
            username:"admin1",
            email:"admin1@mail.com",
            password:"1234567"

        })
        .expect(201)
        .end((err, res)=>{
            if(err){
            done(err);
        }
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("username")
        expect(res.body.username).toEqual("admin1")
        done()
        })
    })

    //error response
    it("should be response 500", (done)=>{
        request(app)
        .post("/users/register")
        .send({
            username:"admintest",
            email:"admintest@mail.com",
            password:"1234567"

        })
        .expect(500)
        .end((err, res)=>{
            if(err) done(err);
        })
        done()
    })

    afterAll(async()=>{
        try{
            await User.destroy({where:{}})
        }catch(error){
        console.log(error);
    }
    });
})

//login
describe("POST /users/login", ()=>{
    afterAll(async()=>{
        try{
            await User.destroy({where:{}})
        }catch(error){
            console.log(error);
        }
    });

    beforeAll(async () => {
        try {
          const result = await User.create({
            username: "admintest1",
            email: "admintest1@mail.com",
            password: "1234567"
          });
        } catch (error) {
          console.log(error);
        }
      });

    it("should response 200", (done)=>{
        request(app)
        .post("/users/login/")
        .send({
            email:"admin1@mail.com",
            password:"1234561"
        })
        .expect(200)
        .end((err, res)=>{
            if(err) {
                done(err)
            }
            expect(res.body).toHaveProperty("access_token")
                
        })
        done();
    })
    // it("should response 400", (done) =>{

    // })

})