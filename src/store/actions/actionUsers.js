export function fetchUser() {
  return (dispatch) => {
    fetch(`https://randomuser.me/api/?results=28`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        dispatch({ type: "SET_USER", payload: data.results })
      })
      .catch(err => {
        console.log(err);
      })
  }
}