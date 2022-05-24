//check javaScript is sourced properly
console.log( 'js' );

//set up which functions will be run on page load
$( document ).ready( function(){
    //check JQuery is sourced properly
    console.log( 'JQ' );
    //establish Click Listeners
    setupClickListeners();
    //load existing Koalas on page load

});// end doc ready

function setupClickListeners(){
    //this function holds all the requests for jQuery to listend for clicks on our buttons and check boxes
}