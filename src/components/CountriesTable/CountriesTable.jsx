import React, {useState} from 'react'
import styles from "./CountriesTable.module.css"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Link from "next/link"

let orderBy = (countries, value, direction) => {
    if (direction === "asc") {
        return [...countries].sort((a, b) => (a[value] > b[value]
            ? 1
            : -1));
    }

    if (direction == "desc") {
        return [...countries].sort((a, b) => (a[value] > b[value]
            ? -1
            : 1));
    }

    return countries;
}

const SortArrow = ({direction}) => {
    if (!direction) {
        return <div></div>;
    }

    if (direction === "desc") {
        return (
            <div className={styles.icon}>
                <ArrowDownwardIcon color="inherit"/>
            </div>
        );
    } else {
        return (
            <div className={styles.icon}>
                <ArrowUpwardIcon color="inherit"/>
            </div>
        );
    }
};

const CountriesTable = ({countries}) => {

    let [sorting,
        setSorting] = useState("population");
    let [arrow,
        setArrow] = useState();

    let orderedCountries = orderBy(countries, sorting, arrow);

    let toggleArrow = () => {

        if (!arrow) {
            setArrow("desc");
        } else if (arrow === "desc") {
            setArrow("asc");
        } else {
            setArrow(null);
        }
        // sorting === "asc"     ? setArrow(         <div className={styles.icon}>
        // <ArrowDownwardIcon color="inherit"/>         </div>     )     : setArrow(
        // <div className={styles.icon}>             <ArrowUpwardIcon color="inherit"/>
        //    </div>     );
    };

    let handleClick = (value) => {
        toggleArrow();
        setSorting(value);

        // setArrow(sorting === "asc"     ? (         <div className={styles.icon}>
        // <ArrowDownwardIcon color="inherit"/>         </div>     )     : (    <div
        // className={styles.icon}>             <ArrowUpwardIcon color="inherit"/>
        // </div>     )); setArrow(arrow == (     <div className={styles.icon}>
        // <ArrowDownwardIcon color="inherit"/>     </div> )  ? (         <div
        // className={styles.icon}>             <ArrowUpwardIcon color="inherit"/>
        // </div>     )     : (         <div className={styles.icon}> <ArrowDownwardIcon
        // color="inherit"/>         </div>    ));
    }

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.headingFlag}></div>
                <button className={styles.headingName} onClick={() => handleClick("name")}>
                    <div>Name</div>

                    {sorting === "name" && <SortArrow direction={arrow}/>}
                </button>
                <button
                    className={styles.headingPopulation}
                    onClick={() => handleClick("population")}>
                    <div>Population</div>

                    {sorting === "population" && <SortArrow direction={arrow}/>}
                </button>

                <button className={styles.heading_area} onClick={() => handleClick("area")}>
                    <div>
                        Area (km<sup>2</sup>)
                    </div>

                    {sorting === "area" && <SortArrow direction={arrow}/>}
                </button>

                <button className={styles.heading_gini} onClick={() => handleClick("gini")}>
                    <div>Gini</div>

                    {sorting === "gini" && <SortArrow direction={arrow}/>}
                </button>
            </div>

            {orderedCountries.map((country) => (
                <Link href={`/Country/${country.alpha3Code}`}>
                    <div className={styles.row}>
                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name}/>
                        </div>
                        <div className={styles.name}>{country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                        <div className={styles.area}>{country.area || 0}</div>
                        <div className={styles.gini}>{country.gini || 0}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default CountriesTable