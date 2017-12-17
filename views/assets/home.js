
$(document).ready(function () 
{ 
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(SH)
    .fail(error_)




    ListofContacts(); 
    $("#gohome").click(ListofContacts); 
    $("#addnew").click(newContact);

   

    $('#submit').click(() => {
            
            const user = { 
                name: $('input[name=name]').val(),
                email: $('input[name=email]').val(),
                phone: $('input[name=phone]').val()
            }
            if (val(user) == true){
                const requestData = JSON.stringify(user) 
            
                $.ajax({
                        type: 'POST',  
                        url: 'api/user', 
                        data: requestData, 
                        dataType: 'json',
                        contentType: 'application/json',
                    })
                    .done(SH)
                    .fail(error_)
                    detailsreceive(user); 
                }   
            $.ajax({ 
                    type: 'POST',  
                    url: 'api/user', 
                    data: requestData,
                    dataType: 'json',
                    contentType: 'application/json',
                })
                .done(SH) 
                .fail(error_)
                  
    })
            

    $("#submit").click(function(user){ 
        detailsreceive(user);
        $("#specificdetail").show();
        $("#ListofContacts").hide();
        $("#newcontact").hide();
        $("#editpage").hide();

    })   
})


function val(user)
{ 
    var checkphone = /^((?![0-1])[0-9]{10})$/g;
    if(checkphone.test(user.phone) == false){
        alert("Phone number must be 10 numbers long and cannot start with 0 or 1");
        return false;
    }
    

    var checkemail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (checkemail.test(user.email) == false) {
        alert('Email is not valid please try again.');
        return false;
    }
    if (user.name.length == 0){
        alert('Please enter a name');
        return false;
    }
    return true;
}

function SH(users) {
    console.log(`Response has ${users.length} users`)
    var $table = $( "<table border='1'><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th></table>" );
    for ( let index = 0; index < users.length; index++ ) { 
        const user = users[index]
        const $line = $( "<tr></tr>" )
        $line.append( $( "<td></td>" ).html( user.id ) )
        $line.append( $( "<td></td>" ).html( user.name ) )
        $line.append( $( "<td></td>" ).html( user.email ) )
        $line.append( $( "<td></td>").html( user.phone ) )
        $line.append( $( "<td>")) 
        

        const blu = $( "<button id = 'blue'>/button>" ).text('Details');
        $line.append(blu)
       

        const YE = $( "<button id = 'yellow'>/button>" ).text('Edit');
        $line.append(YE)
    

        const RD = $( "<button id = 'red'>/button>" ).text('Delete');
        $line.append(RD)
        $line.append( $( "</td>"))
        $table.append( $line )
            

            RD.click(() => {
                const confirmDelete = confirm("You sure you want to delete?")
                if (confirmDelete) { 
                    Delete(user.id); 
                    ListofContacts(); 
                }
            })

            blu.click(() => {
                detailsreceive(user);
            })

            YE.click(() => { 
                editPage(user);
            })


    }

    $('#output').empty()
    $table.appendTo( $('#output') ) 
    detailOutput(users); 
    
}



function error_(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}



function ListofContacts(){ 
    $("#ListofContacts").show();
    $("#newcontact").hide();
    
    $("#editpage").hide();
    $("#specificdetail").hide();
}





function newContact(){ 
    $("#newcontact").show();
    $("#ListofContacts").hide();
   
    $("#editpage").hide();
    $("#specificdetail").hide();
}




function detailPage(user){ 
    $('#specificusercontent').empty();
    user=JSON.parse(user)
   
    $('#specificusercontent').html('<label for="name">Name: </label><strong>'+user.name+'</strong><br><label for="email">Email: </label><strong>'+user.email+'</strong><br><label for="phone">Phone: </label><strong>'+user.phone+'</strong>')

    const YE = $("<button id = 'editdetail'></button>").text('Edit');
    YE.click(() => { 
        editPage(user) 
    });
    $('#specificusercontent').append(YE) 
    const RD = $("<button id = 'deletedetail'></button>").text('Delete');
    RD.click(() => {
        const confirmDelete = confirm("Are you sure?")
        if (confirmDelete) {
            Delete(user.id);
            ListofContacts();
        }
    })
    $('#specificusercontent').append(RD)


    $("#specificdetail").show(); 
    $("#ListofContacts").hide();
    $("#newcontact").hide();
    $("#editpage").hide();
    $("#detailoutput").hide();
}



function editPage(user){
    $("#detailoutput").hide();
    $("#ListofContacts").hide();
    $("#newcontact").hide();
    $("#editpage").show();
    $("#specificdetail").hide();

    $('input[name=nameedit]:text').val(`${user.name}`);
    $('input[name=emailedit]:text').val(`${user.email}`);
    $('input[name=phoneedit]:text').val(`${user.phone}`);
   
    const edsub = $("<button id = 'submit'></button>").text('Submit');
    $('#editbutton').html(edsub);
    edsub.click(() => { 
        let changed = { 
            id: user.id,
            name: $('input[name=nameedit]').val(),
            email: $('input[name=emailedit]').val(),
            phone: $('input[name=phoneedit]').val(),
        }
        if (val(changed) == true){
                
            alert("Change Updated Successfully.") 
            User_Edit(changed);
            ListofContacts(); 
        }
        else{
            editPage(user); 
        }
    });
}



function Delete(id){ 
    $.ajax({
        type: 'DELETE',
        url: `api/user/${id}`,
        dataType: 'json',
    })
    .done(SH)
    .fail(error_)
}

function detailsreceive(user){ 
    $.ajax({
        type: 'POST',
        url: 'api/user/specificuser',
        data: JSON.stringify(user),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(detailPage)
    .fail(error_)
}

function User_Edit(changed)
 { 
    $.ajax({
        type: 'PUT',
        url: `api/user/${changed.id}`,
        data: JSON.stringify(changed),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(SH)
    .fail(error_)
}
