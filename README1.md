# 🚀 NestJS + PostgreSQL + OpenSearch R&D Project

A production-style backend R&D project demonstrating **real-time search indexing using OpenSearch with PostgreSQL as the source of truth**.

---

# 📌 Project Overview

This project demonstrates how modern systems implement **high-performance search capabilities** by combining:

- 🐘 PostgreSQL → Primary database (source of truth)
- 🔎 OpenSearch → Distributed search engine (full-text search & analytics)
- ⚡ NestJS → Backend API layer

The goal is to simulate a **real-world search architecture used in large-scale systems like LinkedIn, Amazon, and Uber**.

---

# 🧠 OpenSearch in Depth (R&D Theory Section)

## 🔎 What is OpenSearch?

OpenSearch is a **distributed search and analytics engine** designed for:

- Full-text search
- Structured queries (filters, sorting)
- Aggregations (analytics dashboards)
- Near real-time indexing

It is optimized for **fast retrieval over large datasets**, where traditional SQL queries become inefficient.

---

## ⚙️ Why Not Use Only PostgreSQL?

PostgreSQL is excellent for:

- Transactions (ACID compliance)
- Data integrity
- Relational queries

However, it is NOT optimized for:

- Fuzzy search (typo tolerance)
- Ranking results by relevance
- Full-text search at scale
- Auto-suggestions (search-as-you-type)

👉 This is where OpenSearch becomes essential.

---

## 🚀 Core Concept: Database vs Search Engine

| Feature | PostgreSQL 🐘 | OpenSearch 🔎 |
|--------|---------------|--------------|
| CRUD operations | Excellent | Limited |
| Full-text search | Basic | Advanced |
| Fuzzy search | No | Yes |
| Relevance ranking | No | Yes |
| Horizontal scaling | Moderate | High |
| Analytics | Limited | Powerful |

---

# 🏗️ Architecture (Production-Level Design)

```text
                    ┌────────────────────┐
                    │      Client        │
                    │ (Web / Mobile App) │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │     NestJS API     │
                    │  (Business Layer)  │
                    └───────┬─────┬──────┘
                            │     │
            ┌───────────────┘     └───────────────┐
            ▼                                     ▼
┌──────────────────────┐              ┌──────────────────────┐
│   PostgreSQL DB      │              │     OpenSearch       │
│ (Source of Truth)    │              │ (Search Index Layer) │
└─────────┬────────────┘              └─────────┬────────────┘
          │                                     │
          └────────── Sync (Write Flow) ────────┘