Solves two dimensional maze using Recursive DFS algorithm interactively

**Instructions to set up this project**
1) yarn install
2) yarn run start
3) Open your browser and navigate to http://localhost:9090
4) To run test cases, use 'yarn test'
Note: If Yarn commands doesn't work, try installing Yarn using 'npm install -g yarn'

A simple two dimesional maze SPA for determining the path from start to finish co-ordinates. Application is built using React and Javascript.

#Application-features
1. Solves two dimensional maze using Recursive DFS algorithm that comprises of start, finish, wall and blank space(only where cursor can move)
2. Valid characters can be configured in constants file to have minimum maintenance costs
3. User can enter a valid maze in text format in the text area and click on 'Solve Maze' button to get the solved maze displayed on the screen
4. Start position is determined at run time
5. Below validations are in place
a) Maze should contain Start(S) and Finish(F) symbol
b) No other characters are allowed in maze, except those mentioned in 'constants' file
c) User is informed in case no path is determined
d) Input maze is not empty
6. User can solve another maze by clicking 'Reset All' button once a maze is solved
7. Solved path is displayed using ^ in red color
8. Tested on Chrome
9. Test coverage of all the files is greater than 85%

#Assumptions
1. Input maze has characters representing start, finish, wall and empty space. Other characters are not recognized
2. Maze is surrounded with walls
3. Maze rows are equal in length
