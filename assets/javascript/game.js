$(document).ready(function(){


    var timer = 2;
    
    var intervalId;
    
    var disableClick;
    
    function delayRestart() {
          disableClick = true;
          intervalId = setInterval(countDown, 1000);
    }
    function countDown() {
        timer--;
        $("#userScore").text("You " + gemGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
        if (timer === 0) {
           gemGame.stateOfPlay = "continue";
           timer=2;
           clearInterval(intervalId);
           gemGame.resetGame();
        }
    }   
        var gemGame = {
            userWins:               0,
            userLosses:             0,
            amethystVal: 			0,
            emeraldVal:  			0,
            rubyVal:     			0,
            sapphireVal: 			0,
            targetScore:   			0,
            userScore:   			0,
            lowerLimitGame:    	   19,
            upperLimitGame:       120,
            lowerLimitCrystal:      1,
            upperLimitCrystal:     12,
            stateOfPlay:    "continue",
    
            getRandomInteger: function(lowerLimit,upperLimit){
                return Math.floor(Math.random()*(upperLimit-lowerLimit+1)+lowerLimit);
            },
            resetGame: function() {
                this.userScore = 0;
                this.targetScore = this.getRandomInteger(this.lowerLimitGame,this.upperLimitGame);
                this.amethystVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.emeraldVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.rubyVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                this.sapphireVal = this.getRandomInteger(this.lowerLimitCrystal,this.upperLimitCrystal);
                $("#num2Guess").text(this.targetScore);
                $("#userScore").text("0");
                disableClick = false;
            },
            startGame: function() {
                this.resetGame();
                this.userWins   = 0;
                this.userLosses = 0; 
                $("#numWins").text("Wins: 0");
                $("#numLosses").text("Losses: 0");
                $("#num2Guess").text(this.targetScore);
            },
            processStateOfPlay: function() {
                if (this.userScore == this.targetScore){
                    this.userWins++;
                    $("#numWins").text("Wins: "+this.userWins);
                    this.stateOfPlay = "won";
                    $("#userScore").text("You " + gemGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
                    delayRestart();
                } else if (this.userScore > this.targetScore){
                    this.userLosses++;
                    $("#numLosses").text("Losses: "+this.userLosses);
                    this.stateOfPlay = "lost";
                    $("#userScore").text("You " + gemGame.stateOfPlay + " -- Game will restart in " + timer + " seconds");
                    delayRestart();
                } else {
                    this.stateOfPlay = "continue";
                }
            }
    
        }
          $(".gemstone").on("click", function() {
            if (disableClick) {
    
            } else {
                    switch ($(this).attr('value')){
                        case "amethyst":
                            gemGame.userScore += gemGame.amethystVal;
                            break;
                        case "emerald":
                            gemGame.userScore += gemGame.emeraldVal;
                            break;
                        case "ruby":
                            gemGame.userScore += gemGame.rubyVal;
                            break;
                        case "sapphire":
                            gemGame.userScore += gemGame.sapphireVal;
                            break;
                        default:
                            alert("Unknown gem!!");
                            break;
                    }
                    $('#userScore').text(gemGame.userScore);
                    gemGame.processStateOfPlay();
            }
          });
    
        gemGame.startGame();
    
    });