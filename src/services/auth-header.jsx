import component from "react-toggle";

export function loginTokenHeader() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function generalHeader() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function generalOpenAuthTokenHeader() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

// access token for authentication
export function authTokenHeader() {
  let accessToken = localStorage.getItem("admin-token");
  // console.log('access token', accessToken)
  if (accessToken) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
  } else {
    window.location.reload(true);
    return {};
  }
}

export function generalAuthTokenHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    let accessToken = user.accessToken;
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };
  } else {
    // userService.logout();
    window.location.reload(true);
    return {};
  }
}

// Image upload header
export function imgUploadHeader() {
  let accessToken = localStorage.getItem("user-token");
  if (accessToken) {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      // 'Authorization': 'Bearer ' + accessToken,
    };
  } else {
    // userService.logout();
    window.location.reload(true);
    return {};
  }
}
