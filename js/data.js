/* ==========================================================================
   VIC MUSICAL STORE — data.js
   Product catalogue + site configuration. All prices in Nigerian Naira (₦).
   img = key into VM.IMGS  ("" or missing -> generated monogram cover)
   ========================================================================== */
(function () {
  'use strict';
  var VM = (window.VM = window.VM || {});

  /* ---------- Music Vibe categories ---------- */
  VM.VIBES = [
    { key: 'premium', name: 'PREMIUM', ic: 'crown', title: 'Premium', tagline: 'Luxury Sound. Premium Experience.',
      desc: 'Hand-selected flagship instruments, high-end audio and studio-grade gear for those who accept nothing less than the very best.',
      stats: '120+ luxury picks' },
    { key: 'rock', name: 'ROCK & ROLL', ic: 'rock', title: 'Rock & Roll', tagline: 'Turn It Up. Feel The Energy.',
      desc: 'Electric guitars, bass machines, roaring amps, full drum kits and everything loud. Built to be played hard and heard far.',
      stats: '150+ loud essentials' },
    { key: 'savage', name: 'SAVAGE', ic: 'flame', title: 'Savage', tagline: 'Power Without Limits.',
      desc: 'Serious bass. Serious volume. DJ rigs, subwoofers, PA systems and electronic weapons engineered to shake the room.',
      stats: '90+ heavy hitters' },
    { key: 'creative', name: 'CREATIVE', ic: 'palette', title: 'Creative', tagline: 'Create Something Different.',
      desc: 'Synthesizers, MIDI controllers, production tools and colourful instruments for producers, beatmakers and sonic explorers.',
      stats: '130+ studio toys' },
    { key: 'professional', name: 'PROFESSIONAL', ic: 'sliders', title: 'Professional', tagline: 'Built For Serious Sound.',
      desc: 'Studio microphones, interfaces, monitors and mixing consoles for recording studios, broadcasters and working engineers.',
      stats: '110+ pro tools' },
    { key: 'energetic', name: 'ENERGETIC', ic: 'bolt', title: 'Energetic', tagline: 'Feel Every Beat.',
      desc: 'Portable speakers, party sound, wireless headphones and fun instruments — made for movement, parties and everyday music.',
      stats: '160+ party starters' }
  ];
  VM.VIBE_NAMES = { premium: 'Premium', rock: 'Rock & Roll', savage: 'Savage', creative: 'Creative', professional: 'Professional', energetic: 'Energetic' };

  /* ---------- Shop by instrument ---------- */
  VM.TYPES = [
    { key: 'guitars', name: 'Guitars', ic: 'guitar', blurb: 'Acoustic, electric, bass, classical & mini guitars', subs: ['Acoustic', 'Electric', 'Bass', 'Classical', 'Amps & Pedals'] },
    { key: 'drums', name: 'Drums & Percussion', ic: 'drum', blurb: 'Complete kits, electronic drums, snares, cymbals & percussion', subs: ['Drum Kits', 'Electronic Drums', 'Snares & Cymbals', 'Percussion'] },
    { key: 'keyboards', name: 'Keyboards & Pianos', ic: 'piano', blurb: 'Digital pianos, synths, MIDI keyboards & stage keys', subs: ['Digital Pianos', 'Synthesizers', 'MIDI Keyboards', 'Stage Keyboards'] },
    { key: 'microphones', name: 'Microphones', ic: 'mic', blurb: 'Studio, condenser, dynamic, wireless & podcast mics', subs: ['Studio', 'Condenser', 'Dynamic', 'Wireless', 'Podcast'] },
    { key: 'speakers', name: 'Speakers & Sound', ic: 'speaker', blurb: 'Bluetooth, party, PA, studio monitors & subwoofers', subs: ['Portable', 'Party', 'PA', 'Studio Monitors', 'Subwoofers'] },
    { key: 'headphones', name: 'Headphones', ic: 'headphones', blurb: 'Studio, wireless, DJ & everyday headphones', subs: ['Studio', 'Wireless', 'DJ', 'Everyday'] },
    { key: 'studio', name: 'Studio Equipment', ic: 'sliders', blurb: 'Interfaces, mixers, controllers & recording gear', subs: ['Audio Interfaces', 'Mixing Consoles', 'Controllers', 'Recording'] },
    { key: 'accessories', name: 'Accessories', ic: 'plug', blurb: 'Strings, cables, stands, sticks, cases & more', subs: ['Strings & Picks', 'Cables', 'Stands', 'Cases & Bags'] }
  ];

  /* ---------- Image pools (Wikimedia Commons, thumbnail URLs) ----------
     Keys are referenced by products. Any key with "" falls back to a
     generated branded cover. */
  var U = 'https://upload.wikimedia.org/wikipedia/commons/';
  var T = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
  /* NOTE: thumbnail widths below 960px are not served reliably, so every scaled
     thumbnail uses the 960px variant; smaller originals are referenced directly. */
  VM.IMGS = {
    /* acoustics */
    ag1: T + '4/44/Acoustic_Guitar_2.jpg/960px-Acoustic_Guitar_2.jpg',
    ag2: T + 'd/da/Acoustic_guitars_in_store_20180625.jpg/960px-Acoustic_guitars_in_store_20180625.jpg',
    ag3: T + '2/29/Aria_acoustic_guitar_type_aw_75_rsb_complete.jpg/960px-Aria_acoustic_guitar_type_aw_75_rsb_complete.jpg',
    ag4: T + '8/86/Luna_Guitar_three-quarter_size_teal_Acoustic_Guitar.jpg/960px-Luna_Guitar_three-quarter_size_teal_Acoustic_Guitar.jpg',
    ag5: U + '6/61/Acoustic_Guitar_with_Seashell_Inlay.jpg',
    /* electrics */
    eg1: T + '4/4c/0_Rockinger_electric_guitar_1980s_vintage.jpg/960px-0_Rockinger_electric_guitar_1980s_vintage.jpg',
    eg2: T + '0/04/Isonez_Stratocaster_Type_electric_guitar_body.jpg/960px-Isonez_Stratocaster_Type_electric_guitar_body.jpg',
    eg3: T + '4/4e/Guitarra_el%C3%A9ctrica.JPG/960px-Guitarra_el%C3%A9ctrica.JPG',
    eg4: U + '3/38/E-guitar-body.jpg',
    eg5: U + '1/18/Electric_guitar_hanger.jpg',
    /* bass */
    bs1: T + 'e/e1/Acoustic_bass_guitar_1.jpg/960px-Acoustic_bass_guitar_1.jpg',
    bs2: T + 'e/e1/Bass_Guitar_body.jpg/960px-Bass_Guitar_body.jpg',
    bs3: T + '9/95/Cort_Artisan_Bass_guitar_and_amplifier.jpg/960px-Cort_Artisan_Bass_guitar_and_amplifier.jpg',
    bs4: T + 'a/a3/Body_of_Yamaha_bass_guitar_RBX_200.jpg/960px-Body_of_Yamaha_bass_guitar_RBX_200.jpg',
    bs5: T + '4/4c/Body_of_Sandberg_Electra_Bass_Guitar.jpg/960px-Body_of_Sandberg_Electra_Bass_Guitar.jpg',
    /* acoustic drums */
    dk1: T + '1/19/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_02.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_02.jpg',
    dk2: T + '9/9f/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_01.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_01.jpg',
    dk3: T + '3/37/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_03.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_03.jpg',
    dk4: T + '4/49/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_04.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_04.jpg',
    dk5: T + 'd/d4/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_05.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_05.jpg',
    dk6: T + 'b/b1/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_06.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_06.jpg',
    dk7: T + 'a/a7/A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_08.jpg/960px-A_drum_kit_made_by_Mapex_Drums_-_Cacon_Photos-_Copyleft_-_Creative_Commons_08.jpg',
    dk8: T + 'd/df/2006-07-06_drum_set.jpg/960px-2006-07-06_drum_set.jpg',
    dk9: U + 'c/c0/Basic_drumset.jpg',
    /* electronic drums */
    ed1: T + '2/28/Electronic_drum_kit.jpg/960px-Electronic_drum_kit.jpg',
    ed2: U + 'b/b1/Electronic_drums_alesis.jpg',
    ed3: T + '0/0d/Digital_Drum_%284715894559%29.jpg/960px-Digital_Drum_%284715894559%29.jpg',
    ed4: T + '4/47/Electronic_drum.jpg/960px-Electronic_drum.jpg',
    ed5: U + '3/33/Yamaha_DD-65_Digital_Drum_Kit.jpg',
    /* keyboards & pianos */
    kp1: U + 'd/dc/Yamaha_P-150_20050712.jpg',
    kp2: T + '6/6e/Digital_piano_Yamaha_Clavinova.jpg/960px-Digital_piano_Yamaha_Clavinova.jpg',
    kp3: T + '4/49/Digital_piano.jpg/960px-Digital_piano.jpg',
    kp4: T + '6/6b/Technics_digital_piano_SX-PR902..jpg/960px-Technics_digital_piano_SX-PR902..jpg',
    kp5: T + 'c/c5/Technics_SX-PV10_pcm_digital_piano.jpg/960px-Technics_SX-PV10_pcm_digital_piano.jpg',
    kp6: U + '8/8c/Yamaha_YPG-625.jpg',
    kp7: U + 'd/dc/Yamaha_P-150_20050712.jpg',
    /* synths */
    sy1: U + 'e/e4/Micromoog.jpg',
    sy2: T + 'd/d2/Electronic_Dream_Plant_Wasp_Synthesizer.jpg/960px-Electronic_Dream_Plant_Wasp_Synthesizer.jpg',
    sy3: U + '1/1d/Thomas_2001_organ_-_Band_Master_Polyphonic_Synthesizer_%281976%29.jpg',
    sy4: U + '0/0b/ARP_2500_modular_synthesizer_-_Ikebe_Gakki_Shibuya.jpg',
    sy5: U + 'e/e4/Micromoog.jpg',
    /* microphones */
    mc1: T + '0/04/Studio_microphone_with_pop_shield.jpg/960px-Studio_microphone_with_pop_shield.jpg',
    mc2: T + '1/17/Ea_f20_microphone.jpg/960px-Ea_f20_microphone.jpg',
    mc3: T + '7/77/XLR-microphone.jpg/960px-XLR-microphone.jpg',
    mc4: T + '2/2e/Blue_Snowflake_USB_microphone.jpg/960px-Blue_Snowflake_USB_microphone.jpg',
    mc5: T + 'a/a6/Behringer_C-2_Condenser_Microphone_matched_stereo_pair.jpg/960px-Behringer_C-2_Condenser_Microphone_matched_stereo_pair.jpg',
    mc6: T + '0/0a/AKG_C214_Condenser_microphone.jpg/960px-AKG_C214_Condenser_microphone.jpg',
    mc7: T + '1/1c/Studio_microphone_rack%2C_Avex_Honolulu_Studios.jpg/960px-Studio_microphone_rack%2C_Avex_Honolulu_Studios.jpg',
    /* headphones & dj */
    hp1: T + '8/83/Pioneer_HDJ-1000.jpg/960px-Pioneer_HDJ-1000.jpg',
    hp2: U + '9/95/Dj_Doe_headphones.jpg',
    /* mixers & interfaces */
    mx1: U + '5/56/AudioMixer.jpg',
    mx2: T + 'f/f7/Mixing_console.jpg/960px-Mixing_console.jpg',
    mx3: T + '7/79/Yamaha_M7CL_digital_live-sound_mixing_console_-_left_half_angled.jpg/960px-Yamaha_M7CL_digital_live-sound_mixing_console_-_left_half_angled.jpg',
    mx4: T + 'b/be/Audio_mixer_wide_shot.jpg/960px-Audio_mixer_wide_shot.jpg',
    mx5: T + 'f/f3/Audio_mixer_close_up.jpg/960px-Audio_mixer_close_up.jpg',
    mx6: T + 'f/fd/Mixing_and_mastering.jpg/960px-Mixing_and_mastering.jpg',
    /* monitors / speakers */
    sp1: U + '5/53/Yamaha_NS-10M_Studio_%40_Supernatural.jpg',
    sp2: T + '0/0f/Quested_HM412_main_monitor%2C_Studio_9000%2C_PatchWerk_Recording_Studios%2C_2007.jpg/960px-Quested_HM412_main_monitor%2C_Studio_9000%2C_PatchWerk_Recording_Studios%2C_2007.jpg',
    sp3: T + '5/51/Marshall_%26_Monitor_speaker_on_the_tracking_room%2C_Metway_Studios.jpg/960px-Marshall_%26_Monitor_speaker_on_the_tracking_room%2C_Metway_Studios.jpg',
    sp4: T + '0/08/2017_03_31_Dolby_Atmos_Studio_TVN_Group.jpg/960px-2017_03_31_Dolby_Atmos_Studio_TVN_Group.jpg',
    /* amplifiers */
    am1: T + '3/32/Kustom_guitar_amplifier_family.jpg/960px-Kustom_guitar_amplifier_family.jpg',
    am2: U + '1/1d/MarkIV-2.jpg',
    am3: T + '3/35/Magnatone_Monster_amp_cabinet_%281968%29%2C_Hollywood_Vintage_Guitars.jpg/960px-Magnatone_Monster_amp_cabinet_%281968%29%2C_Hollywood_Vintage_Guitars.jpg',
    am4: T + 'c/ce/FBT_electronica_Super_Guitar_125_guitar_amplifier_%282014-10-01_by_GigNroll.com%29.jpg/960px-FBT_electronica_Super_Guitar_125_guitar_amplifier_%282014-10-01_by_GigNroll.com%29.jpg',
    am5: T + 'c/c1/Marathon_mini_guitar_amplifier_DTA-1.jpg/960px-Marathon_mini_guitar_amplifier_DTA-1.jpg',
    am6: T + 'b/b4/Bogner_Shiva_Amp_by_MusicTales_01.jpg/960px-Bogner_Shiva_Amp_by_MusicTales_01.jpg',
    /* scenes / banners */
    scn_pro: 'https://ai-public.mastergo.com/ai/img_res/e27c6d89054668ee8a7a074ec1b21b3b.jpg',
    scn_creative: 'https://cdn.wallpapersafari.com/89/11/iXl2vLq.jpg',
    scn_rock: '',
    scn_edm: ''
  };

  /* ---------- Products ---------- */
  /* t:type v:vibe p:price w:was r:rating rv:reviews s:stock(in|low|out) tg:tags img:pool key */
  VM.PRODUCTS = [
    /* ===== GUITARS ===== */
    { id: 'g01', n: 'Aurora AC-40 Classic Acoustic Guitar', b: 'Aurora', t: 'guitars', v: 'creative', p: 168000, w: 215000, r: 4.7, rv: 312, s: 'in', tg: ['best'], img: 'ag3' },
    { id: 'g02', n: 'Cordova D-28 Pro Series Dreadnought', b: 'Cordova', t: 'guitars', v: 'creative', p: 389000, w: 465000, r: 4.9, rv: 128, s: 'in', tg: ['featured'], img: 'ag1' },
    { id: 'g03', n: 'Strumline S-100 Beginner Acoustic Guitar', b: 'Strumline', t: 'guitars', v: 'energetic', p: 95000, w: 125000, r: 4.5, rv: 486, s: 'in', tg: ['best'], img: 'ag5' },
    { id: 'g04', n: 'Aurora XC-EQ Electro-Acoustic Guitar', b: 'Aurora', t: 'guitars', v: 'creative', p: 245000, r: 4.6, rv: 97, s: 'in', tg: ['new'], img: 'ag2' },
    { id: 'g05', n: 'SonicEdge Phantom-6 Electric Guitar', b: 'SonicEdge', t: 'guitars', v: 'rock', p: 320000, w: 385000, r: 4.8, rv: 234, s: 'in', tg: ['hot'], img: 'eg2' },
    { id: 'g06', n: 'VoltRay VX-500 Pro Electric Guitar', b: 'VoltRay', t: 'guitars', v: 'rock', p: 465000, r: 4.9, rv: 412, s: 'in', tg: ['best', 'featured'], img: 'eg1' },
    { id: 'g07', n: 'VoltRay VX-200 Electric Guitar (Starter Pack)', b: 'VoltRay', t: 'guitars', v: 'rock', p: 215000, w: 265000, r: 4.5, rv: 389, s: 'in', tg: ['best'], img: 'eg4' },
    { id: 'g08', n: 'SonicEdge Venom-7 Seven String Metal Guitar', b: 'SonicEdge', t: 'guitars', v: 'rock', p: 520000, r: 4.7, rv: 156, s: 'in', tg: ['new', 'hot'], img: 'eg3' },
    { id: 'g09', n: 'Aurora Elite E-9 Premium Electric Guitar', b: 'Aurora', t: 'guitars', v: 'premium', p: 1450000, w: 1720000, r: 4.9, rv: 87, s: 'low', tg: ['featured'], img: 'eg1' },
    { id: 'g10', n: 'BassCore Thunder-4 Bass Guitar', b: 'BassCore', t: 'guitars', v: 'rock', p: 340000, w: 410000, r: 4.6, rv: 203, s: 'in', tg: ['best'], img: 'bs3' },
    { id: 'g11', n: 'BassCore Thunder Elite 5-String Bass', b: 'BassCore', t: 'guitars', v: 'premium', p: 980000, r: 4.9, rv: 74, s: 'in', tg: ['featured'], img: '' },
    { id: 'g12', n: 'SonicEdge Psycho Bass-4 Stage Bass', b: 'SonicEdge', t: 'guitars', v: 'rock', p: 290000, w: 350000, r: 4.4, rv: 88, s: 'in', tg: ['hot'], img: 'bs1' },
    { id: 'g13', n: 'Cordova C-30 Classical Guitar (Nylon)', b: 'Cordova', t: 'guitars', v: 'creative', p: 132000, r: 4.6, rv: 210, s: 'in', tg: [], img: 'ag3' },
    { id: 'g14', n: 'Strumline Mini 3/4 Travel Guitar', b: 'Strumline', t: 'guitars', v: 'energetic', p: 64000, w: 82000, r: 4.4, rv: 150, s: 'in', tg: [], img: 'ag4' },
    { id: 'g15', n: 'Ashwood Soloist Parlor Acoustic', b: 'Ashwood', t: 'guitars', v: 'premium', p: 890000, r: 4.8, rv: 41, s: 'low', tg: ['featured'], img: 'ag1' },
    { id: 'g16', n: 'Cordova CE-250 Cutaway Acoustic-Electric', b: 'Cordova', t: 'guitars', v: 'energetic', p: 210000, w: 260000, r: 4.6, rv: 174, s: 'in', tg: ['new'], img: 'ag2' },
    { id: 'g17', n: 'VoltRay Overdrive-50 Guitar Combo Amp', b: 'VoltRay', t: 'guitars', v: 'rock', p: 285000, w: 340000, r: 4.7, rv: 168, s: 'in', tg: ['best', 'hot'], img: 'am4' },
    { id: 'g18', n: 'SonicEdge Crush-100 Amp Stack', b: 'SonicEdge', t: 'guitars', v: 'rock', p: 890000, w: 1050000, r: 4.8, rv: 96, s: 'in', tg: ['flash'], img: 'am1' },
    { id: 'g19', n: 'VoltRay Drive-25 Practice Amplifier', b: 'VoltRay', t: 'guitars', v: 'rock', p: 118000, r: 4.5, rv: 310, s: 'in', tg: ['best'], img: 'am6' },
    { id: 'g20', n: 'VoltRay Stage King Hollow-Body Guitar', b: 'VoltRay', t: 'guitars', v: 'premium', p: 620000, r: 4.7, rv: 88, s: 'in', tg: [], img: 'eg3' },
    { id: 'g21', n: 'SonicEdge FuzzLord Distortion Pedal', b: 'SonicEdge', t: 'guitars', v: 'rock', p: 58000, w: 72000, r: 4.6, rv: 240, s: 'in', tg: ['hot'], img: '' },
    { id: 'g22', n: 'VoltRay EchoVerse Delay Pedal', b: 'VoltRay', t: 'guitars', v: 'creative', p: 76000, r: 4.7, rv: 118, s: 'in', tg: ['new'], img: '' },
    { id: 'g23', n: 'Strumline 12-String Acoustic Guitar', b: 'Strumline', t: 'guitars', v: 'creative', p: 295000, w: 345000, r: 4.6, rv: 92, s: 'in', tg: [], img: 'ag3' },

    /* ===== DRUMS ===== */
    { id: 'd01', n: 'PulseBeat Studio-5 Complete Drum Set', b: 'PulseBeat', t: 'drums', v: 'rock', p: 1250000, w: 1480000, r: 4.8, rv: 214, s: 'in', tg: ['best', 'hot'], img: 'dk2' },
    { id: 'd02', n: 'RhythmPro XR-5 Beginner Drum Set', b: 'RhythmPro', t: 'drums', v: 'rock', p: 620000, w: 745000, r: 4.6, rv: 380, s: 'in', tg: ['best'], img: 'dk5' },
    { id: 'd03', n: 'PulseBeat Pro-7 Maple Shell Drum Kit', b: 'PulseBeat', t: 'drums', v: 'premium', p: 2150000, r: 4.9, rv: 97, s: 'in', tg: ['featured'], img: 'dk1' },
    { id: 'd04', n: 'DrumForce E-DRUM-10 Electronic Kit', b: 'DrumForce', t: 'drums', v: 'creative', p: 1120000, w: 1290000, r: 4.7, rv: 122, s: 'in', tg: ['new'], img: 'ed1' },
    { id: 'd05', n: 'DrumForce E-DRUM Mini Compact Kit', b: 'DrumForce', t: 'drums', v: 'energetic', p: 480000, r: 4.4, rv: 96, s: 'in', tg: [], img: 'ed5' },
    { id: 'd06', n: 'PulseBeat Snare Drum 14"x6.5" Steel', b: 'PulseBeat', t: 'drums', v: 'rock', p: 185000, w: 220000, r: 4.7, rv: 130, s: 'in', tg: [], img: 'dk9' },
    { id: 'd07', n: 'RhythmPro Stage Cymbal Pack (14/16/20")', b: 'RhythmPro', t: 'drums', v: 'rock', p: 340000, w: 400000, r: 4.6, rv: 88, s: 'in', tg: ['hot'], img: '' },
    { id: 'd08', n: 'PulseBeat Hi-Hat Cymbals 14" Pair', b: 'PulseBeat', t: 'drums', v: 'rock', p: 145000, r: 4.5, rv: 64, s: 'in', tg: [], img: '' },
    { id: 'd09', n: 'DrumForce Power Double Bass Pedal', b: 'DrumForce', t: 'drums', v: 'rock', p: 160000, r: 4.8, rv: 210, s: 'in', tg: ['best'], img: '' },
    { id: 'd10', n: 'PulseBeat Cajon Box Drum', b: 'PulseBeat', t: 'drums', v: 'energetic', p: 85000, r: 4.5, rv: 190, s: 'in', tg: [], img: '' },
    { id: 'd11', n: 'RhythmPro Bongo Drum Set', b: 'RhythmPro', t: 'drums', v: 'energetic', p: 68000, w: 84000, r: 4.4, rv: 120, s: 'in', tg: [], img: '' },
    { id: 'd12', n: 'DrumForce Fusion-5 Hybrid Drum Kit', b: 'DrumForce', t: 'drums', v: 'creative', p: 1500000, w: 1750000, r: 4.8, rv: 76, s: 'in', tg: ['new', 'flash'], img: 'ed3' },
    { id: 'd13', n: 'PulseBeat Studio-7 Fusion Drum Set', b: 'PulseBeat', t: 'drums', v: 'premium', p: 2600000, w: 2900000, r: 4.9, rv: 58, s: 'low', tg: ['featured'], img: 'dk3' },
    { id: 'd14', n: 'DrumForce E-DRUM Pro Mesh Kit', b: 'DrumForce', t: 'drums', v: 'premium', p: 1890000, r: 4.8, rv: 83, s: 'in', tg: [], img: 'ed2' },

    /* ===== KEYBOARDS & PIANOS ===== */
    { id: 'k01', n: 'KeyTown K-61 Beginner Keyboard (61 Keys)', b: 'KeyTown', t: 'keyboards', v: 'energetic', p: 155000, w: 185000, r: 4.5, rv: 410, s: 'in', tg: ['best'], img: 'kp6' },
    { id: 'k02', n: 'IvoryKeys DP-88 Digital Piano', b: 'IvoryKeys', t: 'keyboards', v: 'premium', p: 890000, w: 1050000, r: 4.8, rv: 176, s: 'in', tg: ['best', 'featured'], img: 'kp2' },
    { id: 'k03', n: 'IvoryKeys DP-160 Grand Touch Digital Piano', b: 'IvoryKeys', t: 'keyboards', v: 'premium', p: 2650000, r: 4.9, rv: 68, s: 'in', tg: ['featured'], img: 'kp3' },
    { id: 'k04', n: 'Synthra Wave-2 Analog Synth', b: 'Synthra', t: 'keyboards', v: 'creative', p: 540000, r: 4.8, rv: 145, s: 'in', tg: ['new', 'featured'], img: 'sy2' },
    { id: 'k05', n: 'Synthra Keys-8 Stage Keyboard', b: 'Synthra', t: 'keyboards', v: 'professional', p: 720000, w: 830000, r: 4.7, rv: 92, s: 'in', tg: [], img: 'kp1' },
    { id: 'k06', n: 'LoopForge Mini-25 MIDI Keyboard', b: 'LoopForge', t: 'keyboards', v: 'creative', p: 118000, r: 4.6, rv: 350, s: 'in', tg: ['best'], img: '' },
    { id: 'k07', n: 'LoopForge Studio-49 MIDI Controller', b: 'LoopForge', t: 'keyboards', v: 'creative', p: 285000, w: 330000, r: 4.8, rv: 130, s: 'in', tg: ['hot'], img: '' },
    { id: 'k08', n: 'KeyTown Arranger-500 Workstation', b: 'KeyTown', t: 'keyboards', v: 'professional', p: 460000, w: 540000, r: 4.6, rv: 140, s: 'in', tg: ['flash'], img: 'kp4' },
    { id: 'k09', n: 'IvoryKeys CP-60 Portable Piano', b: 'IvoryKeys', t: 'keyboards', v: 'professional', p: 385000, r: 4.7, rv: 205, s: 'in', tg: ['best'], img: 'kp1' },
    { id: 'k10', n: 'Synthra SubSynth-2 Bass Synth', b: 'Synthra', t: 'keyboards', v: 'savage', p: 420000, r: 4.6, rv: 66, s: 'in', tg: ['new'], img: 'sy1' },
    { id: 'k11', n: 'KeyTown Mini Keys-37 Portable Keyboard', b: 'KeyTown', t: 'keyboards', v: 'energetic', p: 68000, r: 4.4, rv: 280, s: 'in', tg: [], img: 'kp1' },
    { id: 'k12', n: 'Synthra Polaris-8 Performance Synth', b: 'Synthra', t: 'keyboards', v: 'premium', p: 1150000, w: 1350000, r: 4.9, rv: 77, s: 'in', tg: ['featured'], img: 'sy3' },
    { id: 'k13', n: 'Synthra Pulse-808 Rhythm Machine', b: 'Synthra', t: 'keyboards', v: 'savage', p: 285000, w: 340000, r: 4.6, rv: 89, s: 'in', tg: ['hot'], img: 'sy4' },

    /* ===== MICROPHONES ===== */
    { id: 'm01', n: 'VoiceCraft VC-1 Large Diaphragm Condenser Mic', b: 'VoiceCraft', t: 'microphones', v: 'professional', p: 185000, w: 235000, r: 4.8, rv: 320, s: 'in', tg: ['best'], img: 'mc1' },
    { id: 'm02', n: 'VoiceCraft C-214 Pro Studio Condenser', b: 'VoiceCraft', t: 'microphones', v: 'premium', p: 680000, r: 4.9, rv: 210, s: 'in', tg: ['featured'], img: 'mc6' },
    { id: 'm03', n: 'MicForce M-58 Dynamic Vocal Microphone', b: 'MicForce', t: 'microphones', v: 'rock', p: 78000, w: 95000, r: 4.7, rv: 540, s: 'in', tg: ['best', 'hot'], img: 'mc3' },
    { id: 'm04', n: 'MicForce Free-500 Wireless Handheld System', b: 'MicForce', t: 'microphones', v: 'rock', p: 310000, w: 380000, r: 4.6, rv: 130, s: 'in', tg: ['flash'], img: 'mc3' },
    { id: 'm05', n: 'PodWave P-1 USB Podcast Microphone', b: 'PodWave', t: 'microphones', v: 'professional', p: 145000, r: 4.7, rv: 290, s: 'in', tg: ['new', 'best'], img: 'mc4' },
    { id: 'm06', n: 'PodWave Duo Streaming Microphone', b: 'PodWave', t: 'microphones', v: 'creative', p: 235000, w: 280000, r: 4.8, rv: 96, s: 'in', tg: ['new'], img: 'mc5' },
    { id: 'm07', n: 'VoiceCraft Lav Pro Clip-On Lavalier Mic', b: 'VoiceCraft', t: 'microphones', v: 'professional', p: 42000, r: 4.4, rv: 84, s: 'in', tg: [], img: '' },
    { id: 'm08', n: 'MicForce B-1 Broadcast Condenser Mic', b: 'MicForce', t: 'microphones', v: 'premium', p: 350000, w: 410000, r: 4.7, rv: 71, s: 'in', tg: [], img: 'mc2' },
    { id: 'm09', n: 'MicForce Free-Lav Wireless Lavalier Set', b: 'MicForce', t: 'microphones', v: 'energetic', p: 195000, w: 240000, r: 4.5, rv: 74, s: 'in', tg: [], img: '' },
    { id: 'm10', n: 'VoiceCraft VC-2 Matched Condenser Pair', b: 'VoiceCraft', t: 'microphones', v: 'professional', p: 420000, r: 4.8, rv: 59, s: 'in', tg: ['new'], img: 'mc5' },
    { id: 'm11', n: 'MicForce SingDuo Wireless Karaoke Set', b: 'MicForce', t: 'microphones', v: 'energetic', p: 245000, w: 295000, r: 4.6, rv: 150, s: 'in', tg: ['flash'], img: '' },

    /* ===== SPEAKERS ===== */
    { id: 's01', n: 'LoudHouse Go-20 Portable Bluetooth Speaker', b: 'LoudHouse', t: 'speakers', v: 'energetic', p: 45000, w: 60000, r: 4.5, rv: 620, s: 'in', tg: ['best'], img: '' },
    { id: 's02', n: 'BoomStone Party-500 Speaker With Lights', b: 'BoomStone', t: 'speakers', v: 'energetic', p: 320000, w: 420000, r: 4.6, rv: 240, s: 'in', tg: ['hot', 'flash'], img: '' },
    { id: 's03', n: 'EchoLux Boom-2 Wireless Speaker', b: 'EchoLux', t: 'speakers', v: 'energetic', p: 85000, r: 4.4, rv: 480, s: 'in', tg: ['best'], img: '' },
    { id: 's04', n: 'StageMax Line-12 Powered PA Speaker', b: 'StageMax', t: 'speakers', v: 'savage', p: 480000, w: 560000, r: 4.7, rv: 130, s: 'in', tg: ['best'], img: 'sp3' },
    { id: 's05', n: 'StageMax Bass-15 Powered Subwoofer', b: 'StageMax', t: 'speakers', v: 'savage', p: 640000, w: 780000, r: 4.8, rv: 89, s: 'in', tg: ['hot'], img: 'sp2' },
    { id: 's06', n: 'DeepBass 18" Pro Subwoofer', b: 'DeepBass', t: 'speakers', v: 'savage', p: 1150000, r: 4.9, rv: 54, s: 'in', tg: ['featured'], img: 'sp2' },
    { id: 's07', n: 'Tremor Force-2000 Full Sound System', b: 'Tremor', t: 'speakers', v: 'savage', p: 2450000, w: 2900000, r: 4.8, rv: 71, s: 'low', tg: ['flash', 'featured'], img: 'sp4' },
    { id: 's08', n: 'ReferenceLab RM-5 Studio Monitor Pair', b: 'ReferenceLab', t: 'speakers', v: 'professional', p: 520000, w: 610000, r: 4.8, rv: 148, s: 'in', tg: ['best'], img: 'sp1' },
    { id: 's09', n: 'ReferenceLab RM-8 Reference Monitors', b: 'ReferenceLab', t: 'speakers', v: 'professional', p: 780000, r: 4.9, rv: 86, s: 'in', tg: ['featured'], img: 'sp2' },
    { id: 's10', n: 'LoudHouse Tower-20 Home Sound System', b: 'LoudHouse', t: 'speakers', v: 'premium', p: 1320000, w: 1500000, r: 4.7, rv: 68, s: 'in', tg: [], img: 'sp4' },
    { id: 's11', n: 'BoomStone Mini-Go Pocket Speaker', b: 'BoomStone', t: 'speakers', v: 'energetic', p: 22000, r: 4.3, rv: 940, s: 'in', tg: ['best'], img: '' },
    { id: 's12', n: 'EchoLux Cinema-2.1 Soundbar System', b: 'EchoLux', t: 'speakers', v: 'premium', p: 560000, w: 650000, r: 4.6, rv: 112, s: 'in', tg: ['new'], img: 'sp4' },
    { id: 's13', n: 'StageMax Twin-15 Tower PA System', b: 'StageMax', t: 'speakers', v: 'savage', p: 1280000, w: 1500000, r: 4.8, rv: 67, s: 'in', tg: ['flash'], img: 'sp3' },
    { id: 's14', n: 'DeepBass Box-12 Active Bass Cabinet', b: 'DeepBass', t: 'speakers', v: 'savage', p: 380000, r: 4.6, rv: 81, s: 'in', tg: [], img: 'sp2' },

    /* ===== HEADPHONES ===== */
    { id: 'h01', n: 'AudioNest A-10 Wireless Over-Ear Headphones', b: 'AudioNest', t: 'headphones', v: 'energetic', p: 95000, w: 125000, r: 4.6, rv: 520, s: 'in', tg: ['best'], img: 'hp2' },
    { id: 'h02', n: 'DJNova Mix-1 DJ Headphones', b: 'DJNova', t: 'headphones', v: 'savage', p: 140000, r: 4.7, rv: 230, s: 'in', tg: ['best'], img: 'hp1' },
    { id: 'h03', n: 'ProEar M-50 Closed Studio Headphones', b: 'ProEar', t: 'headphones', v: 'professional', p: 180000, w: 215000, r: 4.8, rv: 640, s: 'in', tg: ['best', 'hot'], img: 'hp2' },
    { id: 'h04', n: 'AudioNest Buds ANC True Wireless', b: 'AudioNest', t: 'headphones', v: 'energetic', p: 85000, r: 4.4, rv: 310, s: 'in', tg: ['new'], img: '' },
    { id: 'h05', n: 'ProEar M-30 Open-Back Reference Phones', b: 'ProEar', t: 'headphones', v: 'professional', p: 265000, r: 4.9, rv: 160, s: 'in', tg: ['featured'], img: 'hp1' },
    { id: 'h06', n: 'DJNova Booth-2 Monitoring Headphones', b: 'DJNova', t: 'headphones', v: 'rock', p: 118000, w: 140000, r: 4.5, rv: 90, s: 'in', tg: ['hot'], img: 'hp2' },
    { id: 'h07', n: 'AudioNest KidsSafe-1 Junior Headphones', b: 'AudioNest', t: 'headphones', v: 'energetic', p: 28000, w: 35000, r: 4.5, rv: 160, s: 'in', tg: [], img: '' },
    { id: 'h08', n: 'DJNova Club-1 Monitoring Headphones', b: 'DJNova', t: 'headphones', v: 'savage', p: 150000, w: 175000, r: 4.7, rv: 140, s: 'in', tg: ['flash'], img: 'hp1' },

    /* ===== STUDIO EQUIPMENT ===== */
    { id: 'u01', n: 'TrackLab Solo-2 Audio Interface', b: 'TrackLab', t: 'studio', v: 'professional', p: 210000, w: 250000, r: 4.8, rv: 340, s: 'in', tg: ['best', 'hot'], img: 'mx4' },
    { id: 'u02', n: 'TrackLab Studio-8 Interface (8-In/8-Out)', b: 'TrackLab', t: 'studio', v: 'professional', p: 560000, r: 4.7, rv: 88, s: 'in', tg: [], img: 'mx1' },
    { id: 'u03', n: 'MixDesk 802 Analog Mixing Console', b: 'MixDesk', t: 'studio', v: 'professional', p: 320000, w: 380000, r: 4.6, rv: 175, s: 'in', tg: ['flash'], img: 'mx2' },
    { id: 'u04', n: 'MixDesk Live-16 Digital Mixing Console', b: 'MixDesk', t: 'studio', v: 'professional', p: 1850000, r: 4.8, rv: 64, s: 'in', tg: ['featured'], img: 'mx3' },
    { id: 'u05', n: 'MixDesk DJ-2 Compact DJ Mixer', b: 'MixDesk', t: 'studio', v: 'savage', p: 190000, w: 230000, r: 4.7, rv: 140, s: 'in', tg: ['hot'], img: 'mx5' },
    { id: 'u06', n: 'TrackLab BeatPad-1 MIDI Pad Controller', b: 'TrackLab', t: 'studio', v: 'creative', p: 155000, w: 185000, r: 4.7, rv: 210, s: 'in', tg: ['best'], img: 'mx1' },
    { id: 'u07', n: 'TrackLab Voice Studio Pack', b: 'TrackLab', t: 'studio', v: 'professional', p: 430000, w: 500000, r: 4.7, rv: 73, s: 'in', tg: ['new'], img: 'mx6' },
    { id: 'u08', n: 'MixDesk Podcast-2 Broadcast Console', b: 'MixDesk', t: 'studio', v: 'professional', p: 380000, r: 4.6, rv: 57, s: 'in', tg: [], img: 'mx2' },
    { id: 'u09', n: 'MixDesk Club-2 DJ Performance Mixer', b: 'MixDesk', t: 'studio', v: 'savage', p: 265000, w: 320000, r: 4.7, rv: 96, s: 'in', tg: ['hot'], img: 'mx2' },
    { id: 'u10', n: 'TrackLab GO-2 Portable Interface', b: 'TrackLab', t: 'studio', v: 'professional', p: 320000, w: 375000, r: 4.7, rv: 119, s: 'in', tg: ['new'], img: 'mx5' },

    /* ===== ACCESSORIES ===== */
    { id: 'a01', n: 'Strumline Bronze Acoustic Strings 12-53 (3-Pack)', b: 'Strumline', t: 'accessories', v: 'rock', p: 9800, r: 4.7, rv: 760, s: 'in', tg: ['best'], img: '' },
    { id: 'a02', n: 'Strumline Electric Strings 9-42 (3-Pack)', b: 'Strumline', t: 'accessories', v: 'rock', p: 10500, r: 4.6, rv: 540, s: 'in', tg: ['best'], img: '' },
    { id: 'a03', n: 'Strumline Copper Picks (12-Pack)', b: 'Strumline', t: 'accessories', v: 'rock', p: 3500, r: 4.6, rv: 980, s: 'in', tg: ['best'], img: '' },
    { id: 'a04', n: 'Strumline Dreadnought Gig Bag', b: 'Strumline', t: 'accessories', v: 'energetic', p: 28000, w: 35000, r: 4.5, rv: 230, s: 'in', tg: [], img: '' },
    { id: 'a05', n: 'Aurora Hard Case for Acoustic Guitar', b: 'Aurora', t: 'accessories', v: 'premium', p: 95000, r: 4.8, rv: 64, s: 'in', tg: [], img: '' },
    { id: 'a06', n: 'Strumline Foldable Guitar Stand', b: 'Strumline', t: 'accessories', v: 'rock', p: 15500, r: 4.6, rv: 540, s: 'in', tg: [], img: '' },
    { id: 'a07', n: 'VoltRay Pro Instrument Cable 6m', b: 'VoltRay', t: 'accessories', v: 'rock', p: 12000, r: 4.7, rv: 430, s: 'in', tg: [], img: '' },
    { id: 'a08', n: 'Cordova Trigger Capo Pro', b: 'Cordova', t: 'accessories', v: 'creative', p: 8500, r: 4.6, rv: 300, s: 'in', tg: [], img: '' },
    { id: 'a09', n: 'Stix Hickory Drumsticks 5A (2 Pairs)', b: 'Stix', t: 'accessories', v: 'rock', p: 6000, r: 4.7, rv: 1200, s: 'in', tg: ['best'], img: '' },
    { id: 'a10', n: 'Stix Rubber Practice Pad', b: 'Stix', t: 'accessories', v: 'rock', p: 19000, r: 4.5, rv: 96, s: 'in', tg: [], img: '' },
    { id: 'a11', n: 'KeyTown X-Keyboard Stand', b: 'KeyTown', t: 'accessories', v: 'energetic', p: 32000, w: 40000, r: 4.6, rv: 160, s: 'in', tg: [], img: '' },
    { id: 'a12', n: 'MicForce Boom Microphone Stand', b: 'MicForce', t: 'accessories', v: 'professional', p: 38000, w: 46000, r: 4.6, rv: 220, s: 'in', tg: [], img: '' },
    { id: 'a13', n: 'PodWave Pop Filter Shield', b: 'PodWave', t: 'accessories', v: 'professional', p: 14000, r: 4.5, rv: 180, s: 'in', tg: [], img: '' },
    { id: 'a14', n: 'TrackLab XLR Cable 3m (2-Pack)', b: 'TrackLab', t: 'accessories', v: 'professional', p: 18500, r: 4.7, rv: 250, s: 'in', tg: [], img: '' },
    { id: 'a15', n: 'LoopForge USB-C MIDI Adapter', b: 'LoopForge', t: 'accessories', v: 'creative', p: 9000, r: 4.4, rv: 140, s: 'in', tg: [], img: '' },
    { id: 'a16', n: 'Strumline Leather Guitar Strap', b: 'Strumline', t: 'accessories', v: 'rock', p: 12500, r: 4.5, rv: 190, s: 'in', tg: [], img: '' },
    { id: 'a17', n: 'KeyTown Folding Music Stand', b: 'KeyTown', t: 'accessories', v: 'energetic', p: 16000, r: 4.6, rv: 200, s: 'in', tg: [], img: '' },
    { id: 'a18', n: 'DrumForce Bass Drum Pedal', b: 'DrumForce', t: 'accessories', v: 'rock', p: 78000, w: 92000, r: 4.6, rv: 88, s: 'in', tg: ['hot'], img: '' },
    { id: 'a19', n: 'PulseBeat Drum Key & Stick Bag Combo', b: 'PulseBeat', t: 'accessories', v: 'rock', p: 22500, r: 4.7, rv: 130, s: 'in', tg: [], img: '' },
    { id: 'a20', n: 'EchoLux Multi-Charger 4-in-1', b: 'EchoLux', t: 'accessories', v: 'energetic', p: 13500, w: 17500, r: 4.4, rv: 260, s: 'in', tg: [], img: '' },
    { id: 'a21', n: 'Stix 7A Maple Drumsticks (2 Pairs)', b: 'Stix', t: 'accessories', v: 'rock', p: 7200, r: 4.6, rv: 310, s: 'in', tg: [], img: '' },
    { id: 'a22', n: 'Strumline Capo & Pick Travel Kit', b: 'Strumline', t: 'accessories', v: 'energetic', p: 11500, w: 14500, r: 4.5, rv: 170, s: 'in', tg: [], img: '' }
  ];

  /* ---------- Delivery / money ---------- */
  VM.DELIVERY_FEE = 5000;
  VM.FREE_DELIVERY_FROM = 500000;

  /* ---------- Testimonials ---------- */
  VM.TESTIMONIALS = [
    { q: 'The guitar arrived in excellent condition and sounds amazing. Setup was spot on out of the box — I barely had to tune it.', n: 'Tunde A.', c: 'Lagos', r: 5 },
    { q: 'Ordered a full drum kit on Monday, it was at my studio in Abuja by Wednesday. Packing was so careful even the cymbals survived the trip.', n: 'Chiamaka O.', c: 'Abuja', r: 5 },
    { q: 'Their microphone recommendations helped me upgrade my home studio properly without overspending. The VC-1 is a monster for the price.', n: 'Emeka N.', c: 'Port Harcourt', r: 5 },
    { q: 'Best music store experience I have had online. The category vibes are fun but the gear is serious. My PA system shakes the whole street now.', n: 'Dapo B.', c: 'Ibadan', r: 5 },
    { q: 'I am a piano teacher and I buy all my keyboards from Vic Musical Store. Honest pricing, genuine products and quick delivery every single time.', n: 'Mrs. Adeyemi', c: 'Lagos', r: 4.5 },
    { q: 'Customer service helped me choose between two synthesizers and even sent comparison videos. Got the Wave-2 — zero regrets.', n: 'Kelechi U.', c: 'Enugu', r: 5 }
  ];

  /* ---------- Review templates for product pages ---------- */
  VM.REVIEWS_POOL = [
    { n: 'David O.', c: 'Lagos', r: 5, t: 'Exceeded my expectations', b: 'Quality is top notch and it arrived well packaged. Delivery was faster than I expected and everything works perfectly.' },
    { n: 'Sarah J.', c: 'Abuja', r: 5, t: 'Fantastic value', b: 'I compared prices across several stores and Vic Musical Store had the best deal. Sounds even better than the price suggests.' },
    { n: 'Michael K.', c: 'Ibadan', r: 4, t: 'Great product', b: 'Very solid build and great sound. Took one star off only because I wish the manual was more detailed for beginners.' },
    { n: 'Amara C.', c: 'Port Harcourt', r: 5, t: 'Exactly as described', b: 'The photos and specs were accurate. It feels premium and my bandmates are impressed. Will definitely buy from here again.' },
    { n: 'Femi A.', c: 'Lagos', r: 4, t: 'Good buy overall', b: 'Works well for my needs. Delivery took a couple of days longer than expected but customer support kept me updated the whole time.' },
    { n: 'Ngozi E.', c: 'Enugu', r: 5, t: 'Highly recommended', b: 'This is my third order from Vic Musical Store and they never disappoint. Genuine products and careful packaging every time.' }
  ];

  /* ---------- Lookups ---------- */
  VM.prodById = function (id) {
    for (var i = 0; i < VM.PRODUCTS.length; i++) if (VM.PRODUCTS[i].id === id) return VM.PRODUCTS[i];
    return null;
  };
  VM.productsByVibe = function (vibe) {
    return VM.PRODUCTS.filter(function (p) { return p.v === vibe || (p.v2 && p.v2.indexOf(vibe) !== -1); });
  };
  VM.productsByType = function (type) {
    return VM.PRODUCTS.filter(function (p) { return p.t === type; });
  };
  VM.discounted = function () {
    return VM.PRODUCTS.filter(function (p) { return p.w && p.w > p.p; });
  };
  VM.discountPct = function (p) {
    if (!p.w || p.w <= p.p) return 0;
    return Math.round((1 - p.p / p.w) * 100);
  };
  VM.tagged = function (tag) {
    return VM.PRODUCTS.filter(function (p) { return p.tg && p.tg.indexOf(tag) !== -1; });
  };
  VM.brands = function (list) {
    var m = {}, out = [];
    (list || VM.PRODUCTS).forEach(function (p) { if (!m[p.b]) { m[p.b] = 1; out.push(p.b); } });
    return out.sort();
  };
})();
