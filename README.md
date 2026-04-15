🚀 Advanced Todo Experience

A modern, high-performance Todo application built with React, designed with a strong focus on user experience, animation consistency, and scalable architecture.

🔗 Live Demo: https://no-code1.netlify.app

📌 Overview

This project delivers a complete task management experience with a clean UI, smooth transitions, and a well-structured architecture powered by modern frontend tools.

## 🤖 AI-Driven Development

This project was fully built using AI-powered development workflows.

* The entire application was generated and structured using AI tools.
* Speckit was used to drive specification, planning, and execution.
* No manual coding was performed during the development process.

This highlights a modern approach to software development where:

* AI handles architecture, implementation, and testing
* The developer focuses on guiding, refining, and validating the system

---

## 🧠 About Speckit Workflow

The project leverages a spec-driven workflow powered by Speckit, where:

* Features are defined as structured specifications
* Tasks are automatically generated and tracked
* AI agents handle implementation and iteration
* Development follows a controlled and reproducible process

This results in:

* High consistency
* Scalable architecture
* Faster development cycles


✨ Features
Full task lifecycle (Add / Edit / Complete / Delete / Restore)
Responsive modern UI
Smooth animations with reduced motion support
Local persistence using localStorage
Strong testing coverage
🧱 Tech Stack
React 18
Zustand
Framer Motion
Vite
Vitest + Testing Library
ESLint


📂 Full Project Structure
.
├── .github/
│   ├── agents/
│   │   ├── speckit.analyze.agent.md
│   │   ├── speckit.checklist.agent.md
│   │   ├── speckit.clarify.agent.md
│   │   ├── speckit.constitution.agent.md
│   │   ├── speckit.git.commit.agent.md
│   │   ├── speckit.git.feature.agent.md
│   │   ├── speckit.git.initialize.agent.md
│   │   ├── speckit.git.remote.agent.md
│   │   ├── speckit.git.validate.agent.md
│   │   ├── speckit.implement.agent.md
│   │   ├── speckit.plan.agent.md
│   │   ├── speckit.specify.agent.md
│   │   ├── speckit.tasks.agent.md
│   │   └── speckit.taskstoissues.agent.md
│   ├── prompts/
│   │   ├── speckit.analyze.prompt.md
│   │   ├── speckit.checklist.prompt.md
│   │   ├── speckit.clarify.prompt.md
│   │   ├── speckit.constitution.prompt.md
│   │   ├── speckit.git.commit.prompt.md
│   │   ├── speckit.git.feature.prompt.md
│   │   ├── speckit.git.initialize.prompt.md
│   │   ├── speckit.git.remote.prompt.md
│   │   ├── speckit.git.validate.prompt.md
│   │   ├── speckit.implement.prompt.md
│   │   ├── speckit.plan.prompt.md
│   │   ├── speckit.specify.prompt.md
│   │   ├── speckit.tasks.prompt.md
│   │   └── speckit.taskstoissues.prompt.md
│   ├── workflows/
│   │   └── branch-policy.yml
│   └── copilot-instructions.md
│
├── .specify/
│   ├── extensions/
│   │   ├── git/
│   │   │   ├── commands/
│   │   │   │   ├── speckit.git.commit.md
│   │   │   │   ├── speckit.git.feature.md
│   │   │   │   ├── speckit.git.initialize.md
│   │   │   │   ├── speckit.git.remote.md
│   │   │   │   └── speckit.git.validate.md
│   │   │   ├── scripts/
│   │   │   │   ├── bash/
│   │   │   │   │   ├── auto-commit.sh
│   │   │   │   │   ├── create-new-feature.sh
│   │   │   │   │   ├── git-common.sh
│   │   │   │   │   └── initialize-repo.sh
│   │   │   │   └── powershell/
│   │   │   │       ├── auto-commit.ps1
│   │   │   │       ├── create-new-feature.ps1
│   │   │   │       ├── git-common.ps1
│   │   │   │       └── initialize-repo.ps1
│   │   │   ├── config-template.yml
│   │   │   ├── extension.yml
│   │   │   ├── git-config.yml
│   │   │   └── README.md
│   │   └── .registry
│   │
│   ├── integrations/
│   │   ├── copilot/
│   │   │   └── scripts/
│   │   │       ├── update-context.ps1
│   │   │       └── update-context.sh
│   │   ├── copilot.manifest.json
│   │   └── speckit.manifest.json
│   │
│   ├── memory/
│   │   └── constitution.md
│   │
│   ├── scripts/
│   │   └── powershell/
│   │       ├── check-prerequisites.ps1
│   │       ├── common.ps1
│   │       ├── create-new-feature.ps1
│   │       ├── setup-plan.ps1
│   │       ├── update-agent-context.ps1
│   │       └── validate-feature-branch.ps1
│   │
│   ├── templates/
│   │   ├── agent-file-template.md
│   │   ├── checklist-template.md
│   │   ├── constitution-template.md
│   │   ├── plan-template.md
│   │   ├── spec-template.md
│   │   └── tasks-template.md
│   │
│   ├── extensions.yml
│   ├── feature.json
│   ├── init-options.json
│   └── integration.json
│
├── .vscode/
│   └── settings.json
│
├── docs/
│   └── process/
│       └── feature-branch-workflow.md
│
├── specs/
│   ├── 001-advanced-todo-app/
│   │   ├── checklists/
│   │   │   ├── execution-ready.md
│   │   │   └── requirements.md
│   │   ├── contracts/
│   │   │   ├── component-contracts.md
│   │   │   └── state-store-contract.md
│   │   ├── data-model.md
│   │   ├── plan.md
│   │   ├── quickstart.md
│   │   ├── research.md
│   │   ├── spec.md
│   │   └── tasks.md
│   │
│   ├── 002-overhaul-todo-ui/
│   │   ├── checklists/
│   │   │   └── requirements.md
│   │   └── spec.md
│   │
│   └── 003-ui-ux-enhancements/
│       ├── checklists/
│       │   ├── execution-ready.md
│       │   └── requirements.md
│       ├── contracts/
│       │   ├── component-contracts.md
│       │   └── motion-theme-contract.md
│       ├── data-model.md
│       ├── plan.md
│       ├── quickstart.md
│       ├── research.md
│       ├── spec.md
│       └── tasks.md
│
├── src/
│   ├── animations/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── models/
│   ├── persistence/
│   ├── state/
│   ├── styles/
│   └── main.jsx
│
├── tests/
│   ├── contract/
│   ├── integration/
│   ├── unit/
│   └── setupTests.js
│
├── .gitignore
├── .npmignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vitest.config.js
🧪 Testing
Contract Tests
Integration Tests
Unit Tests
📄 License

MIT License
