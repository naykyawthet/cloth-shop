/* eslint-env node */
import { createServer } from "node:http";

const PORT = Number(process.env.PORT) || 4000;

const products = [
  { id: 1, title: "Women Ethnic", color: "White", rating: 5.0, imageKey: "women-1", aosDelay: "0" },
  { id: 2, title: "Women Western", color: "Red", rating: 4.5, imageKey: "women-2", aosDelay: "200" },
  { id: 3, title: "Goggles", color: "Brown", rating: 4.7, imageKey: "women-3", aosDelay: "400" },
  { id: 4, title: "Printed T-Shirt", color: "Yellow", rating: 4.4, imageKey: "women-4", aosDelay: "600" },
  { id: 5, title: "Fashion T-Shirt", color: "Pink", rating: 4.5, imageKey: "women-2", aosDelay: "800" },
];

const subscriptions = [];

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(payload));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });

    req.on("error", reject);
  });

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    sendJson(res, 404, { message: "Not found" });
    return;
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if (req.method === "GET" && req.url === "/api/products") {
    sendJson(res, 200, { data: products });
    return;
  }

  if (req.method === "POST" && req.url === "/api/subscribe") {
    try {
      const body = await parseBody(req);
      const email = body.email;

      if (!email || typeof email !== "string") {
        sendJson(res, 400, { message: "Email is required." });
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

      if (!isValidEmail) {
        sendJson(res, 400, { message: "Please provide a valid email address." });
        return;
      }

      if (subscriptions.includes(normalizedEmail)) {
        sendJson(res, 200, {
          message: "You are already subscribed!",
          alreadySubscribed: true,
        });
        return;
      }

      subscriptions.push(normalizedEmail);
      sendJson(res, 201, {
        message: "Thanks for subscribing!",
        alreadySubscribed: false,
      });
    } catch (error) {
      sendJson(res, 400, { message: error.message || "Bad request." });
    }
    return;
  }

  sendJson(res, 404, { message: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
