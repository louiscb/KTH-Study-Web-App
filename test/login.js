//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST login', () => {
     it('it should successfully login to app', (done) => {
       let loginUser = {
         email: 'admin',
         password: 'admin'
       }
       chai.request(server)
           .post('/login')
           .send(loginUser)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.msg.should.be.eql('success');
             done();
           });
     });
 });
