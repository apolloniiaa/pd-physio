// Patient-information pages (gyógytorna / manuálterápia / panaszok).
//
// Content rules — this is a healthcare site:
// - only conditions that match Petró Dániel's stated specialities (derék-,
//   nyak- és gerincproblémák, ízületi fájdalmak, sportsérülések és
//   rehabilitáció, vállsérülések és vállműtét utáni rehabilitáció);
// - no promises of cure or guaranteed results, no invented methods,
//   statistics or credentials;
// - every condition page says when a medical examination is needed.
//
// Inline links use a tiny markdown-like syntax: [anchor text](/path).

export type TopicSlug =
  | 'gyogytorna'
  | 'manualterapia'
  | 'gerincserv'
  | 'nyaki-gerincserv'
  | 'derekfajdalom'
  | 'nyakfajdalom'
  | 'vallfajdalom'
  | 'sportrehabilitacio';

export type TopicSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Render `list` as numbered steps. */
  ordered?: boolean;
  /** Highlighted medical-safety section ("Mikor fordulj orvoshoz?"). */
  caution?: boolean;
};

export type TopicFaq = { question: string; answer: string };

export type Topic = {
  slug: TopicSlug;
  path: string;
  /** Short name for breadcrumbs, cards and link lists. */
  name: string;
  /** One-line summary for related-topic cards. */
  summary: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** schema.org MedicalCondition name for condition pages. */
  condition?: string;
  sections: TopicSection[];
  faqs: TopicFaq[];
  related: TopicSlug[];
};

const URGENT_SPINE =
  'Azonnal fordulj orvoshoz, ha a végtagban gyorsan fokozódó gyengeséget tapasztalsz, ha a gát, a belső comb vagy a nemi szervek környékén érzéskiesés jelentkezik, ha vizelet- vagy székletürítési zavar lép fel, illetve ha a fájdalom baleset után alakult ki, vagy lázzal, megmagyarázhatatlan fogyással jár.';

export const TOPICS: Record<TopicSlug, Topic> = {
  gyogytorna: {
    slug: 'gyogytorna',
    path: '/gyogytorna',
    name: 'Gyógytorna',
    summary: 'Személyre szabott, gyakorlatokra épülő kezelés fájdalomra, rehabilitációhoz és megelőzéshez.',
    title: 'Gyógytorna – személyre szabott kezelés | Petró Dániel',
    description:
      'Mi a gyógytorna, kinek ajánlott, és hogyan zajlik egy kezelés? Személyre szabott gyógytorna fájdalomcsökkentéshez, rehabilitációhoz és megelőzéshez Budapesten.',
    eyebrow: 'Gyógytorna',
    h1: 'Gyógytorna: célzott mozgás, személyre szabva',
    lead: 'A gyógytorna aktív, gyakorlatokra épülő kezelés. A panaszok hátterének feltárása után egyénre szabott mozgásprogrammal segíti a fájdalom csökkentését, a mozgás javítását és a visszatérő problémák megelőzését.',
    sections: [
      {
        heading: 'Mi a gyógytorna?',
        paragraphs: [
          'A gyógytorna a mozgásszervi panaszok kezelésének egyik alapja. Nem általános edzésterv: a gyakorlatokat mindig az adott ember állapotához, céljaihoz és terhelhetőségéhez igazítjuk, és a fejlődéssel együtt módosítjuk.',
          'A kezelések során nemcsak együtt dolgozunk, hanem megtanulod, hogyan segítheted otthon is a saját tested működését. A tartós változás nagy része a kezelések között, a rendszeres gyakorlással történik.',
        ],
      },
      {
        heading: 'Milyen panaszok esetén lehet hasznos?',
        list: [
          'Nyak-, hát- és derékfájdalom – [nyakfájdalom](/gyogytorna/nyakfajdalom), [derék- és hátfájdalom](/gyogytorna/derekfajdalom)',
          'Gerincproblémák, köztük a [gerincsérv (porckorongsérv)](/gyogytorna/gerincserv) és a [nyaki gerincsérv](/gyogytorna/nyaki-gerincserv)',
          '[Vállfájdalom, vállsérülések és vállműtét utáni állapot](/gyogytorna/vallfajdalom)',
          'Ízületi fájdalmak és mozgásbeszűkülés',
          '[Sportsérülések és visszatérés a sporthoz](/gyogytorna/sportrehabilitacio)',
          'Tartáshibák, helytelen mozgásminták',
          'Újrakezdés hosszabb kihagyás, sérülés vagy műtét után',
        ],
      },
      {
        heading: 'Hogyan zajlik a kezelés?',
        ordered: true,
        list: [
          'Állapotfelmérés: kikérdezés, a mozgás és a tartás vizsgálata, a panasz hátterének feltérképezése.',
          'Közös célok: reális, a mindennapjaidhoz igazodó célokat tűzünk ki.',
          'Kezelés: célzott gyógytorna, szükség esetén [manuálterápiával](/manualterapia) kiegészítve.',
          'Otthoni program: néhány jól megválasztott gyakorlat, amelyet önállóan is biztonságosan végezhetsz.',
          'Követés: a programot a változásokhoz igazítjuk, és fokozatosan építjük a terhelést.',
        ],
        paragraphs: ['Egy kezelés 55 percig tart. Az aktuális díjakat az [árlistán](/pricing) találod.'],
      },
      {
        heading: 'Gyógytorna és manuálterápia együtt',
        paragraphs: [
          'Sok panasz esetén a két módszer jól kiegészíti egymást: a [manuálterápia](/manualterapia) segíthet a beszűkült mozgás oldásában és a fájdalom csökkentésében, a gyógytorna pedig stabillá és tartóssá teszi az elért változást.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Mi a különbség a gyógytorna és az edzés között?',
        answer:
          'A gyógytorna kiindulópontja egy panasz vagy egy konkrét cél, és egy állapotfelmérés. A gyakorlatok kiválasztása, adagolása és fokozása ehhez igazodik; a cél a fájdalom csökkentése, a mozgás javítása és a biztonságos terhelhetőség visszaépítése.',
      },
      {
        question: 'Hány alkalomra lesz szükségem?',
        answer:
          'Ez a panasz jellegétől, fennállásának idejétől és az otthoni gyakorlás rendszerességétől is függ, ezért előre általános számot nem lehet mondani. Az állapotfelmérés után reális képet kapsz a várható folyamatról, és menet közben közösen értékeljük a változásokat.',
      },
      {
        question: 'Mit vigyek magammal az első alkalomra?',
        answer:
          'Kényelmes, mozgást nem akadályozó ruhát, valamint – ha van – a panaszhoz kapcsolódó orvosi leleteket és képalkotó vizsgálatok (például röntgen, MRI) leleteit.',
      },
      {
        question: 'Hogyan lehet időpontot foglalni?',
        answer:
          'Időpontot online, a Borostyán Fizio foglalási felületén foglalhatsz, de telefonon (+36 20 234 0340) és e-mailben is elérhetsz.',
      },
    ],
    related: ['manualterapia', 'gerincserv', 'derekfajdalom', 'sportrehabilitacio'],
  },

  manualterapia: {
    slug: 'manualterapia',
    path: '/manualterapia',
    name: 'Manuálterápia',
    summary: 'Célzott kézi technikák a fájdalom csökkentésére és a beszűkült mozgás javítására.',
    title: 'Manuálterápia nyak-, hát- és derékpanaszokra | Petró Dániel',
    description:
      'Manuálterápia Barvicsenko (Lewit) végzettségű gyógytornász-manuálterapeutával: célzott kézi technikák a fájdalom csökkentésére és a mozgás javítására, Budapesten.',
    eyebrow: 'Manuálterápia',
    h1: 'Manuálterápia: célzott kézi kezelés a szabadabb mozgásért',
    lead: 'A manuálterápia a terapeuta kezével végzett, célzott technikák összessége. Segíthet a fájdalom csökkentésében és a beszűkült mozgás javításában – különösen a gerinc, a nyak és a váll panaszainál.',
    sections: [
      {
        heading: 'Mi a manuálterápia?',
        paragraphs: [
          'A manuálterápia során az ízületek, az izmok és a kötőszövetek működését kézzel, finoman adagolt technikákkal vizsgáljuk és kezeljük. Célja, hogy a mozgás szabadabbá váljon és a fájdalom csökkenjen, így a gyakorlatok is hatékonyabban végezhetők.',
          'Gyógytornász diplomám mellé Barvicsenko (Lewit) manuálterapeuta végzettséget szereztem, így a kezelésekben a manuális technikák és a gyógytorna együtt jelenhetnek meg.',
        ],
      },
      {
        heading: 'Milyen panaszok esetén lehet hasznos?',
        list: [
          '[Nyakfájdalom](/gyogytorna/nyakfajdalom), merev, nehezen mozgatható nyak',
          '[Hát- és derékfájdalom](/gyogytorna/derekfajdalom)',
          'Gerincproblémák, például [gerincsérv](/gyogytorna/gerincserv) esetén a gyógytorna kiegészítéseként',
          '[Vállfájdalom](/gyogytorna/vallfajdalom), beszűkült vállmozgás',
          'Ízületi mozgásbeszűkülés',
          'Feszes, fájdalmas izmok, kötőszöveti feszülés',
        ],
      },
      {
        heading: 'Miért gyógytornával együtt?',
        paragraphs: [
          'A manuális kezelés sokszor gyorsan enyhítheti a panaszt, de önmagában ritkán elég a tartós változáshoz. Ezért a manuálterápiát jellemzően [gyógytornával](/gyogytorna) kombinálom: a kezeléssel nyert mozgásteret célzott gyakorlatokkal tesszük stabillá.',
        ],
      },
      {
        heading: 'Mikor nem megfelelő a manuálterápia?',
        caution: true,
        paragraphs: [
          'A manuálterápia nem minden helyzetben alkalmazható. Friss sérülés, ismeretlen eredetű erős fájdalom vagy idegrendszeri tünetek (például fokozódó gyengeség, zsibbadás) esetén először orvosi kivizsgálás szükséges. Az állapotfelmérés során mindig mérlegelem, hogy a kezelés biztonságos és indokolt-e.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Fájdalmas a manuálterápia?',
        answer:
          'A technikák többsége kíméletes. Előfordulhat átmeneti érzékenység a kezelt területen, de a kezelést mindig a visszajelzéseidhez igazítom.',
      },
      {
        question: 'Milyen problémákra alkalmazható a manuálterápia?',
        answer:
          'Leggyakrabban nyak-, hát- és derékfájdalom, gerincproblémák, vállpanaszok és ízületi mozgásbeszűkülés esetén. Hogy az adott helyzetben indokolt-e, az állapotfelmérés után dől el.',
      },
      {
        question: 'Mikor lehet hasznos a manuálterápia nyakfájdalom esetén?',
        answer:
          'Ha a nyak mozgása beszűkült, merev, vagy a fájdalom bizonyos mozdulatokra fokozódik, a manuális technikák segíthetnek a mozgás javításában. Ha a nyakfájdalom zsibbadással, gyengeséggel, szédüléssel vagy erős fejfájással jár, előbb orvosi kivizsgálás javasolt.',
      },
    ],
    related: ['gyogytorna', 'nyakfajdalom', 'gerincserv', 'vallfajdalom'],
  },

  gerincserv: {
    slug: 'gerincserv',
    path: '/gyogytorna/gerincserv',
    name: 'Gerincsérv',
    summary: 'Porckorongsérv, deréksérv: konzervatív, mozgásra épülő kezelés és rehabilitáció.',
    title: 'Gerincsérv gyógytorna és rehabilitáció | Petró Dániel',
    description:
      'Gerincsérv, porckorongsérv, deréksérv: hogyan segíthet a gyógytorna és a manuálterápia, mire figyelj, és mikor fordulj orvoshoz. Személyre szabott rehabilitáció.',
    eyebrow: 'Gerincsérv · Porckorongsérv',
    h1: 'Gerincsérv és porckorongsérv: gyógytorna és rehabilitáció',
    lead: 'A gerincsérv (porckorongsérv) sokszor ijesztő diagnózis, pedig sok esetben konzervatív, mozgásra épülő kezeléssel is jól kezelhető. A célzott gyógytorna segíthet a fájdalom csökkentésében, a mozgásbiztonság visszaszerzésében és a visszaesés megelőzésében.',
    condition: 'Porckorongsérv',
    sections: [
      {
        heading: 'Mi a gerincsérv?',
        paragraphs: [
          'A csigolyák között található porckorongok rugalmas „ütközőként” működnek. Sérv esetén a porckorong belső anyaga a külső rostos gyűrűn keresztül kitüremkedik, és nyomást gyakorolhat a környező idegképletekre. Leggyakrabban az ágyéki szakaszon (deréksérv) és a nyaki szakaszon fordul elő.',
          'A képalkotó vizsgálaton látható eltérés mértéke és a panaszok erőssége nem mindig jár együtt: van, akinél jelentős sérv mellett is enyhék a tünetek, és fordítva. Ezért a kezelést mindig a tényleges panaszokhoz és a mozgás vizsgálatához igazítjuk.',
        ],
      },
      {
        heading: 'Jellemző tünetek',
        list: [
          'Derék- vagy nyakfájdalom, amely ülésre, előrehajlásra vagy bizonyos mozdulatokra fokozódhat',
          'Végtagba sugárzó fájdalom – deréksérvnél a lábba, nyaki sérvnél a vállba, karba',
          'Zsibbadás, bizsergés',
          'Izomgyengeség',
          'Merevség, beszűkült mozgás, kímélő testtartás',
        ],
      },
      {
        heading: 'Deréksérv (ágyéki gerincsérv)',
        paragraphs: [
          'Az ágyéki szakasz a gerinc legnagyobb terhelésnek kitett része, ezért itt alakul ki a legtöbb sérv. A gyógytorna célja a fájdalmat enyhítő testhelyzetek és mozgások megtalálása, a törzsizmok fokozatos erősítése, valamint a mindennapi terhelés – ülés, emelés, sport – biztonságos visszaépítése. Bővebben: [derék- és hátfájdalom](/gyogytorna/derekfajdalom).',
        ],
      },
      {
        heading: 'Nyaki gerincsérv',
        paragraphs: [
          'A nyaki szakaszon kialakuló sérv gyakran a vállba, karba sugárzó fájdalommal és zsibbadással jár. A kezelés lehetőségeiről külön oldalon olvashatsz: [nyaki gerincsérv gyógytornával](/gyogytorna/nyaki-gerincserv).',
        ],
      },
      {
        heading: 'Hogyan segíthet a gyógytorna?',
        list: [
          'A panaszt enyhítő helyzetek és mozgások megtalálása',
          'Fokozatos, a fájdalomhoz igazított terhelés',
          'A törzs mélyizmainak stabilizálása, a mozgáskontroll fejlesztése',
          '[Manuálterápia](/manualterapia) a beszűkült szakaszok mozgásának javítására, ha indokolt',
          'Ergonómiai tanácsok üléshez, emeléshez, alváshoz',
          'Otthon is végezhető program a visszaesés kockázatának csökkentésére',
        ],
      },
      {
        heading: 'Mikor fordulj azonnal orvoshoz?',
        caution: true,
        paragraphs: [URGENT_SPINE],
      },
    ],
    faqs: [
      {
        question: 'Segíthet-e a gyógytorna gerincsérv esetén?',
        answer:
          'Sok esetben igen: a célzott, fokozatosan terhelő gyógytorna a konzervatív kezelés egyik alappillére. Hogy az adott helyzetben milyen kezelés a legmegfelelőbb, azt a tünetek, a vizsgálati eredmények és szükség esetén a kezelőorvos véleménye alapján lehet eldönteni.',
      },
      {
        question: 'Szabad mozogni gerincsérvvel?',
        answer:
          'Az esetek többségében a hosszan tartó ágynyugalom helyett a fájdalomhoz igazított, kontrollált mozgás javasolt. Hogy pontosan milyen mozgás és milyen mértékben, azt az állapotfelmérés alapján érdemes meghatározni.',
      },
      {
        question: 'Gerincműtét után is lehet gyógytornára jönni?',
        answer:
          'Igen, műtét után a rehabilitáció fontos része a gyógytorna. A terhelés ilyenkor az operáló orvos utasításaihoz igazodik.',
      },
    ],
    related: ['nyaki-gerincserv', 'derekfajdalom', 'manualterapia', 'gyogytorna'],
  },

  'nyaki-gerincserv': {
    slug: 'nyaki-gerincserv',
    path: '/gyogytorna/nyaki-gerincserv',
    name: 'Nyaki gerincsérv',
    summary: 'Nyaki porckorongsérv: a nyak- és karfájdalom csökkentése, a terhelhetőség visszaépítése.',
    title: 'Nyaki gerincsérv: gyógytorna és manuálterápia | Petró Dániel',
    description:
      'Nyaki gerincsérv (nyaki porckorongsérv) esetén a célzott gyógytorna és manuálterápia segíthet a nyak- és karfájdalom csökkentésében. Tudd meg, mire számíthatsz.',
    eyebrow: 'Nyaki gerincsérv',
    h1: 'Nyaki gerincsérv: gyógytorna a nyak- és karfájdalom enyhítésére',
    lead: 'A nyaki gerincsérv (nyaki porckorongsérv) a nyakban, és gyakran a vállba, karba sugárzó fájdalommal, zsibbadással járhat. Célzott gyógytornával és szükség esetén manuálterápiával segíthetünk a panaszok csökkentésében és a nyak terhelhetőségének visszaépítésében.',
    condition: 'Nyaki porckorongsérv',
    sections: [
      {
        heading: 'Mi a nyaki gerincsérv?',
        paragraphs: [
          'A nyaki gerinc hét csigolyából áll, amelyek között porckorongok helyezkednek el. Ha egy porckorong anyaga kitüremkedik, nyomást gyakorolhat a karokat ellátó ideggyökökre. A panaszok kialakulásában szerepe lehet a hosszan tartó, előrehajtott fejtartásnak, az ülőmunkának és a korábbi sérüléseknek is.',
        ],
      },
      {
        heading: 'Gyakori tünetek',
        list: [
          'Nyakfájdalom, merevség, beszűkült fejmozgás',
          'Lapocka környéki, vállba vagy karba sugárzó fájdalom',
          'Zsibbadás, bizsergés a karban, ujjakban',
          'A kar vagy a kéz gyengesége, ügyetlensége',
          'Tarkótáji fejfájás',
        ],
      },
      {
        heading: 'Hogyan segíthet a gyógytorna?',
        list: [
          'Fájdalmat enyhítő helyzetek és kíméletes mozgások megtalálása',
          'A mélyi nyakizmok és a lapockatájék izmainak célzott erősítése',
          'Tartásjavítás, a fej- és nyakhelyzet tudatosítása',
          '[Manuálterápia](/manualterapia) a nyaki és háti gerinc beszűkült mozgásának javítására, ha indokolt',
          'Ergonómiai tanácsok a munkához és a mindennapokhoz',
          'Fokozatos visszatérés a megszokott terheléshez, sporthoz',
        ],
      },
      {
        heading: 'Mikor szükséges orvosi kivizsgálás?',
        caution: true,
        paragraphs: [
          'Mielőbb fordulj orvoshoz, ha a kar gyengesége fokozódik, ha mindkét karban vagy a lábakban is zsibbadás, ügyetlenség jelentkezik, ha a járás bizonytalanná válik, vagy ha a tünetek baleset után alakultak ki. Szédülés, látás- vagy beszédzavar esetén azonnal kérj orvosi segítséget.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Segíthet-e a gyógytorna nyaki gerincsérv esetén?',
        answer:
          'Sok esetben igen. A célzott gyakorlatok és szükség esetén a manuálterápia segíthetnek a fájdalom csökkentésében és a nyak mozgásának, terhelhetőségének javításában. A kezelés módjáról a tünetek és a vizsgálati eredmények ismeretében érdemes dönteni.',
      },
      {
        question: 'Milyen gyakorlatokat végezhetek otthon nyaki sérvvel?',
        answer:
          'Az otthoni gyakorlatokat érdemes az állapotfelmérés után, személyre szabva összeállítani, mert ugyanaz a gyakorlat az egyik embernél enyhíti, a másiknál fokozhatja a panaszt.',
      },
      {
        question: 'Mikor lehet hasznos a manuálterápia nyaki problémák esetén?',
        answer:
          'Ha a nyak és a háti gerinc mozgása beszűkült, a kíméletes manuális technikák segíthetnek a mozgás javításában, kiegészítve a gyógytornát. Idegrendszeri tünetek esetén a kezelés előtt orvosi kivizsgálás szükséges.',
      },
    ],
    related: ['nyakfajdalom', 'gerincserv', 'manualterapia', 'vallfajdalom'],
  },

  nyakfajdalom: {
    slug: 'nyakfajdalom',
    path: '/gyogytorna/nyakfajdalom',
    name: 'Nyakfájdalom',
    summary: 'Merev, fájó nyak, ülőmunka okozta panaszok, tarkótáji fejfájás.',
    title: 'Nyakfájdalom gyógytorna és manuálterápia | Petró Dániel',
    description:
      'Merev, fájó nyak, tarkótáji fejfájás, ülőmunka okozta panaszok: hogyan segíthet a gyógytorna és a manuálterápia, és mikor fordulj orvoshoz.',
    eyebrow: 'Nyakfájdalom',
    h1: 'Nyakfájdalom kezelése gyógytornával és manuálterápiával',
    lead: 'A nyakfájdalom az egyik leggyakoribb mozgásszervi panasz. Hátterében gyakran a hosszan tartó ülés, az előrehajtott fejtartás, a stressz vagy egy korábbi sérülés áll. Célzott kezeléssel a fájdalom sok esetben jól befolyásolható.',
    condition: 'Nyakfájdalom',
    sections: [
      {
        heading: 'Gyakori okok',
        list: [
          'Ülőmunka, képernyő előtt előrehajtott fej- és vállhelyzet',
          'Gyengült mélyi nyak- és lapockaizmok',
          'Izomfeszülés, stressz',
          'A nyaki gerinc kopásos elváltozásai',
          '[Nyaki gerincsérv](/gyogytorna/nyaki-gerincserv)',
          'Hirtelen mozdulat vagy sérülés',
        ],
      },
      {
        heading: 'Hogyan zajlik a kezelés?',
        paragraphs: [
          'Az állapotfelmérés során megvizsgálom a nyak, a háti gerinc és a vállöv mozgását, a tartást és a mindennapi szokásokat. Ezek alapján állítjuk össze a kezelést, amely jellemzően [manuálterápiából](/manualterapia) és célzott [gyógytornából](/gyogytorna) áll.',
          'Mivel a nyak és a váll működése szorosan összefügg, a vállöv vizsgálata is a kezelés része – erről bővebben a [vállfájdalom](/gyogytorna/vallfajdalom) oldalon olvashatsz.',
        ],
      },
      {
        heading: 'Mit tehetsz te magad?',
        list: [
          'Ülőmunka közben rendszeresen válts testhelyzetet',
          'A képernyő teteje nagyjából szemmagasságban legyen',
          'Iktass be rövid mozgásszüneteket a nap folyamán',
          'Végezd rendszeresen a számodra összeállított gyakorlatokat',
        ],
      },
      {
        heading: 'Mikor fordulj orvoshoz?',
        caution: true,
        paragraphs: [
          'Fordulj orvoshoz, ha a nyakfájdalom baleset után jelentkezett, ha lázzal, erős vagy szokatlan fejfájással, szédüléssel, látás- vagy beszédzavarral jár, illetve ha a karba sugárzó fájdalom gyengeséggel, zsibbadással párosul.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Mikor érdemes gyógytornászhoz fordulni nyakfájdalommal?',
        answer:
          'Ha a fájdalom néhány nap alatt nem enyhül, rendszeresen visszatér, vagy beszűkíti a mindennapi mozgást, érdemes szakemberrel felmérni a hátterét.',
      },
      {
        question: 'Segíthet a manuálterápia nyakfájdalom esetén?',
        answer:
          'Beszűkült, merev nyak esetén a kíméletes manuális technikák segíthetnek a mozgás javításában és a fájdalom csökkentésében. A tartós változáshoz jellemzően célzott gyakorlatokkal egészítjük ki.',
      },
      {
        question: 'Okozhat-e fejfájást a nyak?',
        answer:
          'A tarkótáji, nyakból kiinduló fejfájás nem ritka. Ha a fejfájás új keletű, erős vagy szokatlan, előbb orvosi kivizsgálás szükséges.',
      },
    ],
    related: ['nyaki-gerincserv', 'manualterapia', 'vallfajdalom', 'gyogytorna'],
  },

  derekfajdalom: {
    slug: 'derekfajdalom',
    path: '/gyogytorna/derekfajdalom',
    name: 'Derék- és hátfájdalom',
    summary: 'Derékfájás, hátfájás, deréksérv: fájdalomcsökkentés és a terhelhetőség visszaépítése.',
    title: 'Derékfájdalom és hátfájdalom gyógytorna | Petró Dániel',
    description:
      'Derékfájás, hátfájás, deréksérv: hogyan segíthet a személyre szabott gyógytorna és a manuálterápia a fájdalom csökkentésében és a terhelhetőség visszaépítésében.',
    eyebrow: 'Derékfájdalom · Hátfájdalom',
    h1: 'Derék- és hátfájdalom kezelése gyógytornával',
    lead: 'A derék- és hátfájdalom szinte mindenkit érint élete során. A legtöbb esetben nem utal súlyos betegségre, mégis jelentősen megnehezítheti a mindennapokat. A célzott gyógytorna segíthet a fájdalom csökkentésében, a mozgásbiztonság visszaszerzésében és a kiújulás megelőzésében.',
    condition: 'Derékfájdalom',
    sections: [
      {
        heading: 'Gyakori okok',
        list: [
          'Hosszan tartó ülés, kevés mozgás',
          'Helytelen emelés, hirtelen túlterhelés',
          'Gyengült törzsizmok, pontatlan mozgáskontroll',
          '[Gerincsérv, deréksérv](/gyogytorna/gerincserv)',
          'A gerinc kopásos elváltozásai',
          '[Sportsérülés](/gyogytorna/sportrehabilitacio)',
        ],
      },
      {
        heading: 'Felső háti fájdalom',
        paragraphs: [
          'A lapockák közötti, felső háti fájdalom gyakran a tartással, az ülőmunkával és a vállöv túlterhelésével függ össze, és nem ritkán [nyaki panaszokkal](/gyogytorna/nyakfajdalom) együtt jelentkezik. Ilyenkor a háti gerinc mozgékonyságának javítása és a lapockát stabilizáló izmok erősítése kerülhet előtérbe.',
        ],
      },
      {
        heading: 'Hogyan segíthet a gyógytorna?',
        list: [
          'A fájdalmat enyhítő mozgások és testhelyzetek megtalálása',
          'A törzs és a csípő izmainak fokozatos erősítése',
          'Mozgáskontroll és helyes emelési technika gyakorlása',
          '[Manuálterápia](/manualterapia) a beszűkült gerincszakaszok mozgásának javítására, ha indokolt',
          'Tartásjavítás és ergonómiai tanácsok',
          'Otthon is végezhető program a kiújulás kockázatának csökkentésére',
        ],
      },
      {
        heading: 'Deréksérv esetén',
        paragraphs: [
          'Ha a derékfájdalom a lábba sugárzik, zsibbadással vagy gyengeséggel jár, a háttérben deréksérv (ágyéki gerincsérv) is állhat. Erről részletesen a [gerincsérv](/gyogytorna/gerincserv) oldalon olvashatsz.',
        ],
      },
      {
        heading: 'Mikor fordulj azonnal orvoshoz?',
        caution: true,
        paragraphs: [URGENT_SPINE],
      },
    ],
    faqs: [
      {
        question: 'Pihenjek vagy mozogjak derékfájással?',
        answer:
          'A legtöbb esetben a fájdalomhoz igazított, mérsékelt mozgás kedvezőbb, mint a hosszan tartó ágynyugalom. Hogy milyen mozgás és milyen mértékben javasolt, azt az állapotfelmérés alapján érdemes meghatározni.',
      },
      {
        question: 'Mikor érdemes gyógytornászhoz fordulni derékfájással?',
        answer:
          'Ha a fájdalom néhány nap alatt nem enyhül, rendszeresen visszatér, vagy akadályozza a munkát, az alvást, a sportot.',
      },
      {
        question: 'Segíthet a manuálterápia derékfájdalom esetén?',
        answer:
          'A beszűkült gerinc- és csípőmozgás javításában segíthet, de a tartós változáshoz jellemzően a törzs stabilitását fejlesztő gyógytornára is szükség van.',
      },
    ],
    related: ['gerincserv', 'manualterapia', 'gyogytorna', 'sportrehabilitacio'],
  },

  vallfajdalom: {
    slug: 'vallfajdalom',
    path: '/gyogytorna/vallfajdalom',
    name: 'Vállfájdalom és vállrehabilitáció',
    summary: 'Vállsérülések, vállfájdalmak és vállműtét utáni rehabilitáció.',
    title: 'Vállfájdalom gyógytorna és vállrehabilitáció | Petró Dániel',
    description:
      'Vállfájdalom, vállsérülés, vállműtét utáni rehabilitáció: célzott gyógytorna és manuálterápia a fájdalom csökkentésére és a váll erejének visszaépítésére.',
    eyebrow: 'Vállfájdalom · Vállrehabilitáció',
    h1: 'Vállfájdalom és vállrehabilitáció',
    lead: 'A váll a test legmozgékonyabb ízülete, ezért különösen érzékeny a túlterhelésre és a sérülésekre. Az elmúlt években munkám egyik kiemelt területe lett a vállsérülések, vállfájdalmak kezelése és a vállműtétek utáni rehabilitáció.',
    condition: 'Vállfájdalom',
    sections: [
      {
        heading: 'Gyakori vállproblémák',
        list: [
          'Túlterheléses vállfájdalom, például ismétlődő, fej fölötti mozdulatoknál',
          'A rotátorköpeny (forgatóizom-köpeny) panaszai, sérülései',
          'Beszűkült, merev váll (befagyott váll)',
          'Instabil váll, ficam utáni állapot',
          '[Sportsérülések](/gyogytorna/sportrehabilitacio)',
          'Vállműtét utáni állapot',
        ],
      },
      {
        heading: 'Vállműtét utáni rehabilitáció',
        paragraphs: [
          'Műtét után a rehabilitáció az operáló orvos által meghatározott protokoll és időkeretek szerint halad. A gyógytorna feladata a mozgástartomány fokozatos visszanyerése, majd az erő, a stabilitás és a koordináció felépítése – egészen a mindennapi tevékenységekhez, a munkához vagy a sporthoz való visszatérésig.',
        ],
      },
      {
        heading: 'Hogyan segíthet a gyógytorna?',
        list: [
          'Fájdalmat csillapító, kíméletes mozgások',
          'A lapocka- és a rotátorköpeny-izmok célzott erősítése',
          '[Manuálterápia](/manualterapia) a beszűkült mozgás javítására',
          'A nyaki és háti gerinc vizsgálata, mert a vállfájdalom hátterében ezek is szerepet játszhatnak – lásd [nyakfájdalom](/gyogytorna/nyakfajdalom)',
          'Fokozatos visszatérés a munkához és a [sporthoz](/gyogytorna/sportrehabilitacio)',
        ],
      },
      {
        heading: 'Mikor fordulj orvoshoz?',
        caution: true,
        paragraphs: [
          'Fordulj orvoshoz, ha a vállfájdalom esés vagy baleset után jelentkezett, ha a kart nem tudod felemelni, ha a váll alakja megváltozott, vagy ha a fájdalom lázzal, bőrpírral jár. A mellkasi nyomással, légszomjjal társuló (különösen bal oldali) vállfájdalom sürgős orvosi ellátást igényel.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Mikor kezdődhet a gyógytorna vállműtét után?',
        answer:
          'Ezt mindig az operáló orvos határozza meg; a rehabilitáció az ő utasításai szerint épül fel, és a terhelés fokozatosan nő.',
      },
      {
        question: 'Segíthet a gyógytorna befagyott váll esetén?',
        answer:
          'A befagyott váll jellemzően lassan, hónapok alatt javuló állapot. A gyógytorna a fájdalomhoz igazított mozgatással és gyakorlatokkal segítheti a mozgástartomány megőrzését és javítását.',
      },
      {
        question: 'Mennyi idő alatt javul a vállfájdalom?',
        answer:
          'Ez a panasz okától, fennállásának idejétől és a terheléstől függ, ezért általános időtartamot nem lehet mondani. Az állapotfelmérés után reális képet kapsz a várható folyamatról.',
      },
    ],
    related: ['sportrehabilitacio', 'manualterapia', 'nyakfajdalom', 'gyogytorna'],
  },

  sportrehabilitacio: {
    slug: 'sportrehabilitacio',
    path: '/gyogytorna/sportrehabilitacio',
    name: 'Sportrehabilitáció',
    summary: 'Sportsérülés vagy műtét után: fokozatos visszatérés a teljes terheléshez.',
    title: 'Sportrehabilitáció és sportsérülések kezelése | Petró Dániel',
    description:
      'Sportsérülés vagy műtét után fokozatos, célzott rehabilitáció a biztonságos visszatérésért. Sportrehabilitáció gyógytornász-manuálterapeutával, Budapesten.',
    eyebrow: 'Sportrehabilitáció',
    h1: 'Sportrehabilitáció: biztonságos visszatérés a sporthoz',
    lead: 'Egész életemben sportoltam, és harcművészettel is foglalkozom, ezért különösen közel áll hozzám a sportsérülések kezelése és az azt követő rehabilitáció. A cél nemcsak a fájdalom csökkentése, hanem a teljes terhelhetőség visszaépítése és az újabb sérülés kockázatának mérséklése.',
    sections: [
      {
        heading: 'Gyakori sportsérülések',
        list: [
          'Izomhúzódások, izomsérülések',
          'Ízületi rándulások, például a bokán vagy a térden',
          '[Vállsérülések](/gyogytorna/vallfajdalom)',
          'Túlterheléses fájdalmak, ín- és ínhüvelypanaszok',
          '[Derék- és hátpanaszok sportolóknál](/gyogytorna/derekfajdalom)',
          'Műtét utáni állapotok',
        ],
      },
      {
        heading: 'A sportrehabilitáció lépései',
        ordered: true,
        list: [
          'Állapotfelmérés és célkitűzés',
          'A friss sérülés kímélő, fájdalomhoz igazított kezelése',
          'A mozgástartomány és az alapvető erő visszaépítése',
          'Sportágspecifikus terhelés, koordináció és mozgáskontroll',
          'Fokozatos visszatérés az edzéshez, majd a versenyhez',
        ],
      },
      {
        heading: 'Megelőzés',
        paragraphs: [
          'A rehabilitáció része a megelőzés is: a gyenge pontok, a mozgásminta-hibák és a terhelés hibáinak feltárása segíthet a visszatérő sérülések kockázatának csökkentésében. A kezelést szükség esetén [manuálterápia](/manualterapia) egészíti ki.',
        ],
      },
      {
        heading: 'Mikor fordulj orvoshoz?',
        caution: true,
        paragraphs: [
          'Friss sérülésnél – ha a sérült testrészre nem tudsz ráterhelni, ha jelentős duzzanat, deformitás, erős fájdalom vagy zsibbadás jelentkezik – először orvosi vizsgálat szükséges.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Mikor térhetek vissza a sporthoz sérülés után?',
        answer:
          'Nem csak az eltelt idő számít: a visszatérés feltétele, hogy a sérült terület fájdalom nélkül bírja a sportág terhelését, és az erő, a mozgástartomány és a koordináció is megfelelő legyen. Ezt fokozatosan, ellenőrzött lépésekben építjük fel.',
      },
      {
        question: 'Csak élsportolóknak szól a sportrehabilitáció?',
        answer:
          'Nem. Hobbisportolóknak, rendszeresen edzőknek és mindazoknak szól, akik egy sérülés után szeretnének újra aktívan mozogni.',
      },
    ],
    related: ['vallfajdalom', 'derekfajdalom', 'gyogytorna', 'manualterapia'],
  },
};

/** Condition pages under /gyogytorna/[slug], in navigation order. */
export const CONDITION_SLUGS = [
  'gerincserv',
  'nyaki-gerincserv',
  'derekfajdalom',
  'nyakfajdalom',
  'vallfajdalom',
  'sportrehabilitacio',
] as const satisfies readonly TopicSlug[];

export type ConditionSlug = (typeof CONDITION_SLUGS)[number];

/** All topic pages in a stable order (hub pages first). */
export const TOPIC_LIST: Topic[] = [
  TOPICS.gyogytorna,
  TOPICS.manualterapia,
  ...CONDITION_SLUGS.map((slug) => TOPICS[slug]),
];

export function isConditionSlug(slug: string): slug is ConditionSlug {
  return (CONDITION_SLUGS as readonly string[]).includes(slug);
}
