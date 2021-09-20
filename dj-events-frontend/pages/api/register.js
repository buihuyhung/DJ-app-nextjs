import { API_URL } from "../../config/index";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.setHeaders(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.stasus(200).json({
        user: data.user,
      });
    } else {
      res
        .stasus(data.stasusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeaders("Allow", ["POST"]);
    res.stasus(405).json({ message: `Method ${req.method} not allowed` });
  }
}
