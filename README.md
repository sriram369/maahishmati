# Maahishmati

Maahishmati is a Codex-native multi-agent product-shipping workflow with a terminal war-court skin.

The simplest trigger is:

```bash
bahubali
```

The court wakes, Sivagami asks for the mission, and the workflow creates a structured war record under `.maahishmati/`.

## Install

Fast path from GitHub:

```bash
npm install -g github:sriram369/maahishmati
```

Or use the installer:

```bash
curl -fsSL https://raw.githubusercontent.com/sriram369/maahishmati/main/scripts/install.sh | sh
```

Then run:

```bash
bahubali
```

Requirements:

- Node.js 20+
- npm

Homebrew is a good next distribution path. The first public version keeps install simple with npm-from-GitHub; once the CLI stabilizes, we can add a `homebrew-maahishmati` tap so users can run `brew install sriram369/maahishmati/maahishmati`.

## Try It

```bash
node ./bin/bahubali.js
node ./bin/bahubali.js run "build a calculator app"
node ./bin/bahubali.js status
node ./bin/bahubali.js thinking
node ./bin/bahubali.js agents
node ./bin/bahubali.js doctor
```

If installed through npm later, both commands should work:

```bash
bahubali
maahishmati
```

## v0 Court

- Sivagami: Sovereign, orchestrator, status narrator, final verdict.
- Mahendra: Explorer-Heir, repo/context mapper.
- Devasena: Truth Keeper, MVP scope and acceptance criteria.
- Amarendra: Builder-King, implementation owner.
- Avantika: Polish Warrior, UX and finish.
- Bhalla: Adversary, assumptions and edge cases.
- Kattappa: Guardian, review and verification.
- Aslam: Toolsmith, integrations and automations.

## Thinking Mode

`bahubali thinking` shows Sivagami's war-room view:

- active armies;
- running agents;
- blocked agents;
- each army's task;
- each subagent's current assignment and status.

## Design

This prototype borrows architecture lessons from Hermes, OpenClaw, and oh-my-codex:

- Hermes: delegation, durable task state, skill learning, context compression, model routing.
- OpenClaw: isolated sessions, tool policies, subagent lifecycle, approval boundaries.
- oh-my-codex: Codex-native triggers, local state, HUD/team runtime, hooks, worker heartbeat/status.

The first version is intentionally narrow: summon the court, frame a mission, create agent assignments, persist state, and expose status.

## Codex Usage

Inside Codex, use the trigger phrase:

```text
bahubali
```

That should summon the Maahishmati court. The current CLI is the first local runtime; the next step is a Codex skill/plugin wrapper that maps the same trigger to real subagent dispatch.
