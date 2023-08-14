"use strict";
class User {
  #firstName;
  #lastName;
  #userName;
  #passWord;

  constructor(firstname, lastname, username, password) {
    this.#firstName = firstname;
    this.#lastName = lastname;
    this.#userName = username;
    this.#passWord = password;
  }

  getName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
