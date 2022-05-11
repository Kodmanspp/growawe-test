import React from 'react';
import style from './style.module.scss';
import {dateFormat} from "../../utils/dateFormat";
function Card({date, active, confirmed, deaths, recovered, newCases}) {
    return (
        <div className={style.container}>
            <h2 className={style.date}>{dateFormat(date)}</h2>
            <div className={style.statistics}>
                <p>Active <span>{active}</span></p>
                <p>Confirmed <span>{confirmed}</span></p>
                <p>Deaths <span>{deaths}</span></p>
                <p>Recovered <span>{recovered}</span></p>
                <p>New cases <span>{newCases}</span></p>
            </div>
        </div>
    );
}

export default Card;