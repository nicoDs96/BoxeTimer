class ViewUtils{
    static createRowElement(classes = ["row"]) {
        let row = document.createElement("div")
        classes.forEach(classAttr => row.classList.add(classAttr) )
        return row
    }

    static createColumnElement(classes = ["col"]){
        let col = document.createElement("div")
        classes.forEach(classAttr => col.classList.add(classAttr) )
        return col
    }

    static createNumberInputElement(classes = ["TimeInput", "form-control"]){
        let timeIn = document.createElement("input")
        timeIn.type = "number"
        classes.forEach(classAttr => timeIn.classList.add(classAttr) )
        return timeIn
    }

    static createButtonElement(innerText, classes = ["btn"]){
        let btn = document.createElement("button")
        btn.type = "button"
        classes.forEach(classAttr => btn.classList.add(classAttr) )
        btn.innerText=innerText
        return btn
    }
    
    static createPElement(innerText, classes = []){
        let timetext = document.createElement("p")
        timetext.innerText = innerText
        classes.forEach(classAttr => timetext.classList.add(classAttr) )
        return timetext
    }
}