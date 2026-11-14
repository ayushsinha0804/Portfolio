// Fetches the GitHub contribution calendar at build time and writes it to
// src/data/contributions.json, so the About page needs no runtime API calls.
// Needs a token in GITHUB_TOKEN (CI) or GH_TOKEN; without one, the committed
// JSON is kept as is.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const LOGIN = 'ayushsinha0804'
const OUT = fileURLToPath(new URL('../src/data/contributions.json', import.meta.url))
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN

const LEVELS: Record<string, number> = {
  NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
}

type Day = { date: string; contributionCount: number; contributionLevel: string }

if (!token) {
  console.log('contributions: no token, keeping existing data')
} else {
  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
    totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
  })
  const json = await res.json()
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar
  if (!res.ok || !cal) {
    console.warn('contributions: fetch failed, keeping existing data', res.status, JSON.stringify(json?.errors ?? ''))
  } else {
    const data = {
      login: LOGIN,
      total: cal.totalContributions as number,
      updated: new Date().toISOString().slice(0, 10),
      // [date, count, level 0-4] per day, grouped by week (Sunday first)
      weeks: (cal.weeks as { contributionDays: Day[] }[]).map((w) =>
        w.contributionDays.map((d) => [d.date, d.contributionCount, LEVELS[d.contributionLevel] ?? 0] as const),
      ),
    }
    writeFileSync(OUT, JSON.stringify(data) + '\n')
    console.log(`contributions: ${data.total} in the last year`)
  }
}
