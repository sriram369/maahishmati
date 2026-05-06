#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const cwd = process.cwd();
const root = path.join(cwd, ".maahishmati");
const runsDir = path.join(root, "runs");
const agentsPath = path.join(root, "agents.json");
const latestPath = path.join(root, "latest.json");
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const AGENTS = [
  {
    id: "sivagami",
    name: "Sivagami",
    title: "Sovereign",
    contract: "Frame the mission, assign the court, track status, and give the verdict.",
    tools: ["plan", "status", "handoff"],
  },
  {
    id: "mahendra",
    name: "Mahendra",
    title: "Explorer-Heir",
    contract: "Map the codebase, dependencies, project structure, and unknown terrain.",
    tools: ["read", "search", "summarize"],
  },
  {
    id: "devasena",
    name: "Devasena",
    title: "Truth Keeper",
    contract: "Cut scope to the smallest useful MVP and protect user value.",
    tools: ["scope", "acceptance-criteria"],
  },
  {
    id: "amarendra",
    name: "Amarendra",
    title: "Builder-King",
    contract: "Implement the product increment and report changed files, risks, and assumptions.",
    tools: ["edit", "test", "handoff"],
  },
  {
    id: "avantika",
    name: "Avantika",
    title: "Polish Warrior",
    contract: "Improve UX, interaction quality, copy, layout, and visual finish.",
    tools: ["ux-review", "edit", "screenshot"],
  },
  {
    id: "bhalla",
    name: "Bhalla",
    title: "Adversary",
    contract: "Attack assumptions, find edge cases, and stress-test the plan.",
    tools: ["critique", "risk"],
  },
  {
    id: "kattappa",
    name: "Kattappa",
    title: "Guardian",
    contract: "Review code, run verification, find regressions, and guard the ship line.",
    tools: ["review", "test", "security"],
  },
  {
    id: "aslam",
    name: "Aslam",
    title: "Toolsmith",
    contract: "Bring integrations, CLIs, scripts, automations, and environment fixes.",
    tools: ["shell", "integrations", "automation"],
  },
];

const WORKFLOW = [
  ["frame", "sivagami", "Mission framed and victory condition named."],
  ["explore", "mahendra", "Repo/context mapping assigned."],
  ["scope", "devasena", "MVP scope and non-goals assigned."],
  ["build", "amarendra", "Implementation assigned."],
  ["polish", "avantika", "UX polish assigned when user-facing work exists."],
  ["attack", "bhalla", "Assumption attack and edge-case pressure assigned."],
  ["review", "kattappa", "Review and verification assigned."],
  ["verdict", "sivagami", "Final ship/revise/block verdict assigned."],
];

const ARMIES = [
  {
    id: "command",
    name: "COMMAND ARMY",
    lead: "sivagami",
    agents: ["sivagami", "devasena"],
    task: "Frame the war, control scope, track status, and decide ship readiness.",
  },
  {
    id: "build",
    name: "BUILD ARMY",
    lead: "amarendra",
    agents: ["mahendra", "amarendra", "aslam"],
    task: "Map the terrain, implement the product, and solve tooling/integration blockers.",
  },
  {
    id: "polish",
    name: "POLISH ARMY",
    lead: "avantika",
    agents: ["avantika"],
    task: "Make the user-facing experience feel finished and usable.",
  },
  {
    id: "pressure",
    name: "PRESSURE ARMY",
    lead: "bhalla",
    agents: ["bhalla", "kattappa"],
    task: "Attack assumptions, test edge cases, review code, and guard the ship line.",
  },
];

function courtAscii() {
  return String.raw`
 __  __    _    _    _   _ ___ ____  _   _ __  __    _  _____ ___
|  \/  |  / \  | |  | | | |_ _/ ___|| | | |  \/  |  / \|_   _|_ _|
| |\/| | / _ \ | |  | |_| || |\___ \| |_| | |\/| | / _ \ | |  | |
| |  | |/ ___ \| |__|  _  || | ___) |  _  | |  | |/ ___ \| |  | |
|_|  |_/_/   \_\____|_| |_|___|____/|_| |_|_|  |_/_/   \_\_| |___|

                         WAR COURT
`;
}

function agentLine(agent, status = "READY") {
  return `[${agent.name.toUpperCase().padEnd(9)} :: ${agent.title.padEnd(14)}] ${status}`;
}

function ensureInit() {
  fs.mkdirSync(runsDir, { recursive: true });
  if (!fs.existsSync(agentsPath)) {
    fs.writeFileSync(agentsPath, `${JSON.stringify({ agents: AGENTS }, null, 2)}\n`);
  }
}

function loadLatest() {
  if (!fs.existsSync(latestPath)) return null;
  return JSON.parse(fs.readFileSync(latestPath, "utf8"));
}

function saveRun(run) {
  ensureInit();
  const file = path.join(runsDir, `${run.id}.json`);
  fs.writeFileSync(file, `${JSON.stringify(run, null, 2)}\n`);
  fs.writeFileSync(latestPath, `${JSON.stringify({ id: run.id, file }, null, 2)}\n`);
  return file;
}

function agentName(id) {
  return AGENTS.find((agent) => agent.id === id)?.name || id;
}

function makeRun(goal) {
  const now = new Date();
  const id = `war-${now.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z")}`;
  const phases = WORKFLOW.map(([phase, agentId, assignment], index) => {
    const agent = AGENTS.find((item) => item.id === agentId);
    return {
      order: index + 1,
      phase,
      agent: agent.name,
      title: agent.title,
      status: index === 0 ? "completed" : "planned",
      assignment,
      handoff: index === 0 ? `Mission accepted: ${goal}` : null,
    };
  });

  return {
    id,
    goal,
    createdAt: now.toISOString(),
    status: "planned",
    trigger: "bahubali",
    court: "maahishmati",
    thinking: {
      mode: "war-room",
      narrator: "Sivagami",
      currentThought: "Mission framed. Awaiting worker dispatch.",
    },
    armies: ARMIES.map((army, index) => ({
      ...army,
      lead: agentName(army.lead),
      status: index === 0 ? "active" : "standing-by",
      agents: army.agents.map((id) => {
        const agent = AGENTS.find((item) => item.id === id);
        return {
          id,
          name: agent.name,
          title: agent.title,
          status: index === 0 && id === "sivagami" ? "running" : "standing-by",
          task: agent.contract,
        };
      }),
    })),
    subagents: [],
    phases,
    next: "Wire phases to Codex subagents or local workers.",
  };
}

function buildDispatch(run) {
  const dispatch = [
    {
      id: `${run.id}-mahendra`,
      agent: "Mahendra",
      army: "BUILD ARMY",
      status: "queued",
      context: "isolated",
      task: `Map the battlefield for: ${run.goal}. Return app/repo type, relevant files, risks, and next steps. Read-only.`,
    },
    {
      id: `${run.id}-devasena`,
      agent: "Devasena",
      army: "COMMAND ARMY",
      status: "queued",
      context: "isolated",
      task: `Cut MVP scope for: ${run.goal}. Return must-haves, non-goals, and acceptance criteria.`,
    },
    {
      id: `${run.id}-amarendra`,
      agent: "Amarendra",
      army: "BUILD ARMY",
      status: "waiting",
      context: "fork-after-scope",
      task: `Implement the approved product increment for: ${run.goal}. Return changed files, summary, tests, and risks.`,
    },
    {
      id: `${run.id}-avantika`,
      agent: "Avantika",
      army: "POLISH ARMY",
      status: "waiting",
      context: "fork-after-build",
      task: `Polish UX and interaction for: ${run.goal}. Return UX changes, responsive notes, and visual risks.`,
    },
    {
      id: `${run.id}-bhalla`,
      agent: "Bhalla",
      army: "PRESSURE ARMY",
      status: "waiting",
      context: "fork-after-build",
      task: `Attack assumptions and edge cases for: ${run.goal}. Return likely failures and blockers. Read-only unless tests are requested.`,
    },
    {
      id: `${run.id}-kattappa`,
      agent: "Kattappa",
      army: "PRESSURE ARMY",
      status: "waiting",
      context: "fork-after-build",
      task: `Review and verify the implementation for: ${run.goal}. Return findings, checks run, ship blockers, and residual risk.`,
    },
  ];

  const dispatchedAgents = new Map(dispatch.map((item) => [item.agent, item.status]));
  const armies = run.armies.map((army) => {
    const activeAgents = army.agents.map((agent) => ({
      ...agent,
      status: dispatchedAgents.get(agent.name) || agent.status,
    }));
    const isActive = activeAgents.some((agent) => ["queued", "running"].includes(agent.status));
    const isWaiting = activeAgents.some((agent) => agent.status === "waiting");
    return {
      ...army,
      status: isActive ? "active" : isWaiting ? "waiting" : army.status,
      agents: activeAgents,
    };
  });

  return {
    ...run,
    status: "dispatched",
    thinking: {
      ...run.thinking,
      currentThought: "Armies dispatched. Explorer and Truth Keeper move first; builders wait for scoped terrain.",
    },
    armies,
    subagents: dispatch,
    next: "In Codex skill mode, spawn matching live subagents when explicit full-court authorization is present.",
  };
}

function printDispatch(run) {
  console.log("MAAHISHMATI DISPATCH");
  console.log(`War:  ${run.id}`);
  console.log(`Goal: ${run.goal}`);
  console.log("");
  for (const subagent of run.subagents || []) {
    console.log(`[${subagent.agent.toUpperCase().padEnd(9)}] ${subagent.status.padEnd(7)} ${subagent.army}`);
    console.log(`  context: ${subagent.context}`);
    console.log(`  task: ${subagent.task}`);
  }
  console.log("");
  printThinking(run);
}

function printCourt() {
  console.log(courtAscii());
  console.log("[SIVAGAMI] The court is awake.");
}

function printAgents() {
  for (const agent of AGENTS) {
    console.log(agentLine(agent));
  }
}

function printRun(run) {
  console.log(`[SIVAGAMI] Mission accepted: ${run.goal}`);
  console.log("");
  for (const phase of run.phases) {
    const label = `${phase.agent.toUpperCase()} :: ${phase.title}`;
    console.log(`[${label.padEnd(28)}] ${phase.assignment}`);
  }
  console.log("");
  console.log("[SIVAGAMI] Court dispatched.");
}

function printStatus(run) {
  if (!run) {
    console.log("[SIVAGAMI] No war is active. Run `bahubali` to summon the court.");
    return;
  }
  console.log("MAAHISHMATI STATUS");
  console.log(`War:    ${run.id}`);
  console.log(`Goal:   ${run.goal}`);
  console.log(`Status: ${run.status}`);
  console.log("");
  for (const phase of run.phases) {
    console.log(`${String(phase.order).padStart(2, "0")}. ${phase.phase.padEnd(8)} ${phase.agent.padEnd(10)} ${phase.status}`);
  }
  console.log("");
  printThinking(run);
}

function printThinking(run) {
  const armies = run.armies || [];
  const agents = armies.flatMap((army) => army.agents || []);
  const running = agents.filter((agent) => agent.status === "running").length;
  const active = armies.filter((army) => army.status === "active").length;
  const blocked = agents.filter((agent) => agent.status === "blocked").length;

  console.log("SIVAGAMI THINKING");
  console.log(`Mode:           ${run.thinking?.mode || "war-room"}`);
  console.log(`Active armies:  ${active}/${armies.length}`);
  console.log(`Running agents: ${running}/${agents.length}`);
  console.log(`Blocked agents: ${blocked}`);
  console.log(`Thought:        ${run.thinking?.currentThought || "Court is watching the battlefield."}`);
  console.log("");

  for (const army of armies) {
    console.log(`[${army.name}] ${army.status.toUpperCase()} | lead: ${army.lead} | agents: ${army.agents.length}`);
    console.log(`  task: ${army.task}`);
    for (const agent of army.agents) {
      console.log(`  - ${agent.name.padEnd(9)} ${agent.status.padEnd(11)} ${agent.title}`);
    }
  }
}

async function promptForGoal() {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question("\n[SIVAGAMI] What war shall we win today?\n> ");
  rl.close();
  return answer.trim();
}

async function run(goalFromArgs) {
  ensureInit();
  printCourt();
  printAgents();

  const goal = goalFromArgs || await promptForGoal();
  if (!goal) {
    console.log("[SIVAGAMI] No mission given. The court will wait.");
    return;
  }

  const runState = makeRun(goal);
  const file = saveRun(runState);
  console.log("");
  printRun(runState);
  console.log(`[SIVAGAMI] War record saved: ${path.relative(cwd, file)}`);
}

async function dispatch(goalFromArgs) {
  ensureInit();
  let runState;
  if (goalFromArgs) {
    runState = makeRun(goalFromArgs);
  } else {
    const latest = loadLatest();
    if (!latest) {
      const goal = await promptForGoal();
      if (!goal) {
        console.log("[SIVAGAMI] No mission given. The armies will wait.");
        return;
      }
      runState = makeRun(goal);
    } else {
      runState = JSON.parse(fs.readFileSync(latest.file, "utf8"));
    }
  }

  const dispatched = buildDispatch(runState);
  const file = saveRun(dispatched);
  printDispatch(dispatched);
  console.log(`[SIVAGAMI] Dispatch record saved: ${path.relative(cwd, file)}`);
}

function doctor() {
  ensureInit();
  console.log("MAAHISHMATI DOCTOR");
  console.log(`Root:   ${path.relative(cwd, root) || root}`);
  console.log(`Agents: ${path.relative(cwd, agentsPath)}`);
  console.log(`Runs:   ${path.relative(cwd, runsDir)}`);
  console.log(`Node:   ${process.version}`);
  console.log("");
  console.log("[SIVAGAMI] Court files are ready.");
}

function installSkill() {
  const source = path.join(packageRoot, "skills", "maahishmati");
  if (!fs.existsSync(source)) {
    console.log("[SIVAGAMI] Bundled skill not found in this install.");
    console.log(`[SIVAGAMI] Expected: ${source}`);
    process.exitCode = 1;
    return;
  }

  const codexHome = process.env.CODEX_HOME || path.join(process.env.HOME || "", ".codex");
  const target = path.join(codexHome, "skills", "maahishmati");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, { recursive: true });
  console.log("MAAHISHMATI SKILL INSTALL");
  console.log(`Source: ${source}`);
  console.log(`Target: ${target}`);
  console.log("");
  console.log("[SIVAGAMI] Codex skill installed. In a new Codex turn, say: bahubali");
}

function usage() {
  console.log(`Usage:
  bahubali                         summon the court interactively
  bahubali run "build calculator"  create a mission
  bahubali dispatch "build app"     create live-subagent dispatch plan
  bahubali status                  show latest mission
  bahubali thinking                show armies, running agents, and tasks
  bahubali install-skill           install Codex skill trigger
  bahubali agents                  list court agents
  bahubali doctor                  check local setup

Aliases:
  maahishmati ...                  same command surface
`);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd) return run("");
  if (cmd === "run") return run(rest.join(" ").trim());
  if (cmd === "dispatch") return dispatch(rest.join(" ").trim());
  if (cmd === "status") {
    const latest = loadLatest();
    if (!latest) return printStatus(null);
    const runState = JSON.parse(fs.readFileSync(latest.file, "utf8"));
    return printStatus(runState);
  }
  if (cmd === "thinking" || cmd === "armies") {
    const latest = loadLatest();
    if (!latest) return printStatus(null);
    const runState = JSON.parse(fs.readFileSync(latest.file, "utf8"));
    return printThinking(runState);
  }
  if (cmd === "agents") {
    ensureInit();
    return printAgents();
  }
  if (cmd === "doctor") return doctor();
  if (cmd === "install-skill") return installSkill();
  if (cmd === "help" || cmd === "--help" || cmd === "-h") return usage();
  return run([cmd, ...rest].join(" ").trim());
}

main().catch((error) => {
  console.error(`[SIVAGAMI] Court failure: ${error.message}`);
  process.exitCode = 1;
});
