export default function Ride({ride}){
  const d = new Date(ride.date)
  const day = (x) => {
    let stringNumberOfDay = "" + x.getDate()
    if(stringNumberOfDay.slice(-1) === 1){
      return stringNumberOfDay+"st"
    }else if(stringNumberOfDay.slice(-1) === 2){
      return stringNumberOfDay+"nd"
    }
    return stringNumberOfDay+"th"
  }
  // 02/15/2022 05:38 AM
  const month = d.toString().split(' ')[1].slice(0,3)
  const year = d.toString().split(' ')[3]
  const hours = d.toString().split(' ')[4].slice(0,5)
  const date = `${day(d)} ${month} ${year} ${hours}`

  return (
    <div className="ride">
      <div className="ride__image" style={{ backgroundImage: `url(${ride.map_url})` }}></div>
      <div className="ride__right">
        <div className="ride__details">
          <p>Ride Id : <span className="ride__details__info">{ride.id}</span></p>
          <p>Origin Station : <span className="ride__details__info">{ride.origin_station_code}</span></p>
          <p>staion_path : <span className="ride__details__info">[{ride.station_path.map( (x,i) => i===0 ? x: ", " +x )}]</span></p>
          <p>Date : <span className="ride__details__info">{date}</span></p>
          <p>Distance : <span className="ride__details__info">{ride.destination_station_code}</span></p>
        </div>
        <div className="ride__location">
          <div className="ride__location__city">{ride.city}</div>
          <div className="ride__location__state">{ride.state}</div>
        </div>
      </div>
    </div>
  )
}
// style={{ backgroundImage: `url(${ride.map_url})` }}