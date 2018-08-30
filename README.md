# Chrome Dinosaur
  Rough clone of the offline dinosaur game on the google chrome browser.
  Learned through this program:
  - Using a spritesheet
  - Animating using a spritesheet
  - Basic platform and collision logic within games
  - Infinite scrolling sprites

# Description
This code is a rough javascript making of the small mini-game within the
chrome browser that you can play offline, or can find [here](https://chromedino.com/ "Chrome Dinosaur Game")!
The game is controlled by the up arrow to jump, and the goal is to survive
as long as possible by jumping over cacti coming from your right, which come
progressively faster as the game progresses. Start the game by cloning the repository
and clicking the dino.html file.

The code is mostly very basic platform jumping for the dinosaur, and some
random size spawning of the cacti, with the speed of the game increasing up
to a cap to make sure it does not get too hectic. A counter stores your score
and your high score is saved for as long as the game is open.

# How to Run
Clone the repository and open dino.html to begin!

# Coding Challenges / Learning
The main challenge within this program and what I aimed to accomplish was using
a sprite sheet for images within a game. This proved especially difficult for
making the ground scroll infinitely without having any overlapping segments or
gaps within the game. Along with learning to use the sprite sheet, I also learned
basic animation skills through switching frames as the game updated.

# Things to Improve
- Flying enemies as well as ducking
- Randomness of the cactus spawn (currently swapping between big and small cacti)
- Allowing more than one cactus on screen without allowing for impossible sequences of cacti
(ones that would be impossible to jump over and not lose the game)
- Possible game over and start menu
- Stylistic UI improvements

# NOTES
All code is created by me, the spritesheet used was obtained through the chromedino link above
