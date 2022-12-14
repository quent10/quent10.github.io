const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);



const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

function collide(arena,player){
    const[m,o] = [player.matrix,player.pos];
    for (let y = 0; y < m.legnth; ++y){
        for (let x = 0; x < m[y].legnth;++x){
            if (m[y][x] !==0 &&
                (arena[y+o.y] &&
                arena[y+o.y][x+ o.x]) !== 0){
                return true;  
                }
        }
    }
    return false;
}

function createMatrix(w,h){
    const matreix = [];
    while(h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw(){
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
    drawMatrix(player.matrix,player.pos);
}


function drawMatrix(matrix, offset){
    matrix.forEach((row,y) => {
        row.forEach((value,x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x+ offset.x,y+offset.y,1,1);
            }
        });
});
}

function merge(arena,player){
    player.matrix.forEach((row,y)=>{
        row.forEach((value,x) =>{
            if(value!==0){
                arena[y+player.pos.y][x+player.pos.x] = value;
            }
        });
    });
}

let dropCounter = 0;
let dropTime = 1000;

let lastTime = 0;
function update(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropTime){
    playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}
const arena = createMatrix(12,20);


function playerDrop(){
    player.pos.y++;
    if (collide(arena,player)){
        player.pos.y--;
        merge(arena,player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

const player = {
    pos: {x:5,y:5},
    matrix: matrix,
}
//fix movement
document.addEventListener('keydown', event =>{
    console.log(event);
    if(event.key === 'a'){
        player.pos.x--;
    }
    else if(event.key ==='d'){
        player.pos.x++;
    }
    else if(event.key === 's'){
        playerDrop();
    }
});

update();