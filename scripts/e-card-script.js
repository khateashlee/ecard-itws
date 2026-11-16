let giftPage = document.getElementById("giftPage");
let lettersPage = document.getElementById("lettersPage");

let box = document.getElementById("box");
let image = box.querySelector("img");

let quiz = document.getElementById("quiz");
let questionText = document.getElementById("question");
let answersDiv = document.getElementById("answers");
let nextButton = document.getElementById("next");

/* QUIZ QUESTIONS */
let questions = [
    {
        question: "1. What does HTML stand for?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language"
        ],
        correct: 0
    },
    {
        question: "2. Which language is used to style a webpage?",
        answers: [
            "JavaScript",
            "CSS",
            "Python"
        ],
        correct: 1
    },
    {
        question: "3. What does JavaScript make possible?",
        answers: [
            "Interactive webpages",
            "Only webpage colors",
            "Only webpage headings"
        ],
        correct: 0
    },
    {
        question: "4. Ipapasa ba ako ni Ma'am Roan?",
        answers: [
            "Yes",
            "No",
            "Slight lang"
        ],
        correct: 0
    },
    {
        question: "5. Madali kaya ang exam?",
        answers: [
            "Opo",
            "No",
            "Dipindi"
        ],
        correct: 0
    }
];

/* QUIZ VARIABLES */
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;

/* OPEN THE GIFT */
box.addEventListener("click", function() {

    box.disabled = true;

    // Play the gift animation
    box.classList.add("opening");

    // Change the gift image after the animation
    setTimeout(function() {

        image.src = "images/opened-gift-box.png";

        // Show the quiz
        quiz.showModal();

        showQuestion();

    }, 700);

});

/* DISPLAY A QUESTION */
function showQuestion() {

    let current = questions[currentQuestion];

    questionText.textContent = current.question;

    answersDiv.innerHTML = "";

    selectedAnswer = null;

    // Display all the answer choices
    current.answers.forEach(function(answer, index) {

        let button = document.createElement("button");

        button.textContent = answer;

        // Detect when an answer is clicked
        button.addEventListener("click", function() {

            selectedAnswer = index;

            let allButtons = answersDiv.querySelectorAll("button");

            allButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

        });

        answersDiv.appendChild(button);

    });

    // Change the text of the next button
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "See My Score!";
    } else {
        nextButton.textContent = "Next Question";
    }

}

/* CHECK ANSWERS AND MOVE TO THE NEXT QUESTION */
nextButton.addEventListener("click", function() {

    // Make sure an answer was selected
    if (selectedAnswer === null) {
        alert("Please choose an answer first!");
        return;
    }

    // Check if the answer is correct
    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    // Show the next question if there are more
    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

});


/* DISPLAY THE FINAL SCORE */
function showScore() {
    quiz.innerHTML = `
        <p class="small-heading">QUIZ COMPLETE</p>

        <h1>${score}/${questions.length}</h1>

        <p>You got ${score} out of ${questions.length} questions correct!</p>

        <p>Thank you for playing!</p>

        <button id="continue">Continue</button>
    `;

    // Continue to the letters page
    let continueButton = document.getElementById("continue");

    continueButton.addEventListener("click", function() {

        quiz.close();

        giftPage.classList.add("hidden");

        lettersPage.classList.remove("hidden");

        // Change the page hint
        let pageHint = document.getElementById("page-hint");

        pageHint.textContent = "Scroll down to discover your letters ↓";

    });

}

/* INTERACTIVE LETTERS */
let notes = document.querySelectorAll(".note");
let notesContainer = document.querySelector(".notes-container");

notes.forEach(function(note) {

    note.addEventListener("click", function() {

        // If the clicked note is already open, close it
        if (note.classList.contains("active")) {

            note.classList.remove("active");

            notesContainer.classList.remove("has-open");

        } else {

            // Open the clicked note
            note.classList.add("active");

            notesContainer.classList.add("has-open");

        }

    });

});
