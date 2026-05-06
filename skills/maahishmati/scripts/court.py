#!/usr/bin/env python3
import argparse
import json

AGENTS = [
    ("SIVAGAMI", "Sovereign", "Frame, assign, narrate, verdict"),
    ("MAHENDRA", "Explorer-Heir", "Map repo/context"),
    ("DEVASENA", "Truth Keeper", "Scope MVP and acceptance"),
    ("AMARENDRA", "Builder-King", "Implement"),
    ("AVANTIKA", "Polish Warrior", "UX and finish"),
    ("BHALLA", "Adversary", "Attack assumptions"),
    ("KATTAPPA", "Guardian", "Review and verify"),
    ("ASLAM", "Toolsmith", "Tools and integrations"),
]

ARMIES = [
    ("COMMAND ARMY", "Sivagami", ["Sivagami", "Devasena"], "Frame, scope, status, verdict"),
    ("BUILD ARMY", "Amarendra", ["Mahendra", "Amarendra", "Aslam"], "Explore, build, unblock"),
    ("POLISH ARMY", "Avantika", ["Avantika"], "UX and finish"),
    ("PRESSURE ARMY", "Bhalla", ["Bhalla", "Kattappa"], "Attack, review, verify"),
]


def court():
    return r"""
 __  __    _    _    _   _ ___ ____  _   _ __  __    _  _____ ___
|  \/  |  / \  | |  | | | |_ _/ ___|| | | |  \/  |  / \|_   _|_ _|
| |\/| | / _ \ | |  | |_| || |\___ \| |_| | |\/| | / _ \ | |  | |
| |  | |/ ___ \| |__|  _  || | ___) |  _  | |  | |/ ___ \| |  | |
|_|  |_/_/   \_\____|_| |_|___|____/|_| |_|_|  |_/_/   \_\_| |___|

                         WAR COURT
""".strip("\n")


def agents():
    return "\n".join(f"[{name:<9} :: {title:<14}] {job}" for name, title, job in AGENTS)


def thinking():
    lines = [
        "SIVAGAMI THINKING",
        "Mode:           war-room",
        "Active armies:  1/4",
        "Running agents: 1/8",
        "Blocked agents: 0",
        "Thought:        Mission framed. Awaiting worker dispatch.",
        "",
    ]
    for name, lead, members, task in ARMIES:
        status = "ACTIVE" if name == "COMMAND ARMY" else "STANDING-BY"
        lines.append(f"[{name}] {status} | lead: {lead} | agents: {len(members)}")
        lines.append(f"  task: {task}")
        for member in members:
            state = "running" if member == "Sivagami" else "standing-by"
            lines.append(f"  - {member:<9} {state}")
    return "\n".join(lines)


def state():
    return json.dumps(
        {
            "court": "maahishmati",
            "trigger": "bahubali",
            "agents": [{"name": n, "title": t, "contract": c} for n, t, c in AGENTS],
            "armies": [{"name": n, "lead": lead, "agents": members, "task": task} for n, lead, members, task in ARMIES],
        },
        indent=2,
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("view", nargs="?", choices=["court", "agents", "thinking", "state"], default="court")
    args = parser.parse_args()
    print({"court": court, "agents": agents, "thinking": thinking, "state": state}[args.view]())


if __name__ == "__main__":
    main()
