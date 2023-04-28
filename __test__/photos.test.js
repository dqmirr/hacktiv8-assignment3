const request = require("supertest");
const app = require("../app");
const { Photo, User } = require("../models");
const { generateToken } = require("../helpers/jwt")

let access_token;
let user;

describe("POST /photos/", ()=>{
    beforeAll (async () =>{
        try {
            user = await User.create({
                username: "admintest",
                email: "admintest@mail.com",
                password: "1234567",
              });
    
            access_token = await generateToken({
                id : user.id,
                username : user.username,
                email : user.email
            
            
            })
            await request(app)
            .post("/users/login")
            .send(user)
            .expect(200)
            .end()
            
        } catch (error) {
            console.log(error);
        }
        
    })
    
    
    it("should response 200", (done)=>{
        request(app)
        .post("/photos/")
        .set({"access_token": `${access_token}`})
        .send({
        title: "testPhoto",
        caption: "testPhoto caption",
        image_url: "http://testPhoto.com"

        })
        .expect(201)
        .end(async (err, res)=>{
            if(err){
            done(err)
        }
        const photos = await Photo.findAll();
        expect(photos.length).toBe(1);
        expect(photos[0].title).toEqual('testPhoto');
        expect(photos[0].caption).toEqual('testPhoto caption');
        expect(photos[0].image_url).toEqual('http://testPhoto.com');
        expect(photos[0].user_id).toEqual(photos[0].user_id);
        
            })
        done()
        })
        
    it("should be response 401", (done) =>{
        request(app)
        .get("/photos/")
        .set({"access_token": ``})
        .expect(401)
        .end((err, res) => {
        if (err) {
            done(err);
        }

        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Token not provided");
        done();
        })
    })

    afterAll(async()=>{
        try{
        await User.destroy({where:{}})
        }catch(error){
        console.log(error);
            }
        })
        
    })
    

describe("GET /photos/", ()=>{
    beforeAll(async ()=>{  
        try {
            const photo = Photo.create({        
                title:"testPhoto",
                caption: "testPhoto caption",
                image_url: "http://testPhoto.com"
            })
                await request(app)
                .post("/photos/")
                .send(photo)

                user = await User.create({
                    username: "admintest1",
                    email: "admintest1@mail.com",
                    password: "12345678",
                  });

                access_token = generateToken({
                    id: user.id,
                    username: user.username,
                    password: user.password
                })

            }catch(error){
                console.log(error)
            }
        });
    
        it("should be response 200", (done) =>{
            request(app)
            .get("/photos/")
            .set({"access_token": `${access_token}`})
            .expect(200)
            .end((err, res)=>{
                if(err){
                    done(err)
            }
                expect(res.body.data[0]).toHaveProperty("title")
                expect(res.body.data[0]).toHaveProperty("caption")
                expect(res.body.data[0]).toHaveProperty("image_url")
                expect(res.body.title).toEqual("testPhoto")    
        })
        
        done()    
        
        })
    
    it("should be response 401", (done) =>{
        request(app)
      .get("/photos/")
      .set({"access_token": ``})
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Token not provided");
        done();
      })
  })

  afterAll(async () => {
    try {
      await Photo.destroy({ where: {} });
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  })

})

describe("GET /photo/:id", () =>{
    beforeAll(async ()=>{
        try {
            const photo = Photo.create({        
                title:"testPhoto",
                caption: "testPhoto caption",
                image_url: "http://testPhoto.com"
            })

            await request(app)
            .post("/photos/")
            .send(photo)

            user = await User.create({
                username: "admintest1",
                email: "admintest1@mail.com",
                password: "12345678",
              });

            access_token = generateToken({
                id: user.id,
                username: user.username,
                password: user.password
            })

        }catch(error){
            console.log(error)
        }        
    })

    it("should be response 200", (done) =>{
    request(app)
      .get(`/photo/${photo.id}`)
      .set({"access_token": `${access_token}`})
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
            }
        expect(res.body.data[0]).toHaveProperty("id")
        expect(res.body.data[0]).toHaveProperty("title")
        expect(res.body.data[0]).toHaveProperty("caption")
        expect(res.body.data[0]).toHaveProperty("image_url")
        expect(res.body.title).toEqual("testPhoto")
        done()
        })
    })

    it("get photo by id response 404", (done) => {
        request(app)
          .get(`/photo/1`)
          .set("authorization", `Bearer ${token}`)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            // cek API response
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toEqual("data not found");
            done();
          });
      });

      afterAll(async () => {
        try {
          await Photo.destroy({ where: {} });
          await User.destroy({ where: {} });
        } catch (error) {
          console.log(error);
        }
      })
})


