import React from 'react';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import LoadingSpinner from '../components/LoadingSpinner';
import { constructCategories } from '../helpers/utils';
import { GameSettings, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '../models/Game';
import { useAppDispatch, useAppSelector } from '../store';
import { getCategories, setDifficulty, setQuestionCategory, setQuestionNumbmer, setQuestionType } from '../store/features/game';
import { getQuestions } from '../store/features/quiz';

const questionDiffSetting: { label: string, code: QuestionDifficultyOptions }[] = [
  { label: "Mixed", code: "any" },
  { label: "Easy", code: "easy" },
  { label: "Medium", code: "medium" },
  { label: "Hard", code: "hard" }
];
const questionNumberSetting: { label: string, code: QuestionNumberOptions }[] = [
  { label: "10", code: 10 },
  { label: "15", code: 15 },
  { label: "20", code: 20 }
];
const questionTypeSetting: { label: string, code: QuestionTypeOptions }[] = [
  { label: "All", code: "all" },
  { label: "True/False", code: "boolean" },
  { label: "Multiple choice", code: "multiple" }
];

const InitialPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questionNumber, questionType, questionCategory, difficulty } = useAppSelector((state) => state.game);
  const { categories, categoriesLoading, categoriesInitialized } = useAppSelector((state) => state.game);
  const { loading } = useAppSelector((state) => state.quiz);

  const isLoading = React.useMemo(() => loading || categoriesLoading, [loading, categoriesLoading]);

  const LoadQuestions = React.useCallback(async () => {
    const payload: GameSettings = {
      questions: questionNumber,
      category: questionCategory,
      type: questionType,
      difficulty: difficulty
    };
    await dispatch(getQuestions(payload)).unwrap();
  }, [questionNumber, questionType, difficulty, questionCategory, dispatch]);

  React.useEffect(() => {
    if (!categoriesInitialized) {
      dispatch(getCategories()).unwrap()
    }
  }, [dispatch, categoriesInitialized])

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}

      {!isLoading &&
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
            <FormGroup
              name={'Category'}
              id={'questionCategory'}
              options={constructCategories(categories)}
              selected={questionCategory}
              handler={(e: any) => dispatch(setQuestionCategory(e.target.value))}
            />
            <FormGroup
              name={'Type'}
              id={'questionType'}
              options={questionTypeSetting}
              selected={questionType}
              handler={(e: any) => dispatch(setQuestionType(e.target.value))}
            />
          </form>
          <Button disabled={categoriesLoading} onClick={LoadQuestions} className="btn-primary">Start Game</Button>
        </div>}
    </React.Fragment>
  )
}

export default InitialPage;
