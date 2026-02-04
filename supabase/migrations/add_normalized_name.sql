-- Add normalized_name column to beyblades table
alter table public.beyblades 
add column if not exists normalized_name text;

-- Create function to normalize Beyblade names
create or replace function normalize_beyblade_name(name text)
returns text as $$
  select lower(
    regexp_replace(
      trim(name),
      '[‐‑–—−]', '-', 'g'
    )
  );
$$ language sql immutable;

-- Create index on normalized_name for faster lookups
create index if not exists idx_beyblades_normalized_name 
on public.beyblades(normalized_name);

-- Populate normalized_name for existing records
update public.beyblades 
set normalized_name = normalize_beyblade_name(name)
where normalized_name is null;

-- Create trigger to auto-update normalized_name when name changes
create or replace function update_beyblade_normalized_name()
returns trigger as $$
begin
  new.normalized_name := normalize_beyblade_name(new.name);
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_update_beyblade_normalized_name on public.beyblades;
create trigger trigger_update_beyblade_normalized_name
  before insert or update of name on public.beyblades
  for each row
  execute function update_beyblade_normalized_name();
