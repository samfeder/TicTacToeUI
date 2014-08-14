// $(document).ready(function(){

  (function () {
    if (typeof TTT === "undefined") {
      window.TTT = {}
    }

    var UI = TTT.UI = function (game, $el){
      this.game = game;
      this.$el = $el;
      this.setupBoard()
    }

    UI.prototype.play = function(){
      var that = this;
      $('li').on("click", function(event){
        var $currentSquare = this;
        that.makeMove($currentSquare);
      });
    };

    UI.prototype.makeMove = function(square) {
      var x = parseInt(square.id[0]);
      var y = parseInt(square.id[1]);
      var pos = [x,y];
      var $player = this.game.currentPlayer;
      try {
        this.game.playMove(pos)
      } catch (e) {
        alert ("That square you cannot take, padawan.")
        return;
      }  //Would this work with finally?

      $(square).addClass($isOver + "-selected");
      if (this.game.isOver()){
        this.completeGame()
      }
    };

    UI.prototype.completeGame = function(){
      //Find the winning row
      //Find the winning player
      //Make backgrounds transparent
      //Highlight winning row with partially transparent row

      var $winner = this.game.winner();
      var $row = this.game.board.winningRow;
      this.endBoard($row);
    }

    UI.prototype.endBoard = function(row) {
      for (var j = 0; j < row.length; j++){
        var findId = row[j][0] + "" + row[j][1]
        $("#" + findId).addClass("winning");
      }
      var listItems = $('li')
      for(var i = 0; i < listItems.length; i++) {
        var $li = $(listItems[i]);
        if (!$li.hasClass("winning")) {
          $li.addClass("not-winning");
        }
      }
      this.$el.after('<h2> Become a Jedi Master player '
        + this.game.winner() + ' has. </h2>')
    }

    UI.prototype.setupBoard = function() {

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          var $li = $('<li></li>')
          $li.attr('id', i + '' + j)
          this.$el.append($li)
        }
      }
      this.$el.append("<div class='group'></div>")
    };


})();
// });