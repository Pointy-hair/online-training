import * as learningPathLayout from '../actions/learning-path.layout.actions';

export interface LearningPathLayoutState {
    isDetailPage: boolean;
}

export const initialState: LearningPathLayoutState = {
    isDetailPage: false
};

export function learningPathReducer(state = initialState, action: learningPathLayout.Actions) {
    switch (action.type) {
        case learningPathLayout.DETAIL_PAGE:
            return {
                ...state,
                isDetailPage: action.payload
            };
        default:
            return state;
    }
}

export const getPathList = (state: LearningPathLayoutState) => state.isDetailPage;
