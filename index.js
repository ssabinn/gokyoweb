import {RenderPage} from "./app.js";


let dropdown = false;

const fetchData=()=>{
    fetch("./data.json").then((response)=>response.json()).then(
        (data)=>{

            RenderPage(data)
        }
    )
}

document.onload(fetchData())

