import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  //from controller const id = req.params.id;
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  //from controller const query = req.query;
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};


export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

// export const uwConfigLoader = async () => {
//   try {
//     const res = await apiRequest("/auth"); 
//     return res.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to load UW config!");
//   }
// }
