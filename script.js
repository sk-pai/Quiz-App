let xmlContent = '';
let quizItem = document.getElementById('quiz');

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function loadQuiz(currentQuiz, score) {

    const quiz = document.getElementById('quiz')
    const answerEls = document.querySelectorAll('.answer')
    const questionEl = document.getElementById('question')
    const a_text = document.getElementById('a_text')
    const b_text = document.getElementById('b_text')
    const c_text = document.getElementById('c_text')
    const d_text = document.getElementById('d_text')
    const submitBtn = document.getElementById('submit')

    deselectAnswers()

    fetch('data.xml').then((response) => {
        response.text().then((xml) => {
            xmlContent = xml;

            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
            let questions = xmlDOM.querySelectorAll('Question');

            // console.log(questions);

            questionEl.innerText = questions[currentQuiz].children[0].innerHTML;
            a_text.innerText = questions[currentQuiz].children[1].innerHTML;
            b_text.innerText = questions[currentQuiz].children[2].innerHTML;
            c_text.innerText = questions[currentQuiz].children[3].innerHTML;
            d_text.innerText = questions[currentQuiz].children[4].innerHTML;

            // console.log(questions.length);

            submitBtn.addEventListener('click', () => {
                const answer = getSelected()

                // console.log(answer);
                // console.log(questions[currentQuiz].children[5].innerHTML);

                if (answer) {
                    if (answer === questions[currentQuiz].children[5].innerHTML) {
                        score++
                    }
                    currentQuiz++

                    console.log(currentQuiz);

                    if (currentQuiz < questions.length) {
                        loadQuiz(currentQuiz, score)
                    } else {
                        quiz.innerHTML = `
                            <h2>You answered ${score}/${questions.length} questions correctly</h2>
                            <button onclick="location.reload()">Reload</button>
                        `
                    }
                }
            })

        });

    });
};

loadQuiz(0, 0);