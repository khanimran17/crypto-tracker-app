import React from 'react'
import Banner from '../components/banner/banner'
import CoinsTable from '../components/CoinsTable'
import TransitionAlerts from '../components/TransitionAlerts'


const Home = () => {
    return (
        <>  
            <TransitionAlerts />
            <Banner />
            <CoinsTable />
        </>
    )
}

export default Home