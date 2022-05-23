//requires
const express = require( 'express' );
const app = express();
const todo_list_router = require( './modules/todo_list_router' );

//globals
const PORT = process.env.PORT || 5001;

//uses
app.use( express.static( 'server/public' ) );
app.use( '/todo_list_router', todo_list_router );

//spin up server
app.listen( PORT, ()=>{
    console.log( 'Heyo!' );
    console.log( 'listening on port:', PORT ); 
})