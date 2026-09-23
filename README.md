# TechHeads Planner

Build an app called TechHeadsMatcher.

CONTEXT

TechHeads is a one-day conference with 39 programme sessions. Attendees

cannot make it to everything and do not know what to pick. The app asks a

few simple questions about what the user is interested in and generates a

personal schedule for the day. All user-facing copy is in English.

DATA

Use the attached file techheads-program.csv. Parse it into a typed array at

build time — no file upload in the UI, the data is part of the app. Do not

invent sessions: the app may only display rows from the file.

Columns: description, title, speaker, time, location, company, category,

keywords.

Things to know about the data:

- time is a range like "10:00-10:30", all on the same day. Length varies

  from 15 to 90 minutes and sessions overlap each other.

- location has 5 values: Sturesalen, Gröna salen, Borgstugan, Sven Månsson,

  Källaren. A few rows have no location.

- category has 5 values: Emerging Tech, The Big Picture, Smart Cities,

  Data & Business Strategy, Security & Resilience. A few rows have no

  category — treat those as "Other", do not hide them.

- keywords is a comma-separated string, e.g. "AI, Upskilling, Leadership,

  Why". Split and trim.

- company and speaker can be empty. Never render "undefined".

FLOW

1. Landing: short intro and a "Build my schedule" button.

2. Three questions, one at a time, as large clickable cards — no free text:

   a) Which areas interest you? (the categories, multi-select)

   b) What do you want out of the day? (keyword tags pulled from the data,

      multi-select, show the 12 most common)

   c) How do you want your day? (a slider or three cards: "Packed" /

      "Balanced" / "Spacious" — controls how many sessions get picked)

3. Result: a timeline of the day.

MATCHING

No AI, no external service — plain deterministic scoring in the client:

- +3 points for each match between a selected category and the row's category

- +2 points for each overlapping keyword

- +1 if the row's company is among previously chosen companies (not used in

  the first version, but leave the hook in)

Sort by score.

Then build the schedule as an interval problem: convert time into start and

end minutes, walk the sessions in score order, and add the highest-ranked one

that does not clash with anything already selected. "Spacious" leaves at

least 20 minutes between sessions; "Packed" allows them to run back to back.

RESULT VIEW

- A chronological timeline with clear gaps between sessions ("45 min break").

- Each session shows time, title, speaker, location, and a line explaining

  WHY it was picked ("Matches: Emerging Tech · AI, IoT"). That explanation is

  the important part — without it this is just a list.

- Clicking a session opens the full description.

- Each session has a "Swap" action showing the next highest-ranked

  alternatives in the same time window, and swaps when one is chosen.

- A match figure at the top ("Your schedule covers 8 of 39 sessions, 82 %

  match against your interests").

- A "Start over" button.

TECH

Pure frontend. No login, no database, no backend. Store the choices in

localStorage so the schedule survives a reload, but the app must still work

if localStorage is blocked. Mobile first — people are standing up looking at

their phones at a conference.

DESIGN

Dark background (near black, not blue-grey), one warm yellow accent, lots of

breathing room, large clear typography. The timeline should read as a

schedule, not as a deck of cards. No emojis. No gradients.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8fa9a43f-2d27-45b3-8c93-237b9f947a28).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
