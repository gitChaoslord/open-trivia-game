import React from 'react';
import { moveToGame } from '../store/features/game';
import { useDispatch } from 'react-redux';
import { fetchQuestionsFail, fetchQuestionsSuccess } from '../store/features/quiz';


const LoadingPage: React.FC = () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';
    const dispatch = useDispatch();

    const getQuestionsFromApi = async () => {
        await fetch(apiUrl).then(res => res.json()).then(
            questions => {
                dispatch(fetchQuestionsSuccess({ ...questions.results }));
                dispatch(moveToGame({}));
            }
        ).catch(
            error => {
                Promise.reject(error)
                dispatch(fetchQuestionsFail({ error: 'Something went wrong' }));
            }
        );
    }

    React.useEffect(() => {
        getQuestionsFromApi();
    }, [])

    // TODO: bug, pressing cancel transfers you to the game page when the promise is completed
    return (
        <div className="page-content">
            <div className="loading-container mb-12">
                <div className="loading-indicator"></div>
            </div>
        </div>
    )
}

export default LoadingPage;
