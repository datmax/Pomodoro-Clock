$(document).ready(function(){
    // have to do this because, to call the clearInterval function, the setInterval needs to be global.
    var timeInterval;
    // same for bgInterval.
    var bgInterval;
    var colors = [
        'lightgreen',
        'lightblue',
        'lightcoral',
        'yellowgreen',
        'grey',
        'springgreen',
        'slateblue'
    ];

    var started = false;
    var paused = false;
    var newTime = null;
    var time = $(".time");
    var initialTimeText = time.text();
    var button = $("button");
    

    intervalUpdate = () =>{
        if(!paused){
        newTime = convertInSeconds();
        newTime -=1;
        update(newTime);
        }

    }

    bgUpdate = (bgs) =>{
        if(!paused){
        console.log("hey");
        $(":root").css("--bgcolor", colors[Math.floor(Math.random() * bgs.length) + 1]);
        }
        
    }

    //when user clicks play, converts time in seconds and calls the
    //update function every second.
    startTimer = () => {
        paused = false;
        if(!started){
           timeInterval = setInterval(function(){intervalUpdate();}, 1000);
           bgInterval = setInterval(function(){bgUpdate(colors);}, 30000);
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
        update(timeChanging);
    }


    //updates time on screen, converting it back to minutes and seconds and 
    //formatting it.Also changes background color.
    update = (timeToUpdate) => {
        if(timeToUpdate >= 0){
            var minutes = Math.floor(timeToUpdate / 60);
            var seconds = timeToUpdate % 60 >= 10 ? timeToUpdate % 60 : '0'+ timeToUpdate % 60;
            time.text(minutes + ':' + seconds);
            $("title").text(minutes + ':' + seconds);
            if(timeToUpdate === 0){
                time.addClass("blink");
            }
            else if(timeToUpdate !== 0){
                time.removeClass("blink");
            }
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
                clearInterval(timeInterval);
                clearInterval(bgInterval);
                time.text(initialTimeText);
                started = false;
                break;
            default: changeTimer(this.value);
        }
    })

});