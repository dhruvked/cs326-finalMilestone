import {Grid} from './grid.js';
import {Explain} from './explain.js';
import {board} from './points.js'

let canvas=document.getElementById("canvas1");
let grid=new Grid(canvas);
grid.makeGrid();
grid.makeLine();
grid.canvas.addEventListener("click",(e)=>{grid.event=e;grid.clickLine(board);});

let canvas2=document.getElementById("canvas2");
let explain=new Explain(canvas2);
explain.displayText();

function fetchSlope(e) {
    let get = e.target.value;
    grid.line.m=parseFloat(get);
    grid.makeLine();
    document.getElementById("testerS").value = grid.line.m;
}

function fetchY(e) {
    let get = e.target.value;
    grid.line.b=parseFloat(get);
    grid.makeLine();
    document.getElementById("testerY").value = (grid.line.b);
}

function revfetchS(e){
    let get = e.target.value;
    grid.line.m=parseFloat(get);
    grid.makeLine();
    document.getElementById("slopeRange").value = grid.line.m;
}

function revfetchY(e){
    let get = e.target.value;
    grid.line.b=parseFloat(get);
    grid.makeLine();
    document.getElementById("yRange").value = grid.line.b;
}

function next(){
    explain.slide_number++;
    explain.displayText()
}

function  prev(){
    explain.slide_number--;
    explain.displayText()
}

async function storeLine(){
    let m=grid.line.m
    let b=grid.line.b
    await board.saveLine(0,m,b);
    board.render(document.getElementById("Points"))
}
document.getElementById("slopeRange").addEventListener('input',fetchSlope);
document.getElementById("yRange").addEventListener('input',fetchY);


document.getElementById("testerS").addEventListener('input',revfetchS);
document.getElementById("testerY").addEventListener('input',revfetchY);

document.getElementById("N").addEventListener('click',next);
document.getElementById("P").addEventListener('click',prev);

document.getElementById("slopeRange").addEventListener('mouseup',storeLine);
document.getElementById("yRange").addEventListener('mouseup',storeLine)
document.getElementById("testerS").addEventListener('keyup',storeLine);
document.getElementById("testerY").addEventListener('keyup',storeLine);
