import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Nearest from './screens/Nearest';
import Past from './screens/Past';
import Upcoming from './screens/Upcoming';

export default function App(){
  const [rides, setRides] = useState([])
  const [user, setUser] = useState({})
  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])
  const [nearest, setNearest] = useState([])
  const [stateFilter, setStateFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const howNear = 6
  const currentDate = new Date(Date.UTC(2022, 2, 12, 0, 0, 0)) //dummy date as all dates in api is past

  useEffect( () => {
    fetch('https://assessment.api.vweb.app/user')
      .then(response => response.json())
      .then(data => setUser(data));
  },[])

  // // filtering
  // useEffect( () => {
  //   setRides( rides.filter( x => cityFilter? cityFilter === x.city : x).filter( x => stateFilter? stateFilter === x.state : x) )
  // }, [cityFilter, stateFilter])

  // sorting
  useEffect( () => {
    // nearest
    let isNear = (x, y) => Math.abs(x-y) <= howNear
    const arrayIsNear = path => path.filter( x => isNear(x, user.station_code)).length > 0
    let nearestTemp = rides.filter( ride => arrayIsNear(ride.station_path) )
    setNearest(nearestTemp.filter( x => cityFilter? cityFilter === x.city : x).filter( x => stateFilter? stateFilter === x.state : x))
    
    // upcoming
    let upcomingTemp = rides.filter( ride => new Date(ride.date) > currentDate )
    setUpcoming(upcomingTemp.filter( x => cityFilter? cityFilter === x.city : x).filter( x => stateFilter? stateFilter === x.state : x))

    // past
    let pastTemp = rides.filter( ride => new Date(ride.date) < currentDate )
    setPast(pastTemp.filter( x => cityFilter? cityFilter === x.city : x).filter( x => stateFilter? stateFilter === x.state : x))

    
  }, [rides, cityFilter, stateFilter])

  useEffect( () => {
    fetch('https://assessment.api.vweb.app/rides')
      .then(response => response.json())
      .then(data => setRides(data));

    // getting cities and states
    let citiesTemp = rides.map( ride => ride.city)
    let statesTemp = rides.map( ride => ride.state)
    setCities([...new Set(citiesTemp)])
    setStates([...new Set(statesTemp)])
  },[user])

  return (
    <BrowserRouter>
      <Header user={user} />
      <Navbar states={states} cities={cities} upcomigLength={upcoming.length} pastLength={past.length} stateFilter={stateFilter} cityFilter={cityFilter} setStateFilter={setStateFilter} setCityFilter={setCityFilter} />
      <Routes>
        <Route path='/' exact element={<Nearest rides={nearest} />} />
        <Route path='/upcoming' element={<Upcoming rides={upcoming} />} />
        <Route path='/past' element={<Past rides={past} />} />
      </Routes>
    </BrowserRouter>
  )
}