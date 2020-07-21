import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialState = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]],
    playerName: '',
    status: '',
    level: '',
    originalBoard: []
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
const encodeParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_BOARD':
            return { ...state, board: payload.board, originalBoard: payload.originalBoard }
        case 'SET_STATUS':
            return { ...state, status: payload }
        case 'PLAYER_NAME':
            return { ...state, playerName: payload.name, level: payload.level }
        case 'CHANGE_VALUE':
            return { ...state, board: payload }
        case 'SOLVED':
            return { ...state, board: payload.solution, status: payload.status }
        default:
            return state
    }
}

export const fetchBoard = (level) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: 'https://sugoku.herokuapp.com/board?difficulty=' + level
        })
            .then((result) => {
                console.log('result: ', result.data);
                dispatch({
                    type: 'GET_BOARD',
                    payload: {
                        board: result.data.board,
                        originalBoard: JSON.parse(JSON.stringify(result.data.board))
                    }
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const playerName = (name, level) => {
    console.log('name: ', name);
    return (dispatch) => {
        dispatch({
            type: 'PLAYER_NAME',
            payload: { name, level }
        })
    }
}

export const validateValue = (board) => {
    console.log('board: validate', board);
    return (dispatch) => {
        axios({
            method: 'POST',
            url: 'https://sugoku.herokuapp.com/validate',
            data: encodeParams({ board })
        })
            .then((result) => {
                console.log('result: ', result.data);
                dispatch({
                    type: 'SET_STATUS',
                    payload: result.data.status
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const changeValue = (i, j, value) => {
    return (dispatch) => {
        const { board } = store.getState()
        board[i][j] = value
        dispatch({
            type: 'CHANGE_VALUE',
            payload: board
        })
    }
}

export const onSolve = (board) => {
    return (dispatch) => {
        console.log('board: asli', board);
        axios({
            method: 'POST',
            url: 'https://sugoku.herokuapp.com/solve',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: encodeParams({ board })
        })
            .then((result) => {
                console.log('board: solved ', result.data.status);
                dispatch({
                    type: 'SOLVED',
                    payload: result.data
                })
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const store = createStore(reducer, applyMiddleware(thunk))

