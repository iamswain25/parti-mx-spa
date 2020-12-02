type Action = { type: string; [payload: string]: any };
export default function createReducer<T, A extends Action>(
  initialState: T,
  handlers: { [type: string]: (state: T, action: A) => any }
) {
  return function reducer(state = initialState, action: A) {
    const { type, ...payload } = action;
    console.log(type, payload);
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload as any);
    } else {
      return { ...state, ...payload };
    }
  };
}
