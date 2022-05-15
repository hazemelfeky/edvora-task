export default function Header({user}){
  return (
    <div className="header">
      <h2 className="header__logo">Edvora</h2>
      <div className="header__profile">
        <h3 className="header__profile__name">
          {user.name}
        </h3>
        <div className="header__profile__image">
          <img alt="profile" src={user.url} />
        </div>
      </div>
    </div>
  )
}