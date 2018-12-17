Solves two dimensional maze using Recursive DFS algorithm interactively

**Instructions to set up this project(execute below commands from the root directory)**
1) yarn install
2) yarn run start
3) Open your browser and navigate to http://localhost:9090
4) To run test cases, use 'yarn test' (coverage report generated at: /reports/unit/jest)
Note: If Yarn commands doesn't work, try installing Yarn using 'npm install -g yarn'

A simple two dimesional maze SPA for determining the path from start to finish. Application is built using React and Javascript.

#Application-features
1. Solves two dimensional maze using Recursive DFS algorithm that comprises of start, finish, wall and blank space(only where cursor can move)
2. User can enter a valid maze in text format in the text area and click on 'Solve Maze' button to get the solved maze displayed on the screen
3. Solved maze is displayed in which path is represented by ^ in red color
4. Each character in solved maze has span of equal size to enhance the display
5. Valid characters can be configured in constants file for minimum maintenance costs 
6. Start position is determined at run time
7. Once a maze is solved, user can solve another maze by clicking on 'Reset All' button 
8. Tested on Chrome
9. Test coverage of all the files is greater than 85%

#Validations covered
1. Maze should contain Start(S) and Finish(F) symbol
2. No other characters are allowed in maze, except those mentioned in 'constants' file
3. User is informed in case no path is determined
4. Input maze is not empty

#Assumptions
1. Input maze has characters representing start, finish, wall and empty space. Other characters are not recognized
2. Maze is surrounded with walls
3. Maze rows are equal in length
