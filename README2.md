# 🚀 Level 2: Advanced Search Features with OpenSearch

## Overview

At Level 1, we successfully integrated PostgreSQL and OpenSearch.

The search system could:

- Store data in PostgreSQL
- Index data into OpenSearch
- Search documents

However, modern applications require much more than basic search.

Users expect:

- Typo tolerance
- Search suggestions
- Relevance ranking
- Filters
- Pagination

This level focuses on transforming a basic search implementation into a production-style search experience.

---

# 🔎 Understanding Full Text Search

Traditional SQL search:

```sql
SELECT *
FROM users
WHERE name LIKE '%shiv%';
```

Problems:

### Table Scan

The database may need to scan many rows.

Example:

```text
1,000,000 users
```

Searching:

```text
shiv
```

might require checking every row.

### No Relevance Ranking

Results are returned without understanding which result is most relevant.

Example:

```text
shiv
shiv kumar
shiva
shivansh
```

SQL cannot naturally determine which result should appear first.

### Poor Typo Handling

User types:

```text
shivaa
```

Database:

```text
shiva
```

No match.

---

# 🔥 Why OpenSearch Solves This

OpenSearch creates an Inverted Index.

Instead of:

```text
Document → Words
```

It stores:

```text
Word → Documents
```

Example:

Documents:

```json
{
  "name": "shiva"
}

{
  "name": "dhruv"
}
```

Internal index:

```text
shiva → [doc1]
dhruv → [doc2]
```

Now searching becomes extremely fast.

---

# 🧠 Level 2 Feature 1: Multi Match Search

```ts
multi_match: {
  query,
  fields: ['name', 'skills']
}
```

## What is multi_match?

Normally:

```ts
match: {
  name: query
}
```

searches only one field.

Multi-match searches multiple fields simultaneously and combines relevance scores.

---

# 🧠 Level 2 Feature 2: Fuzzy Search

```ts
multi_match: {
  query,
  fields: ['name'],
  fuzziness: 'AUTO'
}
```

## Why Needed?

Users make mistakes.

Example:

```text
shivaa
```

Database:

```text
shiva
```

Without fuzziness:

```text
No Results
```

With fuzziness:

```text
shivaa → shiva
```

Match found.

### Levenshtein Distance

Measures the number of edits required to transform one word into another.

Example:

```text
shiva
shivaa
```

Distance = 1

Therefore OpenSearch can still match it.

---

# 🧠 Level 2 Feature 3: Search Ranking

```ts
fields: ['name^3', 'skills']
```

## What Does ^3 Mean?

Boosting.

Field importance:

```text
name → 3x weight
skills → 1x weight
```

Name matches rank higher than skill matches.

---

# 🧠 Level 2 Feature 4: Filtering

```ts
filter: [
  {
    match: {
      city: city
    }
  }
]
```

## Difference Between Filter and Search

Search:

```text
Find relevant documents
```

Filter:

```text
Restrict results
```

Example:

```text
Search: developer
Filter: city=noida
```

Only Noida developers are returned.

---

# 🧠 Level 2 Feature 5: Autocomplete

```ts
match_phrase_prefix: {
  name: {
    query: q
  }
}
```

## Why Needed?

Users do not type complete words.

Example:

```text
shi
```

Suggestions:

```text
shiva
shivam
shivansh
```

OpenSearch performs prefix matching to generate suggestions.

---

# 🧠 Level 2 Feature 6: Pagination

```ts
const from = (page - 1) * limit;
```

Example:

```text
Page = 2
Limit = 10
```

Calculation:

```text
(2 - 1) × 10 = 10
```

OpenSearch skips the first 10 records and returns records 11–20.

Benefits:

- Faster APIs
- Better UX
- Reduced memory usage

---

# 🧠 Level 2 Feature 7: Bool Query

```ts
bool: {
  must: [],
  filter: []
}
```

Allows combining multiple conditions.

Example:

```text
Search: shiv
City: noida
```

Representation:

```ts
bool: {
  must: [search condition],
  filter: [city condition]
}
```

Execution Flow:

```text
Search Users
    ↓
Apply Filters
    ↓
Rank Results
    ↓
Return Data
```

---

# 🏗️ Final Level 2 Search Architecture

```text
Client
   │
   ▼
NestJS Controller
   │
   ▼
Search Service
   │
   ▼
OpenSearch Query Builder
   │
   ├── Multi Match
   ├── Fuzzy Search
   ├── Filters
   ├── Pagination
   ├── Boosting
   └── Autocomplete
   │
   ▼
OpenSearch Engine
   │
   ▼
Ranked Results
   │
   ▼
Client
```

---

# 🎯 What You Have Achieved After Level 2

You now understand:

- Full-text search
- Inverted indexes
- Multi-field searching
- Fuzzy matching
- Levenshtein distance
- Relevance scoring
- Field boosting
- Filtering
- Pagination
- Autocomplete
- Query composition using bool queries

This level provides a strong foundation for building production-grade search experiences with OpenSearch.