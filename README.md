# Gitops-Enterprise-Demo

Repository Structure
.github/workflows      → CI/CD pipeline (GitHub Actions)
app-repo               → Application source code + Dockerfile
helm-repo              → Helm charts for dev/stage/prod
argocd                 → ArgoCD application manifests
monitoring             → Prometheus, Grafana, alert configs

This project implements a GitOps-driven multi-environment CI/CD pipeline using:

GitHub Actions (CI)
Google Artifact Registry (Image Storage)
Helm (Deployment Packaging)
ArgoCD (Continuous Deployment / GitOps)
GKE (Kubernetes Runtime)
Prometheus + Grafana (Monitoring)
Slack (Alerting)

Step-by-Step Workflow Design
1️⃣ Developer Push → Main Branch

When code is pushed to main:

Developer → GitHub → GitHub Actions Triggered
2️⃣ CI Phase – Build & Push Docker Image

GitHub Actions:

Logs into Google Artifact Registry

Builds Docker image from app-repo/Dockerfile

Tags image with Git commit SHA

Pushes image to Artifact Registry

Docker Image → us-central1-docker.pkg.dev → versioned by SHA

✔ Immutable image tagging
✔ No "latest" tag usage
✔ Production-safe versioning

3️⃣ GitOps Dev Deployment (Auto Promotion)

Pipeline automatically:

Updates Helm values.yaml in helm-repo/environments/dev

Replaces image tag with commit SHA

Commits and pushes changes

Helm Dev Values Updated → Git Commit → ArgoCD detects change

ArgoCD continuously monitors the repo and syncs changes to GKE.

✔ Fully GitOps-based deployment
✔ No kubectl from CI
✔ Cluster state always matches Git

4️⃣ Stage Promotion (Manual Approval Gate)

After dev deployment:

GitHub Environment protection requires approval

On approval:

Helm values for stage updated

Git commit pushed

ArgoCD syncs to stage cluster

✔ Controlled promotion
✔ Environment-based governance

5️⃣ Production Promotion (Manual Approval Gate)

After stage validation:

Production environment requires manual approval

Pipeline updates prod Helm values

ArgoCD syncs production

✔ Production safety
✔ Auditable Git-based promotion

📊 Monitoring & Alerting

Cluster is monitored using:

Prometheus (metrics collection)

Grafana (dashboards)

Alerts configured for:

High CPU (>80%)

Pod restarts

Node down

Slack integration for alert notifications

✔ Real-time operational visibility
✔ Automated alerting

🎯 Key Architecture Principles Used

GitOps model (ArgoCD pull-based deployment)

Immutable image tagging (SHA-based)

Environment promotion via Git

Approval gates for stage & prod

Infrastructure as Code

Observability-first design
