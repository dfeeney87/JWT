const API_URL = 'http://localhost:3001/';
const AUTH_URL = 'http://localhost:3000/';

let ACCESS_TOKEN = undefined;

const headlineBtn = document.querySelector('#headline');
const secretBtn = document.querySelector('#secret');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');

headlineBtn.addEventListener('click', () => {
    fetch(`${API_URL}/resource`).then(resp => {
        return resp.text();
    }).then(data => {
        UIUpdate.alertBox(data);
    })
})
