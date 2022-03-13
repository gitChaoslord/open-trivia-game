import React from 'react';
import { moveToGame } from '../store/features/game';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsFail, fetchQuestionsSuccess } from '../store/features/quiz';
import { GameSettings, QuestionCategoryOptions, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '../models/Game';


const LoadingPage: React.FC = () => {
    const dispatch = useDispatch();
    const settings: GameSettings = useSelector((state: RootStateOrAny) => state.game.settings);


    React.useEffect(() => {
        // const apiUrl = 'https://opentdb.com/api.php?amount=10&type=boolean'; // example
        const baseUrl = 'https://opentdb.com/api.php';
        const questionNumber: QuestionNumberOptions = settings.questions;
        const questionCategory: QuestionCategoryOptions = settings.category;
        const questionType: QuestionTypeOptions = settings.type;
        const questionDifficulty: QuestionDifficultyOptions = settings.difficulty;

        const finalUrl = `${baseUrl}?amount=${questionNumber}${questionType !== 'all' ? `&type=${questionType}` : ''}${questionDifficulty !== 'any' ? `&difficulty=${questionDifficulty}` : ''}${questionCategory !== 10 ? `&category=${questionCategory}` : ''}`
        console.log(finalUrl)

        const getQuestionsFromApi = async () => {
            await fetch(finalUrl).then(res => res.json()).then(
                questions => {
                    console.log(questions);
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

        getQuestionsFromApi();
    }, [])

    // TODO: bug, pressing back while loading transfers you to the game page when the promise is completed
    return (
        <div className="page-content">
            <div className="loading-container mb-12">
                <div className="loading-indicator"></div>
            </div>
        </div>
    )
}

export default LoadingPage;
