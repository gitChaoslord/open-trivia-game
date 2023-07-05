import React from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import LoadingSpinner from '../components/LoadingSpinner';
import { questionDiffSetting, questionNumberSetting, questionTypeSetting } from '../constants/questionSettings';
import { constructCategories } from '../helpers/utils';
import { GameSettings } from '../models/Game';
import { useAppDispatch, useAppSelector } from '../store';
import { setDifficulty, setQuestionCategory, setQuestionNumbmer, setQuestionType } from '../store/features/game';
import { getQuestions } from '../store/features/quiz';

const InitialPage: React.FC = () => {
  const questionNumber = useAppSelector((state) => state.game.questionNumber);
  const questionType = useAppSelector((state) => state.game.questionType);
  const questionCategory = useAppSelector((state) => state.game.questionCategory);
  const difficulty = useAppSelector((state) => state.game.difficulty);
  const categories = useAppSelector((state) => state.game.categories);
  const loading = useAppSelector((state) => state.quiz.loading);
  const dispatch = useAppDispatch();

  const LoadQuestions = React.useCallback(async () => {
    const payload: GameSettings = {
      questions: questionNumber,
      category: questionCategory,
      type: questionType,
      difficulty: difficulty
    };
    await dispatch(getQuestions(payload)).unwrap().catch((error) => {
      toast.error(error, { toastId: "question-error" }); // Setting ID will prevent toast duplication 
    });
  }, [questionNumber, questionType, difficulty, questionCategory, dispatch]);

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}

      {!loading &&
        <div className="page-content">
          <h1 className="text-4xl text-indigo-500 text-center">Current settings</h1>
          <form className="lg:w-auto border-b-2 text-lg border-indigo-500 flex flex-col justify-between bg-white my-6 p-5 rounded ">

            <FormGroup
              name={'Number of questions'}
              id={'questionNumber'}
              options={questionNumberSetting}
              selected={questionNumber}
              handler={(e: any) => dispatch(setQuestionNumbmer(e.target.value))}
            />

            <FormGroup
              name={'Difficulty'}
              id={'questionDifficulty'}
              options={questionDiffSetting}
              selected={difficulty}
              handler={(e: any) => dispatch(setDifficulty(e.target.value))}
            />

            {categories.length ? <FormGroup
              name={'Category'}
              id={'questionCategory'}
              options={constructCategories(categories)}
              selected={questionCategory}
              handler={(e: any) => dispatch(setQuestionCategory(e.target.value))}
            /> : null}

            <FormGroup
              name={'Type'}
              id={'questionType'}
              options={questionTypeSetting}
              selected={questionType}
              handler={(e: any) => dispatch(setQuestionType(e.target.value))}
            />
          </form>
          <Button onClick={LoadQuestions} className="btn-primary">Start Game</Button>
        </div>}
    </React.Fragment>
  )
}

export default InitialPage;
