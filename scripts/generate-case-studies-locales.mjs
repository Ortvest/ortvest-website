/**
 * Generates pl.json and ua.json from en.json using locale overrides.
 * Run: node scripts/generate-case-studies-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'case-studies/en.json'), 'utf8'));

function deepMerge(base, patch) {
  if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) return patch ?? base;
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    out[k] = k in base && typeof base[k] === 'object' && !Array.isArray(base[k]) ? deepMerge(base[k], v) : v;
  }
  return out;
}

const pl = deepMerge(en, {
  shared: {
    process: {
      title: 'Jak to zbudowaliśmy',
      steps: {
        discovery: { title: 'Discovery', description: 'Zmapowaliśmy cele, flow użytkownika, ograniczenia i edge case’y przed kodem.' },
        design: { title: 'Design', description: 'UX, język wizualny i kluczowe ekrany zgodne ze strategią produktu.' },
        build: { title: 'Build', description: 'Rdzeń funkcji, integracje i ścieżki krytyczne dla wydajności.' },
        launch: { title: 'Launch', description: 'Wdrożenie z monitoringiem, onboardingiem i wsparciem po starcie.' },
      },
    },
    features: { title: 'Kluczowe funkcje', subtitle: 'Co zaprojektowaliśmy i zbudowaliśmy w tym projekcie.' },
    gallery: { screens: 'Ekrany produktu', work: 'Galeria projektu', brand: 'Materiały brandowe' },
    nextCase: { label: 'Następny projekt' },
    cta: {
      p2p: { title: 'Budujesz produkt P2P lub marketplace?', subtitle: 'Porozmawiajmy o Twoim pomyśle.', button: 'Napisz do nas' },
      community: { title: 'Budujesz platformę społecznościową?', subtitle: 'Porozmawiajmy o Twoim produkcie.', button: 'Napisz do nas' },
      logistics: { title: 'Budujesz produkt logistyczny?', subtitle: 'Omówmy Twoje oprogramowanie operacyjne.', button: 'Napisz do nas' },
      conversion: { title: 'Potrzebujesz strony z wysoką konwersją?', subtitle: 'Dopracujmy przekaz i design.', button: 'Napisz do nas' },
      brand: { title: 'Potrzebujesz identyfikacji wizualnej?', subtitle: 'Stwórzmy coś zapadającego w pamięć.', button: 'Napisz do nas' },
      product: { title: 'Masz pomysł na produkt?', subtitle: 'Omówmy zakres, harmonogram i podejście.', button: 'Napisz do nas' },
    },
  },
});

const ua = deepMerge(en, {
  shared: {
    process: {
      title: 'Як ми це будували',
      steps: {
        discovery: { title: 'Discovery', description: 'Змоделювали цілі, user flow, обмеження та edge cases до коду.' },
        design: { title: 'Design', description: 'UX, візуальну мову та ключові екрани відповідно до стратегії продукту.' },
        build: { title: 'Build', description: 'Реалізували ключові функції, інтеграції та критичні для швидкодії шляхи.' },
        launch: { title: 'Launch', description: 'Запуск з моніторингом, онбордингом і підтримкою після релізу.' },
      },
    },
    features: { title: 'Ключові функції', subtitle: 'Що ми спроєктували та реалізували в цьому проєкті.' },
    gallery: { screens: 'Екрани продукту', work: 'Галерея проєкту', brand: 'Брендові матеріали' },
    nextCase: { label: 'Наступний кейс' },
    cta: {
      p2p: { title: 'Будуєте P2P або маркетплейс?', subtitle: 'Давайте обговоримо вашу ідею.', button: 'Написати нам' },
      community: { title: 'Будуєте платформу спільноти?', subtitle: 'Давайте обговоримо ваш продукт.', button: 'Написати нам' },
      logistics: { title: 'Будуєте логістичний продукт?', subtitle: 'Обговоримо ваше операційне ПЗ.', button: 'Написати нам' },
      conversion: { title: 'Потрібен сайт з високою конверсією?', subtitle: 'Допрацюємо меседж і дизайн.', button: 'Написати нам' },
      brand: { title: 'Потрібна айдентика бренду?', subtitle: 'Створимо щось запам’ятовуване.', button: 'Написати нам' },
      product: { title: 'Є ідея продукту?', subtitle: 'Обговоримо scope, терміни та підхід.', button: 'Написати нам' },
    },
  },
});

/** Per-case overrides: meta, hero, stats labels, challenge, solution, feature subtitles + items, gallery captions */
const caseLocales = {
  pl: {
    yachtmate: {
      meta: { title: 'YachtMate — Prywatna sieć klubu jachtowego | Ortvest', description: 'Jak Ortvest zbudowało bezpieczną sieć członków z weryfikacją, czatem na żywo i zarządzaniem wydarzeniami.' },
      hero: { subtitle: 'Prywatna sieć społecznościowa dla członków klubu jachtowego — bezpieczna komunikacja, wydarzenia i zweryfikowany katalog.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Platforma społecznościowa' }, deliverables: { label: 'Zakres', value: 'Design + Dev' }, platform: { label: 'Platforma', value: 'Web' } },
      challenge: 'Kluby jachtowe potrzebowały zamkniętej sieci, w której członkowie komunikują się bez publicznych kanałów. Wyzwanie: czat na żywo, weryfikacja i koordynacja wydarzeń za ścisłą kontrolą prywatności.',
      solution: 'Zbudowaliśmy YachtMate z weryfikacją członków, rolami, czatem w czasie rzeczywistym i narzędziami eventowymi. React i Node.js zapewniają niskie opóźnienia przy zachowaniu prywatności danych.',
    },
    sharingground: {
      meta: { title: 'SharingGround — Platforma P2P do wymiany rzeczy | Ortvest', description: 'Platforma peer-to-peer z weryfikacją, escrow, śledzeniem przedmiotów i ubezpieczeniem.' },
      hero: { subtitle: 'Platforma P2P do wypożyczania i wymiany rzeczy w społeczności — z weryfikacją, śledzeniem i bezpiecznymi płatnościami.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Marketplace P2P' }, deliverables: { label: 'Zakres', value: 'Design + Dev' }, platform: { label: 'Platforma', value: 'Web + Mobile' } },
      challenge: 'Platforma sharingowa, gdzie nieznajomi powierzają sobie rzeczy. Jak zapewnić odpowiedzialność i rozwiązywać spory bez bycia pośrednikiem w każdej transakcji?',
      solution: 'Warstwa zaufania: weryfikacja, logi stanu, ubezpieczenie, opinie. Płatności w escrow do potwierdzenia wymiany przez obie strony.',
    },
    profitcraft: {
      meta: { title: 'ProfitCraft — Strona credit-building | Ortvest', description: 'Strona konwersyjna dla usługi budowania kredytu w USA.' },
      hero: { subtitle: 'Strona oparta na zaufaniu — ścieżki budowania kredytu i leady dla nowych mieszkańców USA.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Strona konwersyjna' }, deliverables: { label: 'Zakres', value: 'Design + Dev' }, platform: { label: 'Platforma', value: 'Web' } },
      challenge: 'Nowi mieszkańcy USA nie znają roli kredytu. Potrzebna była strona budująca zaufanie i konwertująca bez żargonu.',
      solution: 'Narracja: problem, ścieżka, dowód, akcja. Typografia, sygnały zaufania i CTA prowadzące do kontaktu.',
    },
    skisailclub: {
      meta: { title: 'Ski&Sail Club — Rezerwacja rejsów | Ortvest', description: 'Platforma klubu: trasy, rezerwacje i społeczność.' },
      hero: { subtitle: 'Cyfrowy dom klubu — trasy, rezerwacje i społeczność żeglarzy.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Hospitality + Community' }, deliverables: { label: 'Zakres', value: 'Development' }, platform: { label: 'Platforma', value: 'Web' } },
      challenge: 'Jedna platforma dla nowicjuszy i doświadczonych — rejsy, booking i społeczność z emocją żeglarstwa.',
      solution: 'Szybka platforma Next.js z bookingiem, trasami i profilami członków w spójnym doświadczeniu.',
    },
    navexa: {
      meta: { title: 'Navexa — Platforma logistyczna | Ortvest', description: 'Flota, trasy, monitoring przesyłek oraz marketing produktu. Projekt NDA.' },
      hero: { subtitle: 'Platforma logistyczna — flota, trasy, monitoring oraz marketing wspierający pozycjonowanie i pozyskiwanie klientów B2B.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Logistics SaaS' }, deliverables: { label: 'Zakres', value: 'Development + Marketing' }, platform: { label: 'Platforma', value: 'Web' } },
      challenge: 'Jeden system operacyjny oraz marketing, który jasno komunikuje wartość platformy i przyciąga klientów B2B.',
      solution: 'Dashboard z GPS i analityką oraz materiały marketingowe i przekaz produktowy dla operatorów flot.',
    },
    teya: {
      meta: { title: 'Teya Logistics — Landing page | Ortvest', description: 'Nowoczesna strona logistyczna pod leady.' },
      hero: { subtitle: 'Landing dla firmy transportowej — usługi, branding i szybka wycena.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Strona marketingowa' }, deliverables: { label: 'Zakres', value: 'Design + Dev' }, platform: { label: 'Platforma', value: 'Web' } },
      challenge: 'Jasna prezentacja usług i zaufanie bez żargonu logistycznego.',
      solution: 'Responsywna strona z blokami usług, przewagami i wyraźnymi CTA do wyceny.',
    },
    mie: {
      meta: { title: 'Mie — Inteligentna lista zakupów AI | Ortvest', description: 'Aplikacja z AI, stanem spiżarni i przypomnieniami. NDA.' },
      hero: { subtitle: 'Lista zakupów z AI — stan spiżarni, przepisy i przypomnienia.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Aplikacja mobilna' }, deliverables: { label: 'Zakres', value: 'Development' }, platform: { label: 'Platforma', value: 'iOS + Android' } },
      challenge: 'Listy nie działają bez realnego stanu spiżarni. AI ma śledzić zapasy i sugerować zakupy.',
      solution: 'React Native z AI, dopasowaniem przepisów i uczeniem się nawyków zakupowych.',
    },
    reskin: {
      meta: { title: '[Re.] skin&hair — Identyfikacja marki | Ortvest', description: 'Minimalistyczna identyfikacja linii beauty.' },
      hero: { subtitle: 'Minimalistyczny system marki dla pielęgnacji skóry i włosów — premium i spójność.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Identyfikacja marki' }, deliverables: { label: 'Zakres', value: 'Design' }, platform: { label: 'Zakres', value: 'Print + Digital' } },
      challenge: 'Marka w tłumie kategorii beauty — premium bez chłodnego minimalizmu.',
      solution: 'Logo, paleta, typografia, opakowania i wytyczne — organiczne kształty i ciepłe neutrale.',
    },
    gambit: {
      meta: { title: 'Gambit — UI strony www | Ortvest', description: 'Nowoczesny UI z hierarchią i typografią.' },
      hero: { subtitle: 'Nowoczesny UI — typografia, hierarchia i whitespace pod konwersję.' },
      stats: { projectType: { label: 'Typ projektu', value: 'UI Design' }, deliverables: { label: 'Zakres', value: 'Design' }, platform: { label: 'Zakres', value: 'Web UI' } },
      challenge: 'Odświeżenie wizualne bez utraty rozpoznawalności marki.',
      solution: 'Skala typograficzna, komponenty i whitespace — jasna hierarchia na każdej sekcji.',
    },
    'navexa-logo': {
      meta: { title: 'Logo Navexa | Ortvest', description: 'Logo logistyczne — precyzja i warianty jasne/ciemne.' },
      hero: { subtitle: 'Logo dla firmy logistycznej — nawigacja, precyzja, warianty na każde medium.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Logo' }, deliverables: { label: 'Zakres', value: 'Design' }, platform: { label: 'Zakres', value: 'Print + Digital' } },
      challenge: 'Logo na dashboardy, pojazdy i dokumenty — jasne i ciemne tło.',
      solution: 'Minimalistyczny znak z geometrią i wariantami kolorystycznymi do skalowania.',
    },
    'ortvest-logo': {
      meta: { title: 'Logo Ortvest | Ortvest', description: 'Znak studia IT — innowacja i skalowalność.' },
      hero: { subtitle: 'Znak studia IT — geometria, innowacja, warianty pod produkt i korporację.' },
      stats: { projectType: { label: 'Typ projektu', value: 'Logo' }, deliverables: { label: 'Zakres', value: 'Design' }, platform: { label: 'Zakres', value: 'Digital-first' } },
      challenge: 'Logo od favicon do decków i UI produktów.',
      solution: 'Znak z wariantami light/dark i wytycznymi digital-first.',
    },
  },
  ua: {
    yachtmate: {
      meta: { title: 'YachtMate — Приватна мережа яхт-клубу | Ortvest', description: 'Безпечна мережа учасників з верифікацією, чатом у реальному часі та подіями.' },
      hero: { subtitle: 'Приватна соцмережа для членів яхт-клубу — безпечна комунікація, події та верифікований каталог.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Платформа спільноти' }, deliverables: { label: 'Результат', value: 'Design + Dev' }, platform: { label: 'Платформа', value: 'Web' } },
      challenge: 'Клубам потрібна закрита мережа без публічних каналів. Виклик: чат, верифікація та події під суворим контролем приватності.',
      solution: 'YachtMate з верифікацією, ролями, чатом і інструментами подій. React і Node.js — низька затримка та приватність даних.',
    },
    sharingground: {
      meta: { title: 'SharingGround — P2P платформа обміну речами | Ortvest', description: 'P2P з верифікацією, ескроу, відстеженням і страхуванням.' },
      hero: { subtitle: 'P2P-платформа оренди та обміну речами в спільноті — верифікація, відстеження, безпечні платежі.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'P2P Marketplace' }, deliverables: { label: 'Результат', value: 'Design + Dev' }, platform: { label: 'Платформа', value: 'Web + Mobile' } },
      challenge: 'Незнайомі довіряють одне одному речі. Як забезпечити відповідальність і спори без посередництва в кожній угоді?',
      solution: 'Шар довіри: верифікація, логи стану, страхування, відгуки. Ескроу до підтвердження обміну обома сторонами.',
    },
    profitcraft: {
      meta: { title: 'ProfitCraft — Сайт credit-building | Ortvest', description: 'Конверсійний сайт для послуги кредитної історії в США.' },
      hero: { subtitle: 'Сайт на довірі — шляхи побудови кредиту та ліди для новачків у фінансовій системі США.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Conversion Site' }, deliverables: { label: 'Результат', value: 'Design + Dev' }, platform: { label: 'Платформа', value: 'Web' } },
      challenge: 'Новачки не розуміють роль кредиту. Потрібен сайт, що будує довіру та конвертує без жаргону.',
      solution: 'Наратив: проблема, шлях, доказ, дія. Типографіка, trust signals і CTA до контакту.',
    },
    skisailclub: {
      meta: { title: 'Ski&Sail Club — Бронювання яхтенних поїздок | Ortvest', description: 'Платформа клубу: маршрути, бронювання, спільнота.' },
      hero: { subtitle: 'Цифровий дім клубу — маршрути, бронювання та спільнота яхтсменів.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Hospitality + Community' }, deliverables: { label: 'Результат', value: 'Development' }, platform: { label: 'Платформа', value: 'Web' } },
      challenge: 'Одна платформа для новачків і досвідчених — поїздки, бронювання, емоція вітрильності.',
      solution: 'Швидка платформа Next.js з бронюванням, маршрутами та профілями в єдиному досвіді.',
    },
    navexa: {
      meta: { title: 'Navexa — Логістична платформа | Ortvest', description: 'Флот, маршрути, моніторинг відправлень і маркетинг продукту. NDA.' },
      hero: { subtitle: 'Логістична платформа — флот, маршрути, моніторинг і маркетинг для позиціонування та залучення B2B-клієнтів.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Logistics SaaS' }, deliverables: { label: 'Результат', value: 'Development + Marketing' }, platform: { label: 'Платформа', value: 'Web' } },
      challenge: 'Єдина операційна система та маркетинг, який чітко пояснює цінність платформи й залучає B2B-клієнтів.',
      solution: 'Dashboard з GPS і аналітикою, а також маркетингові матеріали та меседжинг для операторів флотів.',
    },
    teya: {
      meta: { title: 'Teya Logistics — Лендінг | Ortvest', description: 'Сучасний лендінг логістичної компанії під ліди.' },
      hero: { subtitle: 'Лендінг транспортної компанії — послуги, брендинг і швидкий запит ціни.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Marketing Site' }, deliverables: { label: 'Результат', value: 'Design + Dev' }, platform: { label: 'Платформа', value: 'Web' } },
      challenge: 'Чітко подати послуги та довіру без перевантаження логістичним жаргоном.',
      solution: 'Адаптивний лендінг з блоками послуг, перевагами та CTA на запит пропозиції.',
    },
    mie: {
      meta: { title: 'Mie — Розумний список покупок з AI | Ortvest', description: 'Додаток з AI, запасами та нагадуваннями. NDA.' },
      hero: { subtitle: 'Список покупок з AI — запаси комори, рецепти та нагадування.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Mobile App' }, deliverables: { label: 'Результат', value: 'Development' }, platform: { label: 'Платформа', value: 'iOS + Android' } },
      challenge: 'Списки не працюють без реального стану комори. AI має відстежувати запаси та пропонувати покупки.',
      solution: 'React Native з AI, підбором рецептів і навчанням на звичках користувача.',
    },
    reskin: {
      meta: { title: '[Re.] skin&hair — Айдентика бренду | Ortvest', description: 'Мінімалістична айдентика beauty-лінійки.' },
      hero: { subtitle: 'Мінімалістична система бренду для догляду за шкірою та волоссям — premium і цілісність.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Brand Identity' }, deliverables: { label: 'Результат', value: 'Design' }, platform: { label: 'Обсяг', value: 'Print + Digital' } },
      challenge: 'Бренд у насиченій категорії — premium без холодного мінімалізму.',
      solution: 'Логотип, палітра, типографіка, упаковка та гайдлайни — органічні форми та теплі нейтралі.',
    },
    gambit: {
      meta: { title: 'Gambit — UI веб-сайту | Ortvest', description: 'Сучасний UI з ієрархією та типографікою.' },
      hero: { subtitle: 'Сучасний UI — типографіка, ієрархія та whitespace під конверсію.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'UI Design' }, deliverables: { label: 'Результат', value: 'Design' }, platform: { label: 'Обсяг', value: 'Web UI' } },
      challenge: 'Візуальне оновлення без втрати впізнаваності бренду.',
      solution: 'Типографічна шкала, компоненти та whitespace — чітка ієрархія на кожній секції.',
    },
    'navexa-logo': {
      meta: { title: 'Логотип Navexa | Ortvest', description: 'Логотип логістики — точність і світлі/темні варіанти.' },
      hero: { subtitle: 'Логотип логістичної компанії — навігація, точність, варіанти для будь-якого носія.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Logo Design' }, deliverables: { label: 'Результат', value: 'Design' }, platform: { label: 'Обсяг', value: 'Print + Digital' } },
      challenge: 'Логотип для dashboard, транспорту та документів — світлий і темний фон.',
      solution: 'Мінімалістичний знак з геометрією та кольоровими варіантами для масштабування.',
    },
    'ortvest-logo': {
      meta: { title: 'Логотип Ortvest | Ortvest', description: 'Знак IT-студії — інновації та масштабованість.' },
      hero: { subtitle: 'Знак IT-студії — геометрія, інновації, варіанти для продукту та корпорації.' },
      stats: { projectType: { label: 'Тип проєкту', value: 'Logo Design' }, deliverables: { label: 'Результат', value: 'Design' }, platform: { label: 'Обсяг', value: 'Digital-first' } },
      challenge: 'Логотип від favicon до deck і UI продуктів.',
      solution: 'Знак з light/dark варіантами та digital-first гайдлайнами.',
    },
  },
};

function translateFeatures(target, sourceEn, localePatch) {
  for (const [caseId, patch] of Object.entries(localePatch)) {
    if (!target[caseId]) continue;
    target[caseId] = deepMerge(target[caseId], patch);
    // Copy feature item titles from EN if not in patch - keep EN for pl/ua feature items
    // For better UX translate feature items via shared map
  }
}

// Translate all feature items for pl/ua by copying EN structure but translating titles in bulk
const featureTranslationsPl = {
  verification: { title: 'Weryfikacja', description: 'Sprawdzanie tożsamości i zaufanie między użytkownikami.' },
  messaging: { title: 'Czat', description: 'Komunikacja w czasie rzeczywistym w zamkniętej sieci.' },
  events: { title: 'Wydarzenia', description: 'Tworzenie i RSVP bez opuszczania platformy.' },
  directory: { title: 'Katalog członków', description: 'Profile z rolami i preferencjami kontaktu.' },
  privacy: { title: 'Prywatność', description: 'Kontrola widoczności danych członków.' },
  roles: { title: 'Role', description: 'Dostęp dopasowany do roli w klubie.' },
  tracking: { title: 'Śledzenie', description: 'Logi stanu z dowodami foto i czasem.' },
  escrow: { title: 'Escrow', description: 'Środki zwolnione po potwierdzeniu wymiany.' },
  reviews: { title: 'Opinie', description: 'Dwustronne recenzje budujące zaufanie.' },
  insurance: { title: 'Ubezpieczenie', description: 'Opcjonalne ubezpieczenie w flow ogłoszenia.' },
};

// Simpler: for pl/ua, deep merge case locales then for each case merge features from en with translated subtitles only
const galleryCaptionsPl = {
  yachtmate: { '1': 'Feed i ogłoszenia', '2': 'Zarządzanie wydarzeniami', '3': 'Interfejs czatu' },
  sharingground: { '1': 'Flow ogłoszenia', '2': 'Panel pożyczającego', '3': 'Weryfikacja i zaufanie' },
  profitcraft: { '1': 'Hero i value prop', '2': 'Sekcja usług', '3': 'Kontakt i konwersja' },
  skisailclub: { '1': 'Odkrywanie tras', '2': 'Rezerwacja', '3': 'Społeczność', '4': 'Szczegóły rejsu' },
  navexa: { '1': 'Dashboard floty', '2': 'Planowanie tras', '3': 'Śledzenie przesyłek' },
  teya: { '1': 'Hero i usługi', '2': 'Szczegóły usług' },
  mie: { '1': 'Lista zakupów', '2': 'Stan spiżarni', '3': 'Sugestie przepisów' },
  reskin: { '1': 'Logo', '2': 'Kolor i typografia', '3': 'Mockupy opakowań', '4': 'Zastosowania' },
  gambit: { '1': 'Layout strony głównej', '2': 'Strona wewnętrzna', '3': 'Komponenty', '4': 'Widoki mobile' },
  'navexa-logo': { '1': 'Logo główne', '2': 'Wariant ciemny', '3': 'Mockupy' },
  'ortvest-logo': { '1': 'Logo główne', '2': 'Tryb ciemny', '3': 'Zastosowania produktowe', '4': 'Rozszerzenia' },
};

const galleryCaptionsUa = {
  yachtmate: { '1': 'Стрічка та оголошення', '2': 'Управління подіями', '3': 'Інтерфейс чату' },
  sharingground: { '1': 'Flow оголошення', '2': 'Дашборд орендаря', '3': 'Верифікація та довіра' },
  profitcraft: { '1': 'Hero та value prop', '2': 'Секція послуг', '3': 'Контакт і конверсія' },
  skisailclub: { '1': 'Маршрути', '2': 'Бронювання', '3': 'Спільнота', '4': 'Деталі поїздки' },
  navexa: { '1': 'Dashboard флоту', '2': 'Планування маршрутів', '3': 'Відстеження відправлень' },
  teya: { '1': 'Hero та послуги', '2': 'Деталі послуг' },
  mie: { '1': 'Список покупок', '2': 'Запаси комори', '3': 'Рецепти' },
  reskin: { '1': 'Логотип', '2': 'Колір і типографіка', '3': 'Упаковка', '4': 'Застосування' },
  gambit: { '1': 'Головна', '2': 'Внутрішня сторінка', '3': 'Компоненти', '4': 'Mobile' },
  'navexa-logo': { '1': 'Основний логотип', '2': 'Темний варіант', '3': 'Мокапи' },
  'ortvest-logo': { '1': 'Основний логотип', '2': 'Темний режим', '3': 'Продуктові застосування', '4': 'Розширення' },
};

for (const [locale, patches] of Object.entries(caseLocales)) {
  const target = locale === 'pl' ? pl : ua;
  for (const [caseId, patch] of Object.entries(patches)) {
    target[caseId] = deepMerge(target[caseId], patch);
  }
}

for (const [caseId, captions] of Object.entries(galleryCaptionsPl)) {
  pl[caseId].gallery = deepMerge(pl[caseId].gallery ?? {}, { captions });
}
for (const [caseId, captions] of Object.entries(galleryCaptionsUa)) {
  ua[caseId].gallery = deepMerge(ua[caseId].gallery ?? {}, { captions });
}

fs.writeFileSync(path.join(__dirname, 'case-studies/pl.json'), JSON.stringify(pl, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, 'case-studies/ua.json'), JSON.stringify(ua, null, 2) + '\n');
console.log('Generated pl.json and ua.json');
