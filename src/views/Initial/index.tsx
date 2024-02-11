import Button from '@components/button';
import LoadingSpinner from '@components/loading';
import { questionDiffSetting, questionNumberSetting, questionTypeSetting } from '@constants/settings';
import { SETTINGS, QUEST_CAT, QUEST_DIFF, QUEST_NUM, QUEST_TYPE, START_GAME } from '@constants/strings';
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

  const loadQuestions = React.useCallback(async ({ questionNumber, questionCategory, questionDifficulty, questionType }: FormModel) => {
    await dispatch(getQuestions({
      number: questionNumber,
      category: questionCategory,
      type: questionType,
      difficulty: questionDifficulty
    })).unwrap().catch((error) => {
      toast.error(error, { toastId: "question-error" }); // Setting ID will prevent toast duplication 
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}

      {!loading && <React.Fragment>
        <h2>{SETTINGS}</h2>

        <form
          onSubmit={handleSubmit((data) => loadQuestions(data))}
          className="flex flex-col mb-3"
        >

          <div className="form__body">

            <div className="form__group">
              <label className="form__group-label">{QUEST_NUM}</label>
              <select
                {...register("questionNumber")}
                id="questionNumber"
                className="form__group-control"
              >
                {questionNumberSetting.map((option) => (
                  <option value={option.code} key={option.code}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="form__group">
              <label className="form__group-label">{QUEST_DIFF}</label>
              <select
                {...register("questionDifficulty")}
                id="questionDifficulty"
                className="form__group-control"
              >
                {questionDiffSetting.map((option) => (
                  <option value={option.code} key={option.code}>{option.label}</option>
                ))}
              </select>
            </div>

            {categories.length > 0 && <div className="form__group">
              <label className="form__group-label">{QUEST_CAT}</label>
              <select
                {...register("questionCategory")}
                id="questionCategory"
                className="form__group-control"
              >
                {categories.map((option) => (
                  <option value={option.code} key={option.code}>{option.label}</option>
                ))}
              </select>
            </div>}

            <div className="form__group">
              <label className="form__group-label">{QUEST_TYPE}</label>
              <select
                {...register("questionType")}
                id="questionType"
                className="form__group-control"
              >
                {questionTypeSetting.map((option) => (
                  <option value={option.code} key={option.code}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__actions">
            <Button
              type="submit"
              className="btn-primary"
            >
              {START_GAME}
            </Button>
          </div>
        </form>
      </React.Fragment>}
    </React.Fragment>
  )
}

export default InitialView;
