TIC-TAC-TOE DOCUMENTATION
This repository contains a tic-tac-toe game that you can play with a friend.

Technologies Used:
ajax
Bootstrap
css
html
JavaScript
jQuery
Sass
(JSON?)

Planning:
I started by outlining the process of the game logic, which I implemented to create a clickable game. However, I quickly got bogged down by introducing the other aspects of the game (authentication, styling, etc). I had completed a lot of other aspects of the game before I was able to go back and connect the game to the api, several days later,

Once I connected to the api, however, I ran into a lot of issues. The recurring ones were: 1) Creating a new game every time I clicked on the board, instead of updating the old game, and 2) issues reading the preventDefault and target properties of the event object. I tried re-starting, adding each function one-by-one, and refactoring, but none of those worked. I was fortunate to have the unbiased eyes of two other developers who helped me find the typo in the api url and the incorrect function that didn't capture the correct id. Once I was able to fix those bugs, everything else fell into place.

Known Issues:
User Experience
While the latest iteration of this game is usable, it is not well-formatted for all screen sizes, which I want to address in future iterations.

Styling
While the commands are clear, I do think that they styling is very barebones. I would want to spend more time on implemnting a design that gives a more finished air to the entire product.

Wireframe: https://i.imgur.com/qVvrrV8.png

User Stories:
- As a player, I wan to be able to see whose turn it is in the game so tha I know whose turn it s.
- As a player, I want to be able to know when I've won so that I can celebrate.
-As a player I want to be able to sign up/sign in quickly so that I can get to the game faster
- As a player, I want to be able to track my games so that I can see my stats.
