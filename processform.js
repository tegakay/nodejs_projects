var http = require('http');
const fs = require('fs');

function homepage (req, res){
    fs.readFile('form.html', function(err, data) {
        console.log(req.url);
        console.log('homepage')
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
};

function next(req, res){
    console.log(req.url);
    console.log('next')
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>Nice</h1>');
    res.end(); 
}

http.createServer(function(req,res) {
   
    
      switch(req.method){
            case 'GET':
                switch(req.url) {
                    case '/':
                     homepage(req, res);
                      break;
                    default:
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write('<h1>Not Found click <a href ="/">Here</a></h1>');
                        res.end(); 
                  }
                break;
            
           case 'POST':
               if (req.url = '/'){
                   let body = '';
               req.on('data', function(chunk) {
                      body+= chunk.toString();
                      if (body.length > 1e7) {
                        res.writeHead(413, {'Content-Type': 'text/html'});
                        res.write('<h1>Error!!! file large</h1>');
                        res.end(); 
                      }
               });
               req.on('end',() => {
                   console.log(body);
                   fs.appendFile('users.txt', body + '\n\n\n' , function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                  });
                })
               res.end("<h1>Upload Succesful <a href = "/">home</a></h1> ")
                   
               }
           break;
           default:
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Upload Successful <a href ="/">Here</a></h1>');
            res.end();
               
      }
                
}).listen(8080)