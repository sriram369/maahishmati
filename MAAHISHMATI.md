# Maahishmati

Maahishmati is a multi-agent product-building workflow for Codex: a terminal/Codex court of small specialist agents that can explore, plan, build, review, test, and ship products quickly.

The surface can feel mythic and alive, but the runtime must be practical: scoped agents, explicit task state, parallel work, audit logs, approval boundaries, and fast handoff back to the main orchestrator.

## Core Promise

Turn an idea into a shipped product increment using a summoned team of role-specific agents, each with a clear responsibility and a visible status in the terminal.

## Inspiration Study

### Hermes Agent

Useful ideas to borrow:

- Self-improving skill loop: the system can create and maintain reusable skills from repeated work.
- Context engine abstraction: context compression and memory are treated as replaceable engines.
- Delegate tool: parent agent can spawn isolated child agents with restricted tools.
- Kanban dispatcher: tasks become durable work items with ownership, state, comments, runs, and handoff.
- Multi-provider model support: different roles can use different models.
- Cron and gateway concepts: work can continue outside one foreground session.

Risks to avoid:

- Too many features before the core product-shipping workflow is excellent.
- Blocking parent execution on all child agents for every task.
- Making the user configure a lot before the system proves value.

### OpenClaw

Useful ideas to borrow:

- Multi-agent routing: agents have separate workspace, state, auth, session history, and policy.
- Subagents: background runs with isolated or forked context, completion handoff, timeouts, and cleanup.
- Delegate architecture: agents act with their own identity and explicit authority.
- Tool policy and sandboxing: each role gets only the tools it needs.
- OpenProse-style workflows: repeatable markdown programs that can spawn agents in parallel.
- Rich UI/control-plane thinking: sessions, status, logs, and active runs are inspectable.

Risks to avoid:

- Becoming a general messaging gateway instead of a product-building engine.
- Letting channel/account routing dominate the MVP.
- Shipping a large platform before the terminal workflow is delightful.

### oh-my-codex

Useful ideas to borrow:

- Codex-native workflow layer: keep Codex as the execution engine and add stronger prompts, roles, state, and runtime help around it.
- Invocation keywords: `$team`, `$ralph`, `$ralplan`, and `$deep-interview` prove that memorable in-session triggers work.
- Durable local state: `.omx/` maps cleanly to Maahishmati's `.maahishmati/` mission state.
- Native Codex setup: generated prompts, agent configs, hooks, and project guidance are the right integration path.
- Tmux/HUD runtime: separate panes for leader, workers, logs, and status are a strong model for the Maahishmati war room.
- Team heartbeat/status: workers need heartbeat files, status files, event logs, and leader nudges so the team does not silently stall.

Risks to avoid:

- Depending too heavily on tmux for the only experience; Codex App should still get a simpler in-chat version.
- Making users learn many magic keywords before the system has one perfect default invocation.
- Generic role catalogs that feel powerful but do not automatically ship the product.

## Maahishmati Agent Court

Each agent should be an original archetype, not a literal film character.

- Sovereign: orchestrates the court, chooses agents, owns the final verdict.
- Builder: implements the main feature.
- Explorer: reads codebases, docs, repos, APIs, and unknown systems.
- Guardian: reviews code, tests, security, regressions, and edge cases.
- Truth Keeper: product judgment, scope, user value, and hard tradeoffs.
- Polish Warrior: UX, frontend, copy, interaction design, and finish.
- Adversary: attacks assumptions, finds failure modes, stress-tests strategy.
- Toolsmith: integrations, scripts, CLIs, automations, and environment setup.
- Chronicler: memory, docs, decisions, changelog, and reusable skills.
- War Room: optional mixture-of-agents panel for hard architecture or strategy calls.

## Runtime Model

Maahishmati should have three layers.

### 1. Court Layer

The user sees this:

```text
maahishmati ship "build a landing-page generator"

[Sovereign] Framing the war...
[Explorer] Mapping the repo...
[Truth Keeper] Cutting scope...
[Builder] Implementing...
[Guardian] Reviewing...
[Polish Warrior] Checking UX...
[Sovereign] Verdict: ship.
```

### 2. Orchestration Layer

The orchestrator maintains:

- `war_id`: one end-to-end user request.
- `tasks`: durable task records with owner, status, dependencies, result, and artifacts.
- `agents`: role specs with prompt, model, tool policy, workspace policy, and avatar.
- `runs`: every agent execution, streamed output, tool calls, timing, and result.
- `handoffs`: structured summaries from child agents to parent.

### 3. Execution Layer

Each child run should support:

- isolated context by default;
- forked context only when needed;
- explicit tool allowlist;
- timeout;
- cancellation;
- final structured result;
- optional sandbox;
- logs saved under `.maahishmati/runs/<war_id>/`.

## Workflow Programs

Maahishmati should support simple workflow files:

```yaml
name: product_ship
phases:
  - id: frame
    agent: truth_keeper
  - id: explore
    agent: explorer
  - id: build
    agent: builder
  - id: review
    parallel:
      - guardian
      - adversary
      - polish_warrior
  - id: verdict
    agent: sovereign
```

The default workflow should be:

Frame -> Explore -> Scope -> Build -> Review -> QA -> Ship

Small tasks should compress to:

Understand -> Edit -> Verify -> Report

## MVP

Build the smallest powerful version first:

1. `maahishmati`
   Opens the ASCII court and asks for the mission.

2. `maahishmati init`
   Creates `.maahishmati/agents/*.md`, `.maahishmati/workflows/product_ship.yaml`, and run directories.

3. `maahishmati run "<goal>"`
   Runs the Sovereign locally, creates a war plan, then dispatches a minimal set of role agents.

4. `maahishmati status`
   Shows current war, agents, tasks, and final handoffs.

5. `maahishmati logs`
   Shows run logs and agent outputs.

6. Codex bridge
   The workflow should be Codex-native first: use Codex subagents/skills/hooks where available, with portable fallbacks later.

## Invocation Experience

The magic entrypoint:

```text
Mahishmati
```

or:

```text
using Mahishmati, build a calculator app
```

The court opens:

```text
MAAHISHMATI COURT

        [ SIVAGAMI ]
     The court is awake.

     What war shall we win today?
> build a calculator app
```

Then Sivagami narrates compact operational status while agents work:

```text
[SIVAGAMI] Mission framed: calculator app.
[MAHENDRA] Mapping project structure.
[DEVASENA] Scope: basic ops, decimals, clear, keyboard input.
[AMARENDRA] Building implementation.
[BHALLA] Attacking edge cases.
[KATTAPPA] Reviewing after build.
```

The terminal should show agent talk only when it changes the mission state:

```text
[BHALLA -> AMARENDRA] Repeated equals can corrupt state.
[AMARENDRA] Fix accepted. Updating transition logic.
[KATTAPPA] Regression test required before verdict.
```

## Thinking Mode

Sivagami should maintain a compact war-room display that answers:

- Which armies are active?
- How many agents are running?
- Who is blocked?
- What task is each army responsible for?
- What is each subagent doing?

Example:

```text
SIVAGAMI THINKING
Mode:           war-room
Active armies:  1/4
Running agents: 1/8
Blocked agents: 0
Thought:        Mission framed. Awaiting worker dispatch.

[COMMAND ARMY] ACTIVE | lead: Sivagami | agents: 2
  task: Frame the war, control scope, track status, and decide ship readiness.
  - Sivagami  running     Sovereign
  - Devasena  standing-by Truth Keeper

[BUILD ARMY] STANDING-BY | lead: Amarendra | agents: 3
  task: Map the terrain, implement the product, and solve tooling/integration blockers.
  - Mahendra  standing-by Explorer-Heir
  - Amarendra standing-by Builder-King
  - Aslam     standing-by Toolsmith
```

## Power Features

After MVP:

- persistent skill creation from completed wars;
- reusable playbooks for SaaS, games, internal tools, design-to-code, PR fixing, CI fixing;
- model routing by role;
- visual TUI with tiny agent pets;
- approval gates for destructive actions;
- memory of Sriram preferences and project taste;
- war scorecard: shipped, blocked, tests run, risks left;
- product launch mode: build, docs, changelog, screenshots, PR, deploy checklist.

## Non-Negotiables

- Product shipping beats agent theater.
- The orchestrator must assign fewer agents when fewer agents are enough.
- Every child agent must have a clear output contract.
- Review agents should produce actionable findings, not vague opinions.
- Tool permissions must be role-specific.
- Logs and handoffs must be inspectable.
- The UI can be playful, but the system must be serious.
