import Ride from "../components/Ride";

export default function Upcoming({rides}){
  return (
    <div className="rides--container">
      {rides.map( ride => <Ride key={ride.id+ride.date} ride={ride} />)}
    </div>
  )
}