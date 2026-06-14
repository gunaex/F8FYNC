insert into plans (id, code, name_key, description_key, status, billing_type, currency, price_minor, trial_days, entitlement_set_id)
values
  ('plan_guest', 'guest', 'pricing.plans.guest.name', 'pricing.plans.guest.description', 'active', 'free', 'THB', 0, null, 'ent_guest'),
  ('plan_free', 'free', 'pricing.plans.free.name', 'pricing.plans.free.description', 'active', 'free', 'THB', 0, null, 'ent_free'),
  ('plan_premium', 'premium', 'pricing.plans.premium.name', 'pricing.plans.premium.description', 'active', 'monthly', 'THB', 19900, 7, 'ent_premium')
on conflict (id) do update set
  name_key = excluded.name_key,
  description_key = excluded.description_key,
  status = excluded.status,
  billing_type = excluded.billing_type,
  currency = excluded.currency,
  price_minor = excluded.price_minor,
  trial_days = excluded.trial_days,
  entitlement_set_id = excluded.entitlement_set_id,
  updated_at = now();
