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
})// end POST route

//put route
router.put( '/', ( req, res )=>{
    console.log( '/router PUT:', req.query );
    //run PUT query with sanitized inputs (ex: $1, $2, etc)
    let queryString = `UPDATE to_do SET done = NOT COALESCE( done ) WHERE id=$1;`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( (err)=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})// end PUT route

//delete route
router.delete( '/', ( req, res )=>{
    console.log( '/router DELETE:', req.query );
    //run DELETE query with sanitized inputs (ex: $1, $2, etc)
    let queryString = `DELETE FROM to_do WHERE id=$1`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})// end DELETE route


module.exports = router;