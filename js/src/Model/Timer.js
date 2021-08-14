class Timer  {

    constructor(updateInterval = 500) {
        this._seconds = 0.0 
        this._observers = []
        this._updateInterval = updateInterval
        this._updater = null
    }
    
    update() {
        this._seconds += this._updateInterval / 1000 
        
        this._observers.forEach(observer => {
            observer.notify( this.getSeconds() )
        });
    }
    
    start() {
        this._updater = setInterval( 
            (timer = this) => {timer.update()}
            , this._updateInterval
        )
    }

    stop() {
        clearInterval( this._updater )
    }
    
    getSeconds() {
        return this._seconds
    }

    setObservers(observersArrays) {
        this._observers = observersArrays
    }
    
    addObserver(observer) {
        this._observers.push(observer)
    }
    
    addObserverArray(observers) {
        observers.forEach( observer => {
            this._observers.push(observer)
        })
    }
}