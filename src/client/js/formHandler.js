import { updateUI } from '../index.js'
import { clearUI } from '../index.js'

const apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
let apiKey, articleData;


async function getApiKey() {
    const response = await fetch('/apiKey');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, ' Error in getApiKey function in formHandler.js');
    }
}

async function handleSubmit(url) {
    try {
        getApiKey()
            .then(async function(apiKey) {
                let apiCall = `${apiURL}?key=${apiKey.key}&url=${url}&lang=auto`;
                return await generateArticleData(apiCall);
            })
            .then(async function(articleData) {
                return await postArticleData('/add', articleData);
            }).then(() => {
                clearUI();
                updateUI();
            })
    } catch (error) {
        console.log(error, ' Error in handleSubmit function in formHandler.js');
    }
}

async function generateArticleData(apiCall) {
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, ' Error in generateArticleData in formHandler.js');
    }
}

async function postArticleData(url = '', data) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const articleData = await response.json();
        return articleData;
    } catch (error) {
        console.log(error, ' Error in postArticleData in formHandler.js');
    }
}

export { handleSubmit }