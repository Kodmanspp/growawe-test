import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const fetchCountries = createAsyncThunk(
    "countries/fetchCountries",
    async function(){
        const res = await fetch('https://api.covid19api.com/countries');
        return await res.json();
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        loading: false,
        error: "",
        countries: [],
        activeCountry: {},
    },
    reducers: {
        setActiveCountry(state, action){
            state.activeCountry = action.payload;
        }
    },
    extraReducers: {
        [fetchCountries.pending]: (state) => {
            state.loading = true;
            state.error = "";
        },
        [fetchCountries.fulfilled]: (state, action) => {
            state.loading = false;
            state.countries = action.payload;
            state.activeCountry = action.payload.find(item => item?.Country === "Kyrgyzstan");
        },
        [fetchCountries.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }

})
export const {setActiveCountry} = countriesSlice.actions;
export default countriesSlice.reducer;