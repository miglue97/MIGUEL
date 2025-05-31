require ('dotenv').config();

const app = require('./app'); 
require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}; 

main(); 

console.log('MongoDB URI:', process.env.MONGODB_URI);

 