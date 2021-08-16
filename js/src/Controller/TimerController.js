class TimerController{
    
    constructor(){
        // tells the number of time input displayed
        this._inputRowNr = 0
        this._currentSession = null
        //INIT 7 SEGMENT DISPLAY LIKE TEXT
        document.getElementById("displaySeconds").innerHTML = `00:00`
        //Create the default time input row and add it to the View
        this._inputRowNr += 1
        let container = document.querySelector(".time-input")
        container.append(this.createTimeInputRow())
        //Add possibility to add time input row to the view on demand using a button
        document.querySelector("#addButtonContainer").append(this.createPlusButtonRow())
        
        //Set start and stop behaviours
        document.getElementById('start').onclick = (e, c = this) => {
            let session = c.getSessionFromView()
            session.addObserver(c)
            c.setCurrentSession(session)
            globalTimer.addObserver(c.getCurrentSession())
        } 
        document.getElementById('stop').onclick = (e, c = this) => {
          globalTimer.setObservers([]) //removing observers to stop the session
          c.getCurrentSession().stop()

          //Setting the element invisible and making it visible when the session start
          document.getElementById("currentRepetition").style.visibility="hidden"
        } 
    }

    notify(state){ // react to changes of status of observed components
       
        if(state["Component"] === "Session"){
            /*Session state:
             { "Component": this.constructor.name
            , "timesArray" : this._timesArray
            , "repetition" : this._repetition 
            , "currentElapsedTime" : this._currentElapsedTime
            , "currentRepetition" : this._currentRepetition 
            , "currentTimeIndex" : this._currentTimeIndex 
            , "isStopped" : this._isStopped}
             */
            this.update7SegmentTime(state["currentElapsedTime"])
            this.updateCurrentRepetitionUI(state["currentRepetition"], state["repetition"])
            if(state["isStopped"]==false){
                document.getElementById("currentRepetition").style.visibility="visible"
            }
            this.highlightCurrentTime(state["currentTimeIndex"], state["isStopped"])

        }
    }

    getInputRowNr(){return this._inputRowNr}
    setInputRowNr(inputRowNr){this._inputRowNr = inputRowNr}

    getCurrentSession(){return this._currentSession}
    setCurrentSession(s){this._currentSession = s}

    createTimeInputRow () {
        let row = ViewUtils.createRowElement(["row", "time-in-row", "align-items-center"])
        let colTimeIn = ViewUtils.createColumnElement()
        let colDeleteBtn = ViewUtils.createColumnElement()
        let colTimeText = ViewUtils.createColumnElement()
        let timeIn = ViewUtils.createNumberInputElement()
        
        let deletebtn = ViewUtils.createButtonElement("-", ["btn","btn-danger"])
        deletebtn.onclick = (event, c = this) => {
            event.target.parentNode.parentNode.remove()
            c.setInputRowNr(c.getInputRowNr() -1)
            c.updateInputTimeText()
        }
        let timetext = ViewUtils.createPElement(`Time ${this.getInputRowNr()} (sec.)`, ["input-time-text-label"])
    
        colTimeText.append(timetext)
        colTimeIn.append(timeIn)
        colDeleteBtn.append(deletebtn)
        row.append(colTimeText, colTimeIn, colDeleteBtn)
    
        return row
    }
    
    updateInputTimeText(){
        let textArray = document.querySelectorAll(".input-time-text-label")
        let zippedVal = zip([...Array(this._inputRowNr).keys()], textArray)
       
        zippedVal.map( (couple) =>{
            let nr = couple[0]
            let el = couple[1]
            el.innerText = `Time ${nr+1} (sec.)`
        })
    }

    createPlusButtonRow(){
        let row = ViewUtils.createRowElement()
        let colTimeIn = ViewUtils.createColumnElement()
        let colAddBtn = ViewUtils.createColumnElement()
        let colTimeText = ViewUtils.createColumnElement()
        let addButton = ViewUtils.createButtonElement("+", ["btn", "btn-success"])
        addButton.id = "add-time-input-row"
        addButton.onclick = (e, c = this) => {
            c.setInputRowNr(c.getInputRowNr() + 1)
            let container = document.querySelector(".time-input")
            let r = c.createTimeInputRow()
            container.append(r)
        }
        //<button type="button" class="btn btn-success" id="add-time-input-row">+</button>
        colAddBtn.append(addButton)
        row.append(colTimeText, colTimeIn, colAddBtn)
        return row
    }
    
    getSessionFromView(){
        let timeInArray = Array.from(document.querySelectorAll(".TimeInput"))
        let secondsArray = timeInArray.map( node => node.value).map( v => parseFloat(v)+ 0.1)
        let sessionRepetitionNumber = parseInt(document.querySelector("#repetitionNumber").value)
        console.debug(`Input Seconds ${secondsArray}; Repetitions ${sessionRepetitionNumber}`)
        return new Session(secondsArray, sessionRepetitionNumber)
    }

    update7SegmentTime(currentSeconds){
        let min = Math.trunc(currentSeconds/60)
        let sec = Math.trunc(currentSeconds%60)
        if(min < 10) min = `0${min}`
        if(sec < 10) sec = `0${sec}`
        document.getElementById("displaySeconds").innerHTML = `${min}:${sec}`
    }
    
    updateCurrentRepetitionUI(currentRep, repNr){
        document.getElementById("currentRepetition").innerText = `Repetition ${currentRep+1}/${repNr}`
    }

    highlightCurrentTime(idx, isStopped){
        let elList = document.querySelectorAll(".time-in-row")
        for (let i = 0; i < elList.length; i++) {
            if(i == idx && !isStopped){
                elList[i].style.backgroundColor = 'rgba(0, 128, 0, 0.2)'
            } else{
                elList[i].style.backgroundColor = ""
            } 
        }
    }
}