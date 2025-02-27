export default class UserInfo {
  constructor({ name, about }) {
    this._nameElement = document.querySelector(name)
    this._jobElement = document.querySelector(about)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._jobElement.textContent = about;
    }
  }
}