const redux = require('redux')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.legacy_createStore
const axios = require('axios')

const InitialState = {
    loading: false,
    users: [],
    error: ''
}
// const for action name
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
// action function
const fetchUsersRequest = () =>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = ((state=InitialState) => {
    switch(bindActionCreators.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state, 
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }

})
 

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response =>{
            // response.data is the array of users
            const users = response.data.map((user) => { return user.id })
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            //error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(() => console.log("updated state: ", store.getstate()))
store.dispatch(fetchUsers)
unsubscribe()