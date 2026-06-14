create table if not exists coupons (
  code text primary key,
  coupon_type text not null,
  plan_code text not null,
  duration_days integer not null,
  max_redemptions_per_account integer not null default 1,
  recurring_billing boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists coupon_redemptions (
  id text primary key,
  member_id text not null references members(id) on delete cascade,
  coupon_code text not null references coupons(code),
  coupon_type text not null,
  subscription_id text not null references member_subscriptions(id),
  idempotency_key text not null,
  redeemed_at timestamptz not null default now(),
  unique(member_id, idempotency_key)
);

create unique index if not exists idx_coupon_redemptions_one_free_coupon_lifetime
  on coupon_redemptions(member_id, coupon_type)
  where coupon_type = 'free_trial';

alter table member_subscriptions add column if not exists source text;
alter table member_subscriptions add column if not exists coupon_code text references coupons(code);

insert into coupons (code, coupon_type, plan_code, duration_days, max_redemptions_per_account, recurring_billing, active)
values
  ('FREE_1_WEEK', 'free_trial', 'premium', 7, 1, false, true),
  ('FREE_1_MONTH', 'free_trial', 'premium', 30, 1, false, true)
on conflict (code) do update set
  coupon_type = excluded.coupon_type,
  plan_code = excluded.plan_code,
  duration_days = excluded.duration_days,
  max_redemptions_per_account = excluded.max_redemptions_per_account,
  recurring_billing = excluded.recurring_billing,
  active = excluded.active,
  updated_at = now();
