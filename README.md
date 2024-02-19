# Task Management API

## Production URL: https://cse341taskmanagement.onrender.com/

-   GitHub Repository: https://github.com/CSE341Team10/taskManagement.git

## User profile portion

The users section of the api is set up so that when a person logs into the program using GitHub's OAuth, it automatically creates them a profile.
The profile fields are filled in with values that GitHub provides, depending on the user's privacy settings, and the ones that do not have values are initially set to "not provided".

### Fields for the "users" collection

-   \_id : This is the object id created by Mongo DB.
-   githubUserId : This is the user's actual GitHub id that was provided when they first logged in with GitHub's OAuth.
-   username : This is the user's actual GitHub username that was provided when they first logged in with GitHub's OAuth.
-   displayName : This is the user's actual GitHub displayName that was provided when they first logged in with GitHub's OAuth.
-   firstName : This will parse the displayName (if possible) and use the first name in the displayName as the firstName.
-   lastName : This will parse the displayName (if possible) and use the last name in the displayName as the lastName.
-   userRole : This field will store as "not provided" until the user updates their profile. Or maybe when setting tasks (just a thought).
-   registrationDate : This field is automatically set to the date that the user first logs in.
-   password : This field will store as "not provided" until the user updates their profile. When the user updates their profile with a password, it will store the password as a hashed password for security purposes.
-   email : This field will store as "not provided" until the user updates their profile. When updating the email in the profile, it must be in a valid email format.
-   profilePic : This is the path to the picture or avatar that the user has set in their GitHub. This way it could be used in a frontend application later on.

### Ideas for how it could integrate

I thought that the githubUserId would be a good value to use across the database to link a user to the other collections: tasks, categories, and comments.
It could display their username or displayName with the comments and tasks to identify the user and link them to certain areas. Most of this is of course,
open to further interpretation.

## Tasks portion

### Fields for the "tasks" collection

-   \_id : This is the object id created by Mongo DB.
-   title : This required field will store the title of the task in a string.
-   description : This optional field will store the description of the task in a string.
-   dueDate : This field will store "24-12-31" when a date is not provided (empty field).
-   priorityLevel : This field will store "No-priority" when the priority is not provided.
-   status : This field will store "Pending" when the status is not provided.
-   userId : This is the objectId for the user that was provided when they first logged in with GitHub's OAuth.

## Categories portion

## Comments portion

### Fields for the "comments" collection

-   \_id : This is the object id created by Mongo DB.
-   userId : This is the objectId for the user that was provided when they first logged in with GitHub's OAuth.
-   taskId : This is the objectId for the task when it was created.
-   comment : This field contains the user's comment related to a task.

## Students

-   Kimberly Torres
-   Blake Torres
-   Cesar Coutino Gomez
-   Brant Barton
-   Belén Chaparro

## Setup

-   `npm install`
-   `npm start` starts up a local server

## Tests

-- `npm run test:` + name of the test section, ex.: "comment", "user", "task", "category" → (npm test:comment).
