/* Practica server usando post */
const servidor = require ('http');
const { stringify } = require('querystring');

const server = servidor.createServer((req,res)=>{
    console.log('Incoming Request');
    console.log(req.method, req.url);

   if(req.method === 'POST'){
    let body = '';
    let pass = '';
  
    req.on('data', (chunk)=>
      {
        
        body += chunk;
        pass += chunk;
      });

    req.on('end', ()=>{
        let userpass = pass.split('=')[2];
        let prime =body.split('&')[0];
        let username = prime.split('=')[1]+'\n'+userpass;
        res.end(username);
        
        
      });
   }
   else{
    res.setHeader('Content-Type','text/html')
    res.end('<form method="POST"><label> Usuario </label><input type="text" name="username"></input><br><br><label>Password </label><input type="text" name="password"></input><br><br><button type="submit">Enviar</button></form>');
   } 
   
// res.end('<form method="POST"><input type="text" name="username"></input><button type="submit">Create User</button></form>');
   

});

server.listen(5001);