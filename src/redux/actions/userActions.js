import { Action_Types } from "../constants/Action_Types"

export const setQuotes = (users) => {
    return {
        type : Action_Types.SET_QUOTES,
        payload : users
    }
}

export const addQuote = (user) => {
    return {
        type : Action_Types.ADD_QUOTES,
        payload : user
    }
}


export const getAllQuotes = (user) => {
    return {
        type : Action_Types.GET_QUOTES,
    }
}