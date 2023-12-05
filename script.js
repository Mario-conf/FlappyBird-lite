let moveSpeed = 3;
let gravity = 0.5;
let bird;
let birdProps;
let background;
let scoreVal;
let gameState;

window.onload = function () {
    alert("Press Enter to start playing!");
    console.log("Script loaded!");

    bird = document.querySelector('.bird');
    birdProps = bird.getBoundingClientRect();
    background = document.querySelector('.background').getBoundingClientRect();
    scoreVal = document.querySelector('.score_val');
    gameState = 'Start';

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && gameState !== 'Play') {
            document.querySelectorAll('.pipe_sprite').forEach((e) => {
                e.remove();
            });
            bird.style.top = '50vh';
            gameState = 'Play';
            scoreVal.innerHTML = '0';
            play();
        }
    });
};

function play() {
    function move() {
        if (gameState !== 'Play') return;

        let pipeSprite = document.querySelectorAll('.pipe_sprite');
        pipeSprite.forEach((element) => {
            let pipeSpriteProps = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();

            if (pipeSpriteProps.right <= 0) {
                element.remove();
            } else {
                if (
                    birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width &&
                    birdProps.left + birdProps.width > pipeSpriteProps.left &&
                    birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height &&
                    birdProps.top + birdProps.height > pipeSpriteProps.top
                ) {
                    gameState = 'End';
                    alert(`Game Over! Your Score: ${scoreVal.innerHTML}. Press Enter To Restart`);
                    location.reload();
                    return;
                } else {
                    if (
                        pipeSpriteProps.right < birdProps.left &&
                        pipeSpriteProps.right + moveSpeed >= birdProps.left &&
                        element.increaseScore === '1'
                    ) {
                        scoreVal.innerHTML = +scoreVal.innerHTML + 1;
                    }
                    element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
                }
            }
        });

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);

    let birdDy = 0;
    function applyGravity() {
        if (gameState !== 'Play') return;
        birdDy = birdDy + gravity;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                birdDy = -7.6;
            }
        });

        if (birdProps.top <= 0 || birdProps.bottom >= background.bottom) {
            gameState = 'End';
            alert(`Game Over! Your Score: ${scoreVal.innerHTML}. Press Enter To Restart`);
            location.reload();
            return;
        }
        bird.style.top = birdProps.top + birdDy + 'px';
        birdProps = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }

    requestAnimationFrame(applyGravity);

    let pipeSeparation = 0;
    let pipeGap = 35;

    function createPipe() {
        if (gameState !== 'Play') return;

        if (pipeSeparation > 115) {
            pipeSeparation = 0;

            let pipePosi = Math.floor(Math.random() * 43) + 8;
            let pipeSpriteInv = document.createElement('div');
            pipeSpriteInv.className = 'pipe_sprite';
            pipeSpriteInv.style.top = pipePosi - 70 + 'vh';
            pipeSpriteInv.style.left = '100vw';

            document.body.appendChild(pipeSpriteInv);
            let pipeSprite = document.createElement('div');
            pipeSprite.className = 'pipe_sprite';
            pipeSprite.style.top = pipePosi + pipeGap + 'vh';
            pipeSprite.style.left = '100vw';
            pipeSprite.increaseScore = '1';

            document.body.appendChild(pipeSprite);
        }

        pipeSeparation++;
        requestAnimationFrame(createPipe);
    }

    requestAnimationFrame(createPipe);
}
