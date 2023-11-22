//https://sri-mayur.github.io/Sort-Analyzer/

myCanvas.width= 600;
myCanvas.height=500;
const margin=30;

const n=20;
const array=[];

let moves=[];


const cols=[];
const spacing =(myCanvas.width-margin*2)/n;

const ctx= myCanvas.getContext("2d");
const maxColumnHeight=300;

init();

let audioCtx=null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }

    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);

    const node = audioCtx.createGain();
    node.gain.value = 0.4;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);

}



function init(){
    for(let i=0; i<n; i++){
        array[i]=Math.random();
    }
    moves=[];
    for(let i=0; i<array.length;i++){
        const x = i*spacing+spacing/2+margin;
        const y = myCanvas.height-margin-i*8;
        const width = spacing-4;
        const height = maxColumnHeight*array[i];
    
        cols[i]=new Column(x,y,width,height);
    }

}


function play(){
    moves=bubbleSort(array);
}
animate();

function playSelectionSort() {
    moves = selectionSort(array);
    animate();
}

function playInsertionSort() {
    moves = insertionSort(array);
    animate();
}



function bubbleSort(array) {
    const moves = [];
    let n = array.length;
    let swapped;

    do {
        swapped = false;

        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                swapped = true;
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({ indices: [i, i + 1], swap: true });
            } else {
                moves.push({ indices: [i, i + 1], swap: false });
            }
        }
        n--;
    } while (swapped);

    return moves;
}


function selectionSort(array) {
    const moves = [];

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            moves.push({ indices: [i, minIndex], swap: true });
        } else {
            moves.push({ indices: [i, minIndex], swap: false });
        }
    }

    return moves;
}


function insertionSort(array) {
    const moves = [];

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            moves.push({ indices: [j, j + 1], swap: true });
            j--;
        }

        array[j + 1] = key;
        moves.push({ indices: [j + 1, j + 1], swap: false });
    }

    return moves;
}



function animate(){
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);

    let changed=false;
    for(let i=0; i<cols.length; i++){
        changed = cols[i].draw(ctx) || changed;
    }


    if(!changed && moves.length>0){
        const move=moves.shift();
        const[i,j]=move.indices;

        playNote(200);

        if(move.swap){
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i],-1);
            [cols[i],cols[j]]=[cols[j],cols[i]];

        }else{
            cols[i].jump();
            cols[j].jump();

        }
    }

    requestAnimationFrame(animate);

}