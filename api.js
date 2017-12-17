

const express = require("express")


const api = express.Router()


const store = require('./data/store')


api.post('/user', (req, res) => {
    const user = req.body
    const users = store.getUsers()
    let IDuser = 1
    if (users.length > 0) {
        IDuser = users[users.length - 1].id + 1
    }
    const newUser = {
        id: IDuser,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    users.push(newUser)
    console.log(users); 
    store.saveUsers(users)

    res.json(users)
})

api.get('/user', (req, res) => {
    const users = store.getUsers()
    res.json(users)
})


api.delete('/user/:id', (req, res) => {
    const id = req.params.id; 
    const users = store.getUsers(); 
    let del = false;
    let ind_contact = users.length-1;
    while (!del) { 
        if (users[ind_contact].id == id) { 
            var runner = 0; 
            while (ind_contact != users.length-1) {
                runner = users[ind_contact];
                users[ind_contact] = users[ind_contact + 1];
                users[ind_contact + 1] = runner;
                ind_contact++;
            }
            users.pop();
            del = true;
        }
        ind_contact--;
    }
    store.saveUsers(users) 
    res.json(users);
})


api.post('/user/specificuser', (req, res) => { 
    const users = store.getUsers(); 
    const user = req.body; 
    let specificIDuser; 
    for (let i = users.length - 1; i >= 0; i--) {
        if (users[i].name == user.name && users[i].email == user.email && users[i].phone == user.phone) {
            specificIDuser = users[i]; 
            res.json(JSON.stringify(specificIDuser)); 
        }
        else {
            continue;
        }
    }
})



api.put('/user/:id', (req, res) => { 
    const contactChanged = req.body;
    let users = store.getUsers(); 
    let edited = false;
    let index = 0; 
    while (!edited && index < users.length) {
        if (users[index].id == contactChanged.id) {
            users[index].name = contactChanged.name;
            users[index].email = contactChanged.email;
            users[index].phone = contactChanged.phone;
    
            edited = true;
        }
        index++;
    }


    store.saveUsers(users);
    res.json(users);

})


module.exports = api