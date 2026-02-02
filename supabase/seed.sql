insert into public.players (display_name, nickname)
values
  ('Alex', 'Ace'),
  ('Jordan', 'Jordy'),
  ('Sam', 'Sammy'),
  ('Riley', 'Rye')
on conflict (display_name) do nothing;

insert into public.beyblades (name, type, attack, defense, stamina, notes, product_code, source_wave, raw_type)
values
  ('Valkyrie Wing', 'Attack', 85, 45, 60, null, null, null, null),
  ('Longinus Destroy', 'Attack', 92, 38, 55, null, null, null, null),
  ('Spriggan Requiem', 'Balance', 75, 70, 75, null, null, null, null),
  ('Fafnir Phoenix', 'Stamina', 50, 65, 95, null, null, null, null),
  ('Achilles Brave', 'Attack', 88, 52, 48, null, null, null, null),
  ('Diabolos Kaiser', 'Balance', 78, 68, 72, null, null, null, null),
  ('Dragon Blaze', 'Attack', 90, 35, 50, null, null, null, null),
  ('Pegasus Storm', 'Stamina', 55, 60, 92, null, null, null, null),
  ('DranSword 3-60F', 'Attack', null, null, null, null, 'BX-01', null, 'Attack'),
  ('HellsScythe 4-60T', 'Balance', null, null, null, null, 'BX-02', null, 'Balance'),
  ('WizardArrow 4-80B', 'Stamina', null, null, null, null, 'BX-03', null, 'Stamina'),
  ('KnightShield 3-80N', 'Defense', null, null, null, null, 'BX-04', null, 'Defense'),
  ('KnightLance 4-80HN', 'Defense', null, null, null, null, 'BX-13', null, 'Defense'),
  ('Random Booster Vol. 1', 'Balance', null, null, null, null, 'BX-14', null, 'Various'),
  ('LeonClaw 5-60P', 'Balance', null, null, null, null, 'BX-15', null, 'Balance'),
  ('ViperTail Select', 'Balance', null, null, null, null, 'BX-16', null, 'Balance/Stamina'),
  ('WizardRod 3-60MT', 'Stamina', null, null, null, null, 'BX-17', null, 'Stamina'),
  ('ChainIncendio 5-60HT', 'Balance', null, null, null, null, 'BX-18', null, 'Balance'),
  ('RhinoHorn 3-80S', 'Defense', null, null, null, null, 'BX-19', null, 'Defense'),
  ('DrigerSlash 4-80P', 'Attack', null, null, null, null, 'BX-20', null, 'Attack'),
  ('HellsHammer 3-70H', 'Attack', null, null, null, null, 'BX-21', null, 'Attack'),
  ('3on3 Deck Set', 'Balance', null, null, null, null, 'BX-22', null, 'Various'),
  ('WizardRod 5-80DB', 'Stamina', null, null, null, null, 'BX-23', null, 'Stamina'),
  ('Random Booster Vol. 2', 'Balance', null, null, null, null, 'BX-24', null, 'Various'),
  ('DranDagger 4-60R', 'Attack', null, null, null, null, 'BX-25', null, 'Attack'),
  ('LeonCrest 7-60GN', 'Defense', null, null, null, null, 'BX-26', null, 'Defense'),
  ('4-80MN', 'Balance', null, null, null, null, 'BX-27', null, '---'),
  ('WizardRod 3-60MT (BX-28)', 'Stamina', null, null, null, null, 'BX-28', null, 'Stamina'),
  ('TurtleShark 3-60Q', 'Attack', null, null, null, null, 'BX-29', null, 'Attack'),
  ('DarkTail 5-60F', 'Balance', null, null, null, null, 'BX-30', null, 'Balance'),
  ('Random Booster Vol. 3', 'Balance', null, null, null, null, 'BX-31', null, 'Various'),
  ('ScytheIncendio 4-60T', 'Balance', null, null, null, null, 'BX-33', null, 'Balance'),
  ('CobaltDrake 4-60F', 'Balance', null, null, null, null, 'BX-34', null, 'Balance'),
  ('BlackShell 4-60D', 'Defense', null, null, null, null, 'BX-35', null, 'Defense'),
  ('Random Booster Vol. 4', 'Balance', null, null, null, null, 'BX-36', null, 'Various'),
  ('DranBuster 1-60A', 'Attack', null, null, null, null, 'UX-01', null, 'Attack'),
  ('WizWand 5-70DB', 'Stamina', null, null, null, null, 'UX-02', null, 'Stamina'),
  ('WizardRod 5-70DB', 'Stamina', null, null, null, null, 'UX-03', null, 'Stamina'),
  ('Rudra 9-60GE', 'Balance', null, null, null, null, 'UX-04', null, 'Balance'),
  ('PhoenixWing 9-60GF', 'Attack', null, null, null, null, 'UX-05', null, 'Attack'),
  ('2-60C', 'Balance', null, null, null, null, 'UX-06', null, '---'),
  ('PhoenixRudder 4-70LF', 'Balance', null, null, null, null, 'UX-07', null, 'Balance'),
  ('DranBuster 5-80MN', 'Attack', null, null, null, null, 'UX-08', null, 'Attack'),
  ('BlackShell 7-70WB', 'Defense', null, null, null, null, 'UX-09', null, 'Defense'),
  ('HellsReaper T4-70K', 'Attack', null, null, null, null, 'CX-05', null, 'Attack'),
  ('RhinoReaper C4-55D', 'Defense', null, null, null, null, 'CX-05', null, 'Defense'),
  ('HellsArc T3-85O', 'Balance', null, null, null, null, 'CX-05', null, 'Balance'),
  ('LeonCrest 9-80K', 'Defense', null, null, null, null, 'CX-05', null, 'Defense'),
  ('PhoenixRudder 4-70LF (CX-05)', 'Balance', null, null, null, null, 'CX-05', null, 'Balance'),
  ('WhaleWave 7-60KC', 'Stamina', null, null, null, null, 'CX-05', null, 'Stamina'),
  ('Sword Dran 3-60F', 'Attack', null, null, null, null, null, 'Wave 1', 'Attack'),
  ('Helm Knight 3-80N', 'Defense', null, null, null, null, null, 'Wave 1', 'Defense'),
  ('Arrow Wizard 4-80B', 'Stamina', null, null, null, null, null, 'Wave 1', 'Stamina'),
  ('Scythe Incendio 4-60T', 'Balance', null, null, null, null, null, 'Wave 1', 'Balance'),
  ('Steel Samurai 4-80T', 'Balance', null, null, null, null, null, 'Wave 1', 'Balance'),
  ('Horn Rhino 3-80S', 'Defense', null, null, null, null, null, 'Wave 1', 'Defense'),
  ('Keel Shark 3-60LF', 'Attack', null, null, null, null, null, 'Wave 1', 'Attack'),
  ('Talon Ptera 3-80B', 'Stamina', null, null, null, null, null, 'Wave 1', 'Stamina'),
  ('Knife Shinobi 4-80HN', 'Defense', null, null, null, null, null, 'Wave 1', 'Defense'),
  ('Chain Incendio 5-60HT', 'Balance', null, null, null, null, null, 'Wave 1', 'Balance'),
  ('Tail Viper 5-80O', 'Stamina', null, null, null, null, null, 'Wave 1', 'Stamina'),
  ('Soar Phoenix 9-60GF', 'Attack', null, null, null, null, null, 'Wave 1', 'Attack'),
  ('Dranzer Spiral 3-80T', 'Balance', null, null, null, null, null, 'Wave 1', 'Balance'),
  ('Lance Knight 4-80HN', 'Defense', null, null, null, null, null, 'Wave 2', 'Defense'),
  ('Claw Leon 5-60P', 'Balance', null, null, null, null, null, 'Wave 2', 'Balance'),
  ('Sting Unicorn 5-60', 'Balance', null, null, null, null, null, 'Wave 2', 'Balance'),
  ('Roar Tyranno 9-60GF', 'Attack', null, null, null, null, null, 'Wave 2', 'Attack'),
  ('Scythe Incendio 3-80B', 'Balance', null, null, null, null, null, 'Wave 2', 'Balance'),
  ('Savage Bear 3-60S', 'Defense', null, null, null, null, null, 'Wave 2', 'Defense'),
  ('Yell Kong 3-60GB', 'Stamina', null, null, null, null, null, 'Wave 2', 'Stamina'),
  ('Bite Croc 3-60LF', 'Attack', null, null, null, null, null, 'Wave 2', 'Attack'),
  ('Gale Wyvern 5-80GB', 'Stamina', null, null, null, null, null, 'Wave 2', 'Stamina'),
  ('Buster Dran UX', 'Attack', null, null, null, null, null, 'Wave 3', 'Attack'),
  ('Wand Wizard UX', 'Stamina', null, null, null, null, null, 'Wave 3', 'Stamina'),
  ('Cowl Sphinx 9-80GN', 'Balance', null, null, null, null, null, 'Wave 3', 'Balance'),
  ('Arrow Wizard 4-80GB', 'Stamina', null, null, null, null, null, 'Wave 3', 'Stamina'),
  ('Beat Tyranno 4-70Q', 'Attack', null, null, null, null, null, 'Wave 3', 'Attack'),
  ('Knife Shinobi 4-80HN (Wave 3)', 'Defense', null, null, null, null, null, 'Wave 3', 'Defense'),
  ('Gale Wyvern 3-60T', 'Stamina', null, null, null, null, null, 'Wave 3', 'Stamina')
on conflict (name) do nothing;

insert into public.matches (played_at, location, notes, format, winner_player_id)
values
  (now() - interval '1 day', 'Living Room Arena', 'Fast finish', 'single',
    (select id from public.players where display_name = 'Alex')),
  (now() - interval '2 days', 'Garage Stadium', 'Close match', 'single',
    (select id from public.players where display_name = 'Riley')),
  (now() - interval '3 days', 'Community Center', 'Best of friends', 'single',
    (select id from public.players where display_name = 'Sam'));

insert into public.match_participants (match_id, player_id, beyblade_id, score, is_winner)
values
  (
    (select id from public.matches order by played_at desc limit 1 offset 0),
    (select id from public.players where display_name = 'Alex'),
    (select id from public.beyblades where name = 'Valkyrie Wing'),
    3,
    true
  ),
  (
    (select id from public.matches order by played_at desc limit 1 offset 0),
    (select id from public.players where display_name = 'Jordan'),
    (select id from public.beyblades where name = 'Longinus Destroy'),
    1,
    false
  ),
  (
    (select id from public.matches order by played_at desc limit 1 offset 1),
    (select id from public.players where display_name = 'Sam'),
    (select id from public.beyblades where name = 'Spriggan Requiem'),
    2,
    false
  ),
  (
    (select id from public.matches order by played_at desc limit 1 offset 1),
    (select id from public.players where display_name = 'Riley'),
    (select id from public.beyblades where name = 'Achilles Brave'),
    3,
    true
  ),
  (
    (select id from public.matches order by played_at desc limit 1 offset 2),
    (select id from public.players where display_name = 'Sam'),
    (select id from public.beyblades where name = 'Fafnir Phoenix'),
    3,
    true
  ),
  (
    (select id from public.matches order by played_at desc limit 1 offset 2),
    (select id from public.players where display_name = 'Jordan'),
    (select id from public.beyblades where name = 'Pegasus Storm'),
    2,
    false
  );

insert into public.match_events (match_id, event_type, count)
values
  ((select id from public.matches order by played_at desc limit 1 offset 0), 'burst', 1),
  ((select id from public.matches order by played_at desc limit 1 offset 1), 'knockout', 2),
  ((select id from public.matches order by played_at desc limit 1 offset 2), 'spin_finish', 1);

insert into public.player_beyblades (player_id, beyblade_id, attack, defense, stamina)
values
  (
    (select id from public.players where display_name = 'Alex'),
    (select id from public.beyblades where name = 'DranSword 3-60F'),
    null,
    null,
    null
  ),
  (
    (select id from public.players where display_name = 'Alex'),
    (select id from public.beyblades where name = 'WizardArrow 4-80B'),
    null,
    null,
    null
  ),
  (
    (select id from public.players where display_name = 'Jordan'),
    (select id from public.beyblades where name = 'KnightShield 3-80N'),
    null,
    null,
    null
  ),
  (
    (select id from public.players where display_name = 'Sam'),
    (select id from public.beyblades where name = 'PhoenixWing 9-60GF'),
    null,
    null,
    null
  )
on conflict (player_id, beyblade_id) do nothing;
