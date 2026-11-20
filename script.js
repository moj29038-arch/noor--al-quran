
/* ==========================================
   نور - دليلك الإسلامي
   القرآن الكريم بنظام 604 صفحة
========================================== */

const $ = (selector) => document.querySelector(selector);

function notify(message) {
    alert(message);
}

/* التنقل بين الأقسام */
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    if (pageId === "home") {
        $(".welcome")?.classList.remove("hidden");
        $(".sections")?.classList.remove("hidden");
        return;
    }

    document.getElementById(pageId)?.classList.remove("hidden");

    if (pageId === "quran") loadQuran();
    if (pageId === "azkar") showAzkar();
    if (pageId === "duas") showDuas();
}

/* الوضع الليلي */
const themeBtn = $("#themeBtn");
const themeSelect = $("#themeSelect");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("noor-theme", theme);

    if (themeBtn) {
        themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    if (themeSelect) themeSelect.value = theme;
}

applyTheme(localStorage.getItem("noor-theme") || "light");

themeBtn?.addEventListener("click", () => {
    const dark = document.body.classList.contains("dark");
    applyTheme(dark ? "light" : "dark");
});

themeSelect?.addEventListener("change", event => {
    applyTheme(event.target.value);
});

/* حجم الخط */
const fontSelect = $("#fontSelect");

function applyFontSize(size) {
    document.querySelectorAll(".ayah").forEach(ayah => {
        ayah.style.fontSize = size + "px";
    });
}

if (fontSelect) {
    fontSelect.value = localStorage.getItem("noor-font") || "26";

    fontSelect.addEventListener("change", event => {
        localStorage.setItem("noor-font", event.target.value);
        applyFontSize(event.target.value);
    });
}

/* المسبحة */
let counter = Number(localStorage.getItem("noor-counter") || 0);

function updateCounter() {
    const element = $("#counter");

    if (element) element.textContent = counter;

    localStorage.setItem("noor-counter", counter);
}

function increaseCounter() {
    counter++;
    updateCounter();
}

function resetCounter() {
    counter = 0;
    updateCounter();
}

updateCounter();

/* الأذكار */
const azkarData = {
    morning: [
        {
            text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
            count: "مرة واحدة"
        },
        {
            text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا.",
            count: "ثلاث مرات"
        },
        {
            text: "سبحان الله وبحمده.",
            count: "مائة مرة"
        },
        {
            text: "أستغفر الله وأتوب إليه.",
            count: "مائة مرة"
        }
    ],

    evening: [
        {
            text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
            count: "مرة واحدة"
        },
        {
            text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا.",
            count: "ثلاث مرات"
        },
        {
            text: "أعوذ بكلمات الله التامات من شر ما خلق.",
            count: "ثلاث مرات"
        }
    ],

    sleep: [
        {
            text: "باسمك اللهم أموت وأحيا.",
            count: "مرة واحدة"
        },
        {
            text: "اللهم قني عذابك يوم تبعث عبادك.",
            count: "ثلاث مرات"
        },
        {
            text: "سبحان الله.",
            count: "ثلاث وثلاثون مرة"
        },
        {
            text: "الحمد لله.",
            count: "ثلاث وثلاثون مرة"
        },
        {
            text: "الله أكبر.",
            count: "أربع وثلاثون مرة"
        }
    ],

    after: [
        {
            text: "أستغفر الله.",
            count: "ثلاث مرات"
        },
        {
            text: "اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.",
            count: "مرة واحدة"
        },
        {
            text: "سبحان الله.",
            count: "ثلاث وثلاثون مرة"
        },
        {
            text: "الحمد لله.",
            count: "ثلاث وثلاثون مرة"
        },
        {
            text: "الله أكبر.",
            count: "أربع وثلاثون مرة"
        }
    ]
};

function showAzkar() {
    const category = $("#azkarType")?.value;
    const content = $("#azkarContent");

    if (!content) return;

    content.innerHTML = "";

    (azkarData[category] || []).forEach(zikr => {
        const card = document.createElement("div");
        card.className = "zikr-card";

        const text = document.createElement("p");
        text.textContent = zikr.text;

        const countText = document.createElement("small");
        countText.textContent = "عدد التكرار: " + zikr.count;

        const button = document.createElement("button");
        button.className = "main-btn";
        button.textContent = "تم الذكر ✓";

        button.addEventListener("click", () => {
            button.textContent = "تم ✓";
            button.disabled = true;
        });

        card.append(text, countText, button);
        content.appendChild(card);
    });
}

$("#azkarType")?.addEventListener("change", showAzkar);

/* الأدعية */
const duasData = [
    {
        text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
        source: "سورة البقرة: 201"
    },
    {
        text: "رَبِّ زِدْنِي عِلْمًا.",
        source: "سورة طه: 114"
    },
    {
        text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ.",
        source: "سورة آل عمران: 8"
    },
    {
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.",
        source: "رواه مسلم"
    },
    {
        text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي.",
        source: "سورة طه: 25-26"
    }
];

function showDuas() {
    const content = $("#duasContent");
    if (!content) return;

    content.innerHTML = "";

    duasData.forEach(dua => {
        const card = document.createElement("div");
        card.className = "dua-card";

        const text = document.createElement("p");
        text.textContent = dua.text;

        const source = document.createElement("small");
        source.textContent = dua.source;

        card.append(text, source);
        content.appendChild(card);
    });
}

/* ==========================================
   القرآن الكريم - مصحف المدينة
========================================== */

let quranData = null;
let mushafPages = new Map();

const DB_NAME = "NoorQuranDatabase";
const STORE_NAME = "quran";
const TOTAL_PAGES = 604;

/* فتح قاعدة البيانات */
function openQuranDB() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB غير مدعوم"));
            return;
        }

        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/* حفظ القرآن */
async function saveQuran(data) {
    const db = await openQuranDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");

        transaction.objectStore(STORE_NAME).put(data, "full");

        transaction.oncomplete = () => {
            db.close();
            resolve();
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

/* قراءة القرآن المحفوظ */
async function getSavedQuran() {
    const db = await openQuranDB();

    return new Promise((resolve, reject) => {
        const request = db.transaction(STORE_NAME, "readonly")
            .objectStore(STORE_NAME)
            .get("full");

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

/* فحص بيانات القرآن وأرقام الصفحات */
function hasValidPageData(data) {
    if (!data?.surahs || data.surahs.length !== 114) {
        return false;
    }

    let totalAyahs = 0;
    const pages = new Set();

    for (const surah of data.surahs) {
        if (!Array.isArray(surah.ayahs)) return false;

        for (const ayah of surah.ayahs) {
            totalAyahs++;

            if (
                !Number.isInteger(ayah.page) ||
                ayah.page < 1 ||
                ayah.page > TOTAL_PAGES
            ) {
                return false;
            }

            pages.add(ayah.page);
        }
    }

    return totalAyahs === 6236 && pages.size === TOTAL_PAGES;
}

/* تقسيم الآيات حسب رقم الصفحة الموجود في البيانات */
function buildMushafPages(data) {
    mushafPages = new Map();

    data.surahs.forEach(surah => {
        surah.ayahs.forEach(ayah => {
            const pageNumber = Number(ayah.page);

            if (!mushafPages.has(pageNumber)) {
                mushafPages.set(pageNumber, []);
            }

            mushafPages.get(pageNumber).push({
                ...ayah,
                surahNumber: surah.number,
                surahName: surah.name
            });
        });
    });
}

/* تحميل القرآن */
async function downloadQuran() {
    const content = $("#quranContent");
    if (!content) return;

    if (!navigator.onLine) {
        notify("يجب الاتصال بالإنترنت لتحميل القرآن أول مرة.");
        return;
    }

    content.classList.remove("hidden");
    content.innerHTML = `
        <div class="info-card">
            جارٍ تحميل القرآن الكريم وبيانات الصفحات...
        </div>
    `;

    try {
        const response = await fetch(
            "https://api.alquran.cloud/v1/quran/quran-uthmani"
        );

        if (!response.ok) {
            throw new Error("فشل تحميل القرآن");
        }

        const result = await response.json();
        const data = result.data;

        if (!hasValidPageData(data)) {
            throw new Error(
                "البيانات المستلمة لا تحتوي على ترقيم صفحات صالح."
            );
        }

        await saveQuran(data);

        quranData = data;
        buildMushafPages(data);

        showSurahList();

        notify("تم تحميل القرآن وحفظه على جهازك.");

    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <div class="info-card">
                <h3>تعذر تحميل القرآن</h3>
                <p>تحقق من الإنترنت وحاول مرة أخرى.</p>
                <button class="main-btn" id="retryDownload">
                    إعادة المحاولة
                </button>
            </div>
        `;

        $("#retryDownload")?.addEventListener("click", downloadQuran);
    }
}

/* فتح القرآن من الجهاز */
async function loadQuran() {
    const content = $("#quranContent");
    const list = $("#surahList");

    if (!content || !list) return;

    try {
        const saved = await getSavedQuran();

        if (hasValidPageData(saved)) {
            quranData = saved;
            buildMushafPages(quranData);
            showSurahList();

            const lastPage = Number(
                localStorage.getItem("noor-last-page") || 1
            );

            if (lastPage > 1 && lastPage <= TOTAL_PAGES) {
                openMushafPage(lastPage);
            }

        } else {
            content.classList.remove("hidden");

            content.innerHTML = `
                <div class="info-card">
                    <h3>القرآن الكريم</h3>
                    <p>
                        حمّل القرآن الكريم مع بيانات صفحات مصحف المدينة
                        وعددها 604 صفحة.
                    </p>
                    <button class="main-btn" id="downloadQuranButton">
                        تحميل القرآن كاملًا
                    </button>
                </div>
            `;

            list.innerHTML = "";

            $("#downloadQuranButton")?.addEventListener(
                "click",
                downloadQuran
            );
        }

    } catch (error) {
        console.error(error);

        content.classList.remove("hidden");

        content.innerHTML = `
            <div class="info-card">
                <p>تعذر فتح بيانات القرآن.</p>
                <button class="main-btn" id="downloadQuranButton">
                    تحميل القرآن
                </button>
            </div>
        `;

        $("#downloadQuranButton")?.addEventListener(
            "click",
            downloadQuran
        );
    }
}

/* فهرس السور */
function showSurahList() {
    const list = $("#surahList");
    if (!list || !quranData) return;

    list.innerHTML = "";
    list.classList.remove("hidden");

    $("#surahSearch")?.classList.remove("hidden");
    $("#quranContent")?.classList.add("hidden");

    quranData.surahs.forEach(surah => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "surah-card";
        card.textContent = `${surah.number} - سورة ${surah.name}`;

        card.addEventListener("click", () => {
            const firstAyah = surah.ayahs[0];
            openMushafPage(Number(firstAyah.page));
        });

        list.appendChild(card);
    });
}

/* عرض صفحة المصحف */
function openMushafPage(pageNumber) {
    const page = Math.min(
        TOTAL_PAGES,
        Math.max(1, Number(pageNumber))
    );

    const ayahs = mushafPages.get(page);
    const content = $("#quranContent");

    if (!content || !ayahs?.length) {
        if (content) {
            content.textContent = "لم يتم العثور على بيانات الصفحة.";
        }
        return;
    }

    localStorage.setItem("noor-last-page", String(page));

    content.innerHTML = "";

    /* شريط أعلى الصفحة */
    const toolbar = document.createElement("div");
    toolbar.className = "mushaf-toolbar";

    const backButton = document.createElement("button");
    backButton.className = "main-btn";
    backButton.textContent = "فهرس السور";

    backButton.addEventListener("click", () => {
        showSurahList();
    });

    const pageLabel = document.createElement("strong");
    pageLabel.className = "mushaf-page-number";
    pageLabel.textContent = `صفحة ${page} من ${TOTAL_PAGES}`;

    toolbar.append(backButton, pageLabel);
    content.appendChild(toolbar);

    /* ورقة المصحف */
    const paper = document.createElement("section");
    paper.className = "mushaf-paper";

    const headingsAdded = new Set();

    ayahs.forEach(ayah => {

        if (!headingsAdded.has(ayah.surahNumber)) {
            const heading = document.createElement("h3");

            heading.className = "mushaf-surah-heading";
            heading.textContent = `سورة ${ayah.surahName}`;

            paper.appendChild(heading);
            headingsAdded.add(ayah.surahNumber);
        }

        const ayahSpan = document.createElement("span");

        ayahSpan.className = "ayah mushaf-ayah";

        ayahSpan.textContent =
            `${ayah.text} ۝${ayah.numberInSurah}`;

        ayahSpan.style.fontSize =
            (localStorage.getItem("noor-font") || "26") + "px";

        paper.appendChild(ayahSpan);
        paper.appendChild(document.createTextNode(" "));
    });

    content.appendChild(paper);

    /* أزرار السابق والتالي */
    const navigation = document.createElement("div");
    navigation.className = "mushaf-navigation";

    const previousButton = document.createElement("button");

    previousButton.className = "main-btn";
    previousButton.textContent = "← الصفحة السابقة";
    previousButton.disabled = page === 1;

    previousButton.addEventListener("click", () => {
        openMushafPage(page - 1);
    });

    const nextButton = document.createElement("button");

    nextButton.className = "main-btn";
    nextButton.textContent = "الصفحة التالية →";
    nextButton.disabled = page === TOTAL_PAGES;

    nextButton.addEventListener("click", () => {
        openMushafPage(page + 1);
    });

    navigation.append(previousButton, nextButton);
    content.appendChild(navigation);

    /* الانتقال إلى رقم صفحة */
    const jumpArea = document.createElement("div");
    jumpArea.className = "mushaf-jump";

    const label = document.createElement("label");
    label.textContent = "الانتقال إلى صفحة رقم:";

    const input = document.createElement("input");

    input.type = "number";
    input.min = "1";
    input.max = String(TOTAL_PAGES);
    input.value = String(page);

    const jumpButton = document.createElement("button");

    jumpButton.className = "main-btn";
    jumpButton.textContent = "اذهب";

    jumpButton.addEventListener("click", () => {
        const requestedPage = Number(input.value);

        if (
            !Number.isInteger(requestedPage) ||
            requestedPage < 1 ||
            requestedPage > TOTAL_PAGES
        ) {
            notify("اكتب رقم صفحة من 1 إلى 604.");
            return;
        }

        openMushafPage(requestedPage);
    });

    jumpArea.append(label, input, jumpButton);
    content.appendChild(jumpArea);

    content.classList.remove("hidden");
    $("#surahList")?.classList.add("hidden");
    $("#surahSearch")?.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* البحث عن السور */
$("#surahSearch")?.addEventListener("input", event => {
    const search = event.target.value.trim().toLowerCase();

    document.querySelectorAll(".surah-card").forEach(card => {
        card.style.display =
            card.textContent.toLowerCase().includes(search)
                ? ""
                : "none";
    });
});

/* مسح البيانات */
async function clearSavedData() {
    const confirmed = confirm(
        "هل تريد مسح بيانات التطبيق المحفوظة؟"
    );

    if (!confirmed) return;

    localStorage.removeItem("noor-counter");
    localStorage.removeItem("noor-last-surah");
    localStorage.removeItem("noor-last-page");

    counter = 0;
    updateCounter();

    try {
        const db = await openQuranDB();

        await new Promise((resolve, reject) => {
            const transaction = db.transaction(
                STORE_NAME,
                "readwrite"
            );

            transaction.objectStore(STORE_NAME).delete("full");

            transaction.oncomplete = resolve;
            transaction.onerror = () => reject(transaction.error);
        });

        db.close();

        quranData = null;
        mushafPages = new Map();

    } catch (error) {
        console.error(error);
    }

    notify("تم مسح البيانات المحفوظة.");
}

/* تشغيل التطبيق */
document.addEventListener("DOMContentLoaded", () => {
    updateCounter();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js")
            .catch(error => {
                console.error(
                    "تعذر تشغيل العمل دون إنترنت:",
                    error
                );
            });
    }
});

/* إتاحة الدوال لأزرار HTML */
window.showPage = showPage;
window.increaseCounter = increaseCounter;
window.resetCounter = resetCounter;
window.clearSavedData = clearSavedData;
window.downloadQuran = downloadQuran;
window.showAzkar = showAzkar;
window.showDuas = showDuas;

