import React from 'react';
import { useDispatch } from 'react-redux';
import { setSettings, startGame } from '../store/features/game';
import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import { QuestionCategoryOptions, QuestionDifficultyOptions, QuestionNumberOptions, QuestionTypeOptions } from '../models/Game';

const InitialPage: React.FC = () => {
    const dispatch = useDispatch();
    const [questionNumber, setQuestionNumber] = React.useState<QuestionNumberOptions>(10);
    const [questionType, setQuestionType] = React.useState<QuestionTypeOptions>('all');
    const [questionDifficulty, setQuestionDifficulty] = React.useState<QuestionDifficultyOptions>('any');
    const [questionCategory, setQuestionCategory] = React.useState<QuestionCategoryOptions>(10);

    // TODO: localstorage update, when you visit the initial link, you should be able to start a new game instead of loading the storage
    const startGameHandler = (e: React.MouseEvent): void => {
        dispatch(setSettings({
            questions: questionNumber,
            type: questionType,
            category: questionCategory,
            difficulty: questionDifficulty
        }));
        dispatch(startGame({ stage: "FETCHING_GAME" }));
    }

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
        { label: "True/False", code: "boolean" },
        { label: "Multiple choice", code: "multiple" },
        { label: "All", code: "all" }
    ]
    const questionCategorySetting: { label: string, code: QuestionCategoryOptions }[] = [
        { label: "Any", code: 10 }
    ]

    return (
        <div className="page-content">
            <h1 className="text-4xl text-indigo-500 text-center">Current settings</h1>
            <form className="lg:w-auto border-b-2 text-lg border-indigo-500 flex flex-col justify-between bg-white my-6 p-5 rounded ">
                <FormGroup
                    name={'Number of questions'}
                    id={'questionNumber'}
                    options={questionNumberSetting}
                    handler={(e: any) => setQuestionNumber(e.target.value)}
                />
                <FormGroup
                    name={'Difficulty'}
                    id={'questionDifficulty'}
                    options={questionDiffSetting}
                    handler={(e: any) => setQuestionDifficulty(e.target.value)}
                />
                <FormGroup
                    name={'Category'}
                    id={'questionCategory'}
                    options={questionCategorySetting}
                    handler={(e: any) => setQuestionCategory(e.target.value)}
                />
                <FormGroup
                    name={'Type'}
                    id={'questionType'}
                    options={questionTypeSetting}
                    handler={(e: any) => setQuestionType(e.target.value)}
                />
            </form>
            <Button onClick={startGameHandler} addClassNames="btn-primary">Start Game</Button>
        </div>
    )
}

export default InitialPage;

