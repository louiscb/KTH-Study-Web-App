//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET groups', () => {
  it('it should GET all groups', (done) => {
    chai.request(server)
      .get('/groups/list')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
  });
});

var groupId = '';

describe('/POST groups', () => {
  it('it should POST a new group', (done) => {
    let newGroup = {
      'subject' : 'test',
      'location' : 'test',
      'description' : 'test'
    }

    chai.request(server)
      .post('/groups/create')
      .send(newGroup)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.be.eql('success');
          groupId = res.body.link;
        done();
      });
  });
});

describe('/DELETE groups', () => {
  it('it should DELETE the group we just made', (done) => {
    chai.request(server)
      .delete('/groups/delete/' + groupId)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.be.eql('success');
        done();
      });
  });
});
