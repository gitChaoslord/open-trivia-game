import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { questionDiffSetting, questionNumberSetting, questionTypeSetting } from '../constants/questionSettings';
import { QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '../models/Game';
import { useAppDispatch, useAppSelector } from '../store';
import { getQuestions } from '../store/features/quiz';

interface FormModel {
  questionNumber: QuestionNumberOptions;
  questionCategory: string;
  questionType: QuestionTypeOptions;
  questionDifficulty: QuestionDifficultyOptions;
}

const InitialPage: React.FC = () => {
  const questionNumber = useAppSelector((state) => state.game.questionNumber);
  const questionType = useAppSelector((state) => state.game.questionType);
  const questionCategory = useAppSelector((state) => state.game.questionCategory);
  const questionDifficulty = useAppSelector((state) => state.game.difficulty);
  const categories = useAppSelector((state) => state.game.categories);
  const loading = useAppSelector((state) => state.quiz.loading);
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm<FormModel>({
    defaultValues: {
      questionNumber,
      questionType,
      questionCategory,
      questionDifficulty
    }
  });

  const loadQuestions = React.useCallback(async (data: FormModel) => {
    await dispatch(getQuestions({
      number: data.questionNumber,
      category: data.questionCategory,
      type: data.questionType,
      difficulty: data.questionDifficulty
    })).unwrap().catch((error) => {
      toast.error(error, { toastId: "question-error" }); // Setting ID will prevent toast duplication 
    });
  }, [dispatch]);
  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}

      {!loading &&
        <div className="page-content">

          <h1 className="text-4xl text-indigo-500 text-center">Current settings</h1>

          <form
            onSubmit={handleSubmit((data) => loadQuestions(data))}
            className="lg:w-auto text-lg flex flex-col justify-between"
          >
            <div className="border-b-2 border-indigo-500 bg-white my-6 p-5 rounded">

              <div className="form-group">
                <label className="form-label">Number of questions</label>
                <select
                  {...register("questionNumber")}
                  id="questionNumber"
                  className="form-control"
                >
                  {questionNumberSetting.map((option) => (
                    <option value={option.code} key={option.code}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select
                  {...register("questionDifficulty")}
                  id="questionDifficulty"
                  className="form-control"
                >
                  {questionDiffSetting.map((option) => (
                    <option value={option.code} key={option.code}>{option.label}</option>
                  ))}
                </select>
              </div>

              {categories.length > 0 && <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  {...register("questionCategory")}
                  id="questionCategory"
                  className="form-control"
                >
                  {categories.map((option) => (
                    <option value={option.code} key={option.code}>{option.label}</option>
                  ))}
                </select>
              </div>}

              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  {...register("questionType")}
                  id="questionType"
                  className="form-control"
                >
                  {questionTypeSetting.map((option) => (
                    <option value={option.code} key={option.code}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="btn-primary mx-auto"
            >
              Start Game
            </Button>

          </form>
        </div>}
    </React.Fragment>
  )
}

export default InitialPage;
