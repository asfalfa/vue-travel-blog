import axios from "axios";

export async function getUserLoginStatus(id, token) {
    const res = await axios.post('http://localhost:3030/users/' + id,{
        token: token
    }).then(res=> {
        return res
    })
    
    return res
}

export async function checkUser(email, password){
    const res = await axios.post('http://localhost:3030/users/', {
        email: email,
        password: password,
    }).then(res => {
        // find user with this email, compare the hashed password to the one sent, 
        // then generate a random sha TOKEN, save it to db and give it as response
        // the user will also be given the user id, to be saved as another cookie, 
        // then we have a double check, Do you have the correct user id, and do you have the correct token for that id, and viceversa
        console.log(res.data.valid)
        return res
    })
    
    return res
}

export async function addUser(email, password){
    const res = await axios.put('http://localhost:3030/users/', {
        email: email,
        password: password,
    }).then(response => {
        return response
    })
    
    return res
}