const initialState = {
	darkmode: true,
	qna: [
	],
	currentQuestion: "",
	transcript: [],
};

const MainReducer = (state, action) => {
	switch (action.type) {
		case "set_darkmode": {
			return {
				...state,
				darkmode: action.payload,
			};
		}
		case "add_qna": {
			return {
				...state,
				qna: [...state.qna, action.payload],
			};
		}
		case "get_transcript": {
			return {
				...state,
				transcript: action.payload.map((line) => {
					return {
						text: line.text,
						duration: line.duration / 1000,
						timestamp: line.offset / 1000,
					}
				}),
			};
		}
		case "set_current_question": {
			return {
				...state,
				currentQuestion: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};

export { initialState, MainReducer };
