// Constants
const IN_DAYS = 3;
const EXPIRES_IN = 1000 * 60 * 60 * 24 * IN_DAYS;
export const getCookieOptions = () => {
  const date = new Date();
  date.setTime(date.getTime() + EXPIRES_IN);
  return { path: "/", expires: date };
};
