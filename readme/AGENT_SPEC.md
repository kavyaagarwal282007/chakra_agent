# Autonomous Agent Specifications

This document outlines the contracts, input schemas, output payloads, and verification criteria for each of Chakra Agent's autonomous subsystems.

---

## 1. Planner Agent (`planner-v3-orch`)

- **Role**: Software Requirements & Domain Decomposition
- **Input Contract**:
  ```json
  {
    "userPrompt": "Add rate-limiting and redis lock to token swap",
    "targetRepo": "github.com/chakra-agent/account-service",
    "branch": "feat/password-reset",
    "existingAstIndex": "ast_index_sha256"
  }
  ```
- **Output Artifact**:
  - Functional requirements specification (Markdown)
  - Dependency DAG (Directed Acyclic Graph)
  - Unit & integration test criteria

---

## 2. Coding Agent (`coder-ast-synth`)

- **Role**: AST Synthesis & Type-Safe Patching
- **Input Contract**:
  ```json
  {
    "dagStep": "GEN_TOKEN_SERVICE",
    "targetFiles": ["src/auth/tokenValidator.ts"],
    "specContracts": ["ISingleUseTokenLifecycle", "ITokenExpirationRule"]
  }
  ```
- **Output Artifact**:
  - Mutated AST tree
  - Git patch delta (`+142 / -6` lines)
  - Semantic diagnostic result (zero TypeScript compiler warnings)

---

## 3. Testing Sandbox Agent (`sandbox-qa-runner`)

- **Role**: Isolated MicroVM Test Runner
- **Environment**:
  - Ephemeral runtime: `registry.chakra/auth:2.4.1`
  - Memory limit: `256MB`
  - Network: Mocked egress with deterministic fixtures
- **Output Artifact**:
  - Test run status: Passed / Failed
  - Execution log with stack traces and crash frames

---

## 4. Recovery Agent (`self-heal-engine`)

- **Role**: Flaw Diagnosis & Self-Healing Remediation
- **Heuristic Triggers**:
  - Timeout assertions & clock skew
  - Unhandled promise rejections
  - Race conditions in asynchronous mocks
  - Off-by-one boundary constraints
- **Output Artifact**:
  - Remediation patch
  - Re-verification benchmark: latency < 1s
  - Root-cause explanation

---

## 5. Verification & Security Agent (`verifier-gatekeeper`)

- **Role**: Continuous Attestation & Release Gatekeeper
- **Security Scans**:
  - OWASP Top 10 Static Analysis
  - Hardcoded credential scanning
  - AST dependency freeze
- **Attestation Payload**:
  ```json
  {
    "sigstoreVersion": "Cosign v2.2.0",
    "bundleDigest": "sha256:8812bf0972e...",
    "prNumber": 492,
    "confidenceScore": 1.0,
    "status": "APPROVED_FOR_STAGING"
  }
  ```
