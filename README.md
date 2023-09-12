# PerchPals Platform

This is a MERN with TypeScript Fullstack Application for Personal Capstone Project. Currently, it aims to be a platform for classroom/group discussion and collaboration boards.

## System Requirements

Node v16. (v18 seems to not be compatible with current version of Storybook.)

## Getting Started

1. You will need to have .env files with relevant information in both _./client_ and _./server_.

2. Enter the different directories for _./client_ and _./server_ and run the command `npm install`

## Available NPM Commands:

### Client:

`npm run start:client` -
Starts React Application on localhost [http://127.0.0.1:3000/](http://127.0.0.1:3000/) with Vite.

`npm run test:client` -
Runs React Testing Library on test cases in client.

`npm run storybook` - Start Storybook on localhost [http://localhost:6006/](http://localhost:6006/)

### Server:

`npm run start:server` -
Starts Nodejs Server on localhost [http://localhost:3001/](http://localhost:3001/).

`npm run test:server` -
Runs Jest on test cases in server.

`npm run data:import` - Imports hardcoded data in _./server/utils/dev-data/_ as documents into models in MongoDB database.

`npm run data:delete` - Deletes all data from MongoDB database.

## Other Links

### Documentation
- [Functional Requirements](https://docs.google.com/spreadsheets/d/1LSNtwzRROZDYNAvtLtSwmtV5sWqBCuB7PvJIsAePD40/edit?usp=sharing)
- [Component Design](https://www.figma.com/file/0M5T7mLGFIhFC2DAjFzpva/Untitled?type=design&node-id=0%3A1&t=JvCpYQlrfTY7Wym2-1)
- [API Documentation](https://www.postman.com/pigeonpostmancafe/workspace/perchpals-platform/overview)
- [Data Modelling](https://dbdiagram.io/d/64982cf902bd1c4a5e06f8aa)

