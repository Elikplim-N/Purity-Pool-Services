-- Generated from prisma/seed-data.ts — do not edit by hand.
-- Safe to re-run: uses ON CONFLICT to upsert by slug.

INSERT INTO pps_categories
  (id, name, slug, description, icon, "createdAt", "updatedAt")
VALUES
  ('cat_chemicals_water_treatment', 'Chemicals & Water Treatment', 'chemicals-water-treatment', 'Chlorine, shock, algaecide, and pH balancers to keep your water clean, clear, and safe to swim in.', 'FlaskConical', now(), now()),
  ('cat_pumps_filters', 'Pumps & Filters', 'pumps-filters', 'Pool pumps, cartridge and sand filters, and replacement parts that keep your circulation system running smoothly.', 'Fan', now(), now()),
  ('cat_cleaning_equipment', 'Cleaning Equipment', 'cleaning-equipment', 'Manual and robotic vacuums, skimmers, brushes, and nets for effortless pool cleaning.', 'Sparkles', now(), now()),
  ('cat_covers_safety', 'Covers & Safety', 'covers-safety', 'Solar covers, safety covers, and reels to protect your pool and everyone around it.', 'ShieldCheck', now(), now()),
  ('cat_testing_maintenance', 'Testing & Maintenance', 'testing-maintenance', 'Test kits, strips, thermometers, and telescopic poles for everyday pool care.', 'TestTube', now(), now()),
  ('cat_toys_floats', 'Toys & Floats', 'toys-floats', 'Inflatables, floats, and pool games to make the most of your backyard oasis.', 'Waves', now(), now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  "updatedAt" = now();

INSERT INTO pps_products
  (id, name, slug, description, price, "compareAtPrice", sku, stock, featured, active, "categoryId", "createdAt", "updatedAt")
VALUES
  ('prod_3_inch_chlorine_tablets_25lb', '3-Inch Chlorine Tablets (25 lb Bucket)', '3-inch-chlorine-tablets-25lb', 'Slow-dissolving stabilized chlorine tablets for consistent sanitization all season long. Ideal for skimmers, floaters, and automatic feeders.', 89.99, 104.99, 'CHM-CHL-025', 42, true, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_pool_shock_oxidizer_12pack', 'Pool Shock Oxidizer (12 x 1 lb Bags)', 'pool-shock-oxidizer-12pack', 'Fast-acting granular shock that eliminates algae, bacteria, and chloramines for sparkling clear water.', 54.99, NULL, 'CHM-SHK-012', 60, true, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_algaecide_concentrate_1gal', 'Algaecide Concentrate 60 (1 Gallon)', 'algaecide-concentrate-1gal', 'Concentrated broad-spectrum algaecide that prevents and eliminates green, black, and mustard algae.', 38.5, NULL, 'CHM-ALG-001', 35, false, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_ph_increaser_10lb', 'pH Increaser (10 lb)', 'ph-increaser-10lb', 'Raises pH quickly and safely to keep your water balanced and comfortable for swimmers.', 24.99, NULL, 'CHM-PHI-010', 50, false, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_ph_decreaser_10lb', 'pH Decreaser (10 lb)', 'ph-decreaser-10lb', 'Lowers pH and total alkalinity to prevent scaling and cloudy water.', 24.99, NULL, 'CHM-PHD-010', 48, false, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_water_clarifier_1qt', 'Water Clarifier (1 Quart)', 'water-clarifier-1qt', 'Coagulates fine particles so your filter can catch them, turning hazy water crystal clear within 24 hours.', 19.99, NULL, 'CHM-CLR-001', 55, false, true, 'cat_chemicals_water_treatment', now(), now()),
  ('prod_1_5_hp_single_speed_pool_pump', '1.5 HP Single-Speed Pool Pump', '1-5-hp-single-speed-pool-pump', 'Durable, energy-efficient pump built for reliable circulation in above-ground and small in-ground pools.', 349, 399, 'PMP-SGL-150', 14, true, true, 'cat_pumps_filters', now(), now()),
  ('prod_2_hp_variable_speed_pool_pump', '2 HP Variable-Speed Pool Pump', '2-hp-variable-speed-pool-pump', 'Whisper-quiet variable-speed pump that cuts energy costs while giving you full control over flow rate.', 749, NULL, 'PMP-VAR-200', 8, true, true, 'cat_pumps_filters', now(), now()),
  ('prod_cartridge_filter_replacement_element', 'Cartridge Filter Replacement Element', 'cartridge-filter-replacement-element', 'High-density pleated cartridge that restores peak filtration performance in minutes.', 42.99, NULL, 'PMP-CFE-001', 70, false, true, 'cat_pumps_filters', now(), now()),
  ('prod_sand_filter_system_24_inch', 'Sand Filter System (24-inch Tank)', 'sand-filter-system-24-inch', 'Complete sand filter system with 7-way multiport valve, ideal for medium to large pools.', 529, NULL, 'PMP-SND-024', 10, false, true, 'cat_pumps_filters', now(), now()),
  ('prod_multiport_valve_repair_kit', 'Multiport Valve Repair Kit', 'multiport-valve-repair-kit', 'O-rings, gaskets, and spider gasket for a complete multiport valve rebuild.', 27.49, NULL, 'PMP-MPV-001', 33, false, true, 'cat_pumps_filters', now(), now()),
  ('prod_robotic_pool_cleaner_pro', 'Robotic Pool Cleaner Pro', 'robotic-pool-cleaner-pro', 'Smart robotic cleaner that scrubs floors, walls, and the waterline automatically, with a 60-minute cleaning cycle.', 599, 679, 'CLN-ROB-001', 12, true, true, 'cat_cleaning_equipment', now(), now()),
  ('prod_manual_suction_pool_vacuum', 'Manual Suction Pool Vacuum', 'manual-suction-pool-vacuum', 'Budget-friendly vacuum head that connects to your existing pump for effective debris removal.', 44.99, NULL, 'CLN-VAC-001', 40, false, true, 'cat_cleaning_equipment', now(), now()),
  ('prod_telescopic_pool_skimmer_net', 'Telescopic Pool Skimmer Net', 'telescopic-pool-skimmer-net', 'Fine-mesh skimmer net with a lightweight aluminum handle for daily leaf and debris removal.', 21.99, NULL, 'CLN-SKM-001', 65, false, true, 'cat_cleaning_equipment', now(), now()),
  ('prod_pool_wall_tile_brush', 'Pool Wall & Tile Brush', 'pool-wall-tile-brush', 'Nylon-bristle brush that clears algae and grime from walls, steps, and tile lines without scratching.', 16.99, NULL, 'CLN-BRS-001', 80, false, true, 'cat_cleaning_equipment', now(), now()),
  ('prod_heavy_duty_leaf_rake', 'Heavy-Duty Leaf Rake', 'heavy-duty-leaf-rake', 'Deep-bag leaf rake designed to scoop large debris quickly from the pool surface and floor.', 18.99, NULL, 'CLN-RAK-001', 45, false, true, 'cat_cleaning_equipment', now(), now()),
  ('prod_solar_pool_cover_16x32', 'Solar Pool Cover (16 x 32 ft)', 'solar-pool-cover-16x32', 'Heat-retaining solar cover that reduces evaporation and keeps your pool warmer for longer swim seasons.', 129, NULL, 'SAF-SOL-1632', 20, true, true, 'cat_covers_safety', now(), now()),
  ('prod_mesh_safety_cover_18x36', 'Mesh Safety Cover (18 x 36 ft)', 'mesh-safety-cover-18x36', 'Heavy-duty mesh safety cover rated to keep children and pets safe during the off-season.', 449, NULL, 'SAF-MSH-1836', 9, false, true, 'cat_covers_safety', now(), now()),
  ('prod_solar_cover_reel_system', 'Solar Cover Reel System', 'solar-cover-reel-system', 'Rolls your solar cover on and off in seconds, protecting it from tears and extending its lifespan.', 189, NULL, 'SAF-REL-001', 15, false, true, 'cat_covers_safety', now(), now()),
  ('prod_pool_safety_alarm', 'Pool Safety Alarm', 'pool-safety-alarm', 'Immersion alarm that alerts you the moment someone enters the pool unsupervised.', 79.99, NULL, 'SAF-ALM-001', 25, false, true, 'cat_covers_safety', now(), now()),
  ('prod_6_way_test_strips_100ct', '6-Way Test Strips (100 ct)', '6-way-test-strips-100ct', 'Quick-read strips that test free chlorine, pH, alkalinity, hardness, and more in seconds.', 15.99, NULL, 'TST-STR-100', 90, true, true, 'cat_testing_maintenance', now(), now()),
  ('prod_digital_pool_water_tester', 'Digital Pool Water Tester', 'digital-pool-water-tester', 'Handheld digital meter delivering lab-accurate chlorine and pH readings in one dip.', 64.99, NULL, 'TST-DIG-001', 22, false, true, 'cat_testing_maintenance', now(), now()),
  ('prod_floating_pool_thermometer', 'Floating Pool Thermometer', 'floating-pool-thermometer', 'Shatterproof floating thermometer with an easy-read dial for accurate water temperature.', 9.99, NULL, 'TST-THM-001', 75, false, true, 'cat_testing_maintenance', now(), now()),
  ('prod_8ft_telescopic_aluminum_pole', '8 ft Telescopic Aluminum Pole', '8ft-telescopic-aluminum-pole', 'Lightweight, corrosion-resistant pole that extends up to 16 feet and fits all standard attachments.', 34.99, NULL, 'TST-POL-008', 38, false, true, 'cat_testing_maintenance', now(), now()),
  ('prod_inflatable_lounge_float', 'Inflatable Lounge Float', 'inflatable-lounge-float', 'Oversized, puncture-resistant lounge float with a built-in cup holder for all-day comfort.', 29.99, NULL, 'TOY-LNG-001', 48, true, true, 'cat_toys_floats', now(), now()),
  ('prod_pool_volleyball_game_set', 'Pool Volleyball Game Set', 'pool-volleyball-game-set', 'Complete net, ball, and anchor set for backyard pool volleyball tournaments.', 59.99, NULL, 'TOY-VBL-001', 18, false, true, 'cat_toys_floats', now(), now()),
  ('prod_kids_ring_float_set_3pack', 'Kids Ring Float Set (3-Pack)', 'kids-ring-float-set-3pack', 'Colorful, durable ring floats sized for young swimmers, sold as a set of three.', 22.99, NULL, 'TOY-RNG-003', 55, false, true, 'cat_toys_floats', now(), now())
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  "compareAtPrice" = EXCLUDED."compareAtPrice",
  sku = EXCLUDED.sku,
  stock = EXCLUDED.stock,
  featured = EXCLUDED.featured,
  "categoryId" = EXCLUDED."categoryId",
  "updatedAt" = now();
