import React from 'react'

import { EmployeeList } from '../components/EmployeeList'
import Header from '../components/Header'


const Home = () => {
    
    return (
        <div>
            <Header/>
            
           <EmployeeList /> 
        </div>
    )
}

export default Home;
