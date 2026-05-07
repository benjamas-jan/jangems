-- JanGems initial schema
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run)

-- ── profiles ─────────────────────────────────────────────
-- One row per registered customer. Phone is the natural primary key
-- (10-digit Thai phone like "0812345678"). PIN-based auth uses pin_hash.

create table if not exists public.profiles (
  phone           text primary key,
  name            text not null,
  line_id         text,

  -- quiz answers
  day             text,            -- 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  animal          text,            -- 'cat' | 'dog' | 'fish' | 'eagle'
  desire          text,            -- 'work' | 'love' | 'wealth' | 'protect'

  -- auth
  pin_hash        text,            -- bcrypt; null = PIN not set yet
  failed_attempts int  not null default 0,
  locked_until    timestamptz,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Phone format check (10 digits, starts with 0)
alter table public.profiles
  add constraint profiles_phone_format
  check (phone ~ '^0[0-9]{9}$');

-- ── readings ─────────────────────────────────────────────
-- Personalised reading content shown in the member dashboard.
-- One profile has many readings, grouped by category.

create table if not exists public.readings (
  id            uuid primary key default gen_random_uuid(),
  profile_phone text not null references public.profiles(phone) on delete cascade,
  category      text not null,    -- e.g. 'พลอยประจำตัว', 'การงาน', 'ความรัก'
  content       text not null,    -- markdown
  created_at    timestamptz not null default now()
);

create index if not exists readings_profile_phone_idx
  on public.readings (profile_phone);

create index if not exists readings_profile_category_idx
  on public.readings (profile_phone, category);

-- ── updated_at trigger ───────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ── Row Level Security ───────────────────────────────────
-- Enable RLS on both tables. No policies = anon clients are blocked.
-- All reads/writes happen through server actions using the service_role key,
-- which bypasses RLS. Per-user policies will be added when custom JWT auth lands.

alter table public.profiles enable row level security;
alter table public.readings enable row level security;
