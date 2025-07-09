import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogState } from '@/types/blog';

interface BlogSliceState {
    blogs: BlogState[];
}

const initialState: BlogSliceState = {
    blogs: [],
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action: PayloadAction<BlogState[]>) {
            state.blogs = action.payload;
        },
        addBlog(state, action: PayloadAction<BlogState>) {
            state.blogs.push(action.payload);
        },
        updateBlog(state, action: PayloadAction<BlogState>) {
            const index = state.blogs.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
        },
        removeBlog(state, action: PayloadAction<string>) {
            state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        },
        clearBlogs() {
            return { blogs: [] };
        },
    },
});

export const { setBlogs, addBlog, updateBlog, removeBlog, clearBlogs } = blogSlice.actions;
export default blogSlice.reducer;
