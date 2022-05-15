import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ states, cities, upcomigLength, pastLength, cityFilter, stateFilter, setStateFilter, setCityFilter}){

  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className="navbar">
      <div className="navbar__left">
        <ul className="navbar__links">
          <li>
            <NavLink activeClassName='active' className="navbar__link" to="/">Nearest rides</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' className="navbar__link" to="/upcoming">Upcoming rides ({upcomigLength})</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active' className="navbar__link" to="/past">Past rides ({pastLength})</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
        <div className="navbar__right__filter" onClick={() => setShowFilter(!showFilter)}>
          <div className="burger-container">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Filters</p>
        </div>
        <div className={`filters ${showFilter? "show": ""}`}>
          <select className="select" value={stateFilter} onChange={ e => setStateFilter(e.target.value)} name="state" id="state">
            <option value="">None</option>
            {states.map( state => <option key={state} value={state}>{state}</option> )}
          </select>
          <select className="select" value={cityFilter} onChange={ e => setCityFilter(e.target.value)} name="city" id="city">
            <option value="">None</option>
            {cities.map( city => <option key={city} value={city}>{city}</option> )}
          </select>
        </div>
      </div>
    </div>
  )
}