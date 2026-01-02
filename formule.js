// formule.js
// Motore unico per il calcolo delle formule (versione pulita)

window.addEventListener('DOMContentLoaded', () => {
  const catSelect = document.getElementById('formuleCategoria');
  const formulaSelect = document.getElementById('formulaSelect');
  const descrizioneFormula = document.getElementById('descrizioneFormula');
  const calculationArea = document.getElementById('calculationArea');
  const formulaResult = document.getElementById('formulaResult');

  // =====================================================
  // 1) DATABASE FORMULE (QUI PUOI AGGIUNGERE FORMULE)
  // =====================================================
  const formulasData = {
    matematica: [
      {
        id: 'area_cerchio',
        nome_it: 'Area del cerchio',
        nome_en: 'Circle area',
        formula: 'Math.PI * r * r',
        params: ['r'],
        descrizione_it: 'Area di un cerchio di raggio r.',
        descrizione_en: 'Area of a circle with radius r.'
      },
      {
        id: 'perimetro_trapezio',
        nome_it: 'Perimetro del trapezio',
        nome_en: 'Trapezoid perimeter',
        formula: 'B + b + c + d',
        params: ['B', 'b', 'c', 'd'],
        descrizione_it: 'Perimetro di un trapezio con basi B, b e lati obliqui c, d.',
        descrizione_en: 'Perimeter of a trapezoid with bases B, b and legs c, d.'
      },
      {
        id: 'area_quadrilatero_generico',
        nome_it: 'Area quadrilatero (diagonale-angoli)',
        nome_en: 'Quadrilateral area (diagonal-angles)',
        formula: '0.5 * d1 * d2 * Math.sin(alpha + beta)',
        params: ['d1', 'd2', 'alpha', 'beta'],
        descrizione_it: 'Area approssimata con diagonali d1, d2 e angoli alpha, beta (radianti).',
        descrizione_en: 'Approx. area with diagonals d1, d2 and angles alpha, beta (radians).'
      },
      {
        id: 'area_cerchio_settore',
        nome_it: 'Area settore circolare',
        nome_en: 'Circular sector area',
        formula: '0.5 * r * r * theta',
        params: ['r', 'theta'],
        descrizione_it: 'Area di un settore di cerchio con angolo theta (radianti).',
        descrizione_en: 'Area of a circular sector with angle theta (radians).'
      },
      {
        id: 'arco_circonferenza',
        nome_it: 'Lunghezza arco di cerchio',
        nome_en: 'Arc length of circle',
        formula: 'r * theta',
        params: ['r', 'theta'],
        descrizione_it: 'Lunghezza di un arco con raggio r e angolo theta (radianti).',
        descrizione_en: 'Arc length with radius r and angle theta (radians).'
      },
      {
        id: 'area_corona_circolare',
        nome_it: 'Area corona circolare',
        nome_en: 'Annulus area',
        formula: 'Math.PI * (R * R - r * r)',
        params: ['R', 'r'],
        descrizione_it: 'Area tra due cerchi concentrici di raggi R e r.',
        descrizione_en: 'Area between two concentric circles of radii R and r.'
      },
      {
        id: 'radici_equazione_lineare',
        nome_it: 'Soluzione equazione lineare',
        nome_en: 'Linear equation solution',
        formula: '(b * -1) / a',
        params: ['a', 'b'],
        descrizione_it: 'Soluzione di ax + b = 0, con a ≠ 0.',
        descrizione_en: 'Solution of ax + b = 0, with a ≠ 0.'
      },
      {
        id: 'valore_assoluto',
        nome_it: 'Valore assoluto',
        nome_en: 'Absolute value',
        formula: 'Math.abs(x)',
        params: ['x'],
        descrizione_it: 'Valore assoluto di x.',
        descrizione_en: 'Absolute value of x.'
      },
      {
        id: 'potenza_generale',
        nome_it: 'Potenza a^n',
        nome_en: 'Power a^n',
        formula: 'Math.pow(a, n)',
        params: ['a', 'n'],
        descrizione_it: 'Calcola a alla n-esima potenza.',
        descrizione_en: 'Computes a raised to the n-th power.'
      },
      {
        id: 'radice_quadrata',
        nome_it: 'Radice quadrata',
        nome_en: 'Square root',
        formula: 'Math.sqrt(x)',
        params: ['x'],
        descrizione_it: 'Radice quadrata di x (x ≥ 0).',
        descrizione_en: 'Square root of x (x ≥ 0).'
      },
      {
        id: 'radice_n_esima',
        nome_it: 'Radice n-esima',
        nome_en: 'n-th root',
        formula: 'Math.pow(x, 1 / n)',
        params: ['x', 'n'],
        descrizione_it: 'Radice n-esima di x (n ≠ 0).',
        descrizione_en: 'n-th root of x (n ≠ 0).'
      },
      {
        id: 'gradi_to_radianti',
        nome_it: 'Conversione gradi → radianti',
        nome_en: 'Degrees to radians',
        formula: 'deg * Math.PI / 180',
        params: ['deg'],
        descrizione_it: 'Converte un angolo in gradi in radianti.',
        descrizione_en: 'Converts degrees to radians.'
      },
      {
        id: 'radianti_to_gradi',
        nome_it: 'Conversione radianti → gradi',
        nome_en: 'Radians to degrees',
        formula: 'rad * 180 / Math.PI',
        params: ['rad'],
        descrizione_it: 'Converte un angolo in radianti in gradi.',
        descrizione_en: 'Converts radians to degrees.'
      },
      {
        id: 'tan_da_sin_cos',
        nome_it: 'Tangente da seno e coseno',
        nome_en: 'Tangent from sine and cosine',
        formula: 'Math.sin(x) / Math.cos(x)',
        params: ['x'],
        descrizione_it: 'tan x = sin x / cos x (x in radianti).',
        descrizione_en: 'tan x = sin x / cos x (x in radians).'
      },
      {
        id: 'arcsin',
        nome_it: 'Arco-seno',
        nome_en: 'Arcsine',
        formula: 'Math.asin(x)',
        params: ['x'],
        descrizione_it: 'arcsin(x) restituisce un angolo in radianti.',
        descrizione_en: 'arcsin(x) returns an angle in radians.'
      },
      {
        id: 'arccos',
        nome_it: 'Arco-coseno',
        nome_en: 'Arccosine',
        formula: 'Math.acos(x)',
        params: ['x'],
        descrizione_it: 'arccos(x) restituisce un angolo in radianti.',
        descrizione_en: 'arccos(x) returns an angle in radians.'
      },
      {
        id: 'combinazioni_n_k',
        nome_it: 'Combinazioni n su k',
        nome_en: 'Combinations n choose k',
        formula: 'fattoriale(n) / (fattoriale(k) * fattoriale(n - k))',
        params: ['n', 'k'],
        descrizione_it: 'Numero di combinazioni semplici C(n, k). (usa fattoriale helper).',
        descrizione_en: 'Number of combinations C(n, k). (uses helper factorial).'
      },
      {
        id: 'permutazioni_n',
        nome_it: 'Permutazioni di n elementi',
        nome_en: 'Permutations of n elements',
        formula: 'fattoriale(n)',
        params: ['n'],
        descrizione_it: 'Numero di permutazioni di n elementi distinti.',
        descrizione_en: 'Number of permutations of n distinct elements.'
      },
      {
        id: 'distribuzione_binomiale_valore',
        nome_it: 'Valore binomiale singolo',
        nome_en: 'Single binomial term',
        formula: 'fattoriale(n) / (fattoriale(k) * fattoriale(n - k)) * Math.pow(p, k) * Math.pow(1 - p, n - k)',
        params: ['n', 'k', 'p'],
        descrizione_it: 'Probabilità P(X=k) per una binomiale B(n, p).',
        descrizione_en: 'Probability P(X=k) for binomial B(n, p).'
      },
      {
        id: 'media_binomiale',
        nome_it: 'Media distribuzione binomiale',
        nome_en: 'Binomial mean',
        formula: 'n * p',
        params: ['n', 'p'],
        descrizione_it: 'Valore atteso di B(n, p).',
        descrizione_en: 'Expected value of B(n, p).'
      },
      {
        id: 'varianza_binomiale',
        nome_it: 'Varianza distribuzione binomiale',
        nome_en: 'Binomial variance',
        formula: 'n * p * (1 - p)',
        params: ['n', 'p'],
        descrizione_it: 'Varianza di B(n, p).',
        descrizione_en: 'Variance of B(n, p).'
      },
      {
        id: 'teorema_pitagora',
        nome_it: 'Teorema di Pitagora (ipotenusa)',
        nome_en: 'Pythagoras theorem (hypotenuse)',
        formula: 'Math.sqrt(a*a + b*b)',
        params: ['a', 'b'],
        descrizione_it: 'Calcola l’ipotenusa a partire dai cateti a e b.',
        descrizione_en: 'Computes hypotenuse from legs a and b.'
      },
      { id: 'area_rettangolo',
        nome_it: 'Area del rettangolo',
        nome_en: 'Rectangle area',
        formula: 'b * h',
        params: ['b', 'h'],
        descrizione_it: 'Area di un rettangolo base b e altezza h.',
        descrizione_en: 'Area of a rectangle with base b and height h.'
      },
      {
        id: 'perimetro_rettangolo',
        nome_it: 'Perimetro del rettangolo',
        nome_en: 'Rectangle perimeter',
        formula: '2 * (b + h)',
        params: ['b', 'h'],
        descrizione_it: 'Perimetro P = 2(b + h).',
        descrizione_en: 'Perimeter P = 2(b + h).'
      },
      {
        id: 'area_trapezio',
        nome_it: 'Area del trapezio',
        nome_en: 'Trapezoid area',
        formula: '((B + b) / 2) * h',
        params: ['B', 'b', 'h'],
        descrizione_it: 'Area di un trapezio con basi B, b e altezza h.',
        descrizione_en: 'Area of a trapezoid with bases B, b and height h.'
      },
      {
        id: 'area_parallelogramma',
        nome_it: 'Area del parallelogramma',
        nome_en: 'Parallelogram area',
        formula: 'b * h',
        params: ['b', 'h'],
        descrizione_it: 'Area A = b·h.',
        descrizione_en: 'Area A = b·h.'
      },
      {
        id: 'perimetro_cerchio',
        nome_it: 'Circonferenza del cerchio',
        nome_en: 'Circle circumference',
        formula: '2 * Math.PI * r',
        params: ['r'],
        descrizione_it: 'Circonferenza C = 2πr.',
        descrizione_en: 'Circumference C = 2πr.'
      },
      {
        id: 'area_ellisse',
        nome_it: 'Area dell’ellisse',
        nome_en: 'Ellipse area',
        formula: 'Math.PI * a * b',
        params: ['a', 'b'],
        descrizione_it: 'Area di un’ellisse con semiassi a e b.',
        descrizione_en: 'Area of an ellipse with semi-axes a and b.'
      },
      {
        id: 'volume_cubo',
        nome_it: 'Volume del cubo',
        nome_en: 'Cube volume',
        formula: 'l * l * l',
        params: ['l'],
        descrizione_it: 'Volume V = l³.',
        descrizione_en: 'Volume V = l³.'
      },
      {
        id: 'volume_parallelepipedo',
        nome_it: 'Volume del parallelepipedo',
        nome_en: 'Rectangular prism volume',
        formula: 'a * b * c',
        params: ['a', 'b', 'c'],
        descrizione_it: 'Volume V = a·b·c.',
        descrizione_en: 'Volume V = a·b·c.'
      },
      {
        id: 'volume_cilindro',
        nome_it: 'Volume del cilindro',
        nome_en: 'Cylinder volume',
        formula: 'Math.PI * r * r * h',
        params: ['r', 'h'],
        descrizione_it: 'Volume V = πr²h.',
        descrizione_en: 'Volume V = πr²h.'
      },
      {
        id: 'volume_cono',
        nome_it: 'Volume del cono',
        nome_en: 'Cone volume',
        formula: '(Math.PI * r * r * h) / 3',
        params: ['r', 'h'],
        descrizione_it: 'Volume V = (πr²h)/3.',
        descrizione_en: 'Volume V = (πr²h)/3.'
      },
      {
        id: 'volume_sfera',
        nome_it: 'Volume della sfera',
        nome_en: 'Sphere volume',
        formula: '(4 / 3) * Math.PI * r * r * r',
        params: ['r'],
        descrizione_it: 'Volume V = 4/3 πr³.',
        descrizione_en: 'Volume V = 4/3 πr³.'
      },
      {
        id: 'superficie_sfera',
        nome_it: 'Superficie della sfera',
        nome_en: 'Sphere surface area',
        formula: '4 * Math.PI * r * r',
        params: ['r'],
        descrizione_it: 'Superficie S = 4πr².',
        descrizione_en: 'Surface S = 4πr².'
      },
      {
        id: 'media_aritmetica_2',
        nome_it: 'Media aritmetica (2 valori)',
        nome_en: 'Arithmetic mean (2 values)',
        formula: '(a + b) / 2',
        params: ['a', 'b'],
        descrizione_it: 'Media di due valori a e b.',
        descrizione_en: 'Mean of two values a and b.'
      },
      {
        id: 'media_aritmetica_3',
        nome_it: 'Media aritmetica (3 valori)',
        nome_en: 'Arithmetic mean (3 values)',
        formula: '(a + b + c) / 3',
        params: ['a', 'b', 'c'],
        descrizione_it: 'Media di tre valori a, b e c.',
        descrizione_en: 'Mean of three values a, b and c.'
      },
      {
        id: 'media_pesata_3',
        nome_it: 'Media pesata (3 valori)',
        nome_en: 'Weighted mean (3 values)',
        formula: '((a * wa) + (b * wb) + (c * wc)) / (wa + wb + wc)',
        params: ['a', 'wa', 'b', 'wb', 'c', 'wc'],
        descrizione_it: 'Media pesata di tre valori con pesi wa, wb, wc.',
        descrizione_en: 'Weighted mean of three values with weights wa, wb, wc.'
      },
      {
        id: 'varianza_3',
        nome_it: 'Varianza di 3 valori',
        nome_en: 'Variance of 3 values',
        formula: '((a - m)*(a - m) + (b - m)*(b - m) + (c - m)*(c - m)) / 3',
        params: ['a', 'b', 'c', 'm'],
        descrizione_it: 'Varianza popolazione per tre valori e media m.',
        descrizione_en: 'Population variance for three values and mean m.'
      },
      {
        id: 'deviazione_standard',
        nome_it: 'Deviazione standard',
        nome_en: 'Standard deviation',
        formula: 'Math.sqrt(v)',
        params: ['v'],
        descrizione_it: 'Deviazione standard come radice della varianza v.',
        descrizione_en: 'Standard deviation as square root of variance v.'
      },
      {
        id: 'coeff_variazione',
        nome_it: 'Coefficiente di variazione',
        nome_en: 'Coefficient of variation',
        formula: '(sigma / m) * 100',
        params: ['sigma', 'm'],
        descrizione_it: 'Dispersione relativa σ/m in percentuale.',
        descrizione_en: 'Relative dispersion σ/m in percent.'
      },
      {
        id: 'log_base_n',
        nome_it: 'Logaritmo in base b',
        nome_en: 'Logarithm base b',
        formula: 'Math.log(x) / Math.log(b)',
        params: ['x', 'b'],
        descrizione_it: 'log_b(x) = ln(x)/ln(b).',
        descrizione_en: 'log_b(x) = ln(x)/ln(b).'
      },
      {
        id: 'esponenziale',
        nome_it: 'Funzione esponenziale',
        nome_en: 'Exponential function',
        formula: 'A0 * Math.exp(k * t)',
        params: ['A0', 'k', 't'],
        descrizione_it: 'Crescita esponenziale A(t) = A0·e^(kt).',
        descrizione_en: 'Exponential growth A(t) = A0·e^(kt).'
      },
      {
        id: 'derivata_potenza',
        nome_it: 'Derivata x^n',
        nome_en: 'Derivative of x^n',
        formula: 'n * Math.pow(x, n - 1)',
        params: ['x', 'n'],
        descrizione_it: 'd/dx (x^n) = n·x^(n−1).',
        descrizione_en: 'd/dx (x^n) = n·x^(n−1).'
      },
      {
        id: 'derivata_exp',
        nome_it: 'Derivata e^x',
        nome_en: 'Derivative of e^x',
        formula: 'Math.exp(x)',
        params: ['x'],
        descrizione_it: 'd/dx (e^x) = e^x.',
        descrizione_en: 'd/dx (e^x) = e^x.'
      },
      {
        id: 'derivata_ln',
        nome_it: 'Derivata ln(x)',
        nome_en: 'Derivative of ln(x)',
        formula: '1 / x',
        params: ['x'],
        descrizione_it: 'd/dx (ln x) = 1/x, per x > 0.',
        descrizione_en: 'd/dx (ln x) = 1/x, for x > 0.'
      },
      {
        id: 'derivata_sin',
        nome_it: 'Derivata sin(x)',
        nome_en: 'Derivative of sin(x)',
        formula: 'Math.cos(x)',
        params: ['x'],
        descrizione_it: 'd/dx (sin x) = cos x (x in radianti).',
        descrizione_en: 'd/dx (sin x) = cos x (x in radians).'
      },
      {
        id: 'derivata_cos',
        nome_it: 'Derivata cos(x)',
        nome_en: 'Derivative of cos(x)',
        formula: '-Math.sin(x)',
        params: ['x'],
        descrizione_it: 'd/dx (cos x) = -sin x (x in radianti).',
        descrizione_en: 'd/dx (cos x) = -sin x (x in radians).'
      },
      {
        id: 'teorema_pitagora_lato',
        nome_it: 'Cateto da ipotenusa',
        nome_en: 'Leg from hypotenuse',
        formula: 'Math.sqrt(c*c - b*b)',
        params: ['c', 'b'],
        descrizione_it: 'Cateto da ipotenusa c e altro cateto b.',
        descrizione_en: 'Leg from hypotenuse c and other leg b.'
      },
      {
        id: 'legge_seni_lato',
        nome_it: 'Legge dei seni (lato)',
        nome_en: 'Law of sines (side)',
        formula: '(a / Math.sin(A)) * Math.sin(B)',
        params: ['a', 'A', 'B'],
        descrizione_it: 'Calcola lato opposto a B da lato a e angoli A, B (radianti).',
        descrizione_en: 'Side opposite B from side a and angles A, B (radians).'
      },
      {
        id: 'somma_angoli_seno',
        nome_it: 'Seno somma angoli',
        nome_en: 'Sine of sum',
        formula: 'Math.sin(a) * Math.cos(b) + Math.cos(a) * Math.sin(b)',
        params: ['a', 'b'],
        descrizione_it: 'sin(a + b) in radianti.',
        descrizione_en: 'sin(a + b) in radians.'
      },
      {
        id: 'identita_trig_fond',
        nome_it: 'Identità trigonometrica',
        nome_en: 'Trig fundamental identity',
        formula: 'Math.pow(Math.sin(x), 2) + Math.pow(Math.cos(x), 2)',
        params: ['x'],
        descrizione_it: 'sin²x + cos²x = 1 (risultato idealmente 1).',
        descrizione_en: 'sin²x + cos²x = 1 (result ideally 1).'
      },
      {
        id: 'somma_pa',
        nome_it: 'Somma progressione aritmetica',
        nome_en: 'Arithmetic series sum',
        formula: 'n * (a1 + an) / 2',
        params: ['n', 'a1', 'an'],
        descrizione_it: 'Somma dei primi n termini di una PA.',
        descrizione_en: 'Sum of first n terms of an arithmetic sequence.'
      },
      {
        id: 'identita_tan',
        nome_it: 'Identità tan(x)',
        nome_en: 'Identity tan(x)',
        formula: 'Math.sin(x) / Math.cos(x)',
        params: ['x'],
        descrizione_it: 'tan x = sin x / cos x (x in radianti).',
        descrizione_en: 'tan x = sin x / cos x (x in radians).'
      },
      {
        id: 'derivata_prodotto',
        nome_it: 'Derivata prodotto f·g (valore)',
        nome_en: 'Derivative of product f·g (value)',
        formula: 'fp * g + f * gp',
        params: ['f', 'g', 'fp', 'gp'],
        descrizione_it: 'f′g + fg′ dato f, g e le loro derivate in un punto.',
        descrizione_en: 'f′g + fg′ given f, g and their derivatives at a point.'
      },
      {
        id: 'derivata_rapporto',
        nome_it: 'Derivata rapporto f/g (valore)',
        nome_en: 'Derivative of quotient f/g (value)',
        formula: '(fp * g - f * gp) / (g * g)',
        params: ['f', 'g', 'fp', 'gp'],
        descrizione_it: '(f′g − fg′)/g² dato f, g e derivate in un punto.',
        descrizione_en: '(f′g − fg′)/g² given f, g and derivatives at a point.'
      },
      {
        id: 'derivata_log_base_a',
        nome_it: 'Derivata log_a(x)',
        nome_en: 'Derivative of log_a(x)',
        formula: '1 / (x * Math.log(a))',
        params: ['x', 'a'],
        descrizione_it: 'd/dx (log_a x) = 1 / (x ln a).',
        descrizione_en: 'd/dx (log_a x) = 1 / (x ln a).'
      },
      {
        id: 'derivata_sqrt',
        nome_it: 'Derivata sqrt(x)',
        nome_en: 'Derivative of sqrt(x)',
        formula: '1 / (2 * Math.sqrt(x))',
        params: ['x'],
        descrizione_it: 'd/dx (√x) = 1/(2√x).',
        descrizione_en: 'd/dx (√x) = 1/(2√x).'
      },
      {
        id: 'integrale_potenza',
        nome_it: 'Integrale x^n',
        nome_en: 'Integral of x^n',
        formula: 'Math.pow(x, n + 1) / (n + 1)',
        params: ['x', 'n'],
        descrizione_it: '∫ xⁿ dx = xⁿ⁺¹/(n+1) (n ≠ −1).',
        descrizione_en: '∫ xⁿ dx = xⁿ⁺¹/(n+1) (n ≠ −1).'
      },
      {
        id: 'integrale_exp',
        nome_it: 'Integrale e^x',
        nome_en: 'Integral of e^x',
        formula: 'Math.exp(x)',
        params: ['x'],
        descrizione_it: '∫ eˣ dx = eˣ + C (costante ignorata).',
        descrizione_en: '∫ eˣ dx = eˣ + C (constant ignored).'
      },
      {
        id: 'integrale_inv',
        nome_it: 'Integrale 1/x',
        nome_en: 'Integral of 1/x',
        formula: 'Math.log(Math.abs(x))',
        params: ['x'],
        descrizione_it: '∫ 1/x dx = ln|x| + C.',
        descrizione_en: '∫ 1/x dx = ln|x| + C.'
      },
      {
        id: 'integrale_sin',
        nome_it: 'Integrale sin(x)',
        nome_en: 'Integral of sin(x)',
        formula: '-Math.cos(x)',
        params: ['x'],
        descrizione_it: '∫ sin x dx = −cos x + C.',
        descrizione_en: '∫ sin x dx = −cos x + C.'
      },
      {
        id: 'integrale_cos',
        nome_it: 'Integrale cos(x)',
        nome_en: 'Integral of cos(x)',
        formula: 'Math.sin(x)',
        params: ['x'],
        descrizione_it: '∫ cos x dx = sin x + C.',
        descrizione_en: '∫ cos x dx = sin x + C.'
      },
      {
        id: 'media_armonica_2',
        nome_it: 'Media armonica (2 valori)',
        nome_en: 'Harmonic mean (2 values)',
        formula: '2 * a * b / (a + b)',
        params: ['a', 'b'],
        descrizione_it: 'Media armonica di due numeri positivi.',
        descrizione_en: 'Harmonic mean of two positive numbers.'
      },
      {
        id: 'media_geometrica_2',
        nome_it: 'Media geometrica (2 valori)',
        nome_en: 'Geometric mean (2 values)',
        formula: 'Math.sqrt(a * b)',
        params: ['a', 'b'],
        descrizione_it: 'Media geometrica di due numeri non negativi.',
        descrizione_en: 'Geometric mean of two non‑negative numbers.'
      },
      {
        id: 'somma_n_primi_interi',
        nome_it: 'Somma primi n interi',
        nome_en: 'Sum of first n integers',
        formula: 'n * (n + 1) / 2',
        params: ['n'],
        descrizione_it: '1 + 2 + … + n.',
        descrizione_en: '1 + 2 + … + n.'
      },
      {
        id: 'somma_n_quadrati',
        nome_it: 'Somma quadrati 1..n',
        nome_en: 'Sum of squares 1..n',
        formula: 'n * (n + 1) * (2 * n + 1) / 6',
        params: ['n'],
        descrizione_it: '1² + 2² + … + n².',
        descrizione_en: '1² + 2² + … + n².'
      },
      {
        id: 'somma_n_cubi',
        nome_it: 'Somma cubi 1..n',
        nome_en: 'Sum of cubes 1..n',
        formula: 'Math.pow(n * (n + 1) / 2, 2)',
        params: ['n'],
        descrizione_it: '1³ + 2³ + … + n³ = [n(n+1)/2]².',
        descrizione_en: '1³ + 2³ + … + n³ = [n(n+1)/2]².'
      },
      {
        id: 'equazione_esponenziale_isolata',
        nome_it: 'Soluzione esponenziale isolata',
        nome_en: 'Isolated exponential solution',
        formula: 'Math.log(b / a) / k',
        params: ['a', 'b', 'k'],
        descrizione_it: 'Da a·e^{kt} = b ⇒ t = ln(b/a)/k.',
        descrizione_en: 'From a·e^{kt} = b ⇒ t = ln(b/a)/k.'
      },
      {
        id: 'equazione_logaritmica_semplice',
        nome_it: 'Equazione logaritmica semplice',
        nome_en: 'Simple logarithmic equation',
        formula: 'Math.pow(a, y)',
        params: ['a', 'y'],
        descrizione_it: 'Da log_a(x) = y ⇒ x = a^y.',
        descrizione_en: 'From log_a(x) = y ⇒ x = a^y.'
      },
      {
        id: 'somma_vettoriale_2d_modulo',
        nome_it: 'Modulo somma vettori 2D',
        nome_en: 'Magnitude of sum of 2D vectors',
        formula: 'Math.sqrt(Math.pow(ax + bx, 2) + Math.pow(ay + by, 2))',
        params: ['ax', 'ay', 'bx', 'by'],
        descrizione_it: 'Modulo di (ax,ay) + (bx,by).',
        descrizione_en: 'Magnitude of (ax,ay) + (bx,by).'
      },
      {
        id: 'prodotto_scalare_2d',
        nome_it: 'Prodotto scalare 2D',
        nome_en: 'Dot product 2D',
        formula: 'ax * bx + ay * by',
        params: ['ax', 'ay', 'bx', 'by'],
        descrizione_it: 'Prodotto scalare tra due vettori 2D.',
        descrizione_en: 'Dot product of two 2D vectors.'
      },
      {
        id: 'angolo_tra_vettori_2d',
        nome_it: 'Angolo tra vettori 2D',
        nome_en: 'Angle between 2D vectors',
        formula: 'Math.acos((ax * bx + ay * by) / (Math.sqrt(ax*ax + ay*ay) * Math.sqrt(bx*bx + by*by)))',
        params: ['ax', 'ay', 'bx', 'by'],
        descrizione_it: 'Angolo (radianti) tra due vettori 2D.',
        descrizione_en: 'Angle (radians) between two 2D vectors.'
      },
      {
        id: 'somma_angoli_cos',
        nome_it: 'Coseno somma angoli',
        nome_en: 'Cosine of sum',
        formula: 'Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b)',
        params: ['a', 'b'],
        descrizione_it: 'cos(a + b) = cos a cos b − sin a sin b.',
        descrizione_en: 'cos(a + b) = cos a cos b − sin a sin b.'
      },
      {
        id: 'differenza_angoli_sin',
        nome_it: 'Seno differenza angoli',
        nome_en: 'Sine of difference',
        formula: 'Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b)',
        params: ['a', 'b'],
        descrizione_it: 'sin(a − b) = sin a cos b − cos a sin b.',
        descrizione_en: 'sin(a − b) = sin a cos b − cos a sin b.'
      },
      {
        id: 'differenza_angoli_cos',
        nome_it: 'Coseno differenza angoli',
        nome_en: 'Cosine of difference',
        formula: 'Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b)',
        params: ['a', 'b'],
        descrizione_it: 'cos(a − b) = cos a cos b + sin a sin b.',
        descrizione_en: 'cos(a − b) = cos a cos b + sin a sin b.'
      },
      {
        id: 'identita_tan_doppio',
        nome_it: 'Tangente doppio angolo',
        nome_en: 'Tangent double angle',
        formula: '(2 * Math.tan(x)) / (1 - Math.tan(x) * Math.tan(x))',
        params: ['x'],
        descrizione_it: 'tan(2x) = 2 tan x / (1 − tan²x).',
        descrizione_en: 'tan(2x) = 2 tan x / (1 − tan²x).'
      },
      {
        id: 'identita_mezza_angolo_sin',
        nome_it: 'Seno mezzo angolo',
        nome_en: 'Half‑angle sine',
        formula: 'Math.sqrt((1 - Math.cos(x)) / 2)',
        params: ['x'],
        descrizione_it: 'sin(x/2) = ±√[(1 − cos x)/2].',
        descrizione_en: 'sin(x/2) = ±√[(1 − cos x)/2].'
      },
      {
        id: 'identita_mezza_angolo_cos',
        nome_it: 'Coseno mezzo angolo',
        nome_en: 'Half‑angle cosine',
        formula: 'Math.sqrt((1 + Math.cos(x)) / 2)',
        params: ['x'],
        descrizione_it: 'cos(x/2) = ±√[(1 + cos x)/2].',
        descrizione_en: 'cos(x/2) = ±√[(1 + cos x)/2].'
      },
      {
        id: 'identita_tan_mezzo_angolo',
        nome_it: 'Tangente mezzo angolo',
        nome_en: 'Half‑angle tangent',
        formula: 'Math.sin(x) / (1 + Math.cos(x))',
        params: ['x'],
        descrizione_it: 'tan(x/2) = sin x / (1 + cos x).',
        descrizione_en: 'tan(x/2) = sin x / (1 + cos x).'
      },
      {
        id: 'teorema_coseni_lato',
        nome_it: 'Teorema dei coseni (lato)',
        nome_en: 'Law of cosines (side)',
        formula: 'Math.sqrt(a*a + b*b - 2*a*b*Math.cos(C))',
        params: ['a', 'b', 'C'],
        descrizione_it: 'Lato opposto a C in triangolo qualunque (C radianti).',
        descrizione_en: 'Side opposite to angle C in any triangle (C radians).'
      },
      {
        id: 'teorema_coseni_angolo',
        nome_it: 'Teorema dei coseni (angolo)',
        nome_en: 'Law of cosines (angle)',
        formula: 'Math.acos((a*a + b*b - c*c) / (2 * a * b))',
        params: ['a', 'b', 'c'],
        descrizione_it: 'Angolo opposto a lato c (radianti).',
        descrizione_en: 'Angle opposite side c (radians).'
      },
      {
        id: 'area_triangolo_trig',
        nome_it: 'Area triangolo (trigonometrica)',
        nome_en: 'Triangle area (trigonometric)',
        formula: '0.5 * a * b * Math.sin(C)',
        params: ['a', 'b', 'C'],
        descrizione_it: 'Area = ½ab sin C (C in radianti).',
        descrizione_en: 'Area = ½ab sin C (C in radians).'
      },
      {
        id: 'z_score',
        nome_it: 'Z‑score',
        nome_en: 'Z‑score',
        formula: '(x - mu) / sigma',
        params: ['x', 'mu', 'sigma'],
        descrizione_it: 'Standardizzazione di un valore rispetto a media e deviazione.',
        descrizione_en: 'Standardization of a value using mean and std dev.'
      },
      {
        id: 'media_ponderata_generica',
        nome_it: 'Media pesata generica (3 valori)',
        nome_en: 'Generic weighted mean (3)',
        formula: '(x1 * w1 + x2 * w2 + x3 * w3) / (w1 + w2 + w3)',
        params: ['x1', 'w1', 'x2', 'w2', 'x3', 'w3'],
        descrizione_it: 'Media pesata di tre osservazioni.',
        descrizione_en: 'Weighted mean of three observations.'
      },
      {
        id: 'varianza_campione_3',
        nome_it: 'Varianza campionaria (3 valori)',
        nome_en: 'Sample variance (3 values)',
        formula: '((x1 - m)*(x1 - m) + (x2 - m)*(x2 - m) + (x3 - m)*(x3 - m)) / 2',
        params: ['x1', 'x2', 'x3', 'm'],
        descrizione_it: 'Varianza campione con n = 3 (denominatore n − 1).',
        descrizione_en: 'Sample variance with n = 3 (denominator n − 1).'
      },
      {
        id: 'deviazione_standard_campione_3',
        nome_it: 'Deviazione standard campionaria (3)',
        nome_en: 'Sample standard deviation (3)',
        formula: 'Math.sqrt(vs)',
        params: ['vs'],
        descrizione_it: 'Deviazione standard campionaria da varianza vs.',
        descrizione_en: 'Sample standard deviation from variance vs.'
      },
      {
        id: 'covarianza_2',
        nome_it: 'Covarianza (due coppie)',
        nome_en: 'Covariance (two pairs)',
        formula: '((x1 - mx)*(y1 - my) + (x2 - mx)*(y2 - my)) / 1',
        params: ['x1', 'y1', 'x2', 'y2', 'mx', 'my'],
        descrizione_it: 'Covarianza campionaria con due osservazioni (n−1 = 1).',
        descrizione_en: 'Sample covariance with two observations (n−1 = 1).'
      },
      {
        id: 'derivata_inv',
        nome_it: 'Derivata funzione reciproca',
        nome_en: 'Derivative of reciprocal',
        formula: '-1 / (x * x)',
        params: ['x'],
        descrizione_it: 'd/dx (1/x) = −1/x².',
        descrizione_en: 'd/dx (1/x) = −1/x².'
      },
      {
        id: 'coseno_doppio_angolo',
        nome_it: 'Coseno del doppio angolo',
        nome_en: 'Cosine of double angle',
        formula: 'Math.cos(2 * x)',
        params: ['x'],
        descrizione_it: 'cos(2x) (forma compatta).',
        descrizione_en: 'cos(2x) (compact form).'
      },
      {
        id: 'seno_doppio_angolo',
        nome_it: 'Seno del doppio angolo',
        nome_en: 'Sine of double angle',
        formula: '2 * Math.sin(x) * Math.cos(x)',
        params: ['x'],
        descrizione_it: 'sin(2x) = 2 sin x cos x.',
        descrizione_en: 'sin(2x) = 2 sin x cos x.'
      },
      {
        id: 'formula_eulero_cos',
        nome_it: 'Formula di Eulero (cos)',
        nome_en: 'Euler formula (cos)',
        formula: '0.5 * (Math.exp(1j * x) + Math.exp(-1j * x))',
        params: ['x'],
        descrizione_it: 'cos x come (e^{ix} + e^{-ix})/2 (concettuale).',
        descrizione_en: 'cos x as (e^{ix} + e^{-ix})/2 (conceptual).'
      },
      {
        id: 'formula_eulero_sin',
        nome_it: 'Formula di Eulero (sin)',
        nome_en: 'Euler formula (sin)',
        formula: '(Math.exp(1j * x) - Math.exp(-1j * x)) / (2j)',
        params: ['x'],
        descrizione_it: 'sin x come (e^{ix} − e^{-ix})/(2i) (concettuale).',
        descrizione_en: 'sin x as (e^{ix} − e^{-ix})/(2i) (conceptual).'
      },
      {
        id: 'punto_medio_segmento',
        nome_it: 'Punto medio di un segmento',
        nome_en: 'Midpoint of a segment',
        formula: '[(x1 + x2) / 2, (y1 + y2) / 2]',
        params: ['x1', 'y1', 'x2', 'y2'],
        descrizione_it: 'Restituisce il punto medio (come coppia logica).',
        descrizione_en: 'Returns segment midpoint (logical pair).'
      },
      {
        id: 'valore_parabola_vertice_y',
        nome_it: 'Valore y nel vertice parabola',
        nome_en: 'Parabola vertex y-value',
        formula: '(-Math.pow(b, 2) + 4 * a * c) / (4 * a * -1)',
        params: ['a', 'b', 'c'],
        descrizione_it: 'Coordinata y del vertice della parabola y = ax² + bx + c.',
        descrizione_en: 'y-coordinate of vertex of y = ax² + bx + c.'
      },
      {
        id: 'discriminante_quadratica',
        nome_it: 'Discriminante equazione quadratica',
        nome_en: 'Quadratic discriminant',
        formula: 'b * b - 4 * a * c',
        params: ['a', 'b', 'c'],
        descrizione_it: 'Δ = b² − 4ac.',
        descrizione_en: 'Δ = b² − 4ac.'
      },

    ],

    fisica: [
      {
        id: 'velocita_media',
        nome_it: 'Velocità media',
        nome_en: 'Average speed',
        formula: 's / t',
        params: ['s', 't'],
        descrizione_it: 'v = s / t, spazio su tempo.',
        descrizione_en: 'v = s / t, distance over time.'
      },
      {
        id: 'seconda_legge_newton',
        nome_it: 'Seconda legge di Newton',
        nome_en: 'Newton’s second law',
        formula: 'm * a',
        params: ['m', 'a'],
        descrizione_it: 'F = m·a, forza da massa e accelerazione.',
        descrizione_en: 'F = m·a, force from mass and acceleration.'
      },
      {
        id: 'velocita_media',
        nome_it: 'Velocità media',
        nome_en: 'Average speed',
        formula: 's / t',
        params: ['s', 't'],
        descrizione_it: 'v = s / t, spazio s percorso in tempo t.',
        descrizione_en: 'v = s / t, distance s covered in time t.'
      },
      {
        id: 'accelerazione_media',
        nome_it: 'Accelerazione media',
        nome_en: 'Average acceleration',
        formula: '(v - v0) / t',
        params: ['v', 'v0', 't'],
        descrizione_it: 'a = (v − v0) / t, variazione di velocità in t.',
        descrizione_en: 'a = (v − v0) / t, change in velocity over t.'
      },
      {
        id: 'mru_legge_oraria',
        nome_it: 'Moto rettilineo uniforme (legge oraria)',
        nome_en: 'Uniform motion (position)',
        formula: 'x0 + v * t',
        params: ['x0', 'v', 't'],
        descrizione_it: 'x = x₀ + vt, moto con velocità costante.',
        descrizione_en: 'x = x₀ + vt, motion with constant speed.'
      },
      {
        id: 'mrua_legge_oraria',
        nome_it: 'Moto uniformemente accelerato (legge oraria)',
        nome_en: 'Uniform acceleration (position)',
        formula: 'x0 + v0 * t + 0.5 * a * t * t',
        params: ['x0', 'v0', 'a', 't'],
        descrizione_it: 'x = x₀ + v₀t + ½at².',
        descrizione_en: 'x = x₀ + v₀t + ½at².'
      },
      {
        id: 'mrua_velocita_t',
        nome_it: 'Velocità nel moto uniformemente accelerato',
        nome_en: 'Velocity in uniform acceleration',
        formula: 'v0 + a * t',
        params: ['v0', 'a', 't'],
        descrizione_it: 'v = v₀ + at.',
        descrizione_en: 'v = v₀ + at.'
      },
      {
        id: 'equazione_torricelli',
        nome_it: 'Equazione di Torricelli',
        nome_en: 'Torricelli equation',
        formula: 'Math.sqrt(v0 * v0 + 2 * a * s)',
        params: ['v0', 'a', 's'],
        descrizione_it: 'v² = v₀² + 2as ⇒ v = √(v₀² + 2as).',
        descrizione_en: 'v² = v₀² + 2as ⇒ v = √(v₀² + 2as).'
      },
      {
        id: 'seconda_legge_newton',
        nome_it: 'Seconda legge di Newton',
        nome_en: 'Newton’s second law',
        formula: 'm * a',
        params: ['m', 'a'],
        descrizione_it: 'F = m·a, forza risultante su un corpo.',
        descrizione_en: 'F = m·a, net force on an object.'
      },
      {
        id: 'peso',
        nome_it: 'Peso',
        nome_en: 'Weight',
        formula: 'm * g',
        params: ['m', 'g'],
        descrizione_it: 'P = m·g, forza peso in un campo gravitazionale.',
        descrizione_en: 'W = m·g, weight in a gravitational field.'
      },
      {
        id: 'quantita_moto',
        nome_it: 'Quantità di moto',
        nome_en: 'Linear momentum',
        formula: 'm * v',
        params: ['m', 'v'],
        descrizione_it: 'p = m·v, quantità di moto lineare.',
        descrizione_en: 'p = m·v, linear momentum.'
      },
      {
        id: 'impulso',
        nome_it: 'Impulso',
        nome_en: 'Impulse',
        formula: 'F * dt',
        params: ['F', 'dt'],
        descrizione_it: 'J = F·Δt, impulsto di una forza costante.',
        descrizione_en: 'J = F·Δt, impulse of a constant force.'
      },
      {
        id: 'teorema_impulso_quantita_moto',
        nome_it: 'Teorema impulso-quantità di moto',
        nome_en: 'Impulse-momentum theorem',
        formula: 'm * v1 - m * v0',
        params: ['m', 'v0', 'v1'],
        descrizione_it: 'J = Δp = m(v₁ − v₀).',
        descrizione_en: 'J = Δp = m(v₁ − v₀).'
      },
      {
        id: 'lavoro_forza_costante',
        nome_it: 'Lavoro di una forza costante',
        nome_en: 'Work of constant force',
        formula: 'F * s * Math.cos(theta)',
        params: ['F', 's', 'theta'],
        descrizione_it: 'L = F·s·cosθ (θ in radianti).',
        descrizione_en: 'W = F·s·cosθ (θ in radians).'
      },
      {
        id: 'energia_cinetica',
        nome_it: 'Energia cinetica',
        nome_en: 'Kinetic energy',
        formula: '0.5 * m * v * v',
        params: ['m', 'v'],
        descrizione_it: 'Eₖ = ½mv².',
        descrizione_en: 'K = ½mv².'
      },
      {
        id: 'energia_potenziale_gravitazionale',
        nome_it: 'Energia potenziale gravitazionale',
        nome_en: 'Gravitational potential energy',
        formula: 'm * g * h',
        params: ['m', 'g', 'h'],
        descrizione_it: 'Eₚ = mgh (vicino alla superficie terrestre).',
        descrizione_en: 'U = mgh (near Earth’s surface).'
      },
      {
        id: 'energia_meccanica_totale',
        nome_it: 'Energia meccanica totale',
        nome_en: 'Total mechanical energy',
        formula: 'Ek + Ep',
        params: ['Ek', 'Ep'],
        descrizione_it: 'E = Eₖ + Eₚ, somma di cinetica e potenziale.',
        descrizione_en: 'E = K + U, sum of kinetic and potential energy.'
      },
      {
        id: 'potenza_media',
        nome_it: 'Potenza media',
        nome_en: 'Average power',
        formula: 'L / t',
        params: ['L', 't'],
        descrizione_it: 'P = L / t, lavoro per unità di tempo.',
        descrizione_en: 'P = W / t, work per unit time.'
      },
      {
        id: 'potenza_istantanea',
        nome_it: 'Potenza istantanea',
        nome_en: 'Instantaneous power',
        formula: 'F * v * Math.cos(theta)',
        params: ['F', 'v', 'theta'],
        descrizione_it: 'P = F·v·cosθ, prodotto scalare F·v.',
        descrizione_en: 'P = F·v·cosθ, dot product F·v.'
      },
      {
        id: 'forza_elastica_hooke',
        nome_it: 'Forza elastica (Hooke)',
        nome_en: 'Elastic force (Hooke)',
        formula: '-k * x',
        params: ['k', 'x'],
        descrizione_it: 'F = −k·x, molla ideale di costante k.',
        descrizione_en: 'F = −k·x, ideal spring of constant k.'
      },
      {
        id: 'energia_potenziale_elastica',
        nome_it: 'Energia potenziale elastica',
        nome_en: 'Elastic potential energy',
        formula: '0.5 * k * x * x',
        params: ['k', 'x'],
        descrizione_it: 'Eₑ = ½kx², energia in una molla deformata.',
        descrizione_en: 'Uₑ = ½kx², energy in a stretched spring.'
      },
      {
        id: 'velocita_centripeta',
        nome_it: 'Accelerazione centripeta',
        nome_en: 'Centripetal acceleration',
        formula: 'v * v / r',
        params: ['v', 'r'],
        descrizione_it: 'a_c = v²/r per moto circolare uniforme.',
        descrizione_en: 'a_c = v²/r for uniform circular motion.'
      },
      {
        id: 'pressione',
        nome_it: 'Pressione',
        nome_en: 'Pressure',
        formula: 'F / A',
        params: ['F', 'A'],
        descrizione_it: 'p = F / A, forza per unità di superficie.',
        descrizione_en: 'p = F / A, force per unit area.'
      },
      {
        id: 'reazione_condensatore',
        nome_it: 'Reazione condensatore CA',
        nome_en: 'Capacitive reactance AC',
        formula: '1 / (2 * Math.PI * f * C)',
        params: ['f', 'C'],
        descrizione_it: 'X_C = 1/(2πfC), reazione in corrente alternata.',
        descrizione_en: 'X_C = 1/(2πfC), AC reactance.'
      },
      {
        id: 'reazione_induttore',
        nome_it: 'Reazione induttore CA',
        nome_en: 'Inductive reactance AC',
        formula: '2 * Math.PI * f * L',
        params: ['f', 'L'],
        descrizione_it: 'X_L = 2πfL, reazione in corrente alternata.',
        descrizione_en: 'X_L = 2πfL, AC reactance.'
      },
      {
        id: 'impedenza_semplice_rc',
        nome_it: 'Impedenza circuito RC serie',
        nome_en: 'Impedance RC series circuit',
        formula: 'Math.sqrt(R * R + (1 / (2 * Math.PI * f * C)) * (1 / (2 * Math.PI * f * C)))',
        params: ['R', 'f', 'C'],
        descrizione_it: 'Z = √(R² + X_C²).',
        descrizione_en: 'Z = √(R² + X_C²).'
      },
      {
        id: 'fattore_potenza_rc',
        nome_it: 'Fattore di potenza RC',
        nome_en: 'Power factor RC',
        formula: 'R / Math.sqrt(R * R + (1 / (2 * Math.PI * f * C)) * (1 / (2 * Math.PI * f * C)))',
        params: ['R', 'f', 'C'],
        descrizione_it: 'cosφ = R/Z.',
        descrizione_en: 'cosφ = R/Z.'
      },
      {
        id: 'costante_tempo_rc',
        nome_it: 'Costante di tempo circuito RC',
        nome_en: 'RC time constant',
        formula: 'R * C',
        params: ['R', 'C'],
        descrizione_it: 'τ = RC, costante di tempo circuito RC.',
        descrizione_en: 'τ = RC, RC circuit time constant.'
      },
      {
        id: 'costante_tempo_rl',
        nome_it: 'Costante di tempo circuito RL',
        nome_en: 'RL time constant',
        formula: 'L / R',
        params: ['L', 'R'],
        descrizione_it: 'τ = L/R, costante di tempo circuito RL.',
        descrizione_en: 'τ = L/R, RL circuit time constant.'
      },
      {
        id: 'reazione_condensatore',
        nome_it: 'Reazione condensatore CA',
        nome_en: 'Capacitive reactance AC',
        formula: '1 / (2 * Math.PI * f * C)',
        params: ['f', 'C'],
        descrizione_it: 'X_C = 1/(2πfC), reazione in corrente alternata.',
        descrizione_en: 'X_C = 1/(2πfC), AC reactance.'
      },
      {
        id: 'reazione_induttore',
        nome_it: 'Reazione induttore CA',
        nome_en: 'Inductive reactance AC',
        formula: '2 * Math.PI * f * L',
        params: ['f', 'L'],
        descrizione_it: 'X_L = 2πfL, reazione in corrente alternata.',
        descrizione_en: 'X_L = 2πfL, AC reactance.'
      },
      {
        id: 'impedenza_semplice_rc',
        nome_it: 'Impedenza circuito RC serie',
        nome_en: 'Impedance RC series circuit',
        formula: 'Math.sqrt(R * R + (1 / (2 * Math.PI * f * C)) * (1 / (2 * Math.PI * f * C)))',
        params: ['R', 'f', 'C'],
        descrizione_it: 'Z = √(R² + X_C²).',
        descrizione_en: 'Z = √(R² + X_C²).'
      },
      {
        id: 'fattore_potenza_rc',
        nome_it: 'Fattore di potenza RC',
        nome_en: 'Power factor RC',
        formula: 'R / Math.sqrt(R * R + (1 / (2 * Math.PI * f * C)) * (1 / (2 * Math.PI * f * C)))',
        params: ['R', 'f', 'C'],
        descrizione_it: 'cosφ = R/Z.',
        descrizione_en: 'cosφ = R/Z.'
      },
      {
        id: 'costante_tempo_rc',
        nome_it: 'Costante di tempo circuito RC',
        nome_en: 'RC time constant',
        formula: 'R * C',
        params: ['R', 'C'],
        descrizione_it: 'τ = RC, costante di tempo circuito RC.',
        descrizione_en: 'τ = RC, RC circuit time constant.'
      },
      {
        id: 'costante_tempo_rl',
        nome_it: 'Costante di tempo circuito RL',
        nome_en: 'RL time constant',
        formula: 'L / R',
        params: ['L', 'R'],
        descrizione_it: 'τ = L/R, costante di tempo circuito RL.',
        descrizione_en: 'τ = L/R, RL circuit time constant.'
      },
      {
        id: 'fattore_lorentz',
        nome_it: 'Fattore di Lorentz',
        nome_en: 'Lorentz factor',
        formula: '1 / Math.sqrt(1 - v * v / (c * c))',
        params: ['v', 'c'],
        descrizione_it: 'γ = 1/√(1 − v²/c²).',
        descrizione_en: 'γ = 1/√(1 − v²/c²).'
      },
      {
        id: 'dilatazione_tempo',
        nome_it: 'Dilatazione del tempo',
        nome_en: 'Time dilation',
        formula: 'dt0 * Math.sqrt(1 - v * v / (c * c))',
        params: ['dt0', 'v', 'c'],
        descrizione_it: 'Δt = Δt₀/γ = Δt₀√(1 − v²/c²).',
        descrizione_en: 'Δt = Δt₀√(1 − v²/c²).'
      },
      {
        id: 'contrazione_lunghezze',
        nome_it: 'Contrazione delle lunghezze',
        nome_en: 'Length contraction',
        formula: 'L0 * Math.sqrt(1 - v * v / (c * c))',
        params: ['L0', 'v', 'c'],
        descrizione_it: 'L = L₀√(1 − v²/c²).',
        descrizione_en: 'L = L₀√(1 − v²/c²).'
      },
      {
        id: 'energia_reposo',
        nome_it: 'Energia a riposo',
        nome_en: 'Rest energy',
        formula: 'm * c * c',
        params: ['m', 'c'],
        descrizione_it: 'E₀ = mc².',
        descrizione_en: 'E₀ = mc².'
      },
      {
        id: 'energia_relativistica_totale',
        nome_it: 'Energia relativistica totale',
        nome_en: 'Total relativistic energy',
        formula: 'gamma * m * c * c',
        params: ['gamma', 'm', 'c'],
        descrizione_it: 'E = γmc².',
        descrizione_en: 'E = γmc².'
      },
      {
        id: 'energia_cinetica_relativistica',
        nome_it: 'Energia cinetica relativistica',
        nome_en: 'Relativistic kinetic energy',
        formula: '(gamma - 1) * m * c * c',
        params: ['gamma', 'm', 'c'],
        descrizione_it: 'E_k = (γ − 1)mc².',
        descrizione_en: 'K = (γ − 1)mc².'
      },
      {
        id: 'momento_relativistico',
        nome_it: 'Momento relativistico',
        nome_en: 'Relativistic momentum',
        formula: 'gamma * m * v',
        params: ['gamma', 'm', 'v'],
        descrizione_it: 'p = γmv.',
        descrizione_en: 'p = γmv.'
      },
      {
        id: 'effetto_doppler_frequenza',
        nome_it: 'Effetto Doppler (frequenza)',
        nome_en: 'Doppler effect (frequency)',
        formula: 'f0 * c / (c - vs)',
        params: ['f0', 'c', 'vs'],
        descrizione_it: 'f = f₀c/(c − v_s), sorgente che si avvicina.',
        descrizione_en: 'f = f₀c/(c − v_s), source approaching.'
      },
      {
        id: 'fotoelettrico_frequenza_soglia',
        nome_it: 'Frequenza soglia fotoelettrico',
        nome_en: 'Photoelectric threshold frequency',
        formula: 'W / h',
        params: ['W', 'h'],
        descrizione_it: 'f₀ = W/h, energia lavoro diviso costante Planck.',
        descrizione_en: 'f₀ = W/h, work function over Planck constant.'
      },
      {
        id: 'lunghezza_onda_compton',
        nome_it: 'Spostamento Compton',
        nome_en: 'Compton shift',
        formula: 'h / (m * c) * (1 - Math.cos(theta))',
        params: ['h', 'm', 'c', 'theta'],
        descrizione_it: 'Δλ = (h/mc)(1 − cosθ).',
        descrizione_en: 'Δλ = (h/mc)(1 − cosθ).'
      },
      {
        id: 'pressione_idrostatica',
        nome_it: 'Pressione idrostatica',
        nome_en: 'Hydrostatic pressure',
        formula: 'rho * g * h',
        params: ['rho', 'g', 'h'],
        descrizione_it: 'p = ρgh, pressione a profondità h in un fluido.',
        descrizione_en: 'p = ρgh, pressure at depth h in a fluid.'
      },
      {
        id: 'spinta_archimede',
        nome_it: 'Spinta di Archimede',
        nome_en: 'Buoyant force',
        formula: 'rho * g * V',
        params: ['rho', 'g', 'V'],
        descrizione_it: 'F_A = ρgV, spinta verso l’alto su un corpo immerso.',
        descrizione_en: 'F_B = ρgV, upward force on a submerged body.'
      },
      {
        id: 'portata_volumetrica',
        nome_it: 'Portata volumetrica',
        nome_en: 'Volumetric flow rate',
        formula: 'A * v',
        params: ['A', 'v'],
        descrizione_it: 'Q = A·v, volume per unità di tempo.',
        descrizione_en: 'Q = A·v, volume per unit time.'
      },
      {
        id: 'equazione_continuita',
        nome_it: 'Equazione di continuità',
        nome_en: 'Continuity equation',
        formula: 'A1 * v1 - A2 * v2',
        params: ['A1', 'v1', 'A2', 'v2'],
        descrizione_it: 'A₁v₁ = A₂v₂ ⇒ A₁v₁ − A₂v₂ = 0 (fluido incomprimibile).',
        descrizione_en: 'A₁v₁ = A₂v₂ ⇒ A₁v₁ − A₂v₂ = 0 (incompressible fluid).'
      },
      {
        id: 'bernoulli_semplificata',
        nome_it: 'Bernoulli (forma semplificata)',
        nome_en: 'Bernoulli (simplified)',
        formula: 'p1 + 0.5 * rho * v1 * v1 - (p2 + 0.5 * rho * v2 * v2)',
        params: ['p1', 'v1', 'p2', 'v2', 'rho'],
        descrizione_it: 'p₁ + ½ρv₁² = p₂ + ½ρv₂² (stessa quota).',
        descrizione_en: 'p₁ + ½ρv₁² = p₂ + ½ρv₂² (same height).'
      },
      {
        id: 'numero_reynolds',
        nome_it: 'Numero di Reynolds',
        nome_en: 'Reynolds number',
        formula: 'rho * v * L / mu',
        params: ['rho', 'v', 'L', 'mu'],
        descrizione_it: 'Re = ρvL/μ, discrimina flusso laminare/turbolento.',
        descrizione_en: 'Re = ρvL/μ, distinguishes laminar/turbulent flow.'
      },
      {
        id: 'velocita_efflusso_torricelli',
        nome_it: 'Velocità di efflusso (Torricelli)',
        nome_en: 'Torricelli efflux speed',
        formula: 'Math.sqrt(2 * g * h)',
        params: ['g', 'h'],
        descrizione_it: 'v = √(2gh), uscita fluido in gravità.',
        descrizione_en: 'v = √(2gh), fluid efflux under gravity.'
      },
      {
        id: 'forza_lift_semplificata',
        nome_it: 'Portanza (forma semplificata)',
        nome_en: 'Lift force (simplified)',
        formula: '0.5 * rho * v * v * S * Cl',
        params: ['rho', 'v', 'S', 'Cl'],
        descrizione_it: 'F_L = ½ρv²SC_L, portanza su un profilo alare.',
        descrizione_en: 'F_L = ½ρv²SC_L, lift on an airfoil.'
      },
      {
        id: 'drag_semplificata',
        nome_it: 'Forza di resistenza (drag)',
        nome_en: 'Drag force',
        formula: '0.5 * rho * v * v * S * Cd',
        params: ['rho', 'v', 'S', 'Cd'],
        descrizione_it: 'F_D = ½ρv²SC_D, resistenza aerodinamica.',
        descrizione_en: 'F_D = ½ρv²SC_D, aerodynamic drag.'
      },
      {
        id: 'equazione_gas_ideale',
        nome_it: 'Equazione dei gas ideali',
        nome_en: 'Ideal gas law',
        formula: 'n * R * T',
        params: ['n', 'R', 'T'],
        descrizione_it: 'pV = nRT ⇒ restituisce pV per dati n, R, T.',
        descrizione_en: 'pV = nRT ⇒ returns pV for given n, R, T.'
      },
      {
        id: 'prima_legge_termodinamica',
        nome_it: 'Prima legge della termodinamica',
        nome_en: 'First law of thermodynamics',
        formula: 'Q + W',
        params: ['Q', 'W'],
        descrizione_it: 'ΔU = Q + W (con W lavoro fatto sul sistema).',
        descrizione_en: 'ΔU = Q + W (W work done on system).'
      },
      {
        id: 'calore_sensibile',
        nome_it: 'Calore sensibile',
        nome_en: 'Sensible heat',
        formula: 'm * c * dT',
        params: ['m', 'c', 'dT'],
        descrizione_it: 'Q = m·c·ΔT, scambio termico senza cambi di fase.',
        descrizione_en: 'Q = m·c·ΔT, heat without phase change.'
      },
      {
        id: 'lavoro_gas_isobaro',
        nome_it: 'Lavoro gas isobaro',
        nome_en: 'Work in isobaric process',
        formula: 'p * dV',
        params: ['p', 'dV'],
        descrizione_it: 'L = pΔV, lavoro in trasformazione a pressione costante.',
        descrizione_en: 'W = pΔV, work in constant‑pressure process.'
      },
      {
        id: 'rendimento_termico',
        nome_it: 'Rendimento termico',
        nome_en: 'Thermal efficiency',
        formula: 'L / Qh',
        params: ['L', 'Qh'],
        descrizione_it: 'η = L/Qₕ, rendimento macchina termica.',
        descrizione_en: 'η = W/Qₕ, heat engine efficiency.'
      },
      {
        id: 'rendimento_ciclo_carnot',
        nome_it: 'Rendimento ciclo di Carnot',
        nome_en: 'Carnot efficiency',
        formula: '1 - Tc / Th',
        params: ['Th', 'Tc'],
        descrizione_it: 'η_C = 1 − T_c/T_h (temperature in Kelvin).',
        descrizione_en: 'η_C = 1 − T_c/T_h (temperatures in Kelvin).'
      },
      {
        id: 'trasformazione_isoterma_lavoro',
        nome_it: 'Lavoro trasformazione isoterma gas ideale',
        nome_en: 'Work in isothermal ideal gas process',
        formula: 'n * R * T * Math.log(V2 / V1)',
        params: ['n', 'R', 'T', 'V1', 'V2'],
        descrizione_it: 'L = nRT ln(V₂/V₁) (gas ideale, isoterma).',
        descrizione_en: 'W = nRT ln(V₂/V₁) (ideal gas, isothermal).'
      },
      {
        id: 'trasformazione_adiabatica_pv',
        nome_it: 'Relazione adiabatica pV^γ',
        nome_en: 'Adiabatic relation pV^γ',
        formula: 'p * Math.pow(V, gamma)',
        params: ['p', 'V', 'gamma'],
        descrizione_it: 'pV^γ = costante ⇒ restituisce pV^γ.',
        descrizione_en: 'pV^γ = constant ⇒ returns pV^γ.'
      },
      {
        id: 'calore_latente',
        nome_it: 'Calore latente',
        nome_en: 'Latent heat',
        formula: 'm * Lf',
        params: ['m', 'Lf'],
        descrizione_it: 'Q = m·L, scambio termico di cambi di fase.',
        descrizione_en: 'Q = m·L, heat for phase changes.'
      },
      {
        id: 'capacita_termica_equivalente',
        nome_it: 'Capacità termica equivalente',
        nome_en: 'Equivalent heat capacity',
        formula: 'Q / dT',
        params: ['Q', 'dT'],
        descrizione_it: 'C = Q/ΔT, capacità termica globale di un sistema.',
        descrizione_en: 'C = Q/ΔT, overall heat capacity of a system.'
      },
      {
        id: 'forza_lorentz',
        nome_it: 'Forza di Lorentz (carica singola)',
        nome_en: 'Lorentz force (single charge)',
        formula: 'q * v * B * Math.sin(theta)',
        params: ['q', 'v', 'B', 'theta'],
        descrizione_it: 'F = qvB sinθ, forza su carica in moto in campo B.',
        descrizione_en: 'F = qvB sinθ, force on moving charge in B field.'
      },
      {
        id: 'flusso_magnetico',
        nome_it: 'Flusso magnetico',
        nome_en: 'Magnetic flux',
        formula: 'B * A * Math.cos(theta)',
        params: ['B', 'A', 'theta'],
        descrizione_it: 'Φ = BA cosθ, flusso attraverso area A.',
        descrizione_en: 'Φ = BA cosθ, flux through area A.'
      },
      {
        id: 'fem_indotta_faraday',
        nome_it: 'Fem indotta (Faraday)',
        nome_en: 'Induced emf (Faraday)',
        formula: '-dPhi / dt',
        params: ['dPhi', 'dt'],
        descrizione_it: 'ε = −ΔΦ/Δt, variazione di flusso magnetico.',
        descrizione_en: 'ε = −ΔΦ/Δt, change of magnetic flux.'
      },
      {
        id: 'velocita_onda',
        nome_it: 'Velocità di un’onda',
        nome_en: 'Wave speed',
        formula: 'lambda * f',
        params: ['lambda', 'f'],
        descrizione_it: 'v = λf, velocità di propagazione di un’onda.',
        descrizione_en: 'v = λf, wave propagation speed.'
      },
      {
        id: 'frequenza_onda',
        nome_it: 'Frequenza di un’onda',
        nome_en: 'Wave frequency',
        formula: 'v / lambda',
        params: ['v', 'lambda'],
        descrizione_it: 'f = v/λ, frequenza da velocità e lunghezza d’onda.',
        descrizione_en: 'f = v/λ, frequency from speed and wavelength.'
      },
      {
        id: 'indice_rifrazione',
        nome_it: 'Indice di rifrazione',
        nome_en: 'Index of refraction',
        formula: 'c / v',
        params: ['c', 'v'],
        descrizione_it: 'n = c/v, rapporto tra velocità nel vuoto e nel mezzo.',
        descrizione_en: 'n = c/v, ratio of vacuum to medium speed.'
      },
      {
        id: 'legge_snell',
        nome_it: 'Legge di Snell',
        nome_en: 'Snell’s law',
        formula: 'Math.asin(n1 * Math.sin(theta1) / n2)',
        params: ['n1', 'theta1', 'n2'],
        descrizione_it: 'Calcola θ₂ da n₁ sinθ₁ = n₂ sinθ₂ (radianti).',
        descrizione_en: 'Computes θ₂ from n₁ sinθ₁ = n₂ sinθ₂ (radians).'
      },
      {
        id: 'equazione_lenti_sottili',
        nome_it: 'Equazione lenti sottili',
        nome_en: 'Thin lens equation',
        formula: '1 / f - 1 / do',
        params: ['f', 'do'],
        descrizione_it: '1/f = 1/d_o + 1/d_i ⇒ restituisce 1/d_i = 1/f − 1/d_o.',
        descrizione_en: '1/f = 1/d_o + 1/d_i ⇒ returns 1/d_i = 1/f − 1/d_o.'
      },
      {
        id: 'ingrandimento_lineare_lente',
        nome_it: 'Ingrandimento lineare lente',
        nome_en: 'Lens magnification',
        formula: '-di / do',
        params: ['di', 'do'],
        descrizione_it: 'm = −d_i/d_o, rapporto tra immagine e oggetto.',
        descrizione_en: 'm = −d_i/d_o, image‑to‑object size ratio.'
      },
      {
        id: 'potenza_ottica_lente',
        nome_it: 'Potenza ottica di una lente',
        nome_en: 'Optical power of lens',
        formula: '1 / f',
        params: ['f'],
        descrizione_it: 'P = 1/f, potenza in diottrie se f in metri.',
        descrizione_en: 'P = 1/f, power in diopters if f in meters.'
      },
    ],

    finanziaria: [
      {
        id: 'interesse_composto',
        nome_it: 'Interesse composto',
        nome_en: 'Compound interest',
        formula: 'P * Math.pow(1 + r / n, n * t)',
        params: ['P', 'r', 'n', 't'],
        descrizione_it: 'A = P(1 + r/n)^(nt).',
        descrizione_en: 'A = P(1 + r/n)^(nt).'
      },
      {
        id: 'valore_attuale',
        nome_it: 'Valore attuale',
        nome_en: 'Present value',
        formula: 'FV / Math.pow(1 + r, n)',
        params: ['FV', 'r', 'n'],
        descrizione_it: 'PV = FV / (1 + r)^n.',
        descrizione_en: 'PV = FV / (1 + r)^n.'
      },
      {
        id: 'interesse_semplice',
        nome_it: 'Interesse semplice',
        nome_en: 'Simple interest',
        formula: 'P * r * t',
        params: ['P', 'r', 't'],
        descrizione_it: 'I = P·r·t, interesse semplice su capitale P.',
        descrizione_en: 'I = P·r·t, simple interest on principal P.'
      },
      {
        id: 'montante_semplice',
        nome_it: 'Montante interesse semplice',
        nome_en: 'Simple interest compound amount',
        formula: 'P * (1 + r * t)',
        params: ['P', 'r', 't'],
        descrizione_it: 'M = P(1 + rt), montante con interesse semplice.',
        descrizione_en: 'M = P(1 + rt), simple interest total.'
      },
      {
        id: 'valore_futuro_rendita_posticipata',
        nome_it: 'Valore futuro rendita posticipata',
        nome_en: 'Future value ordinary annuity',
        formula: 'R * (Math.pow(1 + i, n) - 1) / i',
        params: ['R', 'i', 'n'],
        descrizione_it: 'VF = R[(1 + i)^n − 1]/i, rendita posticipata.',
        descrizione_en: 'FV = R[(1 + i)^n − 1]/i, ordinary annuity.'
      },
      {
        id: 'valore_attuale_rendita_posticipata',
        nome_it: 'Valore attuale rendita posticipata',
        nome_en: 'Present value ordinary annuity',
        formula: 'R * (1 - Math.pow(1 + i, -n)) / i',
        params: ['R', 'i', 'n'],
        descrizione_it: 'VA = R[1 − (1 + i)^(-n)]/i.',
        descrizione_en: 'PV = R[1 − (1 + i)^(-n)]/i.'
      },
      {
        id: 'rata_rendita_posticipata',
        nome_it: 'Rata rendita posticipata',
        nome_en: 'Ordinary annuity payment',
        formula: 'P * i / (1 - Math.pow(1 + i, -n))',
        params: ['P', 'i', 'n'],
        descrizione_it: 'R = P·i / [1 − (1 + i)^(-n)].',
        descrizione_en: 'PMT = P·i / [1 − (1 + i)^(-n)].'
      },
      {
        id: 'valore_futuro_rendita_anticipata',
        nome_it: 'Valore futuro rendita anticipata',
        nome_en: 'Future value annuity due',
        formula: 'R * (Math.pow(1 + i, n) - 1) / i * (1 + i)',
        params: ['R', 'i', 'n'],
        descrizione_it: 'VF = R[(1 + i)^n − 1]/i · (1 + i).',
        descrizione_en: 'FV = ordinary FV × (1 + i).'
      },
      {
        id: 'valore_attuale_rendita_anticipata',
        nome_it: 'Valore attuale rendita anticipata',
        nome_en: 'Present value annuity due',
        formula: 'R * (1 - Math.pow(1 + i, -n)) / i * (1 + i)',
        params: ['R', 'i', 'n'],
        descrizione_it: 'VA = R[1 − (1 + i)^(-n)]/i · (1 + i).',
        descrizione_en: 'PV = ordinary PV × (1 + i).'
      },
      {
        id: 'rata_anticipata',
        nome_it: 'Rata rendita anticipata',
        nome_en: 'Annuity due payment',
        formula: 'P * i / (Math.pow(1 + i, n) - 1)',
        params: ['P', 'i', 'n'],
        descrizione_it: 'R = P·i / [(1 + i)^n − 1].',
        descrizione_en: 'PMT = P·i / [(1 + i)^n − 1].'
      },
      {
        id: 'rata_mutuo_francese',
        nome_it: 'Rata mutuo (francese)',
        nome_en: 'French mortgage payment',
        formula: 'P * i / (1 - Math.pow(1 + i, -n))',
        params: ['P', 'i', 'n'],
        descrizione_it: 'R = P·i / [1 − (1 + i)^(-n)], ammortamento costante.',
        descrizione_en: 'PMT = P·i / [1 − (1 + i)^(-n)], constant payment.'
      },
      {
        id: 'quota_interessi_mutuo',
        nome_it: 'Quota interessi rata mutuo',
        nome_en: 'Interest portion mortgage payment',
        formula: 'D * i',
        params: ['D', 'i'],
        descrizione_it: 'QI = debito_residuo · i.',
        descrizione_en: 'Interest = remaining_balance × i.'
      },
      {
        id: 'quota_capitale_mutuo',
        nome_it: 'Quota capitale rata mutuo',
        nome_en: 'Principal portion mortgage payment',
        formula: 'R - QI',
        params: ['R', 'QI'],
        descrizione_it: 'QC = R − QI.',
        descrizione_en: 'Principal = payment − interest.'
      },
      {
        id: 'debito_residuo_mutuo',
        nome_it: 'Debito residuo dopo k rate',
        nome_en: 'Remaining balance after k payments',
        formula: 'R * (1 - Math.pow(1 + i, -(n - k))) / i',
        params: ['R', 'i', 'n', 'k'],
        descrizione_it: 'DR_k = R[1 − (1 + i)^(-(n−k))]/i.',
        descrizione_en: 'Balance_k = PMT[1 − (1 + i)^(-(n−k))]/i.'
      },
      {
        id: 'costo_totale_interessi_mutuo',
        nome_it: 'Costo totale interessi mutuo',
        nome_en: 'Total interest cost mortgage',
        formula: 'R * n - P',
        params: ['R', 'n', 'P'],
        descrizione_it: 'I_tot = R·n − P.',
        descrizione_en: 'Total_interest = PMT×n − P.'
      },
      {
        id: 'durata_mutuo_da_capitale',
        nome_it: 'Durata mutuo da capitale e rata',
        nome_en: 'Loan term from principal and payment',
        formula: '-Math.log(1 - P * i / R) / Math.log(1 + i)',
        params: ['P', 'i', 'R'],
        descrizione_it: 'n = −log[1 − P·i/R] / log(1 + i).',
        descrizione_en: 'n = −log[1 − P·i/PMT] / log(1 + i).'
      },
      {
        id: 'tasso_irpef_semplice',
        nome_it: 'Tasso IRPEF semplice',
        nome_en: 'Simple tax rate',
        formula: 'I * aliquota',
        params: ['I', 'aliquota'],
        descrizione_it: 'Imposta = reddito · aliquota.',
        descrizione_en: 'Tax = income × rate.'
      },
      {
        id: 'imposta_progressiva_2_scaglioni',
        nome_it: 'Imposta progressiva 2 scaglioni',
        nome_en: 'Progressive tax 2 brackets',
        formula: 'I1 * a1 + (I - I1) * a2',
        params: ['I', 'I1', 'a1', 'a2'],
        descrizione_it: 'Imposta = I₁·a₁ + (I − I₁)·a₂.',
        descrizione_en: 'Tax = bracket1×rate1 + excess×rate2.'
      },
      {
        id: 'van_semplice_3_flussi',
        nome_it: 'VAN 3 flussi',
        nome_en: 'NPV 3 cash flows',
        formula: '-C0 + F1/(1+r) + F2/Math.pow(1+r,2) + F3/Math.pow(1+r,3)',
        params: ['C0', 'r', 'F1', 'F2', 'F3'],
        descrizione_it: 'VAN = −C₀ + Σ F_t/(1 + r)^t.',
        descrizione_en: 'NPV = −C₀ + Σ CF_t/(1 + r)^t.'
      },
      {
        id: 'payback_semplice',
        nome_it: 'Payback period semplice',
        nome_en: 'Simple payback period',
        formula: 'C0 / F',
        params: ['C0', 'F'],
        descrizione_it: 'PB = C₀/F, tempo recupero senza attualizzazione.',
        descrizione_en: 'PB = C₀/annual_CF, undiscounted payback.'
      },
      {
        id: 'payback_attualizzato',
        nome_it: 'Payback attualizzato',
        nome_en: 'Discounted payback',
        formula: 'C0 / (F / (1 + r))',
        params: ['C0', 'F', 'r'],
        descrizione_it: 'PB_att = C₀/(F/(1 + r)), con flussi attualizzati.',
        descrizione_en: 'Discounted PB = C₀/(CF/(1 + r)).'
      },
      {
        id: 'indice_profitabilità',
        nome_it: 'Indice di profittevolezza',
        nome_en: 'Profitability index',
        formula: '(VAN + C0) / C0',
        params: ['VAN', 'C0'],
        descrizione_it: 'IP = (VAN + C₀)/C₀.',
        descrizione_en: 'PI = (NPV + C₀)/C₀.'
      },
      {
        id: 'tasso_interno_rendimento_approx',
        nome_it: 'TIR approssimata',
        nome_en: 'IRR approximation',
        formula: '(F - C0) / (C0 * n)',
        params: ['F', 'C0', 'n'],
        descrizione_it: 'TIR ≈ (F − C₀)/(C₀·n), flusso annuo costante.',
        descrizione_en: 'IRR ≈ (F − C₀)/(C₀·n), constant annual flow.'
      },
      {
        id: 'roi_semplice',
        nome_it: 'ROI semplice',
        nome_en: 'Simple ROI',
        formula: '(Guadagno - Investimento) / Investimento',
        params: ['Guadagno', 'Investimento'],
        descrizione_it: '(G − I)/I, ritorno sull’investimento.',
        descrizione_en: '(Gain − Investment)/Investment.'
      },
      {
        id: 'roe',
        nome_it: 'ROE (Return on Equity)',
        nome_en: 'ROE',
        formula: 'Utile / Patrimonio',
        params: ['Utile', 'Patrimonio'],
        descrizione_it: 'ROE = Utile netto / Patrimonio netto.',
        descrizione_en: 'ROE = Net income / Equity.'
      },
      {
        id: 'roa',
        nome_it: 'ROA (Return on Assets)',
        nome_en: 'ROA',
        formula: 'Utile / Attivo',
        params: ['Utile', 'Attivo'],
        descrizione_it: 'ROA = Utile / Attivo totale.',
        descrizione_en: 'ROA = Net income / Total assets.'
      },
      {
        id: 'liquidita_corrente',
        nome_it: 'Liquidità corrente',
        nome_en: 'Current ratio',
        formula: 'Attivo_corrente / Passivo_corrente',
        params: ['Attivo_corrente', 'Passivo_corrente'],
        descrizione_it: 'Attività correnti / Passività correnti.',
        descrizione_en: 'Current assets / Current liabilities.'
      },
      {
        id: 'liquidita_immediata',
        nome_it: 'Liquidità immediata',
        nome_en: 'Quick ratio',
        formula: '(Attivo_corrente - Magazzino) / Passivo_corrente',
        params: ['Attivo_corrente', 'Magazzino', 'Passivo_corrente'],
        descrizione_it: '(Attività correnti − Magazzino) / Passività correnti.',
        descrizione_en: '(Current assets − Inventory) / Current liabilities.'
      },
      {
        id: 'liquidita_secca',
        nome_it: 'Liquidità secca',
        nome_en: 'Cash ratio',
        formula: 'Liquidita_immediata / Passivo_corrente',
        params: ['Liquidita_immediata', 'Passivo_corrente'],
        descrizione_it: 'Cassa e valori / Passività correnti.',
        descrizione_en: 'Cash and equivalents / Current liabilities.'
      },
      {
        id: 'indice_indebitamento',
        nome_it: 'Indice di indebitamento',
        nome_en: 'Debt ratio',
        formula: 'Debito_totale / Attivo_totale',
        params: ['Debito_totale', 'Attivo_totale'],
        descrizione_it: 'Debiti totali / Attivo totale.',
        descrizione_en: 'Total debt / Total assets.'
      },
      {
        id: 'debt_to_equity',
        nome_it: 'Debt-to-Equity ratio',
        nome_en: 'Debt-to-Equity ratio',
        formula: 'Debito_totale / Patrimonio_netto',
        params: ['Debito_totale', 'Patrimonio_netto'],
        descrizione_it: 'Debiti / Patrimonio netto.',
        descrizione_en: 'Total debt / Shareholders equity.'
      },
      {
        id: 'coverage_interest',
        nome_it: 'Coverage degli interessi',
        nome_en: 'Interest coverage ratio',
        formula: 'EBIT / Oneri_interessi',
        params: ['EBIT', 'Oneri_interessi'],
        descrizione_it: 'EBIT / Oneri finanziari.',
        descrizione_en: 'EBIT / Interest expense.'
      },
      {
        id: 'rotazione_magazzino',
        nome_it: 'Rotazione magazzino',
        nome_en: 'Inventory turnover',
        formula: 'Costo_vendite / Magazzino_medio',
        params: ['Costo_vendite', 'Magazzino_medio'],
        descrizione_it: 'Costo merci vendute / Magazzino medio.',
        descrizione_en: 'COGS / Average inventory.'
      },
      {
        id: 'giorni_magazzino',
        nome_it: 'Giorni di magazzino',
        nome_en: 'Days inventory outstanding',
        formula: '365 / Rotazione_magazzino',
        params: ['Rotazione_magazzino'],
        descrizione_it: '365 / Rotazione magazzino.',
        descrizione_en: '365 / Inventory turnover.'
      },
      {
        id: 'rotazione_crediti',
        nome_it: 'Rotazione crediti',
        nome_en: 'Receivables turnover',
        formula: 'Fatturato / Crediti_medio',
        params: ['Fatturato', 'Crediti_medio'],
        descrizione_it: 'Fatturato / Crediti medi.',
        descrizione_en: 'Sales / Average receivables.'
      },
      {
        id: 'giorni_incasso',
        nome_it: 'Giorni medi incasso',
        nome_en: 'Days sales outstanding',
        formula: '365 / Rotazione_crediti',
        params: ['Rotazione_crediti'],
        descrizione_it: '365 / Rotazione crediti.',
        descrizione_en: '365 / Receivables turnover.'
      },
      {
        id: 'margine_lordo',
        nome_it: 'Margine lordo %',
        nome_en: 'Gross margin %',
        formula: '(Ricavi - Costo_vendite) / Ricavi * 100',
        params: ['Ricavi', 'Costo_vendite'],
        descrizione_it: '(Ricavi − Costo vendite) / Ricavi × 100.',
        descrizione_en: '(Revenue − COGS) / Revenue × 100.'
      },
      {
        id: 'margine_operativo',
        nome_it: 'Margine operativo %',
        nome_en: 'Operating margin %',
        formula: 'EBIT / Ricavi * 100',
        params: ['EBIT', 'Ricavi'],
        descrizione_it: 'EBIT / Ricavi × 100.',
        descrizione_en: 'EBIT / Revenue × 100.'
      },
      {
        id: 'roe_du_pont',
        nome_it: 'ROE Du Pont',
        nome_en: 'Du Pont ROE',
        formula: 'Margine_netto * Rotazione_totale * Leva_finanziaria',
        params: ['Margine_netto', 'Rotazione_totale', 'Leva_finanziaria'],
        descrizione_it: 'ROE = Margine × ROT × Leva.',
        descrizione_en: 'ROE = Margin × ROT × Leverage.'
      },
      {
        id: 'rotazione_totale',
        nome_it: 'Rotazione totale',
        nome_en: 'Total asset turnover',
        formula: 'Ricavi / Attivo_totale',
        params: ['Ricavi', 'Attivo_totale'],
        descrizione_it: 'Ricavi / Attivo totale.',
        descrizione_en: 'Revenue / Total assets.'
      },
      {
        id: 'leva_finanziaria',
        nome_it: 'Leva finanziaria',
        nome_en: 'Financial leverage',
        formula: 'Attivo_totale / Patrimonio_netto',
        params: ['Attivo_totale', 'Patrimonio_netto'],
        descrizione_it: 'Attivo totale / Patrimonio netto.',
        descrizione_en: 'Total assets / Equity.'
      },
      {
        id: 'ebitda_margin',
        nome_it: 'EBITDA margin %',
        nome_en: 'EBITDA margin %',
        formula: 'EBITDA / Ricavi * 100',
        params: ['EBITDA', 'Ricavi'],
        descrizione_it: 'EBITDA / Ricavi × 100.',
        descrizione_en: 'EBITDA / Revenue × 100.'
      },
      {
        id: 'ros',
        nome_it: 'ROS (Return on Sales)',
        nome_en: 'ROS',
        formula: 'Utile_operativo / Ricavi * 100',
        params: ['Utile_operativo', 'Ricavi'],
        descrizione_it: 'Utile operativo / Ricavi × 100.',
        descrizione_en: 'Operating profit / Sales × 100.'
      },
      {
        id: 'roi_progetto',
        nome_it: 'ROI progetto',
        nome_en: 'Project ROI',
        formula: '(Beneficio - Costo) / Costo * 100',
        params: ['Beneficio', 'Costo'],
        descrizione_it: '(Beneficio − Costo) / Costo × 100.',
        descrizione_en: '(Benefit − Cost) / Cost × 100.'
      },
      {
        id: 'break_even_point_unita',
        nome_it: 'Break-even point (unità)',
        nome_en: 'Break-even point (units)',
        formula: 'Costi_fissi / (Prezzo - Costo_variabile_unitario)',
        params: ['Costi_fissi', 'Prezzo', 'Costo_variabile_unitario'],
        descrizione_it: 'CF / (P − CVu).',
        descrizione_en: 'Fixed costs / (Price − Variable cost per unit).'
      },
      {
        id: 'break_even_point_fatturato',
        nome_it: 'Break-even point (fatturato)',
        nome_en: 'Break-even point (revenue)',
        formula: 'Costi_fissi / Margine_contribuzione_unitario',
        params: ['Costi_fissi', 'Margine_contribuzione_unitario'],
        descrizione_it: 'CF / MCu.',
        descrizione_en: 'Fixed costs / Contribution margin per unit.'
      },
      {
        id: 'capitale_da_montante_semplice',
        nome_it: 'Capitale da montante semplice',
        nome_en: 'Principal from simple compound amount',
        formula: 'M / (1 + r * t)',
        params: ['M', 'r', 't'],
        descrizione_it: 'P = M / (1 + rt).',
        descrizione_en: 'P = M / (1 + rt).'
      },
      {
        id: 'tempo_interesse_semplice',
        nome_it: 'Tempo interesse semplice',
        nome_en: 'Time simple interest',
        formula: '(M - P) / (P * r)',
        params: ['P', 'M', 'r'],
        descrizione_it: 't = (M − P) / (P·r).',
        descrizione_en: 't = (M − P) / (P·r).'
      },
      {
        id: 'tasso_interesse_semplice',
        nome_it: 'Tasso interesse semplice',
        nome_en: 'Simple interest rate',
        formula: '(M - P) / (P * t)',
        params: ['P', 'M', 't'],
        descrizione_it: 'r = (M − P) / (P·t).',
        descrizione_en: 'r = (M − P) / (P·t).'
      },
      {
        id: 'perpetuita_semplice',
        nome_it: 'Perpetuità semplice',
        nome_en: 'Simple perpetuity',
        formula: 'R / r',
        params: ['R', 'r'],
        descrizione_it: 'VA = R/r, flusso costante perpetuo.',
        descrizione_en: 'PV = R/r, constant perpetuity.'
      },
      {
        id: 'perpetuita_crescente',
        nome_it: 'Perpetuità crescente',
        nome_en: 'Growing perpetuity',
        formula: 'R / (r - g)',
        params: ['R', 'r', 'g'],
        descrizione_it: 'VA = R/(r − g), con crescita g < r.',
        descrizione_en: 'PV = R/(r − g), growth g < r.'
      },
      {
        id: 'perpetuita_crescente_primo_flusso',
        nome_it: 'Perpetuità crescente (primo flusso futuro)',
        nome_en: 'Growing perpetuity (first CF next year)',
        formula: 'R * (1 + g) / (r - g)',
        params: ['R', 'r', 'g'],
        descrizione_it: 'VA = R(1 + g)/(r − g), primo flusso anno prossimo.',
        descrizione_en: 'PV = R(1 + g)/(r − g), first CF next year.'
      },
      {
        id: 'annuita_perpetua_fissa',
        nome_it: 'Annuity perpetua fissa',
        nome_en: 'Perpetual annuity fixed',
        formula: 'R * (1 - Math.pow(1 + r, -n)) / r + R / r',
        params: ['R', 'r', 'n'],
        descrizione_it: 'n anni + perpetuità dopo.',
        descrizione_en: 'n years + perpetuity after.'
      },
      {
        id: 'tasso_crescita_gordon',
        nome_it: 'Tasso crescita modello Gordon',
        nome_en: 'Growth rate Gordon model',
        formula: 'r - Dividendo / Prezzo',
        params: ['r', 'Dividendo', 'Prezzo'],
        descrizione_it: 'g = r − D/P.',
        descrizione_en: 'g = r − D/P.'
      },
      {
        id: 'prezzo_azionario_gordon',
        nome_it: 'Prezzo azione modello Gordon',
        nome_en: 'Stock price Gordon model',
        formula: 'D * (1 + g) / (r - g)',
        params: ['D', 'g', 'r'],
        descrizione_it: 'P = D₁/(r − g).',
        descrizione_en: 'P = D₁/(r − g).'
      },
      {
        id: 'duration_macaulay_semplice',
        nome_it: 'Duration Macaulay (2 flussi)',
        nome_en: 'Macaulay duration (2 CFs)',
        formula: '(1 * CF1 / (1 + y) + 2 * CF2 / Math.pow(1 + y, 2)) / (CF1 / (1 + y) + CF2 / Math.pow(1 + y, 2))',
        params: ['CF1', 'CF2', 'y'],
        descrizione_it: 'Durata media ponderata flussi attualizzati.',
        descrizione_en: 'Weighted average time of discounted CFs.'
      },
      {
        id: 'duration_modificata',
        nome_it: 'Duration modificata',
        nome_en: 'Modified duration',
        formula: 'D_mac / (1 + y / m)',
        params: ['D_mac', 'y', 'm'],
        descrizione_it: 'D_mod = D_mac/(1 + y/m).',
        descrizione_en: 'D_mod = D_mac/(1 + y/m).'
      },
      {
        id: 'variazione_prezzo_duration',
        nome_it: 'Variazione prezzo da duration',
        nome_en: 'Price change from duration',
        formula: '-D_mod * dy * P',
        params: ['D_mod', 'dy', 'P'],
        descrizione_it: 'ΔP ≈ −D_mod · Δy · P.',
        descrizione_en: 'ΔP ≈ −D_mod · Δy · P.'
      },
      {
        id: 'convexita_semplice',
        nome_it: 'Convexità semplice (2 flussi)',
        nome_en: 'Simple convexity (2 CFs)',
        formula: '(1 * 2 * CF1 / Math.pow(1 + y, 2) + 2 * 3 * CF2 / Math.pow(1 + y, 3)) / P',
        params: ['CF1', 'CF2', 'y', 'P'],
        descrizione_it: 'Misura curvatura prezzo-rendimento.',
        descrizione_en: 'Price-yield curvature measure.'
      },
      {
        id: 'gap_duration_immunizzazione',
        nome_it: 'Gap duration per immunizzazione',
        nome_en: 'Duration gap immunization',
        formula: 'D_passività - D_attività * (A / L)',
        params: ['D_passività', 'D_attività', 'A', 'L'],
        descrizione_it: 'Immunizza portafoglio contro variazioni tassi.',
        descrizione_en: 'Immunizes portfolio against rate changes.'
      },
      {
        id: 'scenario_base_case',
        nome_it: 'Scenario base case NPV',
        nome_en: 'Base case NPV',
        formula: '-I0 + F1/(1+r) + F2/Math.pow(1+r,2)',
        params: ['I0', 'r', 'F1', 'F2'],
        descrizione_it: 'VAN scenario base.',
        descrizione_en: 'Base case NPV.'
      },
      {
        id: 'scenario_best_case',
        nome_it: 'Scenario best case NPV',
        nome_en: 'Best case NPV',
        formula: '-I0 + F1_best/(1+r) + F2_best/Math.pow(1+r,2)',
        params: ['I0', 'r', 'F1_best', 'F2_best'],
        descrizione_it: 'VAN scenario ottimistico.',
        descrizione_en: 'Best case NPV.'
      },
      {
        id: 'scenario_worst_case',
        nome_it: 'Scenario worst case NPV',
        nome_en: 'Worst case NPV',
        formula: '-I0 + F1_worst/(1+r) + F2_worst/Math.pow(1+r,2)',
        params: ['I0', 'r', 'F1_worst', 'F2_worst'],
        descrizione_it: 'VAN scenario pessimistico.',
        descrizione_en: 'Worst case NPV.'
      },
      {
        id: 'sensitività_rendimento',
        nome_it: 'Sensitività NPV a rendimento',
        nome_en: 'NPV sensitivity to discount rate',
        formula: '(NPV_r1 - NPV_r2) / (r1 - r2)',
        params: ['NPV_r1', 'NPV_r2', 'r1', 'r2'],
        descrizione_it: 'Derivata parziale NPV rispetto a r.',
        descrizione_en: 'Partial derivative NPV w.r.t. r.'
      },
      {
        id: 'eva_economic_value_added',
        nome_it: 'EVA (Economic Value Added)',
        nome_en: 'EVA',
        formula: 'NOPAT - (WACC * Capitale_investito)',
        params: ['NOPAT', 'WACC', 'Capitale_investito'],
        descrizione_it: 'EVA = NOPAT − WACC·CI.',
        descrizione_en: 'EVA = NOPAT − WACC×CI.'
      },
      {
        id: 'mva_market_value_added',
        nome_it: 'MVA (Market Value Added)',
        nome_en: 'MVA',
        formula: 'Valore_mercato - Capitale_investito',
        params: ['Valore_mercato', 'Capitale_investito'],
        descrizione_it: 'MVA = Valore mercato − Capitale investito.',
        descrizione_en: 'MVA = Market value − Invested capital.'
      },
      {
        id: 'prezzo_call_base',
        nome_it: 'Prezzo call base (intrinseco)',
        nome_en: 'Call intrinsic value',
        formula: 'Math.max(S - K, 0)',
        params: ['S', 'K'],
        descrizione_it: 'Valore intrinseco call: max(S − K, 0).',
        descrizione_en: 'Call intrinsic: max(S − K, 0).'
      },
      {
        id: 'prezzo_put_base',
        nome_it: 'Prezzo put base (intrinseco)',
        nome_en: 'Put intrinsic value',
        formula: 'Math.max(K - S, 0)',
        params: ['S', 'K'],
        descrizione_it: 'Valore intrinseco put: max(K − S, 0).',
        descrizione_en: 'Put intrinsic: max(K − S, 0).'
      },
      {
        id: 'delta_call_approx',
        nome_it: 'Delta call approssimato',
        nome_en: 'Call delta approximation',
        formula: '1 / (1 + Math.exp(-d1))',
        params: ['d1'],
        descrizione_it: 'Δ_call ≈ N(d₁), modello Black-Scholes.',
        descrizione_en: 'Δ_call ≈ N(d₁), Black-Scholes model.'
      },
      {
        id: 'gamma_approx',
        nome_it: 'Gamma approssimato',
        nome_en: 'Gamma approximation',
        formula: 'n(d1) / (S * sigma * Math.sqrt(T))',
        params: ['d1', 'S', 'sigma', 'T'],
        descrizione_it: 'Γ ≈ n(d₁)/(Sσ√T).',
        descrizione_en: 'Γ ≈ n(d₁)/(Sσ√T).'
      },
      {
        id: 'vega_approx',
        nome_it: 'Vega approssimato',
        nome_en: 'Vega approximation',
        formula: 'S * n(d1) * Math.sqrt(T)',
        params: ['S', 'd1', 'T'],
        descrizione_it: 'Vega ≈ S·n(d₁)·√T.',
        descrizione_en: 'Vega ≈ S·n(d₁)·√T.'
      },
      {
        id: 'theta_call_approx',
        nome_it: 'Theta call approssimato',
        nome_en: 'Call theta approximation',
        formula: '-(S * n(d1) * sigma) / (2 * Math.sqrt(T))',
        params: ['S', 'd1', 'sigma', 'T'],
        descrizione_it: 'Θ_call ≈ −[S·n(d₁)·σ]/(2√T).',
        descrizione_en: 'Θ_call ≈ −[S·n(d₁)·σ]/(2√T).'
      },
      {
        id: 'volatilita_storica',
        nome_it: 'Volatilità storica annualizzata',
        nome_en: 'Historical volatility annualized',
        formula: 'sigma_g * Math.sqrt(252)',
        params: ['sigma_g'],
        descrizione_it: 'σ_ann = σ_giornaliera × √252.',
        descrizione_en: 'σ_ann = daily σ × √252.'
      },
      {
        id: 'var_parametrica',
        nome_it: 'Value at Risk parametrica',
        nome_en: 'Parametric VaR',
        formula: 'P * sigma * z * Math.sqrt(t)',
        params: ['P', 'sigma', 'z', 't'],
        descrizione_it: 'VaR = P·σ·z·√t.',
        descrizione_en: 'VaR = P·σ·z·√t.'
      },
      {
        id: 'var_storica',
        nome_it: 'VaR storica',
        nome_en: 'Historical VaR',
        formula: 'percentile_5_rendimenti * P',
        params: ['percentile_5_rendimenti', 'P'],
        descrizione_it: 'VaR_95% = 5° percentile rendimenti × P.',
        descrizione_en: 'VaR_95% = 5th percentile returns × P.'
      },
      {
        id: 'expected_shortfall',
        nome_it: 'Expected Shortfall (CVaR)',
        nome_en: 'Expected Shortfall (CVaR)',
        formula: 'media_perdite_tail / P',
        params: ['media_perdite_tail', 'P'],
        descrizione_it: 'ES = media perdite oltre VaR / P.',
        descrizione_en: 'ES = average losses beyond VaR / P.'
      },
      {
        id: 'rendimento_medio',
        nome_it: 'Rendimento medio annualizzato',
        nome_en: 'Annualized average return',
        formula: '(Prodotto_rendimenti^(1/n) - 1) * 100',
        params: ['Prodotto_rendimenti', 'n'],
        descrizione_it: 'R_med = [(∏R_i)^(1/n) − 1] × 100.',
        descrizione_en: 'R_med = [(∏R_i)^(1/n) − 1] × 100.'
      },
      {
        id: 'sharpe_ratio',
        nome_it: 'Sharpe ratio',
        nome_en: 'Sharpe ratio',
        formula: '(R_portfolio - R_rischiozero) / sigma_portfolio',
        params: ['R_portfolio', 'R_rischiozero', 'sigma_portfolio'],
        descrizione_it: '(R_p − R_f)/σ_p.',
        descrizione_en: '(R_p − R_f)/σ_p.'
      },
      {
        id: 'information_ratio',
        nome_it: 'Information ratio',
        nome_en: 'Information ratio',
        formula: '(R_portfolio - R_benchmark) / Tracking_error',
        params: ['R_portfolio', 'R_benchmark', 'Tracking_error'],
        descrizione_it: '(R_p − R_b)/TE.',
        descrizione_en: '(R_p − R_b)/TE.'
      },
      {
        id: 'beta_portfolio',
        nome_it: 'Beta portafoglio',
        nome_en: 'Portfolio beta',
        formula: 'Cov(R_p, R_m) / Var(R_m)',
        params: ['Cov_Rp_Rm', 'Var_Rm'],
        descrizione_it: 'β_p = Cov(R_p,R_m)/Var(R_m).',
        descrizione_en: 'β_p = Cov(R_p,R_m)/Var(R_m).'
      },
      {
        id: 'alpha_jensen',
        nome_it: 'Alpha di Jensen',
        nome_en: 'Jensen alpha',
        formula: 'R_p - (R_f + beta * (R_m - R_f))',
        params: ['R_p', 'R_f', 'beta', 'R_m'],
        descrizione_it: 'α = R_p − [R_f + β(R_m − R_f)].',
        descrizione_en: 'α = R_p − [R_f + β(R_m − R_f)].'
      },
      {
        id: 'treynor_ratio',
        nome_it: 'Treynor ratio',
        nome_en: 'Treynor ratio',
        formula: '(R_p - R_f) / beta',
        params: ['R_p', 'R_f', 'beta'],
        descrizione_it: '(R_p − R_f)/β.',
        descrizione_en: '(R_p − R_f)/β.'
      },
      {
        id: 'interesse_composto_annuo',
        nome_it: 'Interesse composto annuo',
        nome_en: 'Compound interest annual',
        formula: 'P * Math.pow(1 + r, n)',
        params: ['P', 'r', 'n'],
        descrizione_it: 'M = P(1 + r)^n, capitalizzazione annuale.',
        descrizione_en: 'M = P(1 + r)^n, annual compounding.'
      },
      {
        id: 'interesse_composto_periodi',
        nome_it: 'Interesse composto (periodi)',
        nome_en: 'Compound interest (periods)',
        formula: 'P * Math.pow(1 + r / m, m * t)',
        params: ['P', 'r', 'm', 't'],
        descrizione_it: 'M = P(1 + r/m)^(mt), m capitalizzazioni/anno.',
        descrizione_en: 'M = P(1 + r/m)^(mt), m compounds/year.'
      },
      {
        id: 'capitale_da_montante_composto',
        nome_it: 'Capitale da montante composto',
        nome_en: 'Principal from compound amount',
        formula: 'M / Math.pow(1 + r, n)',
        params: ['M', 'r', 'n'],
        descrizione_it: 'P = M / (1 + r)^n.',
        descrizione_en: 'P = M / (1 + r)^n.'
      },
      {
        id: 'periodi_composto',
        nome_it: 'Numero periodi interesse composto',
        nome_en: 'Number of compound periods',
        formula: 'Math.log(M / P) / Math.log(1 + r)',
        params: ['P', 'M', 'r'],
        descrizione_it: 'n = log(M/P) / log(1 + r).',
        descrizione_en: 'n = log(M/P) / log(1 + r).'
      },
      {
        id: 'tasso_composto',
        nome_it: 'Tasso composto equivalente',
        nome_en: 'Equivalent compound rate',
        formula: '(Math.pow(M / P, 1 / n) - 1)',
        params: ['P', 'M', 'n'],
        descrizione_it: 'r = (M/P)^(1/n) − 1.',
        descrizione_en: 'r = (M/P)^(1/n) − 1.'
      },
      {
        id: 'tasso_effettivo_annuo',
        nome_it: 'Tasso effettivo annuo (TEA)',
        nome_en: 'Effective annual rate (EAR)',
        formula: 'Math.pow(1 + r / m, m) - 1',
        params: ['r', 'm'],
        descrizione_it: 'TEA = (1 + r/m)^m − 1.',
        descrizione_en: 'EAR = (1 + r/m)^m − 1.'
      },
      {
        id: 'tasso_nominale_da_effettivo',
        nome_it: 'Tasso nominale da effettivo',
        nome_en: 'Nominal rate from effective',
        formula: 'm * (Math.pow(1 + r_eff, 1 / m) - 1)',
        params: ['r_eff', 'm'],
        descrizione_it: 'r_nom = m[(1 + r_eff)^(1/m) − 1].',
        descrizione_en: 'r_nom = m[(1 + r_eff)^(1/m) − 1].'
      },
      {
        id: 'tasso_equivalente_periodale',
        nome_it: 'Tasso equivalente periodale',
        nome_en: 'Equivalent periodic rate',
        formula: 'Math.pow(1 + r_ann, 1 / m) - 1',
        params: ['r_ann', 'm'],
        descrizione_it: 'i = (1 + r_ann)^(1/m) − 1.',
        descrizione_en: 'i = (1 + r_ann)^(1/m) − 1.'
      },
      {
        id: 'sconto_semplice',
        nome_it: 'Sconto semplice commerciale',
        nome_en: 'Simple discount',
        formula: 'D * r * t',
        params: ['D', 'r', 't'],
        descrizione_it: 'Sd = D·r·t, sconto su valore nominale D.',
        descrizione_en: 'Sd = D·r·t, discount on nominal value D.'
      },
      {
        id: 'valore_effettivo_scontato',
        nome_it: 'Valore effettivo da sconto semplice',
        nome_en: 'Effective value simple discount',
        formula: 'D * (1 - r * t)',
        params: ['D', 'r', 't'],
        descrizione_it: 'Ve = D(1 − rt).',
        descrizione_en: 'Ve = D(1 − rt).'
      },
      {
        id: 'valore_nominale_scontato',
        nome_it: 'Valore nominale da sconto semplice',
        nome_en: 'Nominal value simple discount',
        formula: 'Ve / (1 - r * t)',
        params: ['Ve', 'r', 't'],
        descrizione_it: 'D = Ve / (1 − rt).',
        descrizione_en: 'D = Ve / (1 − rt).'
      },
      {
        id: 'sconto_composto',
        nome_it: 'Sconto composto',
        nome_en: 'Compound discount',
        formula: 'D * Math.pow(1 - r, n)',
        params: ['D', 'r', 'n'],
        descrizione_it: 'Ve = D(1 − r)^n.',
        descrizione_en: 'Ve = D(1 − r)^n.'
      },
      {
        id: 'valore_attuale_semplice',
        nome_it: 'Valore attuale (semplice)',
        nome_en: 'Present value (simple)',
        formula: 'FV / (1 + r * t)',
        params: ['FV', 'r', 't'],
        descrizione_it: 'VA = FV / (1 + rt).',
        descrizione_en: 'PV = FV / (1 + rt).'
      },
      {
        id: 'valore_attuale_composto',
        nome_it: 'Valore attuale composto',
        nome_en: 'Present value compound',
        formula: 'FV / Math.pow(1 + r, n)',
        params: ['FV', 'r', 'n'],
        descrizione_it: 'VA = FV / (1 + r)^n.',
        descrizione_en: 'PV = FV / (1 + r)^n.'
      },

    ]
  };

  // Se ti serve altrove
  window.formulasData = formulasData;

 // =====================================================
  // 2) FORMATO ITALIANO: 4 DECIMALI + VIRGOLA
  // =====================================================
  function formatNumberIT(num) {
    return num.toLocaleString('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });
  }

  // =====================================================
  // 3) FUNZIONI DI SUPPORTO
  // =====================================================
  const getLang = () =>
    typeof window.currentLang === 'function' ? window.currentLang() : 'it';

  // eval robusta per formule stringa (usa Math.*, niente caratteri strani)
  function evalFormula(formula, paramsObj) {
    const keys = Object.keys(paramsObj);
    const values = Object.values(paramsObj);
    const fn = new Function(...keys, `return ${formula};`);
    return fn(...values);
  }

  // =====================================================
  // 4) POPOLAMENTO SELECT
  // =====================================================
  function populateFormuleCategories() {
    catSelect.innerHTML = '<option value="">Seleziona categoria</option>';
    Object.keys(formulasData).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      catSelect.appendChild(opt);
    });
  }

  function populateFormulas(catKey) {
    formulaSelect.innerHTML = '<option value="">Seleziona formula</option>';
    if (!catKey || !formulasData[catKey]) return;

    const lang = getLang();
    formulasData[catKey].forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = lang === 'it' ? f.nome_it : f.nome_en;
      formulaSelect.appendChild(opt);
    });
  }

  // =====================================================
  // 5) RENDER FORMULA + INPUT + RISULTATO FORMATTATO
  // =====================================================
  function renderFormulaDetails(catKey, formulaId) {
    calculationArea.innerHTML = '';
    formulaResult.textContent = '';
    formulaResult.className = 'result';

    if (!catKey || !formulaId) {
      descrizioneFormula.textContent = '';
      return;
    }

    const lang = getLang();
    const f = formulasData[catKey]?.find(x => x.id === formulaId);
    if (!f) {
      descrizioneFormula.textContent = '';
      return;
    }

    const descr = lang === 'it' ? f.descrizione_it : f.descrizione_en;
    descrizioneFormula.innerHTML =
      `<strong>${lang === 'it' ? f.nome_it : f.nome_en}</strong><br>` +
      `<code>${f.formula}</code><br>` +
      `<small>${descr}</small>`;

    const formEl = document.createElement('div');

    f.params.forEach(p => {
      const label = document.createElement('label');
      label.textContent = p;
      label.style.display = 'block';
      label.style.marginTop = '6px';

      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.className = 'input-field';
      input.id = `param_${p}`;

      label.appendChild(input);
      formEl.appendChild(label);
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.textContent = window.translations?.[getLang()]?.calcola || '🧮 Calcola';
    btn.style.marginTop = '10px';

    btn.addEventListener('click', () => {
      const paramsObj = {};
      let hasError = false;

      f.params.forEach(p => {
        const v = parseFloat(document.getElementById(`param_${p}`).value);
        if (isNaN(v)) hasError = true;
        else paramsObj[p] = v;
      });

      if (hasError) {
        formulaResult.textContent =
          window.translations?.[getLang()]?.selezionaTutti ||
          '❌ Inserisci tutti i valori';
        formulaResult.className = 'result error';
        return;
      }

      try {
        const res = evalFormula(f.formula, paramsObj);
        formulaResult.innerHTML = `<strong>Risultato: ${formatNumberIT(res)}</strong>`;
        formulaResult.className = 'result success';
      } catch (e) {
        console.error(e);
        formulaResult.textContent = '❌ Errore nella formula.';
        formulaResult.className = 'result error';
      }
    });

    formEl.appendChild(btn);
    calculationArea.appendChild(formEl);
  }

  // =====================================================
  // 6) EVENT LISTENER + INIT
  // =====================================================
  catSelect.addEventListener('change', () => {
    populateFormulas(catSelect.value);
    renderFormulaDetails(null, null);
  });

  formulaSelect.addEventListener('change', () => {
    renderFormulaDetails(catSelect.value, formulaSelect.value);
  });

  window.populateFormuleCategories = populateFormuleCategories;

  populateFormuleCategories();
});