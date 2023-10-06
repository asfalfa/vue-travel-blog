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
        return res
    })
    
    return res
}

export async function addUser(email, password){
    const res = await axios.put('http://localhost:3030/users/', {
        email: email,
        password: password,
    }).then(res => {
        return res
    })
    
    return res
}