    window.addEventListener('DOMContentLoaded', () => {
      // Tutti i fattori sono rispetto a una unità base della categoria
      const categories = {
        // base: metri
        lunghezza: {
          // BASE
          metri: 1, km: 1000, cm: 0.01, mm: 0.001, pollici: 0.0254, piedi: 0.3048,
          iarda: 0.9144, miglio: 1609.344, miglio_nautico: 1852, fathom: 1.8288, light_year: 9.4607e15,
          // MULTIPLI/SOTTOMULTIPLI
          dam: 10, hm: 100, Gm: 1e9, Tm: 1e12, Pm: 1e15, Em: 1e18, Zm: 1e21, Ym: 1e24,
          um: 1e-6, nm: 1e-9, pm: 1e-12, fm: 1e-15, am: 1e-18, zm: 1e-21, ym: 1e-24
        },
        // base: m²
        area: {
          m2: 1, cm2: 0.0001, mm2: 0.000001, ha: 10000, km2: 1_000_000,
          piedi2: 0.092903, pollici2: 0.00064516, acri: 4046.8564224,
          // MULTIPLI/SOTTOMULTIPLI
          dam2: 100, hm2: 10000, Gm2: 1e18, Tm2: 1e24, km2: 1e6,
          cm2: 1e-4, mm2: 1e-6, um2: 1e-12, nm2: 1e-18, pm2: 1e-24
        },
        // base: kg
        massa: {
          kg: 1, g: 0.001, mg: 1e-6, ug: 1e-9, ng: 1e-12, pg: 1e-15,
          tonnellata: 1000, q: 100, quintale: 100, lb: 0.45359237, oz: 0.0283495231,
          // MULTIPLI/SOTTOMULTIPLI
          dag: 0.01, hg: 0.1, kg: 1, q: 100, t: 1000, kt: 1e6, Mt: 1e9, Gt: 1e12,
          mg: 1e-6, ug: 1e-9, ng: 1e-12, pg: 1e-15, fg: 1e-18, ag: 1e-21, zg: 1e-24
        },
        // base: m³
        volume: {
          m3: 1, dm3: 0.001, cm3: 1e-6, litri: 0.001, ml: 1e-6,
          ft3: 0.0283168, in3: 1.6387e-5, gallone: 0.00378541,
          // MULTIPLI/SOTTOMULTIPLI
          dam3: 1000, hm3: 1e6, km3: 1e9, Mm3: 1e15,
          cm3: 1e-6, mm3: 1e-9, um3: 1e-18, nm3: 1e-27
        },
        // base: m/s
        velocita: {
          ms: 1, kmh: 1000/3600, mph: 1609.344/3600, nodi: 1852/3600, fps: 0.3048,
          // MULTIPLI/SOTTOMULTIPLI
          cms: 0.01, mms: 0.001, kms: 1000, Mms: 1e6,
          mus: 1e-6, ns: 1e-9
        },
        // base: joule
        energia: {
          joule: 1, calorie: 4.1868, kcal: 4186.8, kwh: 3_600_000, wh: 3600,
          btu: 1055.06, erg: 1e-7,
          // MULTIPLI/SOTTOMULTIPLI
          mJ: 0.001, kJ: 1000, MJ: 1e6, GJ: 1e9, TJ: 1e12,
          uJ: 1e-6, nJ: 1e-9, pJ: 1e-12
        },
        // base: watt
        potenza: {
          watt: 1, kw: 1000, hp: 745.7, cv: 735.49875, btu_h: 0.293071,
          // MULTIPLI/SOTTOMULTIPLI
          mW: 0.001, kW: 1000, MW: 1e6, GW: 1e9, TW: 1e12,
          uW: 1e-6, nW: 1e-9, pW: 1e-12
        },
        // base: Pascal
        pressione: {
          pa: 1, kpa: 1000, mpa: 1_000_000, bar: 100000, atm: 101325, psi: 6894.757, torr: 133.322,
          // MULTIPLI/SOTTOMULTIPLI
          hPa: 100, MPa: 1e6, GPa: 1e9, TPa: 1e12,
          mPa: 0.001, uPa: 1e-6, nPa: 1e-9
        },
        // base: newton
        forza: {
          newton: 1, kn: 1000, kgf: 9.80665, lbf: 4.4482216153, dyn: 0.00001,
          // MULTIPLI/SOTTOMULTIPLI
          mN: 0.001, kN: 1000, MN: 1e6,
          uN: 1e-6, nN: 1e-9, pN: 1e-12
        },
        // base: kg/m³
        densita: {
          kgm3: 1, gcm3: 1000, kgdm3: 1000, gl: 1,
          // MULTIPLI/SOTTOMULTIPLI
          gkm3: 1e-9, tkm3: 1e-9, gm3: 1e-3, kgm3: 1
        },
        // base: secondi
        tempo: {
          secondi: 1, minuti: 60, ore: 3600, giorni: 86400, settimane: 604800,
          // MULTIPLI/SOTTOMULTIPLI
          ms: 0.001, mus: 1e-6, ns: 1e-9, ps: 1e-12,
          ks: 1000, Ms: 1e6, Gs: 1e9
        },
        // base: gradi
        angoli: {
          gradi: 1, radianti: 180/Math.PI, minuti: 1/60, secondi: 1/3600,
          // MULTIPLI/SOTTOMULTIPLI
          mrad: Math.PI/180/1000, urad: Math.PI/180/1e6
        },
        // base: ampere
        flusso: {
          ampere: 1, milliampere: 0.001, microampere: 0.000001, kiloampere: 1000,
          // MULTIPLI/SOTTOMULTIPLI
          mA: 0.001, uA: 1e-6, nA: 1e-9, pA: 1e-12, kA: 1000, MA: 1e6
        },
        // base: euro
        valuta: {
          euro: 1, dollaro: 1.08, sterlina: 0.85, yen: 150
        },
        // temperatura gestita a parte
        temperatura: {
          celsius: true, fahrenheit: true, kelvin: true
        }
      };

  const materiali = {
    ablative_epoxy: 1.25,
    acetale_pom: 1.41,
    acetone: 0.79,
    acciaio_al_carbonio: 7.85,
    acciaio_alto_tenacita: 7.85,
    acciaio_dolce: 7.85,
    acciaio_hastelloy: 8.22,
    acciaio_hss_hss: 7.85,
    acciaio_inox: 8.0,
    acciaio_inox_304: 8.03,
    acciaio_inox_316: 8.00,
    acciaio_inox_austenitico: 8.0,
    acciaio_invar: 8.10,
    acciaio_maraging: 8.10,
    acciaio_tool_h13: 7.80,
    acqua: 1.0,
    acqua_di_mare: 1.025,
    acqua_distillata: 0.998,
    acqua_salmastro: 1.02,
    alcool: 0.79,
    alluminio: 2.7,
    alluminio_7075: 2.81,
    alluminio_fusione: 2.4,
    alluminio_honeycomb: 0.08,
    alluminio_leghe: 2.70,
    alluminio_litio: 2.65,
    alluminio_serie_6000: 2.70,
    alnico: 7.30,
    allumina: 3.95,
    ammoniaca_liquida: 0.68,
    amido_di_mais: 0.60,
    anidride_carbonica: 0.00198,
    anilina: 1.02,
    argento: 10.49,
    argento_sterling: 10.36,
    argilla: 1.8,
    argilla_cotto: 1.90,
    aria: 0.0012,
    aria_secca_20C: 0.0012,
    aria_umida: 0.0013,
    arseniuro_gallio: 5.32,
    azoto_gas: 0.00117,
    azoto_liquido: 0.81,
    basalto: 2.90,
    balsa: 0.16,
    benzina: 0.74,
    benzina_vera: 0.74,
    benzene: 0.88,
    berillio: 1.85,
    bicarbonato_sodio: 2.20,
    birra: 1.01,
    bitume: 1.10,
    bronzo: 8.8,
    bronzo_alluminio: 7.70,
    bronzo_fuso: 8.70,
    bronzo_stagnoso: 8.80,
    burro_fuso: 0.86,
    butano_gas: 0.00248,
    calcestruzzo: 2.4,
    calcestruzzo_armato: 2.40,
    calcare_compatto: 2.70,
    calce_viva: 0.90,
    caffe_in_grani: 0.55,
    cacao_in_polvere: 0.60,
    carbongrafite: 2.2,
    carburo_boro: 2.52,
    carburo_di_silicio: 3.21,
    carbonato_sodio: 2.53,
    cemento: 2.4,
    cemento_portland: 3.15,
    cemento_sfuso: 1.20,
    cellulosa_espansa: 0.04,
    kerosene: 0.80,
    clinker: 1.40,
    cloroformio: 1.49,
    conglomerato_bituminoso: 2.40,
    compensato_marino: 0.65,
    constantan: 8.90,
    corindone: 3.95,
    cromo: 7.19,
    cristallo_sfoglia: 2.51,
    diamante_sintetico: 3.52,
    dimetil_solfossido: 1.10,
    dolomite: 2.85,
    duraluminio: 2.78,
    elio_gas: 0.00018,
    elio_liquido: 0.125,
    esafluoruro_zolfo: 0.006,
    etanolo: 0.79,
    eucalipto: 0.75,
    farina_di_grano: 0.60,
    farina_di_mais: 0.55,
    fecola_di_patate: 0.75,
    fenolo: 1.07,
    ferrite_ba: 5.17,
    ferro: 7.87,
    ferro_fuso_grigio: 7.15,
    ferro_puro: 7.87,
    fibra_carbonio_epoxy: 1.60,
    fibra_vetro_epoxy: 1.80,
    fluoro_calcio: 3.18,
    fluoro_magnesio: 3.15,
    foam_ps: 0.02,
    formaldeide_37: 1.09,
    fosfato_diammonio: 1.80,
    gas_naturale: 0.0008,
    gasolio_leggero: 0.84,
    gelcoat: 1.20,
    germanio: 5.32,
    gesso_compresso: 0.90,
    gesso_in_polvere: 0.85,
    gesso_parigi: 0.92,
    ghiaia_naturale: 1.65,
    ghisa: 7.2,
    ghisa_bianca: 7.20,
    ghisa_malleabile: 7.25,
    ghisa_sferoidale: 7.1,
    ghiaccio: 0.917,
    glicole_50: 1.07,
    glicerina: 1.26,
    gomma_celullare: 0.05,
    granito: 2.65,
    grafite: 2.26,
    grasso_litio_ep2: 0.90,
    grasso_molibdeno_disolfuro: 0.92,
    idrogeno_gas: 0.00009,
    idrogeno_liquido: 0.07,
    idrossiapatite: 3.16,
    idrossido_sodio_50: 1.53,
    inconel: 8.19,
    intonaco: 1.60,
    iridio: 22.56,
    kevlar_epoxy: 1.44,
    kerosene_aviazione: 0.80,
    kripton_liquido: 2.41,
    laterizio_forato: 1.20,
    laterizio_pieno: 1.80,
    latte: 1.03,
    latte_polvere: 0.5,
    lega_co_cr_mo: 8.30,
    lega_eutettica_stagno_piombo: 8.50,
    lega_invar36: 8.10,
    legumi_secchi: 0.80,
    legno_abete_secco: 0.45,
    legno_balsa: 0.16,
    legno_betulla: 0.65,
    legno_faggio: 0.72,
    legno_mogano: 0.80,
    legno_mogano_fumed: 0.85,
    legno_pino: 0.50,
    legno_quercia: 0.75,
    legno_teak: 0.66,
    lievito_chimico: 0.80,
    limo_compatto: 1.80,
    liquido_refrigerante_auto: 1.07,
    lana_di_roccia: 0.10,
    lana_di_vetro: 0.03,
    magnesio: 1.74,
    magnesio_leghe: 1.80,
    malta_cemento: 2.10,
    marmo: 2.7,
    marmo_carrara: 2.72,
    marmo_statuario: 2.73,
    margarina: 0.90,
    mattone_refrattario: 2.20,
    mdf: 0.75,
    mercurio: 13.534,
    mercurio_liquido: 13.53,
    metanolo: 0.79,
    miele: 1.42,
    mica: 2.80,
    molibdeno: 10.22,
    monel: 8.80,
    multistrato_birch: 0.68,
    nafta_leggera: 0.82,
    neodimio_ferro_boro: 7.50,
    neone_liquido: 1.21,
    neve_compattata: 0.3,
    neve_fresca: 0.1,
    nichel: 8.9,
    nichel_puro: 8.90,
    nitrobenzene: 1.20,
    nitrato_ammonio: 1.72,
    nitruro_alluminio: 3.50,
    nitruro_boro: 2.10,
    nitruro_gallio: 6.10,
    nylon_66: 1.14,
    olio_cocco: 0.92,
    olio_combustibile_denso: 0.96,
    olio_fritto: 0.92,
    olio_idraulico: 0.87,
    olio_idraulico_iso32: 0.87,
    olio_idraulico_iso46: 0.88,
    olio_motore: 0.88,
    olio_oliva: 0.92,
    olio_palma: 0.91,
    olio_siliconico: 0.97,
    olio_turbina_iso_vg32: 0.86,
    olio_trasmissioni_atf: 0.85,
    oro: 19.3,
    oro_24k: 19.32,
    ossigeno: 0.00143,
    ossigeno_gas: 0.00133,
    ossigeno_liquido: 1.14,
    ossido_alluminio: 3.98,
    osmio: 22.59,
    osb3: 0.65,
    ottone: 8.50,
    ottone_giallo: 8.47,
    paglia: 0.11,
    palladio: 12.02,
    pasta_secca: 0.75,
    percloroetilene: 1.62,
    perlite_espansa: 0.09,
    perossido_idrogeno_30: 1.11,
    petrolio: 0.8,
    piastrella_ceramica: 2.20,
    piombo: 11.34,
    piombo_vergine: 11.34,
    plexiglass_pmmah: 1.19,
    policarbonato: 1.20,
    polibutilene_tereftalato: 1.34,
    polietilene_hdpe: 0.95,
    polietilene_ldpe: 0.92,
    polietilene_uhmwpe: 0.93,
    polifenilene_solfuro: 1.35,
    polipropilene: 0.90,
    polistirene_espanso: 0.03,
    porcellana: 2.40,
    propanolo: 0.80,
    propano_gas: 0.00188,
    pvc_espanso: 0.60,
    plastica_pet: 1.38,
    plastica_pvc: 1.4,
    quarzo: 2.65,
    quarzo_fuso: 2.20,
    rame: 8.96,
    rame_elettrolitico: 8.94,
    rame_ottone: 8.5,
    renio: 21.02,
    riso_crudo: 0.85,
    rodio: 12.41,
    rutenio: 12.45,
    sale: 2.16,
    sale_fino: 1.20,
    samario_cobalto: 8.40,
    sabbia: 1.6,
    sabbia_quarzo: 1.60,
    schiuma_poliuretanica: 0.03,
    semi_girasole: 0.45,
    silice: 2.60,
    silice_fusa: 2.20,
    silicio_monocristallino: 2.33,
    soluzione_glicole_50: 1.07,
    soluzione_salina_9: 1.01,
    soda_caustica_30: 1.33,
    sughero: 0.24,
    sughero_naturale: 0.24,
    superlega_718: 8.19,
    talco: 2.75,
    tantalio: 16.65,
    teak: 0.66,
    teflon_ptfe: 2.20,
    tellururo_cadmio: 5.85,
    terreno_organico: 1.20,
    tetracloruro_carbonio: 1.59,
    titanio: 4.52,
    titanio_cp: 4.51,
    titanio_leghe: 4.40,
    titanio_ti6al4v: 4.43,
    toluene: 0.87,
    torba_secca: 0.15,
    tricloroetilene: 1.46,
    truciolato_compresso: 0.70,
    tungsteno: 19.25,
    urea_tecnica: 1.32,
    uranio_metallico: 19.05,
    vermiculite_espansa: 0.10,
    vetro: 2.5,
    vetro_borosilicato: 2.23,
    vetro_fluorfosfato: 3.60,
    vetro_resina: 1.15,
    vetro_silica: 2.6,
    vetro_soda_calo: 2.50,
    vetro_temperato: 2.37,
    vino_rosso: 0.99,
    yogurt_intero: 1.03,
    zafiro_sintetico: 3.98,
    zama: 6.80,
    zinco: 7.14,
    zinco_fuso: 6.60,
    zirconio_metallico: 6.52,
    zirconio_ossido: 5.90,
    zucchero: 1.59,
    zucchero_semolato: 0.85
  };

  // 🆕 ELEMENTI CHIMICI COMPLETI
  const elementi = {
    'H - Idrogeno':1.008, 'He - Elio':4.002, 'Li - Litio':6.941, 'Be - Berillio':9.012, 'B - Boro':10.81,'C - Carbonio':12.01, 'N - Azoto':14.01, 'O - Ossigeno':16.00, 'F - Fluoro':19.00, 'Ne - Neon':20.18,'Na - Sodio':22.99, 'Mg - Magnesio':24.31, 'Al - Alluminio':26.98, 'Si - Silicio':28.09, 'P - Fosforo':30.97,'S - Zolfo':32.06, 'Cl - Cloro':35.45, 'Ar - Argon':39.95, 'K - Potassio':39.10, 'Ca - Calcio':40.08,'Sc - Scandio':44.96, 'Ti - Titanio':47.87, 'V - Vanadio':50.94, 'Cr - Cromo':52.00, 'Mn - Manganese':54.94,'Fe - Ferro':55.85,'Ga - Gallio':69.72, 'Ge - Germanio':72.63, 'As - Arsenico':74.92, 'Se - Selenio':78.96, 'Br - Bromo':79.90,'Kr - Kripton':83.80, 'Rb - Rubidio':85.47, 'Sr - Stronzio':87.62, 'Y - Ittrio':88.91, 'Zr - Zirconio':91.22,'Nb - Niobio':92.91, 'Mo - Molibdeno':95.95, 'Tc - Tecnezio':98.00, 'Ru - Rutenio':101.07, 'Rh - Rodio':102.91,'Pd - Palladio':106.42, 'Ag - Argento':107.87, 'Cd - Cadmio':112.41, 'In - Indio':114.82, 'Sn - Stagno':118.71,'Sb - Antimonio':121.76, 'Te - Tellerio':127.60, 'I - Iodio':126.90, 'Xe - Xenon':131.29, 'Cs - Cesio':132.91,'Ba - Bario':137.33, 'La - Lantanio':138.91, 'Ce - Cerio':140.12, 'Pr - Praseodimio':140.91, 'Nd - Neodimio':144.24,'Pm - Promezio':145.00, 'Sm - Samario':150.36, 'Eu - Europio':151.96, 'Gd - Gadolinio':157.25, 'Tb - Terbio':158.93,'Dy - Disprosio':162.50, 'Ho - Ittrio':164.93, 'Er - Erbio':167.26, 'Tm - Tulio':168.93, 'Yb - Itterbio':173.05,'Lu - Lutezio':174.97, 'Hf - Afnio':178.49, 'Ta - Tantalio':180.95, 'W - Tungsteno':183.84, 'Re - Renio':186.21,'Os - Osmio':190.23, 'Ir - Iridio':192.22, 'Pt - Platino':195.08, 'Au - Oro':196.97, 'Hg - Mercurio':200.59,'Tl - Talio':204.38, 'Pb - Piombo':207.2, 'Bi - Bismuto':208.98, 'Po - Polonio':209.00, 'At - Astro':210.00,'Rn - Radon':222.00, 'Fr - Franco':223.00, 'Ra - Radio':226.00, 'Ac - Attinio':227.00, 'Th - Torio':232.04,'Pa - Protattinio':231.04, 'U - Uranio':238.03, 'Np - Nettunio':237.05, 'Pu - Plutonio':244.06, 'Am - Americio':243.06,'Cm - Curio':247.07, 'Bk - Berkelio':247.07, 'Cf - Californio':251.08, 'Es - Einstenio':252.08, 'Fm - Fermio':257.10,'Md - Mendelevio':258.10, 'No - Nobelio':259.10, 'Lr - Lawrencio':266.12, 'Rf - Rutherfordio':267.12, 'Db - Dubnio':268.13,'Sg - Seaborgio':271.13, 'Bh - Bohrio':270.13, 'Hs - Hassio':269.13, 'Mt - Meitnerio':278.15, 'Ds - Darmstatio':281.16,'Rg - Roentgenio':282.17, 'Cn - Copernicio':285.18, 'Nh - Nihonio':286.18, 'Fl - Flerovio':289.19,'Mc - Moscovio':290.19, 'Lv - Livermorio':293.20, 'Ts - Tennessino':294.21, 'Og - Oganesson':294.21,
  };

  // =====================================================
  // ✅ FORMATO ITALIANO: 3 DECIMALI + VIRGOLA
  // =====================================================
  function formatNumberIT(num) {
    if (num === 0) return '0';
    if (!isFinite(num)) return 'Errore';
    const rounded = Math.round(num * 1000) / 1000;
    return rounded.toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    });
  }

  const categorySelect = document.getElementById('category');
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');
  const inputValue = document.getElementById('inputValue');
  const convertBtn = document.getElementById('convertBtn');
  const result = document.getElementById('result');
  const densitySection = document.getElementById('densitySection');
  const materialSelect = document.getElementById('material');
  const densityInput = document.getElementById('densityInput');

  function prettyName(key) {
    const s = key.replace(/_/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function populateCategories() {
    const ordineAlfabetico = [
      'angoli', 'area', 'densita', 'energia', 'flusso', 
      'forza', 'lunghezza', 'massa', 'massa-volume', 'volume-massa',
      'potenza', 'pressione', 'tempo', 'temperatura', 
      'valuta', 'velocita', 'volume'
    ];

    ordineAlfabetico.forEach(cat => {
      if (categories[cat] || cat === 'massa-volume' || cat === 'volume-massa') {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = prettyName(cat);
        categorySelect.appendChild(option);
      }
    });
    
    const massaSolo = document.createElement('option');
    massaSolo.value = 'massa-solo';
    massaSolo.textContent = 'Massa (solo massa)';
    categorySelect.appendChild(massaSolo);
    
    const volumeSolo = document.createElement('option');
    volumeSolo.value = 'volume-solo';
    volumeSolo.textContent = 'Volume (solo volume)';
    categorySelect.appendChild(volumeSolo);
    
    const elementiOption = document.createElement('option');
    elementiOption.value = 'elementi';
    elementiOption.textContent = 'Elementi Chimici';
    categorySelect.appendChild(elementiOption);
  }

  function populateUnits(categoryName) {
    fromUnitSelect.innerHTML = '<option value="">Seleziona unità</option>';
    toUnitSelect.innerHTML = '<option value="">Seleziona unità</option>';

    // 🆕 ELEMENTI CHIMICI
    if (categoryName === 'elementi') {
      Object.keys(elementi).forEach(el => {
        const o = document.createElement('option');
        o.value = el; 
        o.textContent = el;
        fromUnitSelect.appendChild(o);
        toUnitSelect.appendChild(o.cloneNode(true));
      });
      return;
    }

    // 🆕 MASSA-SOLO
    if (categoryName === 'massa-solo') {
      Object.keys(categories.massa).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        fromUnitSelect.appendChild(o);
        toUnitSelect.appendChild(o.cloneNode(true));
      });
      return;
    }
    
    // 🆕 VOLUME-SOLO
    if (categoryName === 'volume-solo') {
      Object.keys(categories.volume).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        fromUnitSelect.appendChild(o);
        toUnitSelect.appendChild(o.cloneNode(true));
      });
      return;
    }

    if (!categories[categoryName] && categoryName !== 'massa-volume' && categoryName !== 'volume-massa') return;

    // ✅ MASSA ↔ VOLUME - POPOLAMENTO CORRETTO
    if (categoryName === 'massa-volume') {
      Object.keys(categories.massa).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        fromUnitSelect.appendChild(o);
      });
      Object.keys(categories.volume).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        toUnitSelect.appendChild(o);
      });
      return;
    } 
    else if (categoryName === 'volume-massa') {
      Object.keys(categories.volume).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        fromUnitSelect.appendChild(o);
      });
      Object.keys(categories.massa).forEach(unit => {
        const o = document.createElement('option');
        o.value = unit;
        o.textContent = prettyName(unit);
        toUnitSelect.appendChild(o);
      });
      return;
    }

    // ALTRE CATEGORIE STANDARD
    Object.keys(categories[categoryName]).forEach(unit => {
      const fromOption = document.createElement('option');
      fromOption.value = unit;
      fromOption.textContent = prettyName(unit);
      fromUnitSelect.appendChild(fromOption);

      const toOption = document.createElement('option');
      toOption.value = unit;
      toOption.textContent = prettyName(unit);
      toUnitSelect.appendChild(toOption);
    });
  }

  function populateMaterials() {
    materialSelect.innerHTML = '<option value="">-- Seleziona materiale --</option>';
    Object.entries(materiali).forEach(([name, density]) => {
      const option = document.createElement('option');
      option.value = density;
      option.textContent = `${prettyName(name)} (${density} g/cm³)`;
      materialSelect.appendChild(option);
    });
  }

  function convertTemperature(value, fromUnit, toUnit) {
    let c;
    if (fromUnit === 'celsius') c = value;
    else if (fromUnit === 'fahrenheit') c = (value - 32) * 5 / 9;
    else if (fromUnit === 'kelvin') c = value - 273.15;

    if (toUnit === 'celsius') return c;
    if (toUnit === 'fahrenheit') return c * 9 / 5 + 32;
    if (toUnit === 'kelvin') return c + 273.15;
    return value;
  }

  function convertCurrency(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    const rates = categories.valuta;
    const inEur = value / rates[fromUnit];
    return inEur * rates[toUnit];
  }

  function convertElementi(value, fromUnit) {
    const massaMolare = elementi[fromUnit];
    const moli = value / massaMolare;
    return { moli, massa: value, formula: fromUnit };
  }

  // =====================================================
  // ✅ CONVERTITORE COMPLETO - TUTTE LE MODALITÀ
  // =====================================================
  function convert() {
    const value = parseFloat(inputValue.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const category = categorySelect.value;

    if (!value || !fromUnit || !toUnit || !category) {
      result.textContent = '❌ Seleziona tutti i campi.';
      result.style.color = '#ef4444';
      return;
    }

    let resultValue;
    const density = parseFloat(materialSelect.value || densityInput.value) || 1;

    // 🆕 ELEMENTI CHIMICI
    if (category === 'elementi') {
      const data = convertElementi(value, fromUnit);
      result.innerHTML = `${formatNumberIT(value)}g ${fromUnit} = <strong>${formatNumberIT(data.massa)}g ${toUnit}</strong><br><small>${formatNumberIT(data.moli)} mol</small>`;
      result.style.color = '#10b981';
      return;
    }
    
    // ✅ MASSA-SOLO
    if (category === 'massa-solo') {
      const mFactors = categories.massa;
      const fromFactor = mFactors[fromUnit];
      const toFactor = mFactors[toUnit];
      const baseValue = value * fromFactor;
      resultValue = baseValue / toFactor;
      result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong>`;
      result.style.color = '#10b981';
      return;
    }

    // ✅ VOLUME-SOLO
    if (category === 'volume-solo') {
      const vFactors = categories.volume;
      const fromFactor = vFactors[fromUnit];
      const toFactor = vFactors[toUnit];
      const baseValue = value * fromFactor;
      resultValue = baseValue / toFactor;
      result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong>`;
      result.style.color = '#10b981';
      return;
    }

    if (category === 'temperatura') {
      resultValue = convertTemperature(value, fromUnit, toUnit);
      result.innerHTML = `${formatNumberIT(value)}° ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)}° ${prettyName(toUnit)}</strong>`;
      result.style.color = '#10b981';
      return;
    }

    if (category === 'valuta') {
      resultValue = convertCurrency(value, fromUnit, toUnit);
      result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong>`;
      result.style.color = '#10b981';
      return;
    }

    // ✅ MASSA ↔ VOLUME - CONVERSIONE CORRETTA
    if (category === 'massa-volume') {
      const mFactors = categories.massa;
      const vFactors = categories.volume;
      const rho = density; // g/cm³
      const massKg = value * mFactors[fromUnit];
      const volumeM3 = massKg / (rho * 1000); // kg / (g/cm³ * 1000) = m³
      resultValue = volumeM3 / vFactors[toUnit];
      result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong><br><small>Densità: ${density} g/cm³</small>`;
      result.style.color = '#10b981';
      return;
    }

    if (category === 'volume-massa') {
      const mFactors = categories.massa;
      const vFactors = categories.volume;
      const rho = density; // g/cm³
      const volM3 = value * vFactors[fromUnit];
      const massKg = volM3 * (rho * 1000); // m³ * (g/cm³ * 1000) = kg
      resultValue = massKg / mFactors[toUnit];
      result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong><br><small>Densità: ${density} g/cm³</small>`;
      result.style.color = '#10b981';
      return;
    }

    // ALTRE CATEGORIE STANDARD
    const convData = categories[category];
    const fromFactor = convData[fromUnit];
    const toFactor = convData[toUnit];
    const baseValue = value * fromFactor;
    resultValue = baseValue / toFactor;

    result.innerHTML = `${formatNumberIT(value)} ${prettyName(fromUnit)} = <strong>${formatNumberIT(resultValue)} ${prettyName(toUnit)}</strong>`;
    result.style.color = '#10b981';
  }

  // ✅ EVENT LISTENERS MIGLIORATI
  categorySelect.addEventListener('change', (e) => {
    populateUnits(e.target.value);
    const showDensity = ['massa-volume', 'volume-massa'].includes(e.target.value);
    densitySection.style.display = showDensity ? 'block' : 'none';
    if (!showDensity) {
      densityInput.value = '';
      materialSelect.value = '';
    }
  });

  materialSelect.addEventListener('change', (e) => {
    densityInput.value = e.target.value || '';
  });

  densityInput.addEventListener('input', () => {
    materialSelect.value = '';
  });

  convertBtn.addEventListener('click', convert);
  inputValue.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convert();
  });

  populateCategories();
  populateMaterials();

  // API per language.js
  window.convertitore = { populateCategories, populateUnits };
});