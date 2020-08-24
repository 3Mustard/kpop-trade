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

// ** Channel actions **
export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

// Takes in a boolean
export const setPrivateChannel = isPrivateChannel => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}

export const setUserPosts = userPosts => {
    return {
        type: actionTypes.SET_USER_POSTS,
        payload: {
            userPosts
        }
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

export const setChatOrTrade = (update) => {
    if (update === 'trade') {
        return {
            type: actionTypes.SET_APP_TO_TRADE
        };
    } else {
        return {
            type: actionTypes.SET_APP_TO_CHAT
        };
    }
}