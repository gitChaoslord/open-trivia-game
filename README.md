#
# <p align="center">Open Trivia Game</p>
<p align="center">A Single player Quiz game with questions provided by <a href="https://opentdb.com" rel="nofollow">Open TDB</a>.</p>
<p align="center">URL : <a href="https://gitchaoslord.github.io/Trivia-Game"  rel="nofollow">Trivia Game</a></p>

</br>
</br>

#
This project was based on Quiz Game Tutorial by [Raul Terhes](https://www.youtube.com/c/RaulTerhes) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I used Typescript instead and foregone the use of Redux Saga as i felt it overcomplicated things. Added router in order to have history navigation and implemented saving/loading the state from local storage.
</br>
</br>

#

# <p align="center">TODO</p>
1) Add options for number of questions, categories, difficutly etc in the initial page.
</br>
</br>

#
# <p align="center">Issues</p>

1) Pressing cancel button in loading page will move you to the game page once the promise gets resolved.
2) Timer is currently not saved in storage.
3) Once the game is over, visiting the root URL will redirect you to Score page.

