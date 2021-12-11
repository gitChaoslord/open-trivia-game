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

    // TODO: bug, pressing cancel doesnt cancel the promise aka, you get transfered to game page when it completes
    return (
        <div className="flex flex-col justify-center items-center mt-80">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex justify-center items-center mb-12">
                <div className=" w-12 h-12 bg-indigo-200 rounded-full animate-bounce"></div>
            </div>
            <Button onClick={() => {
                dispatch(cancelGame({}));
            }}>Cancel</Button>
        </div>
    )
}

export default LoadingPage;
