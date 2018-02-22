var chai = require('chai');
var expect = chai.expect;
var apiResponseService = require('./../../../service/apiResponseService');
describe('apiResponseService', function() {
  it('success should return an array', function() {
    var response = apiResponseService.success('TEST');
    expect(response.status).to.equal('success');
    expect(response.data).to.equal('TEST');
  });
  it('error should return an array', function() {
    var response = apiResponseService.error('TEST');
    expect(response.status).to.equal('error');
    expect(response.message).to.equal('TEST');
  });
});
