import Ride from "../components/Ride";

export default function Nearest({rides}){
  return (
    <div className="rides--container">
      {rides? rides.map( ride => <Ride key={ride.id+ride.date} ride={ride} />) : <p>loading</p>}
    </div>
  )
}