-- Migration #2 — add birthday column for full-date personalization
-- Run in Supabase SQL Editor (after 0001_init.sql)

alter table public.profiles
  add column if not exists birthday date;

-- Sanity: birthday must be in the past, after 1900
alter table public.profiles
  add constraint profiles_birthday_range
  check (birthday is null or (birthday >= '1900-01-01' and birthday <= current_date));
