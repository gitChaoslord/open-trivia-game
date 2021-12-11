import React from 'react';
import { cancelGame, moveToGame } from '../store/features/game';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { fetchQuestionsFail, fetchQuestionsSuccess } from '../store/features/quiz';


const LoadingPage: React.FC = () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<Boolean>(true);


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
        setLoading(false);
    }

    // TODO: Incorrent logic here
    React.useEffect(() => {
        if (loading) {
            getQuestionsFromApi();
        }
    }, [])

    return (
        <div className="flex flex-col justify-center items-center mt-80">
            {loading ? <div className="w-16 h-16 bg-indigo-500 rounded-full flex justify-center items-center mb-12">
                <div className=" w-12 h-12 bg-indigo-200 rounded-full animate-bounce"></div>
            </div> : null}

            <Button onClick={() => {
                dispatch(cancelGame({})); // TODO: feels wrong to pass empty object
            }}>Cancel</Button>

        </div>
    )
}

export default LoadingPage;
