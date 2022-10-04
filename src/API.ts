import { API_URL } from "./constants";
import { IDraft } from "./types";

export class API {
  static post(endpoint: string, body: any) {
    return fetch(API_URL + endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Contet-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static async publishList(authorId: string, list: IDraft) {
    const response = await API.post("/list", {
      authorId,
      ...list,
    });
    return response.json();
  }
}
