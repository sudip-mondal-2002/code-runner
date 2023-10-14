# Project Setup Instructions

To run this project, follow these steps:

1. **Create a .env File**

   Create a `.env` file in the project root directory and add your MongoDB connection URL to it. You can obtain a MongoDB URL from your MongoDB hosting provider.

   Example `.env` file:
```env
DATABASE_URL=mongodb://<username>:<password>@<host>:<port>/<database_name>
```

2. **Install Dependencies**

Ensure you have Node.js and npm installed on your machine. If not, you can install them from [Node.js Official Website](https://nodejs.org/).
Also it requires you to have Python, g++ and gcc installed to test the runners

Then, navigate to the project directory in your terminal and run:

```sh
$ npm install
$ npm run generate
```

In case you want to generate some problems then run:

```sh
$ npx prisma db seed
```


3. **Run the Project**

To start the development server, run the following command:

```sh
$ npm run dev
```

4. **Docker (Optional)**

If you don't want to install the compilers/interpreters on your local machine, you can use the provided Dockerfile to run the project in a Docker container. Make sure you have Docker installed.

```sh
$ docker build -t code-runner .
$ docker run -p 3000:3000 project-name
```


# Contribution Opportunities

If you're interested in contributing to the project, here are some beginner-friendly tasks you can tackle:

1. **Add a New Language Runner**

You can contribute by adding a runner for a programming language that's not already supported. Be sure to update the Prisma schema and Dockerfile as needed.

2. **Improve the User Interface (UI)**

Enhance the project's user interface by making it more user-friendly, responsive, or visually appealing. You can work on frontend components, styles, or layouts.

3. **Write Tests**

Help improve the project's reliability by writing tests for existing features. You can use testing frameworks like Jest, Mocha, or Chai, depending on the project's stack.

Remember to create a fork of the project, make your changes, and submit a pull request to contribute. Feel free to reach out to the project maintainers if you have any questions or need guidance.

Happy coding! 🚀


https://github.com/sudip-mondal-2002/code-runner/assets/74463091/38bf24d7-cb30-4110-ab87-f1b36b0fecaa

