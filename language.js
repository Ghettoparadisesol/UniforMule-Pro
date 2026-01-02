// language.js

// Traduzioni statiche base
const translations = {
  it: {
    appTitle: 'UniForMule',
    appSubtitle: '🔧 Convertitore Pro',
    categoria: 'Categoria',
    valore: 'Valore',
    daUnita: 'Da unità',
    aUnita: 'A unità',
    materiale: 'Materiale (densità)',
    densitaManuale: 'Densità manuale (g/cm³)',
    converti: '🔄 Converti',
    selezionaTutti: '❌ Seleziona tutti i campi.',
    categoriaFormule: 'Categoria formule',
    formula: 'Formula',
    calcola: 'Calcola'
  },
  en: {
    appTitle: 'UniForMule',
    appSubtitle: '🔧 Pro Converter',
    categoria: 'Category',
    valore: 'Value',
    daUnita: 'From unit',
    aUnita: 'To unit',
    materiale: 'Material (density)',
    densitaManuale: 'Manual density (g/cm³)',
    converti: '🔄 Convert',
    selezionaTutti: '❌ Select all fields.',
    categoriaFormule: 'Formula category',
    formula: 'Formula',
    calcola: 'Calculate'
  }
};

let currentLang = localStorage.getItem('uf_lang') || 'it';
window.currentLang = () => currentLang;
window.translations = translations;

// Funzioni di traduzione semplici
window.translateCategoryName = key => {
  if (!window.categoriesData) return key;
  const rec = window.categoriesData[key];
  return rec?.[currentLang] || key;
};

window.translateMaterialName = key => {
  if (!window.materialsData) return key;
  const rec = window.materialsData.find(m => m.key === key);
  return rec ? rec[currentLang] : key;
};

window.translateUnitName = unit =>
  unit.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

// Aggiorna testi UI (etichette, pulsanti, header)
window.updateUI = () => {
  const t = translations[currentLang];

  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el && t[key]) el.textContent = t[key];
  };

  setText('appTitle', 'appTitle');
  setText('appSubtitle', 'appSubtitle');
  setText('categoryLabel', 'categoria');
  setText('valueLabel', 'valore');
  setText('fromUnitLabel', 'daUnita');
  setText('toUnitLabel', 'aUnita');
  setText('materialLabel', 'materiale');
  setText('densityLabel', 'densitaManuale');
  setText('formuleCatLabel', 'categoriaFormule');
  setText('formulaLabel', 'formula');

  const convertBtn = document.getElementById('convertBtn');
  if (convertBtn) convertBtn.textContent = t.converti;

  // Ripopola select se le funzioni globali esistono
  if (window.populateCategories) window.populateCategories();
  if (window.populateMaterials) window.populateMaterials();
  if (window.populateFormuleCategories) window.populateFormuleCategories();
};

// Cambio lingua
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('uf_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  window.updateUI();
}

window.addEventListener('DOMContentLoaded', () => {
  // Aggancia pulsanti lingua
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Lingua iniziale
  setLanguage(currentLang);
});
