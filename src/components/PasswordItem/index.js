import './index.css'

const PasswordItem = props => {
  const {passwordItems, isPasswordShow, onDeleteItem} = props
  const {
    id,
    initialValue,
    websiteName,
    userName,
    Password,
    classValue,
  } = passwordItems

  const onClickDeleteButton = () => {
    onDeleteItem(id)
  }

  return (
    <li className="password-list-container">
      <div className="profile-container">
        <p className={`profile ${classValue}`}>{initialValue}</p>
        <div className="profile-text-container">
          <p className="website-name">{websiteName}</p>
          <p className="username-heading">{userName}</p>
          {isPasswordShow ? (
            <p className="show-password-heading">{Password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-image"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickDeleteButton}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
