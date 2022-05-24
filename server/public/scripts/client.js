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
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOutput' ).on( 'click', '.deleteButton', deleteTask ); //allows us to click a dynamically created button
    $( '#tasksOutput' ).on( 'click', '.doneCheckbox', updateDone ); 
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
    else if( $( '#importanceInput' ).val() === 'Unimportant' && $( '#urgencyInput' ).val() === 'Not Urgent' ){
        priorityLevel = 4;
        console.log( priorityLevel );
    }
    else{
        priorityLevel = 1;
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
    })//end POST
}// end addTask

function deleteTask(){
    console.log( 'in deleteTask', $( this ).data( 'id' ) );
    $.ajax({
        method: 'DELETE',
        url: `/todo_list_router?id=${ $( this ).data( 'id' ) }`
    }).then( function( response ){
        console.log( response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting task' );
    })//end DELETE
}// end deleteTask

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
           
            let doneText = "";
            if( response[i].done ){
                doneText= "Done.";
            }
            let priorityClass = "priorityLevel"+response[i].priority;
            
            el.append(
                `<tr>
                    <td><input type= "checkbox" class="doneCheckbox" data-id="${response[i].id}"/>${doneText}</td>
                    <td id="priorityLevelOut" class="${priorityClass}">${response[i].priority }</td>
                    <td>${response[i].task}</td>
                    <td><button class="deleteButton" data-id="${response[i].id}">bin it.</button></td>
                </tr>`
            )
        }//end for

            // //create variable to hold conditional to style and append priority level
            // let priorityEl = ${'#priorityLevelOut'};
            // if( response[i].priority === 1 ){
            //     priorityLevelOut = `<td style="background-color:#7B0828;"><select>
            //                             <option>Update</option>
            //                             <option>1</option>
            //                             <option>2</option>
            //                             <option>3</option>
            //                             <option>4</option>
            //                         </select></td>`
            // }//end if priorityLevel 1
            // else if( response[i].priority === 2 ){
            //     priorityLevelOut = `<td style="background-color:#FFBD00;"><select>
            //                             <option>Update</option>
            //                             <option>1</option>
            //                             <option>2</option>
            //                             <option>3</option>
            //                             <option>4</option>
            //                         </select></td>`
            // }//end else if priorityLevel 2
            // else if( response[i].priority === 3 ){
            //     priorityLevelOut = `<td style="background-color:#79B473;"><select>
            //                             <option>Update</option>
            //                             <option>1</option>
            //                             <option>2</option>
            //                             <option>3</option>
            //                             <option>4</option>
            //                         </select></td>`
            // }//end else if priorityLevel 3
            // else if( response[i].priority === 4 ){
            //     priorityLevelOut = `<td style="background-color:#A0A4B8;"><select>
            //                             <option>Update</option>
            //                             <option>1</option>
            //                             <option>2</option>
            //                             <option>3</option>
            //                             <option>4</option>
            //                         </select></td>`
            // }//end else if priorityLevel 4
            //add done conditional here
            // if( response[i].done === true )
    })
}// end getTasks

function updateDone(){
    console.log( 'in updateDone:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'PUT',
        url: `/todo_list_router?id=${ $( this ).data( 'id' ) }`
    }).then( function( response ){
        console.log( response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error updating done status' );
    })//end PUT 
}// updateDone

function taskDoneCheck(){

}