var inputRowNr = 0

const zip = (a, b) => a.map((k, i) => [k, b[i]])

function createRow() {
    let row = document.createElement("div")
    row.classList.add("row")
    return row
}
function createColumn(){
    let col = document.createElement("div")
    col.classList.add("col")
    return col
}
function createTimeInput(){
    let timeIn = document.createElement("input")
    timeIn.type = "number"
    timeIn.classList.add("TimeInput")
    return timeIn
}
function createDeleteButton(){
    //<button type="button" class="btn btn-danger">-</button>
    let btn = document.createElement("button")
    btn.type = "button"
    btn.classList.add("btn")
    btn.classList.add("btn-danger")
    btn.innerText="-"
    btn.onclick = (event) => {
        event.target.parentNode.parentNode.remove()
        inputRowNr -= 1
        updateInputTimeText()
    }
    return btn
}

function createInputTimeText(){
    let timetext = document.createElement("p")
    timetext.innerText = `Time ${inputRowNr} (sec.)`
    timetext.classList.add("input-time-text-label")
    return timetext
}

function updateInputTimeText(){
    let textArray = document.querySelectorAll(".input-time-text-label")
    let zippedVal = zip([...Array(inputRowNr).keys()], textArray)
   
    zippedVal.map( (couple) =>{
        let nr = couple[0]
        let el = couple[1]
        el.innerText = `Time ${nr+1} (sec.)`
    })
}

function createTimeInputRow () {
    let row = createRow()
    let colTimeIn = createColumn()
    let colDeleteBtn = createColumn()
    let colTimeText = createColumn()
    let timeIn = createTimeInput()
    let deletebtn = createDeleteButton()
    let timetext = createInputTimeText()

    colTimeText.append(timetext)
    colTimeIn.append(timeIn)
    colDeleteBtn.append(deletebtn)
    row.append(colTimeText, colTimeIn, colDeleteBtn)

    return row
}

function addTimeInputRow(){
    inputRowNr += 1
    let container = document.querySelector(".time-input")
    let r = createTimeInputRow()
    container.append(r)
}

function getSessionFromView(){
    let timeInArray = Array.from(document.querySelectorAll(".TimeInput"))
    let secondsArray = timeInArray.map( node => node.value).map( v => parseFloat(v)+ 0.1)
    let sessionRepetitionNumber = parseInt(document.querySelector("#repetitionNumber").value)
    console.debug(`Input Seconds ${secondsArray}; Repetitions ${sessionRepetitionNumber}`)
    return new Session(secondsArray, sessionRepetitionNumber)
}

function initTimerControls(){
    addTimeInputRow()
    document.querySelector("#add-time-input-row").onclick = addTimeInputRow
    var currentSession = null
    
    document.getElementById('start').onclick = ()=>{
        currentSession = getSessionFromView()
        globalTimer.addObserver(currentSession)
    } 

    document.getElementById('stop').onclick = ()=>{
      globalTimer.setObservers([]) //removing observers to stop the session
      currentSession.stop()
    } 

}