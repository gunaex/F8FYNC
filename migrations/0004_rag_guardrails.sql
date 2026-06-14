create table if not exists knowledge_documents (
  id text primary key,
  collection text not null,
  locale text not null,
  title text not null,
  content text not null,
  source_type text not null,
  version text not null,
  status text not null,
  approved_by text,
  approved_at timestamptz,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists knowledge_chunks (
  id text primary key,
  document_id text not null references knowledge_documents(id) on delete cascade,
  collection text not null,
  locale text not null,
  content text not null,
  token_estimate integer not null,
  chunk_index integer not null,
  status text not null,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(document_id, chunk_index)
);

create table if not exists intent_audit_logs (
  id text primary key,
  request_id text not null,
  member_id text references members(id) on delete set null,
  allowed boolean not null,
  intent text not null,
  confidence numeric not null,
  reason_code text not null,
  rag_used boolean not null,
  retrieved_document_ids text[] not null default '{}',
  provider_id text,
  token_estimate integer not null default 0,
  cache_status text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_knowledge_documents_retrieval
  on knowledge_documents(collection, locale, status, version);

create index if not exists idx_knowledge_chunks_retrieval
  on knowledge_chunks(collection, locale, status);

create index if not exists idx_intent_audit_member_created
  on intent_audit_logs(member_id, created_at desc);
