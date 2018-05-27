const getId = (state) =>{
    return state.todos.reduce((maxId, todo) =>{
        return Math.max(todo.id, maxId)
    }, -1) + 1
}

export default function reducer (state, action) {
    switch (action.type){
        case 'ADD_TODO':
        Object.assign({}, state, {
            todos: [{
                // add new todo info
                text: action.text,
                completed: false,
                id: getId(state)
            }, ...state.todos
        ],
    }
)
        default: return state;
    }
}