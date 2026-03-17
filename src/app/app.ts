import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('idp');
}

async function loadUsers() {
  const response = await fetch(environment.apiUrl + '/users');
  const users = await response.json();
  return users;
}

async function login(user: { name: string; password: string }) {
  const users = await loadUsers();

  const foundUser = users.find(
    (u: { name: string; password: string }) =>
      u.name === user.name && u.password === user.password
  );

  if (foundUser) {
    console.log("User válido");
  } else {
    console.log("User inválido");
  }
}

login({
  name: "Joaquim",
  password: "123"
});

// const response = await fetch(environment.apiUrl + '/users', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(user)
// });

// const data = await response.json();
// console.log(data);

// createUser();
