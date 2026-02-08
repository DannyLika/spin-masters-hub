-- Add notes column to player_beyblades table
alter table public.player_beyblades 
add column if not exists notes text;
