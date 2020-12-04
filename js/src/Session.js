class Session {
    constructor(serieNumber, serieTime, restTime) {
        this._serieNumber = serieNumber
        this._serieTime = serieTime
        this._restTime = restTime
        this._timer = new Timer(0, [])
        this._timer.addObserver(this)
        this._serieCount = 0
        this._status = "idle"
        this._buzzer = new Audio('res/buzz.mp3')
    }

    start(){
        this._status = "serie"
        
        this._timer.start(this._serieTime)
    }

    stop(){
        this._status = "idle"
    }

    notify(timerMessage){  
        
        // timerMessage = {seconds, status, countingTo}
        console.debug(timerMessage)
        
        if(this._status === "idle"){
            //Do nothing
            return ;
        }
        else if(this._status === "serie" && timerMessage.status === "ended"){
             // SWITCH TO REST
            this.playSound()
            this._serieCount += 1
            this._status = "rest"
            this._timer.start(this._restTime)
            
        }
        
        else if(this._status === "rest" && timerMessage.status === "ended" ){
            this.playSound()
            if(this._serieCount >= this._serieNumber){ //End Session
                console.log("Session Ended")
            }
            else{ //Swith to SERIE
                this._status = "serie"
                this._timer.start(this._serieTime)
            }
        }
            
        this.updateTimeGUI(timerMessage.seconds)
        
    }

    updateTimeGUI(currentSeconds){
        document.getElementById("displaySeconds").innerHTML = `${Math.trunc(currentSeconds/60)}:${currentSeconds%60}`
    }

    playSound(){
        this._buzzer.play();
    }

    pause(){}

    resume(){}
}