# How I used AI to build Barengan

I used **Claude** as my main AI tool across the project. This page lists the main prompts (shortened) and, more importantly, how I checked what came back.

## 1. Prompts by stage

| Stage | What I asked for (shortened) | What I kept / changed |
|---|---|---|
| Ideation | "Suggest digital products for Gen Z that don't exist in the Indonesian market yet." I picked concerts with friends. | Kept the idea; wrote the problem in my own words |
| Desk research | "Summarise Gen Z concert behaviour in Indonesia and existing apps for group trips, with sources." | Kept only figures I could trace to BPS, Jakpat or Mojok |
| Synthesis | "Cluster these survey answers and interview notes into themes; only keep a theme if it has survey data and 2+ interviewees." | Rewrote each theme as a How Might We |
| PRD | "Write a PRD with IA, user flows, user stories and Given/When/Then acceptance criteria for the MVP scope below." | Added the lecturer's 5 features and the late-payment rules myself |
| Flows | "Turn this flow into Mermaid: the friend who never pays, day 1 / 3 / 7, admin options." | Re-ordered steps; made Late visible to the admin only |
| Landing page | "Build a one-page, mobile-first landing page for Barengan with a waitlist form. Brand: dark #14111F, lime #C6F45B, pink #FF6FAE. No frameworks." | Rewrote the copy; removed claims I couldn't back up |
| Backend | "Write a Google Apps Script web app that appends form answers to a Signups tab and clicks to an Events tab." | Added the honeypot and formula guard after testing |
| Project plan | "Help me build a 23-week Gantt, RACI, budget and risk register for a 2-engineer team in Jakarta." | Set the rates, dates and scores myself |

## 2. How I checked the output

- **Against the PRD:** every section of the landing page maps to a user story or a value-proposition line.
- **Form → Sheets:** submitted test entries and checked each of the 13 columns.
- **Validation:** empty fields, a wrong email format and a missing consent box are all blocked; the hidden spam field drops bots.
- **Security:** values starting with `= + - @` are escaped so they can't run as formulas in the Sheet.
- **Mobile:** checked at 390px and 1280px wide, with no horizontal scroll.
- **Facts:** every number in the deck and report has a source or is marked as my assumption.

## 3. What the AI did not decide

Scope (MoSCoW), the four rejected ideas, the late-payment rules, the success metrics and the go/no-go rule are my decisions.
