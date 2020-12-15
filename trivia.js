const body = document.querySelector('body');
const main = document.createElement('main');
main.className ='mainContainer';
document.body.appendChild(main);
const link = "https://opentdb.com/api.php?amount=10&category=11&type=multiple";
const question = document.createElement("p");

let scoreDisplay = document.createElement("div");
scoreDisplay.className = "scoreDisplay";

const Score = document.createElement("button");
Score.textContent = "Score";

const refresh = document.createElement("button");
refresh.textContent = "Refresh";

const buttonDiv = document.createElement("div");
buttonDiv.className = "buttonDiv";

//requests for trivia data

fetch(link)
.then(response => (response.json()))
.then(array => {

    let score = 0;

    const arrayAPI = array.results;

    const title = document.createElement("h1");
    title.textContent = `${(arrayAPI[0].category)}`;
    main.appendChild(title);

    for(let i = 0; i < arrayAPI.length; i++){

        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        main.appendChild(questionDiv);

        const question = document.createElement('p');
        question.className = "question";
        question.textContent = (arrayAPI[i].question);
        questionDiv.appendChild(question);

        const answersDiv = document.createElement("div");
        answersDiv.className = "answersDiv";
        questionDiv.appendChild(answersDiv);

        const questionArr = arrayAPI[i].incorrect_answers;

        const correctAnsw = arrayAPI[i].correct_answer;
        questionArr.push(correctAnsw)

        shuffle(questionArr);

        for(let answer of questionArr){

            const inputLabelDiv = document.createElement("div");
            inputLabelDiv.className = "inputLabelDiv";
            answersDiv.appendChild(inputLabelDiv);

            const input = document.createElement("input");
            input.for = (answer);
            input.className = "input"+i;
            input.type = "radio";
            input.name = "answers" + i;
            inputLabelDiv.appendChild(input)

            const label = document.createElement("label");
            label.className = "label";
            label.id = (answer);
            label.textContent = (answer);
            inputLabelDiv.appendChild(label);

            input.addEventListener("change", function (){

                if(label.textContent == (arrayAPI[i].correct_answer)){
                    console.log("Ok!");
                    score ++;
                    console.log(score)
                }else{
                    console.log("wrong!");
                    score --;
                    console.log(score);
                };

                scoreDisplay.textContent = `You have ${score} point(s).`

            }
            );

            Score.addEventListener("click", function (){
                main.appendChild(scoreDisplay)
            });
            refresh.addEventListener("click", function (){
                location.reload();
                main.removeChild(scoreDisplay);
            });

        }
    main.appendChild(buttonDiv)
    buttonDiv.appendChild(Score);
    buttonDiv.appendChild(refresh);
    }

})



/**
 * @param {*} arr Shuffles the given array using the Fisher-Yates' algorithm.
 */
function shuffle(arr){
    for(let i=arr.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}
