import * as types from '../constants/actionTypes';





function saveIt(item, i) {
    return {
        type: types.LIST_MODIFY,
        todo: {item: item, checked: false, index: i}
    };
}

export function saveTask(task, index) {
  return (dispatch) => {
    dispatch(saveIt(task, index));
  };
}

function changeCheck(x, i) {
    return {
        type: types.TOGGLE_CHECKED,
        todo: {item: x.item, checked: x.checked, index: i}
    };
}

export function toggleCheck(obj) {
  return (dispatch) => {
    dispatch(changeCheck(obj, obj.index));
  };
}
