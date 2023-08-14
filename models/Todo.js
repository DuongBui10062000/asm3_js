"use strict";

class Task {
  #task;
  #owner;
  #isDone;

  constructor(task, owner, isDone) {
    this.#task = task;
    this.#owner = owner;
    this.#isDone = isDone;
  }

  getTask() {
    return this.#task;
  }

  getOwner() {
    return this.#owner;
  }

  getIsDone() {
    return this.#isDone;
  }
}
