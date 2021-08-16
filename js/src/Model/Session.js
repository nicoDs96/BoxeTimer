class Session {
    //NB: a session is started as soon as it is added to timer's observers list
    
    constructor(timesArray, repetition, buzzerPath = 'res/buzz.mp3') {
        this._timesArray = timesArray
        this._repetition = repetition
        this._buzzer = new Audio(buzzerPath)
           
        this._currentElapsedTime = 0.0
        this._prevTime = 0.0
        this._currentRepetition = 0
        this._currentTimeIndex = 0 //representing the current index of this._timesArray
        this._isStopped = false

        this._observers = []
    }

    resume(){
        //TODO: handle pause
    }

    pause(){
        //TODO: define/store a state to handle pause
    }

    stop(){
        this.reset()
        this._isStopped = true
    }

    reset(){
        this._currentElapsedTime = 0.0
        this._prevTime = 0.0
        this._currentRepetition = 0
        this._currentTimeIndex = 0 
        this._isStopped = false
    }

    notify(timerSeconds){  

        if(!this._isStopped){
            if(this._prevTime == 0) {this._prevTime = timerSeconds} //only for the firs update

            this._currentElapsedTime += (timerSeconds - this._prevTime)
            this._prevTime = timerSeconds
            
            if(this._currentElapsedTime >= this._timesArray[this._currentTimeIndex]){ // when the first time is finished
                this.playSound() //buzz
                this._currentTimeIndex = (this._currentTimeIndex + 1) % this._timesArray.length // switch to next time
                
                if(this._currentTimeIndex == 0){ // when all the times are elapsed 
                    this._currentRepetition += 1 //update re//TODO: resetpetition
                }
                console.info(`this._currentTimeIndex ${this._currentTimeIndex} this._currentRepetition ${this._currentRepetition}`)  
                
                this._currentElapsedTime = 0.0 //reset current time when switching to a new time limit          
            }
    
            if(this._currentRepetition == this._repetition){
                console.info(`Stopping session: this._currentRepetition == this._repetition -> ${this._currentRepetition} == ${this._repetition}`)
                this.stop()
            }
                    
            this._observers.forEach(observer => {
                observer.notify( this.getState() )
            });
        }
    }

    playSound(){
        this._buzzer.play();
    }

    addObserver(o){
        this._observers.push(o)
    }

    getState(){
        return { "Component": this.constructor.name
            , "timesArray" : this._timesArray
            , "repetition" : this._repetition 
            , "currentElapsedTime" : this._currentElapsedTime
            , "currentRepetition" : this._currentRepetition 
            , "currentTimeIndex" : this._currentTimeIndex 
            , "isStopped" : this._isStopped}
    }

}