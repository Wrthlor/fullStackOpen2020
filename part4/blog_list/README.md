In order to start the server locally, run the command: `npm start`  
To run the server locally in development mode, run the command: `npm run dev`

### Exercises 4.1 - 4.2
4.1 - Turn start code into functioning *npm* project

4.2 - Refactor application into seperate modules 

### Exercises 4.3 - 4.7
4.3 - Create *dummy* function that always returns value of 1 as output

4.4 - Create a *totalLikes* function that returns the total sum of likes given a list of blogs as a parameter

4.5 - Create a *favoriteBlog* function that returns the blog with the most likes

4.6 - Create a *mostBlogs* function that returns an object containing the author with the most amount of blogs and the actual number of blogs

4.7 - Create a *mostLikes* function that returns an object containing the author whose blog posts have the largest amount of likes and the actual number of likes

### Exercises 4.8 - 4.12
4.8 - Write test for HTTP GET request to */api/blogs* and refactor route handler using async/await syntax instead of promises

4.9 - Write test to verify the unique identifier property of blogs is *id* and modify required code to pass test

4.10 - Write test for HTTP POST request to */api/blogs* and refactor operation to use async/await syntax instead of promises

4.11 - Write test such that if *likes* property is missing, defaults to 0 and modify required code to pass test

4.12 - Write test such that if *title* and *url* properties are missing, backend responds with status code *400 Bad Request*

### Exercises 4.13 - 4.14
4.13 - Implement functionality to *delete* single blog post

4.14 - Implement functionality to *update amount of likes* for a blog post