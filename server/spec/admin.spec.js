var Request = require("request");
var database = require("./database.js");

// TODO: test admin routes

describe("Admin", () => {

  beforeAll(() => {
    // database.fill();
  });
  afterAll(() => {
    // database.dump();
  });

  // > USERS
  // >> test register user
  // >> test login
  // >> test list users
  // >> test accept user
  // >> test deny user

  // > EDITS
  // >> test remove shop
  // >> test accept snack
  // >> test accept shop
  // >> test accept shop without new snacks
  // >> test deny edit

})
