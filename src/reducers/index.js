import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state=initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                currentUser: null,
                isLoading: false
            }
        default:
            return state;
    }
}

const initialColorState = {
    primaryColor: '#4c3c4c',
    secondaryColor: '#eee'
}

const colors_reducer = (state=initialColorState, action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor
            }
        default: 
            return state;
    }
}

const initialAppComponent = {
    component: 'trade'
}

const appComponent_reducer = (state=initialAppComponent, action) => {
    switch (action.type) {
        case actionTypes.SET_APP_COMPONENT:
            return {
                component: action.payload.component
            }
        default: 
            return state;
    }
}

const initialTrades = {
    trades: null
}

const trades_reducer = (state=initialTrades, action) => {
    switch(action.type) {
        case actionTypes.SET_TRADES:
            return {
                trades: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    trades: trades_reducer,
    colors: colors_reducer,
    appComponent: appComponent_reducer
});

export default rootReducer;
