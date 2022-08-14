const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEL = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
let myLeads = []


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



function render(leads){
    let listItems = ""

    for(let i = 0; i< leads.length;i++){
        listItems += `<li><a target="_blank" href="https://${leads[i]}">${leads[i]}</a></li>`
    }
    
    ulEL.innerHTML = listItems
}



if(leadsFromLocalStorage){
   myLeads = leadsFromLocalStorage
   render(myLeads)
 }


 deleteBtn.addEventListener('dblclick', () =>{
    localStorage.clear()
    myLeads = []
    render(myLeads)
 })


inputBtn.addEventListener("click", () =>{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    render(myLeads)
   
})

tabBtn.addEventListener("click",()=> {
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads) 
    })
    
})

