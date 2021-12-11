import React from 'react';
import { cancelGame } from '../store/features/game';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';

const LoadingPage: React.FC = () => {

    const dispatch = useDispatch();
    const [loading, isLoading] = React.useState<Boolean>(true);

    React.useEffect(() => {

        if (loading) {
            console.log(loading);
        }

    }, [loading])

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
