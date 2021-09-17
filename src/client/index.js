import { handleSubmit } from './js/formHandler'
import { isURL } from './js/urlChecker'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

const agreement = document.getElementById('agreement');
const confidence = document.getElementById('confidence');
const irony = document.getElementById('irony');
const subjectivity = document.getElementById('subjectivity');
const resultSection = document.getElementById('results-section');
const waitingText = document.getElementById('waiting');

let articleData;

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', async function() {
        let urlElement = document.getElementById('name');
        if (isURL(urlElement.value)) {
            try {
                resultSection.classList.add('hidden');
                waitingText.classList.remove('hidden');
                handleSubmit(urlElement.value);
            } catch (error) {
                console.log(`ERROR ${error}\n(in click eventListener in index.js -client)`)
            }
        } else {
            urlElement.value = '';
            alert('Please make sure to enter a correct URL.');
        }
    });
});

async function fetchArticleData() {
    const response = await fetch('/data')
    try {
        const data = await response.json();
        articleData = data;
        return data;
    } catch (error) {
        console.log(error, ' Error in fetchArticleData function in index.js -client');
    }


}

async function updateUI() {
    fetchArticleData().then((articleData) => {
        waitingText.classList.add('hidden');
        resultSection.classList.remove('hidden');
        agreement.innerHTML = agreement.innerHTML + titleCase(articleData.agreement);
        confidence.innerHTML = confidence.innerHTML + articleData.confidence + '%';
        irony.innerHTML = irony.innerHTML + titleCase(articleData.irony);
        subjectivity.innerHTML = subjectivity.innerHTML + titleCase(articleData.subjectivity);
    });
}

function titleCase(string) {
    return string.charAt(0) + string.substr(1).toLowerCase();
}

function clearUI() {
    resultSection.classList.remove('hidden');
    agreement.innerHTML = 'Agreement: ';
    confidence.innerHTML = 'Confidence: ';
    irony.innerHTML = 'Irony: ';
    subjectivity.innerHTML = 'Subjectivity: ';
}


export { updateUI }
export { clearUI }