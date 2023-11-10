/**
 * Filename: complexCode.js
 * 
 * Description: This complex JavaScript code demonstrates a custom implementation of a social networking platform
 *              with user authentication, friends list, profile creation, post creation, and comment features.
 *              It includes error handling, data validation, and various utility functions.
 *
 * Author: Your Name 
 * Date: {{Current Date}}
 */

// Constants
const MAX_POST_LENGTH = 300;
const MAX_COMMENT_LENGTH = 200;

// Data Structures
let users = [];
let posts = [];

// User Class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.profile = null;
    this.friends = [];
    this.posts = [];
  }

  createProfile(firstName, lastName, age, location) {
    this.profile = new Profile(firstName, lastName, age, location);
  }

  addFriend(user) {
    if (!this.friends.includes(user) && user instanceof User) {
      this.friends.push(user);
    } else {
      throw new Error("Invalid user or already a friend.");
    }
  }

  removeFriend(user) {
    const index = this.friends.indexOf(user);
    if (index > -1) {
      this.friends.splice(index, 1);
    } else {
      throw new Error("User is not a friend.");
    }
  }

  createPost(content) {
    if (content.length > MAX_POST_LENGTH) {
      throw new Error("Post too long.");
    }
    const post = new Post(content, this);
    this.posts.push(post);
    posts.push(post);
    return post;
  }

  getPosts() {
    return this.posts;
  }
}

// Profile Class
class Profile {
  constructor(firstName, lastName, age, location) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.location = location;
  }
}

// Post Class
class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
    this.comments = [];
  }

  addComment(comment) {
    if (comment.length > MAX_COMMENT_LENGTH) {
      throw new Error("Comment too long.");
    }
    this.comments.push(comment);
  }

  removeComment(comment) {
    const index = this.comments.indexOf(comment);
    if (index > -1) {
      this.comments.splice(index, 1);
    } else {
      throw new Error("Comment not found.");
    }
  }
}

// Utility Functions
function loginUser(username, password) {
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    return user;
  } else {
    throw new Error("Invalid login credentials.");
  }
}

function validateUserInput(input) {
  // Validation logic goes here...
}

// Usage Example
try {
  // Create users and their profiles
  const alice = new User("alice123", "alicepassword");
  alice.createProfile("Alice", "Johnson", 28, "New York");

  const bob = new User("bob456", "bobpassword");
  bob.createProfile("Bob", "Smith", 35, "Los Angeles");

  const charlie = new User("charlie789", "charliepassword");
  charlie.createProfile("Charlie", "Brown", 42, "Chicago");

  // Add friends
  alice.addFriend(bob);
  alice.addFriend(charlie);
  bob.addFriend(charlie);

  // Create posts
  const post1 = alice.createPost("Hello, world!");
  const post2 = bob.createPost("I love JavaScript!");
  const post3 = alice.createPost("Today's weather is great!");

  // Add comments to posts
  post1.addComment("Nice post!");
  post1.addComment("Keep it up!");
  post2.addComment("JavaScript is awesome!");
  post3.addComment("I agree!");

  // Display posts and comments
  alice.getPosts().forEach((post) => {
    console.log(`(${post.author.username}) ${post.author.profile.firstName}: ${post.content}`);
    post.comments.forEach((comment) =>
      console.log(`  - ${comment}`)
    );
  });
} catch (error) {
  console.error(error.message);
}