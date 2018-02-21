const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
let app = require("../server");
chai.use(chaiHttp);

describe("Tests", function() {
    describe("Functionla Test", function() {
        it("createProject", function(done) {
            chai.request(app)
                .post('/api')
                .send({
                    project_name: "pr10"
                })
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'response status should be 200');
                    assert.equal(res.type, 'text/html', "Response should be json");
                    assert.include(res.text, 'pr10', 'string contains substring');

                    done();
                });
        });
    });
});