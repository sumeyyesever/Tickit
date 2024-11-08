"use server"

import { getIronSession } from "iron-session"
import { defaultSession, SessionData, sessionOptions } from "./utilsiron"
import { cookies } from "next/headers"
import { getUser } from "../lib/data"
import { redirect } from "next/navigation"

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  console.log(session);

  return session;
}

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUseremail = formData.get("user_email") as string;
  const formPassword = formData.get("password") as string;

  const user = await getUser(formUseremail, formPassword);
  if (user) {
    session.userId = user._id;
    session.username = user.username;
    session.user_email = formUseremail;
    session.isLoggedIn = true;
    await session.save();
    redirect("/");
  }
  else {
    return { error: "Wrong Credentials!" }
  }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
}