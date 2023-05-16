import configData from "./config.json";

const API_END_POINT = configData.LOCAL_IP;

const request = async (url, method, body) => {
  if (method === "POST" || method === "post") {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } else {
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  }
  throw new Error("요청에 실패함");
};

const fetchApi = async (apiUrl, method, body) =>
  request(`${API_END_POINT}:8000/${apiUrl}`, method, body);

export default fetchApi;
