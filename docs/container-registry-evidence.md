# DevOps MT2 Milestone: Image Pushed to Container Registry (2 Marks)

## Student Information
- **Student Name**: Aashi Goyal
- **Roll Number**: 24ESKCS004
- **Repository**: [skit-devops-2026/devops-24ESKCS004](https://github.com/skit-devops-2026/devops-24ESKCS004)
- **Branch**: `main`

---

## 1. Milestone Overview
- **Requirement**: "Image pushed to the container registry — 2 marks"
- **Implementation**: Automated GitHub Actions CI workflow using GitHub Container Registry (GHCR) with `GITHUB_TOKEN` and `packages: write` permissions.
- **Workflow File**: `.github/workflows/ci.yml`
- **Job ID**: `docker` (`name: Build and push images`)

---

## 2. GitHub Actions CI Run Details
- **Run Number**: [#32](https://github.com/skit-devops-2026/devops-24ESKCS004/actions/runs/39531978145)
- **Commit SHA**: `57e678c` ("Add Docker image publishing to GHCR")
- **Workflow Run URL**: [https://github.com/skit-devops-2026/devops-24ESKCS004/actions/runs/39531978145](https://github.com/skit-devops-2026/devops-24ESKCS004/actions/runs/39531978145)
- **Job URL (`docker`)**: [https://github.com/skit-devops-2026/devops-24ESKCS004/actions/runs/39531978145/job/118999883677](https://github.com/skit-devops-2026/devops-24ESKCS004/actions/runs/39531978145/job/118999883677)

### Pipeline Execution Status:
| Job Name | Job ID | Dependency (`needs`) | Result |
| :--- | :--- | :--- | :--- |
| **Repository Audit & Syntax Lint** | `audit-and-lint` | None | `Completed (Success)` |
| **Unit Test Suite (Node 20.x & 22.x)** | `automated-tests` | `audit-and-lint` | `Completed (Success)` |
| **Build and push images** | `docker` | `automated-tests` | `Completed (Success)` |

---

## 3. Published Container Image Details
- **Registry**: GitHub Container Registry (`ghcr.io`)
- **Image Name**: `ghcr.io/skit-devops-2026/devops-24eskcs004`
- **Image Tag**: `:latest`
- **Full Reference**: `ghcr.io/skit-devops-2026/devops-24eskcs004:latest`
- **Docker Context**: `.` (Root repository)
- **Dockerfile**: `./Dockerfile`

---

## 4. Pull Command
```bash
docker pull ghcr.io/skit-devops-2026/devops-24eskcs004:latest
```

---

## 5. Security & Best Practices Adherence
- **Least-Privileged Permissions**: Scoped job-level permissions `contents: read` and `packages: write`.
- **Zero Hardcoded Secrets**: Built-in dynamic `secrets.GITHUB_TOKEN` is used for authentication.
- **Lowercase Standards Compliance**: Image name dynamically formatted using `${GITHUB_REPOSITORY,,}` to satisfy OCI / GHCR lowercase specifications.
- **Pull Request Safety**: Guarded with `if: github.event_name != 'pull_request'` to prevent untrusted pull requests from overwriting production tags.
