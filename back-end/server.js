const express = require('express'); 
const app = express();              
const port = 3000;     
const path = require('path');   
const cors = require("cors");



app.use('/front-end', express.static('../front-end/'));
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
app.use('/images', express.static('images'));

app.use(cors());
app.use(cors({
    exposedHeaders: ['Location'],
}));



///////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {       
    res.sendFile(path.join(__dirname + '/../front-end/views/', '/index.html'));      
                                                        
});
/*
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/../front-end/views/', '/register'));
});
*/
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname +'/../front-end/views/register.html'));
  });

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname +'/../front-end/views/index.html'));
  });

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/home.html'));
})

app.get('/perfil', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/perfil.html'));
})


app.get('/profile.png', function (req, res) {       
    res.sendFile(path.join(__dirname + '/../front-end/images/profile.png'));      
                                                        
});
///////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {            
    console.log('AdminWeb a correr na porta: ' + port);
});


module.exports = app;
require('./loader.js');


