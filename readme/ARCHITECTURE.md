# Chakra Agent Architecture

Chakra Agent is an autonomous multi-agent software engineering framework that executes a closed-loop **Build · Verify · Recover** lifecycle.

```
+-------------------------------------------------------------------------+
|                              USER REQUEST                               |
|                "Add rate-limiting and redis distributed lock"           |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                           PLANNER AGENT                                 |
|            - AST & schema dependency analysis                           |
|            - Acceptance criteria & user story autogen                   |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                           CODING AGENT                                  |
|            - TypeScript / Node AST synthesis                            |
|            - Clean token revocation and controller endpoints            |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                        SANDBOX QA AGENT                                 |
|            - Ephemeral Docker / MicroVM isolation                       |
|            - Integration test suite execution                           |
+------------------------------------+------------------------------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
     [All Tests Green]                             [Failure Detected]
             |                                               |
             |                                               v
             |                             +---------------------------------+
             |                             |         RECOVERY AGENT          |
             |                             | - Crash trace AST isolation     |
             |                             | - Deterministic clock/patch gen |
             |                             | - Re-runs test matrix in <1s    |
             |                             +-----------------+---------------+
             |                                               |
             +-----------------------<-----------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                         VERIFIER AGENT                                  |
|            - OWASP / static CVE security audit                          |
|            - Cryptographic Cosign / Sigstore container attestation      |
|            - Signed PR ready for production merge                       |
+-------------------------------------------------------------------------+
```

---

## The 5 Specialized Sub-Agents

### 1. Planner Agent (`planner-v3-orch`)
- **Responsibility**: Translates natural language engineering prompts into formal AST requirements and contract interfaces.
- **Invariants**: Detects requirement ambiguities and verifies zero spec drift against existing service dependencies.

### 2. Coding Agent (`coder-ast-synth`)
- **Responsibility**: Performs AST code synthesis using strict type definitions and deterministic algorithms.
- **Invariants**: Ensures zero syntax errors, strict TypeScript conformance, and clean cryptographic primitives (e.g., constant-time comparison, SHA-256 with CSPRNG salts).

### 3. Testing Agent (`sandbox-qa-runner`)
- **Responsibility**: Boots an isolated micro-sandbox to run unit, integration, and property-based regression suites.
- **Invariants**: Validates that all side-effects (database mutations, network requests) are mocked or safely sandboxed.

### 4. Recovery Agent (`self-heal-engine`)
- **Responsibility**: When an assertion fails (e.g., async clock skew, race condition, off-by-one boundary), analyzes the trace log, mutates the AST at the offending call site, and re-executes tests without human intervention.
- **Recovery SLA**: Average auto-recovery latency < 820ms.

### 5. Verification & Security Agent (`verifier-gatekeeper`)
- **Responsibility**: Audits dependencies for OWASP Top 10 vulnerabilities, leaked credentials, and unauthorized permission mutations.
- **Cryptographic Attestation**: Emits a Sigstore Cosign signature hash locking the filesystem state and build artifacts.
