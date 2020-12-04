class Timer  {
    

    constructor(time, observers) {
        this._time = time
        this._status = "init"
        this._seconds = 0.0
        this._updater = null
        this._observers = observers
    
    }
    
    update(timer) {
        
        timer._seconds += 1 
        
        if(timer._status==="init"){
            timer. _status="started"
        } 

        if(timer._seconds >= this._time){
            timer.stop(timer)
            timer._status = "ended"
        }

        timer._observers.forEach(observer => {
            observer.notify( timer.getNewStatus() ) //TODO: pass a message specifying status update
        });
    }
    
    start(time=null) {
        if(time != null){
            this._time = time
        }
        this._seconds = 0
        this._status = "init"
        this._updater = setInterval( (timer = this)=>{timer.update(timer)} ,1000)
    }

    stop(timer) {
        clearInterval( timer._updater )
    }

    
    getNewStatus() {
        return {seconds: this._seconds, status:this._status, countingTo: this._time}
    }

    setObservers(observersArrays) {
        this._observers = observersArrays
    }
    
    addObserver(observer) {
        this._observers.push(observer)
    }


}