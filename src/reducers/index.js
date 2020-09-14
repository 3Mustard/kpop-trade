import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

// USER REDUCER
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

// COLOR REDUCER
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

// CURRENT COMPONENT REDUCER
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

// TRADES REDUCER
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

// CHAT CHANNEL REDUCER
const initialChannelState = {
    currentChannel: null // will be an id composed of two users, 'id1-id2'
}

const channel_reducer = (state=initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer,
    trades: trades_reducer,
    colors: colors_reducer,
    appComponent: appComponent_reducer
});

export default rootReducer;
