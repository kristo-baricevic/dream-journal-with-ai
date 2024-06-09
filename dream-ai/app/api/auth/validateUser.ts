import { getUserByClerkID } from "./getUserByClerkID";

export const validateUser = async () => {
  try {
    const user = await getUserByClerkID();
    console.log("debug validateUserFunction " + user);
    return !!user;
  } catch (err) {
    console.log(err);
    alert(err as Error);
    return false;
  }
};