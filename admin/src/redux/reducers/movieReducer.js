import toast from 'react-hot-toast';

const initialState = {
    movies: [],
};

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_MOVIES_SUCCESS':
            {
                return {
                    ...state,
                    movies: payload,
                };
            }
        case 'GET_MOVIES_FAIL':
            {
                return {
                    ...state,
                    movies: [],
                };
            }

        case 'CREATE_MOVIE_SUCCESS':
            {
                toast.success('Thêm phim thành công');
                return {
                    ...state,
                };
            }
        case 'CREATE_MOVIE_FAIL':
            {
                toast.error('Lỗi!');
                return {
                    ...state,
                };
            }

        case 'UPDATE_MOVIE_SUCCESS':
            {
                toast.success('Cập nhật phim thành công');
                return {
                    ...state,
                };
            }
        case 'UPDATE_MOVIE_FAIL':
            {
                toast.error('Lỗi!');
                return {
                    ...state,
                };
            }

        case 'DELETE_MOVIE_SUCCESS':
            {
                toast.success('Xóa phim thành công');
                const { movieId } = payload;
                return {
                    ...state,
                    movies: [...state.movies].filter((movie) => movie.id !== movieId),
                };
            }
        case 'DELETE_MOVIE_FAIL':
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

export default movieReducer;