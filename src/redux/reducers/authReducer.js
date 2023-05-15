import { Action_Types } from "../constants/Action_Types"

const initialState = {
    authUser : []
    
}

export const authReducer = (state = initialState,{type , payload}) => {
    switch(type){
        case Action_Types.LOGIN :
            return {
                ... state,
                authUser : [...state.authUser,payload]
            }

        case Action_Types.LOGOUT :
            return{
                ...state.authUser = []
            }

        default :
            return state


    }
}
