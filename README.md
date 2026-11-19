# Barengan 🎶 · MVP Landing Page

**A planner for friends going to concerts together, from ticket war to the encore.**

Final Project · Business Analyst & Product Strategy Bootcamp (dibimbing.id) · Part 3: Product Solutioning & MVP Execution

| | Link |
|---|---|
| 🌐 Live MVP (landing page + waitlist) | https://barengan-prototype.vercel.app |
| 📱 Clickable prototype | https://barengan-prototype.vercel.app/prototype/ |
| 📄 PRD | [docs/PRD.md](docs/PRD.md) |
| 📚 Case study | https://barengan-prototype.vercel.app/case-study/ |

<img src="assets/linkedin/slide_1.jpg" width="420" alt="Barengan cover">

## What this MVP tests
The landing page checks one hypothesis before we build the app:

> Gen Z concert-goers in Jakarta who organise trips for friends will sign up for a tool that gets everyone committed, saved up and paid on time.

Visitors read the value proposition, try the prototype and join the waitlist. Every answer lands in Google Sheets.

## Features of the product (shown on the page)
1. **Explore**: concerts in Jakarta and Indonesia, or a manual trip
2. **Invite**: one link, code or QR; forwarded links need admin approval
3. **Save**: private target from the estimated price, updated when the official price is out, with a price history log
4. **Ticket war**: who buys on which account and device
5. **Split**: automatic split, reminders sent by Barengan, a plan for friends who never pay
6. **Album**: one shared album and a memory link after the show

## Tech stack
| Layer | Tool |
|---|---|
| Front end | HTML, CSS, vanilla JavaScript (single file, no build step) |
| Hosting | Vercel (auto-deploy from `main`) |
| Backend | Google Sheets + Google Apps Script web app |
| Tracking | `Events` tab in the same Sheet |

## AI tools used
| Tool | Used for |
|---|---|
| Claude (LLM) | Landing page copy, layout and code; Apps Script; PRD drafting; user flows (Mermaid) and wireframes |

I wrote the prompts, reviewed every section and edited the copy and rules myself. The product decisions (scope, edge cases, metrics) are mine.

## How the form connects to Google Sheets
```
Visitor ──► index.html form ──fetch POST (JSON)──► Apps Script web app (doPost)
                                                     │
                                                     ├─► Sheet tab "Signups"  (waitlist answers)
                                                     └─► Sheet tab "Events"   (page_view, form_start, click_prototype…)
```
1. Open the Google Sheet → **Extensions → Apps Script** → paste [`apps-script/Code.gs`](apps-script/Code.gs).
2. Run `setup()` once (creates the two tabs).
3. **Deploy → New deployment → Web app** · Execute as **Me** · Access **Anyone** → copy the `/exec` URL.
4. In `index.html`, set `const SCRIPT_URL = "<your /exec URL>";` and push.

Without a URL the form runs in demo mode and saves nothing.

**Fields collected:** name, email, city, concerts in the last 12 months, role (organiser / joiner), biggest pain, would pay Rp25,000 per trip, optional feedback, consent. A hidden honeypot field blocks simple bots, and values starting with `= + - @` are escaped.

## MVP success metrics (first 14 days)
| Metric | Target |
|---|---|
| Waitlist sign-ups | ≥ 100 |
| Visitor → sign-up conversion | ≥ 20% |
| Sign-ups who are organisers | ≥ 40% |
| Would pay (Yes + Maybe) | ≥ 30% |
| Prototype click-through | ≥ 30% |
| Written feedback | ≥ 20 |

Decision rule: ≥ 100 sign-ups and ≥ 20% conversion → build the closed beta (invite, savings, split). Under 10% conversion → rewrite the message and test again.

## Repo structure
```
index.html              Landing page (MVP) with waitlist form
prototype/index.html    Clickable prototype
case-study/index.html   Product case study
apps-script/Code.gs     Google Sheets backend
docs/PRD.md             Product Requirements Document
docs/diagrams/          IA + user flows (PNG + Mermaid source)
docs/wireframes/        Low-fidelity wireframes
assets/                 Screenshots and images
```

## Run locally
No install needed. Open `index.html` in a browser, or run `npx serve .` and visit `http://localhost:3000`.

## Notes
- Artists, people and prices in the prototype are fictional. Venues are real.

## Author
Jenna Gozali · [LinkedIn](https://www.linkedin.com/in/jennagozali)
