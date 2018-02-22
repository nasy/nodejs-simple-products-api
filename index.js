var app = require('express')();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var productRoutes = require('./route/productRoutes');
var stockRoutes = require('./route/stockRoutes');
var mongoose = require('mongoose');
if(app.get('env') == 'test'){
  mongoose.connect('mongodb://database/mean-docker-test');
}else{
  mongoose.connect('mongodb://database/mean-docker');
}
app.use(bodyParser.json());
app.use('/', productRoutes);
app.use('/', stockRoutes);
http.listen(3000, function(){
  console.log('listening on *:3000');
});
module.exports = app; // REQUIRED FOR TESTING
