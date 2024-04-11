# members-only

1. This is the result of the project Members Only.

![Screenshot_2024-04-11_13-56-18](https://github.com/Preslav977/readme-repository/assets/119291608/51e892f3-4539-44c3-84ad-2f6f7d2be58b)

2. About the project the project.

- The project focuses on implementing different users with different privileges so each user can login, but those users who are not members can't see the date or who wrote that message.
- Those users that are members can see who wrote the message and the date, and last are the admin members that can see everything and delete the messages.

3. Project objectives

- [x] creates the models for the users and messages with the necessary fields.
- [x] create a sign-up form so users can register and use bcrypt and confirmPassword in order to secure the passwords, and if the password matches the confirmPassword, then the registration is successful.
- [x] Create a membership form. If the users guess the passcode, they can become members; otherwise, they can't. This is intentional because users shouldn't be members upon registration.
- [x] Create a login form in order for users to login with passport checks. If there is a user with that username and passport, then the log-in is successful; otherwise, the user doesn't exist.
- [x] shows the create-message form only if the user is logged in.
- [x] displays all the messages on the homepage, but only the date and the author if the user is a member or an admin; otherwise, only the title and the content.
- [x] Add the optional field admin to the user model so the users can become admins only if they guess the passcode.
- [x] And lastly, users can only create a message and see only the title and content of the message; members can see everything; admins can see everything but can delete the message as well.

4. Notes and Lessons learned

- I learned how to structure my models in order to fit my needs, as well as how to encrypt the password with bcrypt and how to check if the password fields match the confirm-password. By doing that, users can only register and log in if the passport matches.
- I learned how to authorize different users depending on whether they guessed the passcode.
- I learned about Passport, which allows users to register using a strategy that checks if the user is not registered in the database and creates a new record; otherwise, if the user exists, they can register and log in later.
- I learned based on conditional rendering that if the user is a member, the full message content will be the will be the same of the admin, who can also delete the message.
  Lastly, I learned how to delete messages using an ID without passing parameters in the URL and how to create a session and save the user information in the session so I can access it later.

5. Features or things I'd love to work on in the future

- [ ] responsive design
- [ ] implement passport strategy with an email
- [ ] implement validation errors
