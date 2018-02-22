function apiResponseService() {

}
apiResponseService.prototype.success = function(data = null){
  return { 'status' : 'success', 'data' : data };
}
apiResponseService.prototype.error = function(message = ''){
  return { 'status' : 'error', 'message' : message };
}
module.exports = new apiResponseService();
