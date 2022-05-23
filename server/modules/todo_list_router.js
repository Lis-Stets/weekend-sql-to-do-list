//require node to use express and store it in the variable express
const express = require( 'express' );
const router = express.Router();

const pool = require( '../modules/pool' );

//get route
router.get( '/', (req, res )=>{
    console.log( '/router GET' );
    let queryString = `SELECT * FROM to_do`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})// end GET route

//post route

//put route

//delete route



module.exports = router;