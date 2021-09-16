import { updateUI } from '../index.js'
const apiURL = 'https://api.meaningcloud.com/sentiment-2.1';
let apiKey, articleData;


async function getApiKey() {
    const response = await fetch('/apiKey');
    try {
        const data = await response.json();
        console.log(`2. API Key fetched! ${data}\nNow, it should prepare the API Call!`);
        return data;
    } catch (error) {
        console.log(error, 'HERE2');
    }
}

async function handleSubmit(url) {
    try {
        console.log(`1. Now, it should get the API Key! Handle Submit has been invoked`);
        getApiKey()
            .then(async function(apiKey) {
                let apiCall = `${apiURL}?key=${apiKey.key}&url=${url}&lang=auto`;
                console.log(`3. Query parameter prepared!`)
                return await generateArticleData(apiCall);
            })
            .then(async function(articleData) {
                console.log(`Article Confidence: ${articleData.confidence}. This should denote that data has been fetched from the API Server.`);
                console.log(`
                6. Now it's going to POST to my server, so I can fetch the data later and display it on the UI.
                `)
                return await postArticleData('/add', articleData);
            }).then(() => {
                updateUI();
            })
    } catch (error) {
        console.log(error, 'HERE');
    }
}

async function generateArticleData(apiCall) {
    console.log(`4. Now, it's going to fetch the Article Data from the Server, using the API Key!`)
    const response = await fetch(apiCall);
    try {
        const data = await response.json();
        console.log(`5. Now, it should return the data about the Article! Data: ${data}`)
        return data;
    } catch (error) {
        console.log(error, 'ERROR3');
    }
}

async function postArticleData(url = '', data) {
    console.log(`I'm in postArticleData, and it SHOULD POST to my server, now`);
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
        console.log(`7. Now, it has finised POSTing the Data to my server!
        
        `)
        return articleData;
    } catch (error) {
        console.log(error, 'ERROR4');
    }
}

export { handleSubmit }