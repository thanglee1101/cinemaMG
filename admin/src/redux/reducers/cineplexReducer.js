import toast from 'react-hot-toast';

const initialState = {
    cineplexs: [],
};

const cineplexReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_CINEPLEX_SUCCESS':
            {
                return {
                    ...state,
                    cineplexs: payload,
                };
            }
        case 'GET_CINEPLEX_FAIL':
            {
                return {
                    ...state,
                    cineplexs: [],
                };
            }

        case 'CREATE_CINEPLEX_SUCCESS':
            {
                toast.success('Thêm rạp thành công');
                return {
                    ...state,
                };
            }
        case 'CREATE_CINEPLEX_FAIL':
            {
                toast.error('Lỗi!');
                return {
                    ...state,
                };
            }

        case 'UPDATE_CINEPLEX_SUCCESS':
            {
                toast.success('Cập nhật rạp thành công');
                return {
                    ...state,
                };
            }
        case 'UPDATE_CINEPLEX_FAIL':
            {
                toast.error('Lỗi!');
                return {
                    ...state,
                };
            }

        case 'DELETE_CINEPLEX_SUCCESS':
            {
                toast.success('Xóa rạp thành công');
                const { cineplexId } = payload;
                return {
                    ...state,
                    cineplexs: [...state.cineplexs].filter((cineplex) => cineplex.id !== cineplexId),
                };
            }
        case 'DELETE_CINEPLEX_FAIL':
            {
                toast.error('Lỗi!');
                return {
                    ...state,
                };
            }
        default:
            return state;
    }
};

export default cineplexReducer;