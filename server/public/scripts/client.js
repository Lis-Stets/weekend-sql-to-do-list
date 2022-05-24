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
    $( '#addTaskButton' ).on( 'click', addTask );
    //this function holds all the requests for jQuery to listend for clicks on our buttons and check boxes
}

function addTask(){
    console.log( 'in addTask' );
    let priorityLevel = 0
    // conditional to determine each task's priority level
    if( $( '#importanceInput' ).val() === 'Important' && $( '#urgencyInput' ).val() === 'Urgent' ){
        priorityLevel = 1;
        console.log( priorityLevel );
    }
    else if( $( '#importanceInput' ).val() === 'Important' && $( '#urgencyInput' ).val() === 'Not Urgent' ){
        priorityLevel = 2;
        console.log( priorityLevel );
    } 
    else if( $( '#importanceInput' ).val() === 'Unimportant' && $( '#urgencyInput' ).val() === 'Urgent' ){
        priorityLevel = 3;
        console.log( priorityLevel );
    }
    else if( $( '#importanceInput' ).val() === 'Unmportant' && $( '#urgencyInput' ).val() === 'Not Urgent' ){
        priorityLevel = 4;
        console.log( priorityLevel );
    }
    else{
        console.log( 'error in priority conditional' );
    }
    //collect the input values and put them in an object to send
    let newTask = {
        priority: priorityLevel,
        task: $( '#taskInput' ).val()
    }
    console.log( 'sending:', newTask );
    //make POST request to server to send newTask object
    $.ajax({
        method: 'POST',
        url: '/todo_list_router',
        data: newTask
    }).then( function( response ){
        console.log( 'back from POST:', response );
        //run get function if successful
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error adding task' );
    })
}// end addTask

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