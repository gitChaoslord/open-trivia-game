const apiUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';


export const fetchQuizFromApi = () => {
    return fetch(apiUrl).then(res => res.json()).then(questions => questions.results).catch(error => Promise.reject(error));
}