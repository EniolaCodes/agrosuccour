import { parse } from "cookie";
import { serialize } from "cookie";

let cartData = {}; // In-memory storage for demonstration

export default function handler(req, res) {
  const { method } = req;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const sessionId =
    cookies.sessionId || `session_${Math.random().toString(36).substring(2)}`;

  // Set a session ID cookie if none exists
  if (!cookies.sessionId) {
    res.setHeader(
      "Set-Cookie",
      serialize("sessionId", sessionId, { path: "/", httpOnly: true })
    );
  }

  switch (method) {
    case "GET": {
      const cart = cartData[sessionId] || [];
      return res.status(200).json(cart);
    }
    case "POST": {
      cartData[sessionId] = req.body; // Save cart data for this session
      return res.status(200).json(cartData[sessionId]);
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
