 var previousCard = null;
 var currentSessionOpen = false;
 var numPairs = 0;

 var myApp = angular.module("memoryGameApp", []);

 myApp.controller("MainController", function($scope, $timeout) {
     //array to hold all the cards in the game
     $scope.deck = deckGenerator();

     $scope.check = function(card) {
         //Every time a card is clicked you will need to do the following:
             //Check that the card being clicked has not already been selected
             //Check that the card selected hasn't already been matched with another pair   
             //Check that the player hasn't already selected two cards
             //If all checks pass, flip the card over + track it in your currentCards array.
             //If your currentCards array now contains two cards - check to see if they are both equal to eachother.
             //If they are equal, mark both cards as matched and clear the currentCards array.
             //If they are not equal, flip them back over after 1 second has passed. (Use $timeout).
             //an array to hold the two currently selected cards(maximum of two at any given time)
         if (currentSessionOpen && previousCard != card && previousCard.id == card.id && !card.flipped) {
             card.flipped = true;
             previousCard = null;
             currentSessionOpen = false;
             numPairs++;
         } else if (currentSessionOpen && previousCard != card && previousCard.id != card.id && !card.flipped) {
             $scope.isGuarding = true;
             card.flipped = true;
             currentSessionOpen = false;
             $timeout(function() {
                 previousCard.flipped = card.flipped = false;
                 previousCard = null;
                 $scope.isGuarding = $scope.timeLimit ? false : true;
             }, 1000);
         } else {
             card.flipped = true;
             currentSessionOpen = true;
             previousCard = card;
         }

         if (numPairs == 18) {
             $scope.stopTimer();
         }
     }; //end of check()


     $scope.isCritical = false;

     var timer = null;


     //create a start button. activate shuffle.
     $scope.start = function() {
         $scope.deck = deckGenerator();
         $scope.timeLimit = 60000;
         $scope.isGuarding = false;
         $scope.inGame = true;

         ($scope.startTimer = function() {
             $scope.timeLimit -= 1000;
             $scope.isCritical = $scope.timeLimit <= 10000 ? true : false;

             timer = $timeout($scope.startTimer, 1000);
             if ($scope.timeLimit === 0) {
                 $scope.stopTimer();
                 $scope.isGuarding = true;
             }
         })();
     };


     // function to stop the timer
     $scope.stopTimer = function() {
         $timeout.cancel(timer);
         $scope.inGame = false;
         previousCard = null;
         currentSessionOpen = false;
         alert("Game Over! You got " + numPairs + "!");
         numPairs = 0;
     };

     /*Cards should be represented as JavaScript Objects
           id: number,
           flipped: boolean,
           value: number,
           matched: boolean
       */
     function deckGenerator() {
         var deck = [];
         var chn = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"];
         for (var i = 1; i < 19; i++) {
             var card = {};
             card.id = i;
             card.flipped = false;
             card.value = chn[i];
             card.matched = false
             deck.push(card);
             /*$scope.deck.push(card);*/
         }
         for (var i = 1; i < 19; i++) {
             var card = {};
             card.id = i;
             card.flipped = false;
             card.value = chn[i];
             card.matched = true;
             deck.push(card);
             /*$scope.deck.push(card);*/
         }
         return shuffle(deck);
     };
     //Use the Fisher-Yates algorithm to shuffle the cards array when the game starts.
     function shuffle(array) {
         var currentIndex = array.length,
             temporaryValue, randomIndex;

         // While there remain elements to shuffle...
         while (0 !== currentIndex) {

             // Pick a remaining element...
             randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex -= 1;

             // And swap it with the current element.
             temporaryValue = array[currentIndex];
             array[currentIndex] = array[randomIndex];
             array[randomIndex] = temporaryValue;
         }
         return array;
     };
     /* function removeByIndex(deck, card) {
             arr.splice(index, 1);
         }
         function insertByIndex(deck, index, card) {
             arr.splice(index, 0, item);
         }*/

     /*  this.unmatchedPairs = tileNames.length;
          if(card.flipped === false) {
              card.flipped = !card.flipped;
              if(card.matched===false) {
              } 
           }       
          card.flipped = !card.flipped
                  if(card.flipped === false) {
                  card.flipped=true; */
 });
