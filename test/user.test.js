const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/index");
const should = chai.should();

chai.use(chaiHttp);

describe("User Registration", () => {
  it("should register a new user on POST /register", (done) => {
    let user = {
      username: "newuser" + Date.now(),
      email: `newuser${Date.now()}@example.com`,
      password: "password" + Date.now(),
    };
    chai
      .request(server)
      .post("/register")
      .send(user)
      .end((err, res) => {
        should.exist(res);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User registered");
        res.body.should.have.property("userId");
        done();
      });
  });
});
