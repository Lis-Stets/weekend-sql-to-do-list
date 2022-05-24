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
router.post( '/', (req, res )=>{
    console.log( '/router POST:', req.body );
    //run INSERT query with sanitized inputs (ex: $1, $2, etc)
    let queryString = `INSERT INTO to_do ( priority, task ) VALUES ( $1, $2 );`;
    let values = [ req.body.priority, req.body.task ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( (err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

//put route

//delete route



module.exports = router;