import Cookies from "universal-cookie";
const cookies = new Cookies();

class CookieService {
  get(key: string) {
    return cookies.get(key);
  }
  set(key: string, value: string | object | null, options: object) {
    cookies.set(key, value, options);
  }
  remove(key: string) {
    cookies.remove(key);
  }
}

export default new CookieService();
