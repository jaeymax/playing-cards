import React, { FC } from "react";
import CountryListItem from "./CountryListItem";
import { countries } from "../data/countries";
import globe from '../assets/earth.png'

interface CountryListProps{
    collapse:boolean,
    countries:{ad:string},
    onClick:(code:string, name:string)=>void;
}

const CountryList:FC<CountryListProps> = ({collapse, countries, onClick}) => {
  return (
    <div
      className={`absolute ${
        collapse ? "block" : "hidden"
      } overflow-y-scroll left-0 right-0 top-full showdow-md drop-shadow-md  h-96`}
    >
      <div
        onClick={() => onClick("", "Global")}
        className="cursor-pointer flex items-center p-1 gap-2 border-t border-gray-600"
      >
        <div className="w-4 h-3">
          <img className="w-full h-full object-contain" src={globe} alt="" />
        </div>
        <p>Global</p>
      </div>
      {Object.entries(countries).map(([code, name]) => {
        return (
            <CountryListItem code={code} name={name} onClick={onClick} />
            // <div
            //     onClick={() => handleClick(code, name)}
            //     key={code}
            //     className="cursor-pointer items-center flex p-1 gap-2 border-t border-gray-600"
            // >
            //     <div className="w-4 h-3">
            //     <img
            //         className="w-full h-full object-contain"
            //         src={`https://flagcdn.com/16x12/${code}.png`}
            //         alt=""
            //     />
            //     </div>
            //     <p>{name}</p>
            // </div>
        );
      })}
    </div>
  );
};

export default CountryList;
