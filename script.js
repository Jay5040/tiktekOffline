let boxes = document.querySelectorAll('.box');
let resetBtn = document.getElementById('Reset');

let turno = true; // 'O' starts
let turnx = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let position1 = boxes[pattern[0]].innerHTML;
        let position2 = boxes[pattern[1]].innerHTML;
        let position3 = boxes[pattern[2]].innerHTML;

        if (position1 !== "" && position1 === position2 && position1 === position3) {
            let jimyDiv = document.getElementById('jimy');
            jimyDiv.innerHTML = ""; // Clear previous content

            // Create winner text
            let winnerText = document.createElement('h1');
            winnerText.id = 'Winner';
            winnerText.innerHTML = "Winner is: " + position1;

            // Create winning image
            let winImg = document.createElement('img');
            winImg.src = './icons/tic-tac-toe-icon.png';
            winImg.alt = 'Winner Icon';
            winImg.style.maxWidth = "200px";
            winImg.style.borderRadius = "10px";

            // Append both elements
            jimyDiv.appendChild(winnerText);
            jimyDiv.appendChild(winImg);

            boxes[pattern[0]].style.backgroundColor = "red";
            boxes[pattern[1]].style.backgroundColor = "red";
            boxes[pattern[2]].style.backgroundColor = "red";

            boxes.forEach((box) => box.disabled = true);

            return;
        }
    }

    // Draw check
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerHTML === "") isDraw = false;
    });

    if (isDraw) {
        let jimyDiv = document.getElementById('jimy');
        jimyDiv.innerHTML = "<h1 id='Winner'>It's a Draw!</h1>";
        boxes.forEach((box) => box.disabled = true);
    }
};




resetBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "white";
        box.disabled = false;
    });

    document.getElementById('Winner').innerHTML = ""; 
    document.getElementById('jimy').innerHTML = ""; // Clear winning image
});




boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML === "") { // Prevent overwriting an already clicked box
            if (turno) {
                box.innerHTML = "O";
                turno = false;
                turnx = true;
            } else {
                box.innerHTML = "X";
                turno = true;
                turnx = false;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});
