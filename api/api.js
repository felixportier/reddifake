//Auth and api calls functions
import base64 from "react-native-base64";
import { makeRedirectUri } from "expo-auth-session";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import { CLIENT_ID } from "dotenv";

//Enpoints
export const endpoints = {
  authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
  tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
  refreshTokenEnpoint: "https://www.reddit.com/api/v1/refresh_token",
};

//Used params
export const params = {
  redirect_uri: makeRedirectUri({
    native: "exp://localhost:19000",
  }),
  client_id: CLIENT_ID,
};


//Define needed scopes
export const scopes = [
  "creddits",
  "modcontributors",
  "modmail",
  "modconfig",
  "subscribe",
  "structuredstyles",
  "vote",
  "wikiedit",
  "mysubreddits",
  "submit",
  "modlog",
  "modposts",
  "modflair",
  "save",
  "modothers",
  "read",
  "privatemessages",
  "report",
  "identity",
  "livemanage",
  "account",
  "modtraffic",
  "wikiread",
  "edit",
  "modwiki",
  "modself",
  "history",
  "flair",
];

//Gets the token by supplying the auth code to token enpoint
export async function login(code) {
  let formData = new FormData();
  formData.append("redirect_uri", params.redirect_uri);
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);

  const response = await fetch(endpoints.tokenEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64.encode(params.client_id + ":")}`,
    },
    body: formData,
  });
  const json = await response.json();
  token = await json.access_token;

  return token;
}

//Makes a get request to the chosen reddit api endpoint and returns response
export async function getRequest(endpoint, token) {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: "bearer " + token,
    },
    "User-agent": "reddifake",
  });

  const json = await response.json();

  return json;
}

//Makes a POST request to the chosen reddit api endpoint and returns response
export async function postRequest(endpoint, token) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: "bearer " + token,
    },
    "User-agent": "reddifake",
  });

  const json = await response.json();

  return json;
}

export async function patchRequest(endpoint,token,body){
  let data = JSON.stringify(body)


   await fetch(endpoint,{
    method:"PATCH",
    headers:{
      Authorization: "bearer " + token,
      "User-agent": "reddifake",
      "Content-Type": "application/json",
      "Accept": "application/json"
     
    },
    body:data,
  })

}