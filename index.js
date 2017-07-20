$(document).ready(function(){

    var interval;
    var started = false;
    paused = false;
    var newTime = null;
    var time = $(".time");
    var initialTimeText = time.text();
    var button = $("button");
    

    intervalUpdate = () =>{
        if(!paused){
        newTime = convertInSeconds();
        newTime -=1;
        updateTime(newTime);
        }

    }

    //when user clicks play, converts time in seconds and calls the
    //updateTime function every second.
    startTimer = () => {
        paused = false;
        if(!started){
           interval = setInterval(function(){intervalUpdate();}, 1000);
        }
        started = true;
        
    }


    convertInSeconds = () => {
        var timeList = time.text().split(':');
        return parseInt(timeList[0]) * 60 + parseInt(timeList[1]);
    }


    //when user clicks one of the buttons to change time.
    changeTimer = (value) => {
        var valueList = value.split(' ')
        var timeChanging = convertInSeconds();
        timeChanging += valueList[1] === 'm' ? parseInt(valueList[0]) * 60 : parseInt(valueList[0]);
        updateTime(timeChanging);
    }


    //updates time on screen, converting it back to minutes and seconds and 
    //formatting it.
    updateTime = (timeToUpdate) => {
        if(timeToUpdate >= 0){

            var minutes = Math.floor(timeToUpdate / 60);
            var seconds = timeToUpdate % 60 >= 10 ? timeToUpdate % 60 : '0'+ timeToUpdate % 60;
            console.log(typeof(seconds));
            time.text(minutes + ':' + seconds);
        }
        

    }




    button.click(function(){
        switch(this.value){
            case 'start':
                startTimer();
                break;
            case 'pause':
                paused = true;
                break;
            case 'reset':
                clearInterval(interval);
                time.text(initialTimeText);
                started = false;
                break;
            default: changeTimer(this.value);
        }
    })

});