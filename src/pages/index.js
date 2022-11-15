import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css'

export default function Home({countries}) {

    console.log(countries);

    let [input,
        setInput] = useState("");

    let handleChange = (e) => {
        setInput(e.target.value.toLowerCase());
    }

    let filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(input) || country.region.toLowerCase().includes(input) || country.subregion.toLowerCase().includes(input));

    return (
        <Layout>
            <div className={styles.inputContainer}>
                <div className={styles.counts}>
                    Found {countries.length} countries
                </div>

                <div className={styles.input}>
                    <SearchInput
                        placeholder="Filter by Name, Region or SubRegion"
                        onChange={handleChange}/>
                </div>
            </div>

            <CountriesTable countries={filteredCountries}/>
        </Layout>
    );
}

export let getStaticProps = async() => {
    let res = await fetch("https://restcountries.com/v2/all");
    let countries = await res.json();

    return {props: {
            countries
        }}

}