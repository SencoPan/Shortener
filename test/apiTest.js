let URL = require("../models/URL");
let mongoose = require("mongoose");

let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../app");

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("URLs", () => {
  describe("/DELETE URL", () => {
    it("it should DELETE all in URL", (done) => {
      URL.remove({}, (err) => {
        done();
      });
    });
  });

  describe("/POST URL", () => {
    it("it should not POST a URL without URL field", (done) => {
      const test = (server) => {
        chai
          .request(server)
          .post("/")
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      };
      !(server instanceof Promise)
        ? test(server)
        : server.then((app) => test(app));
    });
    it("it should POST a URL", (done) => {
      const test = (server) => {
        let url =
          "https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js";

        chai
          .request(server)
          .post("/")
          .set("content-type", "application/x-www-form-urlencoded")
          .send({ url })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      };
      !(server instanceof Promise) ? test() : server.then((app) => test(app));
    });
  });
  describe("REDIRECT URL", () => {
    it("it should redirect user", (done) => {
      const test = async (server) => {
        const url = await URL.findOne();

        chai
          .request(server)
          .get(`/${url.shortVersion}`)
          .redirects(0)
          .end((err, res) => {
            res.should.redirectTo(`${url.URL}`);
            done();
          });
      };
      !(server instanceof Promise) ? test() : server.then((app) => test(app));
    });
  });
  describe("/GET URL", () => {
    it("it should be a control test", (done) => {
      const test = (server) => {
        chai
          .request(server)
          .get("/api/getAll")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(1);
            done();
          });
      };
      !(server instanceof Promise) ? test(server) : server.then((app) => test(app));
    });
  });
});
