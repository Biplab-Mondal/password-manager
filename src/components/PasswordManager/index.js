import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    newList: [],
    websiteInput: '',
    username: '',
    password: '',
    searchInput: '',
    isShow: false,
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onAddSubmit = event => {
    event.preventDefault()
    const {websiteInput, username, password} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const randomValue = Math.floor(Math.random() * colorList.length)
    const backgroundClassName = colorList[randomValue]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: websiteInput,
      userName: username,
      Password: password,
      classValue: backgroundClassName,
    }
    this.setState(prevState => ({
      newList: [...prevState.newList, newValues],
      websiteInput: '',
      username: '',
      password: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  onDeleteItem = id => {
    const {newList} = this.state
    const filteredDeleteList = newList.filter(eachItem => eachItem.id !== id)
    this.setState({newList: filteredDeleteList})
  }

  renderWebsite = () => {
    const {websiteInput} = this.state
    return (
      <div className="website-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
          alt="website"
          className="website-logo"
        />
        <input
          type="text"
          className="input-style"
          placeholder="Enter Website"
          onChange={this.onChangeWebsite}
          value={websiteInput}
        />
      </div>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
          alt="username"
          className="website-logo"
        />
        <input
          type="text"
          className="input-style"
          placeholder="Enter Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="password-type-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
          alt="password"
          className="website-logo"
        />
        <input
          type="password"
          className="input-style"
          placeholder="Enter Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {searchInput, newList, isShow} = this.state
    let {isTrue} = this.state

    const searchResults = newList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (searchResults.length !== 0) {
      isTrue = true
    } else {
      isTrue = false
    }

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-sm-image"
          />
          <form className="form-container" onSubmit={this.onAddSubmit}>
            <h1 className="add-password-heading">Add New Password</h1>
            {this.renderWebsite()}
            {this.renderUsername()}
            {this.renderPassword()}
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-bg-image"
          />
        </div>
        <div className="show-password-container">
          <div className="your-password-and-search-container">
            <div className="your-password-container">
              <h1 className="your-password-text">Your Passwords</h1>
              <p className="password-length">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input-style"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input-style"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label
              htmlFor="checkbox"
              className="label-style"
              onChange={this.onChangeCheckbox}
            >
              Show Passwords
            </label>
          </div>
          {isTrue ? (
            <ul className="unordered-password-list">
              {searchResults.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItems={eachItem}
                  isPasswordShow={isShow}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-view-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
