//requires
const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 5001;

//uses
app.use ( express.static( 'server/public' ) );

//routes
app.listen(PORT,()=>{
    console.log( 'Woop there it is' );
    console.log( 'listening on port:', PORT ); 
})