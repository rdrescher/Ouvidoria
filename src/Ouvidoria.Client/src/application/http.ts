import * as Session from "./session";

type HttpMethods =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

export default class Http {
  private static _baseUrl: string = "https://localhost:5001";
  private static _baseClientUrl: string = "http://localhost:3000";

  public static get baseUrl(): string {
    return Http._baseUrl;
  }

  public static set baseUrl(value: string) {
    Http._baseUrl = value;
  }

  private static async fetch(
    method: HttpMethods,
    url: string,
    body?: unknown,
    header?: Record<string, string>
  ) {
    const headers = {
      authorization: `Bearer ${Session.getToken()}`,
      "content-type": "application/json",
      ...header
    };

    const request = { method, mode: "cors", headers } as RequestInit;

    if (body && method !== "GET" && method !== "HEAD") {
      request.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${Http.baseUrl}${url}`, request);
      if (response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        Session.logout();
        window.location.href = `${this._baseClientUrl}/login`;
      } else if (response.status === 403) {
        window.location.href = this._baseClientUrl;
      } else if (response.status === 404) {
        console.log("Not Found");
        window.location.href = this._baseClientUrl;
      }
    } catch (err) {
      console.log(`Error 500 -> ${err}`);
    }
    return {success: false, data: [], messages: [] };
  }

  public static async delete<T = unknown>(
    url: string,
    data?: unknown,
    header?: Record<string, string>
  ): Promise<T> {
    return Http.fetch("DELETE", url, data, header);
  }

  public static async get<T = unknown>(
    url: string,
    header?: Record<string, string>
  ): Promise<T> {
    return Http.fetch("GET", url, null, header);
  }

  public static async put<T = unknown>(
    url: string,
    data?: unknown,
    header?: Record<string, string>
  ): Promise<T> {
    return Http.fetch("PUT", url, data, header);
  }

  public static async post<T = unknown>(
    url: string,
    data?: unknown,
    header?: Record<string, string>
  ): Promise<T> {
    return Http.fetch("POST", url, data, header);
  }
}