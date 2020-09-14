import * as actionTypes from './types';

// **User actions**
export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}

// ** Color actions **
export const setColors = (primaryColor, secondaryColor) => {
    return {
        type: actionTypes.SET_COLORS,
        payload: {
            primaryColor,
            secondaryColor
        }
    }
}

// ** Chat/Trade status ** 
export const setAppComponent = (component) => {
    return {
        type: actionTypes.SET_APP_COMPONENT,
        payload: {
            component
        }
    };
}

// ** Trade actions **
export const setTrades = (trades) => {
    return {
        type: actionTypes.SET_TRADES,
        payload: {
            trades
        }
    }
}

// ** Channel actions **
export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}
