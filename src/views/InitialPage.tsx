import React from 'react';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import { GameSettings, QuestionCategoryOptions, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '../models/Game';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { setDifficulty, setQuestionCategory, setQuestionNumbmer, setQuestionType, setStage } from '../store/features/game';
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
const questionCategorySetting: { label: string, code: QuestionCategoryOptions }[] = [
  { label: "Any", code: 10 }
];

const InitialPage: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { questionNumber, questionType, questionCategory, difficulty } = useAppSelector((state: RootState) => state.game);
  const { loading } = useAppSelector((state: RootState) => state.quiz);

  const handleStartGame = (e: React.MouseEvent): void => {
    LoadQuestions();
  }

  const LoadQuestions = React.useCallback(async () => {
    const payload: GameSettings = {
      questions: questionNumber,
      category: questionCategory,
      type: questionType,
      difficulty: difficulty
    }
    await appDispatch(getQuestions(payload))
      .unwrap()
      .then(() => {
        appDispatch(setStage('GAME'));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [questionNumber, questionType, difficulty, questionCategory, appDispatch]);

  return (
    <React.Fragment>
      {loading &&
        <div className="page-content">
          <div className="loading-container mb-12">
            <div className="loading-indicator"></div>
          </div>
        </div>}

      {!loading &&
        <div className="page-content">
          <h1 className="text-4xl text-indigo-500 text-center">Current settings</h1>
          <form className="lg:w-auto border-b-2 text-lg border-indigo-500 flex flex-col justify-between bg-white my-6 p-5 rounded ">

            <FormGroup
              name={'Number of questions'}
              id={'questionNumber'}
              options={questionNumberSetting}
              selected={questionNumber}
              handler={(e: any) => appDispatch(setQuestionNumbmer(e.target.value))}
            />
            <FormGroup
              name={'Difficulty'}
              id={'questionDifficulty'}
              options={questionDiffSetting}
              selected={difficulty}
              handler={(e: any) => appDispatch(setDifficulty(e.target.value))}
            />
            <FormGroup
              name={'Category'}
              id={'questionCategory'}
              options={questionCategorySetting}
              selected={questionCategory}
              handler={(e: any) => appDispatch(setQuestionCategory(e.target.value))}
            />
            <FormGroup
              name={'Type'}
              id={'questionType'}
              options={questionTypeSetting}
              selected={questionType}
              handler={(e: any) => appDispatch(setQuestionType(e.target.value))}
            />
          </form>
          <Button onClick={handleStartGame} className="btn-primary">Start Game</Button>
        </div>}
    </React.Fragment>
  )
}

export default InitialPage;
