import Button from '@components/Button';
import LoadingSpinner from '@components/Loading';
import { questionDiffSetting, questionNumberSetting, questionTypeSetting } from '@constants/settings';
import { CUR_SETTIGNS, QUEST_CAT, QUEST_DIFF, QUEST_NUM, QUEST_TYPE, START_GAME } from '@constants/strings';
import type { QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '@models/game';
import { getQuestions } from '@store/features/game';
import { useAppDispatch, useAppSelector } from '@store/index';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

interface FormModel {
  questionNumber: QuestionNumberOptions;
  questionCategory: string;
  questionType: QuestionTypeOptions;
  questionDifficulty: QuestionDifficultyOptions;
}

const InitialView: React.FC = () => {
  const questionNumber = useAppSelector((state) => state.game.questionNumber);
  const questionType = useAppSelector((state) => state.game.questionType);
  const questionCategory = useAppSelector((state) => state.game.questionCategory);
  const questionDifficulty = useAppSelector((state) => state.game.difficulty);
  const categories = useAppSelector((state) => state.game.categories);
  const loading = useAppSelector((state) => state.game.loading);
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

      {!loading && <React.Fragment>

        <h1 className="text-4xl text-indigo-500 text-center">{CUR_SETTIGNS}</h1>

        <form
          onSubmit={handleSubmit((data) => loadQuestions(data))}
          className="lg:w-auto text-lg flex flex-col justify-between"
        >
          <div className="border-b-2 border-indigo-500 bg-white my-6 p-5 rounded">

            <div className="form-group">
              <label className="form-label">{QUEST_NUM}</label>
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
              <label className="form-label">{QUEST_DIFF}</label>
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
              <label className="form-label">{QUEST_CAT}</label>
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
              <label className="form-label">{QUEST_TYPE}</label>
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
            {START_GAME}
          </Button>

        </form>
      </React.Fragment>}
    </React.Fragment>
  )
}

export default InitialView;
