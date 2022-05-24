//check javaScript is sourced properly
console.log( 'js' );

//set up which functions will be run on page load
$( document ).ready( function(){
    //check JQuery is sourced properly
    console.log( 'JQ' );
    //establish Click Listeners
    setupClickListeners();
    //load all existing tasks on page load
    getTasks();
});// end doc ready

function setupClickListeners(){
    //this function holds all the requests for jQuery to listend for clicks on our buttons and check boxes
}

function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
        method: 'GET',
        url: '/todo_list_router'
    }).then( function( response ){
        console.log( response );
        //append tasks here
        let el = $( '#tasksOutput' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append(
                `<tr>
                    <td><input type= "checkbox"/></td>
                    <td><select>
                        <option>Update</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select></td>
                    <td>${response[i].task}</td>
                    <td><button class="deleteButton" data-id="">bin it.</button></td>
                </tr>`
            )
            //add done conditional here
            // if( response[i].done === true )
            //add priority conditional here
                
        }//end for
    })
}