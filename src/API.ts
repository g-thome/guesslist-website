import { API_URL } from "./constants";
import { IDraft, IList } from "./types";

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

  static get(endpoint: string) {
    return fetch(API_URL + endpoint, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async publishList(authorId: string, list: IDraft) {
    const response = await API.post("/list", {
      authorId,
      ...list,
    });
    return response.json();
  }

  static async getUserLists(userId: string) {
    const response = await API.get("/list?authorId=" + userId);
    return response.json();
  }

  static async getList(id: string): Promise<IList> {
    const response = await API.get("/list/" + id);
    return response.json();
  }

  static async createDraft(userId: string) {
    return API.post("/create-draft", { authorId: userId });
  }
}
