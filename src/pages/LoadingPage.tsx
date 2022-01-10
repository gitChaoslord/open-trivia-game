import React from 'react';
import { cancelGame, moveToGame } from '../store/features/game';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
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
            <Button onClick={() => {
                dispatch(cancelGame({}));
            }}>Cancel</Button>
        </div>
    )
}

export default LoadingPage;
