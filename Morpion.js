/**
 * Class MyMorpionXO
 * @constructor
 */
var MyMorpionXO = function MyMorpionXO () {
  this.countWinPlayer1=0;
  this.countWinPlayer2=0;
  this.countGame=0;
  this.nbTurn=0;
  this._initialize();
}

/**
 * Initialize
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype._initialize = function () {
  
  this._renderDisplayScreen('');
  this._renderRecap();
    
  return this;
}

/**
 * Run
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype.run = function () {
   
  this._onClickDigits(function(key) {
    if (document.getElementById(key).textContent != ''){
      alert('impossible to play here');
    }
    else{
      this._getAction(key);
      this.winCondition();
      this.drawAction();
    }
  }.bind(this));
  
  return this;
}

/**
 * Get action
 * @param {string} key
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype._getAction = function (key) {

  this.nbTurn += 1;
  
  if(this.nbTurn%2==0){
     document.getElementById(key).textContent = 'X';
  }
  else{
    document.getElementById(key).textContent = 'O';
  }
  return this;
}


/**
* On click digits
 * @param {function} callback
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype._onClickDigits = function (callback) {
  var elButtons = document.querySelectorAll('button');

  elButtons.forEach(function(elButton) {
    elButton.addEventListener('click', function(e) {
      callback(e.target.id);
    });
  });

  return this;
}

/**
* win Condition
 * @return {bool} true/false
 */
MyMorpionXO.prototype.winCondition = function(){

	if(this.winnerAction(1,2,3)){
        return true;
    }
    if(this.winnerAction(4,5,6)){
        return true;
    }
    if(this.winnerAction(7,8,9)){
        return true;
    }
    if(this.winnerAction(1,4,7)){
        return true;
    }
    if(this.winnerAction(2,5,8)){
        return true;
    }
    if(this.winnerAction(3,6,9)){
        return true;
    }
    if(this.winnerAction(1,5,9)){
        return true;
    }
    if(this.winnerAction(3,5,7)){
        return true;
    }

return false;
}

/**
* winner Action
 * @param {Int} x
 * @param {Int} y
 * @param {Int} z
 * @return {bool} true/false
 */
MyMorpionXO.prototype.winnerAction = function(x,y,z){

	if(document.getElementById(x).textContent == document.getElementById(y).textContent && document.getElementById(x).textContent == document.getElementById(z).textContent && document.getElementById(x).textContent != ''){
      if(document.getElementById(x).textContent == 'X'){
        //win player 2
        this.winColor(x,y,z);
        this.countGame += 1;
        this.countWinPlayer2 += 1;
        alert ('player 2 win first round');
        this._renderRecap();
        this._renderDisplayScreen('');
        this.nbTurn=0;
        myMorpionXO.run();
        
      }
      else{
        //win player 1
        this.winColor(x,y,z);
        this.countGame += 1;
        this.countWinPlayer1 += 1;
        alert ('player 1 win first round');
        this._renderRecap();
        this._renderDisplayScreen('');
        this.nbTurn=0;
        myMorpionXO.run();
        
      }
      return true;
    }
    else{
      return false;
    }
}

/**
* draw Action
* @return {bool} true/false
*/
MyMorpionXO.prototype.drawAction = function(){
  if (this.nbTurn==9 && this.winCondition()==false){
    //draw
    this.countGame += 1;
    alert ('draw');
    this._renderRecap();
    this._renderDisplayScreen('');
    this.nbTurn=0;
    myMorpionXO.run();
    return true;
  }
  else{
    return false;
  } 
}

/**
* winner Color
 * @param {Int} x
 * @param {Int} y
 * @param {Int} z
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype.winColor = function(x,y,z){
  document.getElementById(x).style.backgroundColor = 'green';
  document.getElementById(y).style.backgroundColor = 'green';
  document.getElementById(z).style.backgroundColor = 'green';
  return this;
}

/**
* template Display Screen
 * @param {String} value
 * @return {String} dom
 */
MyMorpionXO.prototype._tplDisplayScreen = function (value) {
    var matrixId = [
                    [1, 2, 3,],
                    [4, 5, 6,],
                    [7, 8, 9 ]
                  ];
  
    var dom = '<table>';
  
    for (var i=0; i<3; i++){
      
      dom += '<tr>'; 
      
          for (var j=0; j<3; j++ ){
              
               var elList = '<td><button id ="'+ matrixId[i][j] +'">'+value+'</button> </td>';
               dom += elList;

          }
          dom = dom +' </tr>';
      }
      dom = dom +' </table>';

  return dom;
}


/**
 * Render display screen
 * @param {String} value
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype._renderDisplayScreen = function (value){
  
    var el = document.querySelector('#grid');
      el.innerHTML = this._tplDisplayScreen(value);

    return this;
}

/**
 * template recap
 * @return {String} dom
 */
MyMorpionXO.prototype._tplRecap = function () {
 var dom='';
  if(this.countWinPlayer1 >= 3 ){
    dom += '<p>O a gagné la partie !</p>'
  }
  else if(this.countWinPlayer2 >= 3){
    dom += '<p>X a gagné la partie !</p>'
  }
  else{
    dom +='<table class= "table">';
    dom +=   '<tr>';
    dom +=      '<th>Score player 1 (O)</th>';
    dom +=      '<th>Score player 2 (X)</th>';
    dom +=   '</tr>';
    dom +=   '<tr>';
    dom +=      '<td>'+this.countWinPlayer1+'</td>';
    dom +=      '<td>'+this.countWinPlayer2+'</td>';
    dom +=   '</tr>';
    dom +='</table>';
  }
  return dom;
}
/**
 * render Recap
 * @return {MyMorpionXO}
 */
MyMorpionXO.prototype._renderRecap = function (){
  
    var el = document.querySelector('#recap');
      el.innerHTML = this._tplRecap();

    return this;
}

var myMorpionXO = new MyMorpionXO();

myMorpionXO.run();