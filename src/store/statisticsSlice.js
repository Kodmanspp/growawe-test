import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const fetchStatistics = createAsyncThunk(
    "statistics/fetchStatistics",
    async function(country){

        const res = await fetch(`https://api.covid19api.com/dayone/country/${country}`);
        return await res.json();
    }
);

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        loading: false,
        error: "",
        statistics: [],
        topRecovered: {},
    },

    extraReducers: {
        [fetchStatistics.pending]: (state) => {
            state.loading = true;
            state.error = "";
        },
        [fetchStatistics.fulfilled]: (state, action) => {
            state.loading = false;
            state.statistics = action.payload.reverse().slice(0, 5);

            if(action.payload.length > 0){
                state.topRecovered = action.payload.slice(0, 5).reduce((prev, curr) => {
                   return prev.Recovered > curr.Recovered ? prev : curr
                }, action.payload[0])
            }
        },
        [fetchStatistics.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }

})
export default statisticsSlice.reducer;