export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return undefined;
    }
}

// TODO: add a throttle function from lodash to limit localstorage actions or look for alternatives
export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
    }
}