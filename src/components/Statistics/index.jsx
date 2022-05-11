import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {fetchCountries, setActiveCountry} from "../../store/countriesSlice";
import {fetchStatistics} from "../../store/statisticsSlice";
import style from "./style.module.scss";
import Card from "../Card";
import {dateFormat} from "../../utils/dateFormat";

function Statistics() {

    const dispatch = useDispatch();
    const countryList = useSelector(state => state.countryList);
    const stats = useSelector(state => state.statistics);

    useEffect(()=>{
        if(!countryList.countries){
            dispatch(fetchCountries());
        }
    },[])
    console.log(new Date("2022-05-10T00:00:00Z"))
    useEffect(()=>{
        dispatch(fetchStatistics(countryList.activeCountry.Country));
    }, [countryList])

    function handleCountryChange(e){
        dispatch(setActiveCountry(JSON.parse(e.target.value)));
    }

    function newCases(index, arr){
        console.log(arr);
        if(index >= arr.length - 1){
            return 0;
        }
        else{
            const newCases = arr[index]?.Active - arr[index + 1]?.Active;
            return newCases < 0 ? 0 : newCases;
        }
    }

    return (
        <div className={style.container}>
            <select className={style.select} onChange={handleCountryChange} value={JSON.stringify(countryList.activeCountry)}>
                {countryList.countries.map(item => {
                    return <option key={nanoid()} value={JSON.stringify(item)}>
                        {item.Country}
                    </option>
                })}
            </select>
            <div className={style.cards}>
                {stats.statistics.map((item, index, arr)=>(
                    <Card
                        key={nanoid()}
                        active={item.Active}
                        confirmed={item.Confirmed}
                        date={item.Date}
                        deaths={item.Deaths}
                        recovered={item.Recovered}
                        newCases={newCases(index, arr)}
                    />
                ))}
            </div>
            <div className={style.recovered}>
                <h2>Top recovered cases</h2>
                <p className={style.text}>{stats.topRecovered.Recovered}</p>
                <p className={style.date}>{dateFormat(stats.topRecovered.Date)}</p>
            </div>
        </div>
    );
}

export default Statistics;