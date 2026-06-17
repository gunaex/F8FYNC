alter table birth_profiles add column if not exists local_date date;
alter table birth_profiles add column if not exists local_time time;
alter table birth_profiles add column if not exists birth_time_status text not null default 'UNKNOWN';
alter table birth_profiles add column if not exists birth_location_text text;
alter table birth_profiles add column if not exists timezone_id text;
alter table birth_profiles add column if not exists timezone_confirmation_status text not null default 'SUGGESTED';
alter table birth_profiles add column if not exists time_adjustment_policy text not null default 'LOCAL_CIVIL_TIME';
alter table birth_profiles add column if not exists time_adjustment_policy_version text not null default 'time-policy.local-civil.v1';
alter table birth_profiles add column if not exists input_precision text not null default 'DATE_ONLY';
alter table birth_profiles add column if not exists input_source text not null default 'LEGACY_IMPORT';
alter table birth_profiles add column if not exists input_schema_version text not null default 'birth-input.v1';
alter table birth_profiles add column if not exists input_readiness jsonb;
alter table birth_profiles add column if not exists timezone_suggestion jsonb;

update birth_profiles
set
  local_date = coalesce(local_date, birth_date),
  birth_location_text = coalesce(birth_location_text, nullif(birth_location, '')),
  timezone_id = coalesce(timezone_id, nullif(birth_timezone, '')),
  birth_time_status = case
    when birth_time is null then 'UNKNOWN'
    when birth_time = time '12:00' then 'UNKNOWN'
    else birth_time_status
  end,
  local_time = case
    when birth_time is null then null
    when birth_time = time '12:00' then null
    else coalesce(local_time, birth_time)
  end,
  input_precision = case
    when birth_time is null then 'DATE_ONLY'
    when birth_time = time '12:00' then 'DATE_ONLY'
    else input_precision
  end,
  timezone_confirmation_status = case
    when timezone_confirmation_status = 'CONFIRMED' then 'CONFIRMED'
    when nullif(birth_timezone, '') is null then 'UNRESOLVED'
    else 'SUGGESTED'
  end,
  input_source = 'LEGACY_IMPORT',
  input_schema_version = 'birth-input.v1'
where input_schema_version = 'birth-input.v1';

create index if not exists idx_birth_profiles_timezone_status on birth_profiles(timezone_confirmation_status);
create index if not exists idx_birth_profiles_birth_time_status on birth_profiles(birth_time_status);
