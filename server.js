const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5050;
const LOCALSTACK_URL =
  process.env.LOCALSTACK_URL || "http://localhost:4566";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function fetchEmails() {
  const res = await fetch(`${LOCALSTACK_URL}/_aws/ses`);
  if (!res.ok) throw new Error(`LocalStack responded with ${res.status}`);
  const data = await res.json();
  const messages = data.messages || [];
  messages.sort(
    (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
  );
  return messages;
}

app.get("/", async (_req, res) => {
  try {
    const emails = await fetchEmails();
    res.render("index", { emails });
  } catch (err) {
    console.error("Failed to fetch emails:", err.message);
    res.render("index", { emails: [] });
  }
});

app.get("/emails", async (_req, res) => {
  try {
    const emails = await fetchEmails();
    res.render("partials/email_list", { emails });
  } catch (err) {
    console.error("Failed to fetch emails:", err.message);
    res.render("partials/email_list", { emails: [] });
  }
});

app.get("/emails/:index", async (req, res) => {
  try {
    const emails = await fetchEmails();
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= emails.length) {
      return res.status(404).render("partials/email_detail", { email: null });
    }
    res.render("partials/email_detail", { email: emails[index] });
  } catch (err) {
    console.error("Failed to fetch email detail:", err.message);
    res.status(500).render("partials/email_detail", { email: null });
  }
});

app.listen(PORT, () => {
  console.log(`SES Viewer running at http://localhost:${PORT}`);
  console.log(`Fetching emails from ${LOCALSTACK_URL}/_aws/ses`);
});
