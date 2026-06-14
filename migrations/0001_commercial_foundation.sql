create table if not exists members (
  id text primary key,
  email text not null unique,
  display_name text,
  locale text not null default 'th',
  timezone text not null default 'Asia/Bangkok',
  status text not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists birth_profiles (
  id text primary key,
  member_id text not null references members(id) on delete cascade,
  label text not null,
  birth_date date not null,
  birth_time time,
  birth_location text not null,
  birth_timezone text not null,
  gender_for_calculation text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists plans (
  id text primary key,
  code text not null unique,
  name_key text not null,
  description_key text not null,
  status text not null,
  billing_type text not null,
  currency text not null,
  price_minor integer not null,
  trial_days integer,
  entitlement_set_id text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists feature_entitlements (
  id text primary key,
  entitlement_set_id text not null,
  feature_key text not null,
  enabled boolean not null,
  limit_type text not null,
  limit_value integer,
  retention_days integer,
  allowed_plugin_ids text[],
  unique(entitlement_set_id, feature_key)
);

create table if not exists member_subscriptions (
  id text primary key,
  member_id text not null references members(id) on delete cascade,
  plan_id text not null references plans(id),
  status text not null,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists usage_events (
  id text primary key,
  member_id text references members(id) on delete cascade,
  guest_id text,
  feature_key text not null,
  plugin_id text,
  quantity integer not null,
  period_key text not null,
  request_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists analysis_history (
  id text primary key,
  member_id text not null references members(id) on delete cascade,
  birth_profile_id text references birth_profiles(id) on delete set null,
  query_type text not null,
  target jsonb,
  request_snapshot jsonb not null,
  result_snapshot jsonb not null,
  interpretation_snapshot jsonb,
  plugin_versions jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists consent_records (
  id text primary key,
  member_id text references members(id) on delete cascade,
  consent_type text not null,
  version text not null,
  granted boolean not null,
  granted_at timestamptz not null,
  revoked_at timestamptz
);

create table if not exists payment_events (
  id text primary key,
  provider text not null,
  type text not null,
  member_id text references members(id) on delete set null,
  subscription_id text references member_subscriptions(id) on delete set null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists plugin_catalog (
  id text primary key,
  category text not null,
  enabled_by_default boolean not null
);

create table if not exists plugin_versions (
  id text primary key,
  plugin_id text not null references plugin_catalog(id) on delete cascade,
  version text not null,
  calculation_version text not null,
  manifest jsonb not null,
  created_at timestamptz not null default now(),
  unique(plugin_id, version)
);

create index if not exists idx_birth_profiles_member on birth_profiles(member_id);
create index if not exists idx_usage_member_period on usage_events(member_id, feature_key, period_key);
create index if not exists idx_history_member_created on analysis_history(member_id, created_at desc);
create index if not exists idx_subscriptions_member on member_subscriptions(member_id);
