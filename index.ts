import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

// ============================================================
// 1. ВСЕ ВОПРОСЫ (полный список)
// ============================================================

const SURVEY_QUESTIONS = {
  // ---------- РАЗДЕЛ А: Культура безопасности (10 вопросов) ----------
  sectionA: [
    { id: "a1", section: "А", text: "Как вы оцениваете отношение к безопасности на вашем участке?", options: [1, 2, 3, 4] },
    { id: "a2", section: "А", text: "Ваш руководитель демонстрирует личный пример соблюдения правил безопасности?", options: [1, 2, 3, 4] },
    { id: "a3", section: "А", text: "Сотрудники активно участвуют в обсуждении вопросов безопасности?", options: [1, 2, 3, 4] },
    { id: "a4", section: "А", text: "Вы доверяете руководству в вопросах безопасности?", options: [1, 2, 3, 4] },
    { id: "a5", section: "А", text: "Информация по безопасности доступна и понятна?", options: [1, 2, 3, 4] },
    { id: "a6", section: "А", text: "Нарушения безопасности фиксируются и разбираются?", options: [1, 2, 3, 4] },
    { id: "a7", section: "А", text: "В вашем подразделении регулярно проводятся встречи по безопасности?", options: [1, 2, 3, 4] },
    { id: "a8", section: "А", text: "Встречи по безопасности эффективны и приводят к изменениям?", options: [1, 2, 3, 4] },
    { id: "a9", section: "А", text: "Сотрудники проявляют инициативу в вопросах безопасности?", options: [1, 2, 3, 4] },
    { id: "a10", section: "А", text: "Уровень доверия между работниками и руководством в вопросах безопасности высок?", options: [1, 2, 3, 4] },
  ],

  // ---------- РАЗДЕЛ Б1: Инициативность (Advocacy) — 6 вопросов ----------
  sectionB1: [
    { id: "b1_1", section: "Б1", text: "Этот сотрудник часто говорит коллегам о том, как сделать работу безопаснее", options: [1, 2, 3, 4, 5] },
    { id: "b1_2", section: "Б1", text: "Этот сотрудник предлагает руководству идеи по улучшению безопасности на участке", options: [1, 2, 3, 4, 5] },
    { id: "b1_3", section: "Б1", text: "Этот сотрудник активно участвует в обсуждении вопросов безопасности на собраниях", options: [1, 2, 3, 4, 5] },
    { id: "b1_4", section: "Б1", text: "Этот сотрудник берёт на себя инициативу, когда видит потенциальную опасность", options: [1, 2, 3, 4, 5] },
    { id: "b1_5", section: "Б1", text: "Этот сотрудник делится с коллегами информацией о новых правилах безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b1_6", section: "Б1", text: "Этот сотрудник поощряет других высказываться по вопросам безопасности", options: [1, 2, 3, 4, 5] },
  ],

  // ---------- РАЗДЕЛ Б2: Поддержка (Support) — 6 вопросов ----------
  sectionB2: [
    { id: "b2_1", section: "Б2", text: "К этому сотруднику приходят за советом по вопросам безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b2_2", section: "Б2", text: "Этот сотрудник помогает новым работникам освоить правила безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b2_3", section: "Б2", text: "Этот сотрудник готов прийти на помощь коллегам, если замечает небезопасные действия", options: [1, 2, 3, 4, 5] },
    { id: "b2_4", section: "Б2", text: "Этот сотрудник отзывчив на проблемы безопасности, поднимаемые коллегами", options: [1, 2, 3, 4, 5] },
    { id: "b2_5", section: "Б2", text: "Этот сотрудник даёт практические советы по безопасности, когда его просят", options: [1, 2, 3, 4, 5] },
    { id: "b2_6", section: "Б2", text: "Этот сотрудник поддерживает коллег, которые сообщают о нарушениях", options: [1, 2, 3, 4, 5] },
  ],

  // ---------- РАЗДЕЛ Б3: Осознанное отношение (Mindset) — 6 вопросов ----------
  sectionB3: [
    { id: "b3_1", section: "Б3", text: "Этот сотрудник понимает, почему правила безопасности важны, а не просто знает их", options: [1, 2, 3, 4, 5] },
    { id: "b3_2", section: "Б3", text: "Безопасность для этого сотрудника — личный приоритет, а не формальность", options: [1, 2, 3, 4, 5] },
    { id: "b3_3", section: "Б3", text: "Этот сотрудник может объяснить последствия нарушения правил безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b3_4", section: "Б3", text: "Этот сотрудник знает, как правильно действовать в нештатной ситуации", options: [1, 2, 3, 4, 5] },
    { id: "b3_5", section: "Б3", text: "Этот сотрудник уверен в своих знаниях по охране труда", options: [1, 2, 3, 4, 5] },
    { id: "b3_6", section: "Б3", text: "Этот сотрудник считает, что безопасность не менее важна, чем выполнение плана", options: [1, 2, 3, 4, 5] },
  ],

  // ---------- РАЗДЕЛ Б4: Открытость (Reporting) — 6 вопросов ----------
  sectionB4: [
    { id: "b4_1", section: "Б4", text: "Этот сотрудник сообщает о нарушениях, чтобы их исправить", options: [1, 2, 3, 4, 5] },
    { id: "b4_2", section: "Б4", text: "Этот сотрудник не боится говорить о проблемах безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b4_3", section: "Б4", text: "Этот сотрудник поощряет коллег сообщать о «почти-инцидентах»", options: [1, 2, 3, 4, 5] },
    { id: "b4_4", section: "Б4", text: "Этот сотрудник честно рассказывает о допущенных ошибках, чтобы предотвратить их повторение", options: [1, 2, 3, 4, 5] },
    { id: "b4_5", section: "Б4", text: "Этот сотрудник поддерживает культуру открытости в вопросах безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b4_6", section: "Б4", text: "Этот сотрудник считает важным документировать все инциденты, даже мелкие", options: [1, 2, 3, 4, 5] },
  ],

  // ---------- РАЗДЕЛ Б5: Избегание (Reluctance) — 6 вопросов (обратная шкала) ----------
  sectionB5: [
    { id: "b5_1", section: "Б5", text: "Этот сотрудник редко добровольно участвует в инициативах по безопасности", options: [1, 2, 3, 4, 5] },
    { id: "b5_2", section: "Б5", text: "Этот сотрудник неохотно обсуждает проблемы безопасности, если они не затрагивают его лично", options: [1, 2, 3, 4, 5] },
    { id: "b5_3", section: "Б5", text: "Этот сотрудник редко делится полезной информацией по безопасности с коллегами", options: [1, 2, 3, 4, 5] },
    { id: "b5_4", section: "Б5", text: "Этот сотрудник предпочитает не вмешиваться в вопросы безопасности других", options: [1, 2, 3, 4, 5] },
    { id: "b5_5", section: "Б5", text: "Этот сотрудник считает, что обсуждать безопасность должен руководитель, а не рядовые работники", options: [1, 2, 3, 4, 5] },
    { id: "b5_6", section: "Б5", text: "Этот сотрудник избегает брать на себя ответственность за безопасность на участке", options: [1, 2, 3, 4, 5] },
  ],

  // ---------- РАЗДЕЛ В: Социометрия (6 вопросов) ----------
  sectionV: [
    { id: "v1", section: "В", text: "К кому из ваших коллег вы бы обратились за советом по безопасности в сложной ситуации?", options: ["текстовое поле"] },
    { id: "v2", section: "В", text: "Кого из ваших коллег вы бы НЕ хотели видеть в роли лидера безопасности?", options: ["текстовое поле"] },
    { id: "v3", section: "В", text: "С кем из ваших коллег вы хотели бы работать над улучшением безопасности?", options: ["текстовое поле"] },
    { id: "v4", section: "В", text: "Кто из ваших коллег, по вашему мнению, лучше всех знает правила безопасности и может объяснить их другим?", options: ["текстовое поле"] },
    { id: "v5", section: "В", text: "Кто из ваших коллег чаще всего подаёт пример безопасного поведения на рабочем месте?", options: ["текстовое поле"] },
    { id: "v6", section: "В", text: "Кого из ваших коллег вы бы НЕ хотели видеть в своей рабочей группе из-за их отношения к безопасности?", options: ["текстовое поле"] },
  ],

  // ---------- РАЗДЕЛ Г: Дополнительная информация (5 вопросов) ----------
  sectionG: [
    { id: "g1", section: "Г", text: "Ваш стаж работы в компании", options: ["менее 1 года", "1-3 года", "3-5 лет", "5-10 лет", "более 10 лет"] },
    { id: "g2", section: "Г", text: "Ваше подразделение (цех, участок)", options: ["текстовое поле"] },
    { id: "g3", section: "Г", text: "Как часто вы участвуете в мероприятиях по безопасности?", options: ["Всегда участвую", "Часто участвую", "Иногда участвую", "Редко участвую", "Не участвую"] },
    { id: "g4", section: "Г", text: "Как вы оцениваете доступность и понятность инструкций по безопасности на вашем рабочем месте?", options: ["Отлично", "Хорошо", "Удовлетворительно", "Плохо", "Не знаю"] },
    { id: "g5", section: "Г", text: "Что, по вашему мнению, мешает сотрудникам соблюдать правила безопасности?", options: ["Нехватка времени", "Сложность оборудования", "Неудобство СИЗ", "Непонимание правил", "Отсутствие контроля", "Давление руководства (план)", "Другое"] },
  ],
};

// Все вопросы в одном массиве для рендеринга
const ALL_QUESTIONS = [
  ...SURVEY_QUESTIONS.sectionA,
  ...SURVEY_QUESTIONS.sectionB1,
  ...SURVEY_QUESTIONS.sectionB2,
  ...SURVEY_QUESTIONS.sectionB3,
  ...SURVEY_QUESTIONS.sectionB4,
  ...SURVEY_QUESTIONS.sectionB5,
  ...SURVEY_QUESTIONS.sectionV,
  ...SURVEY_QUESTIONS.sectionG,
];

// ============================================================
// 2. ФУНКЦИЯ АНАЛИЗА ISL
// ============================================================

function analyzeISL(data: Record<string, any>) {
  // Расчёт по каждому фактору
  const factors: Record<string, string[]> = {
    advocacy: ["b1_1", "b1_2", "b1_3", "b1_4", "b1_5", "b1_6"],
    support: ["b2_1", "b2_2", "b2_3", "b2_4", "b2_5", "b2_6"],
    mindset: ["b3_1", "b3_2", "b3_3", "b3_4", "b3_5", "b3_6"],
    reporting: ["b4_1", "b4_2", "b4_3", "b4_4", "b4_5", "b4_6"],
    reluctance: ["b5_1", "b5_2", "b5_3", "b5_4", "b5_5", "b5_6"],
  };

  const scores: Record<string, number> = {};

  for (const [factor, keys] of Object.entries(factors)) {
    let sum = 0;
    let count = 0;
    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null) {
        let val = Number(data[key]);
        // Инвертирование для Reluctance (1→5, 2→4, 3→3, 4→2, 5→1)
        if (factor === "reluctance") {
          val = 6 - val;
        }
        sum += val;
        count++;
      }
    }
    scores[factor] = count > 0 ? Math.round((sum / count) * 100) / 100 : 0;
  }

  // Определение категории
  let category = "Нейтральный";
  if (
    scores.advocacy >= 4.0 &&
    scores.support >= 4.0 &&
    scores.mindset >= 4.0 &&
    scores.reporting >= 4.0 &&
    scores.reluctance >= 3.5
  ) {
    category = "Лидер безопасности";
  } else if (
    scores.advocacy >= 3.5 &&
    scores.support >= 3.5 &&
    scores.mindset >= 3.5
  ) {
    category = "Кандидат в лидеры";
  } else if (scores.reluctance < 3.0) {
    category = "Лидер сопротивления";
  }

  // Анализ культуры безопасности (Раздел А)
  const aValues = [];
  for (let i = 1; i <= 10; i++) {
    const key = `a${i}`;
    if (data[key] !== undefined && data[key] !== null) {
      aValues.push(Number(data[key]));
    }
  }
  const cultureScore = aValues.length > 0
    ? Math.round((aValues.reduce((a, b) => a + b, 0) / aValues.length) * 100) / 100
    : 0;

  let cultureLevel = "Недостаточно данных";
  if (cultureScore >= 3.5) cultureLevel = "Проактивный (уровень 4) — безопасность как ценность";
  else if (cultureScore >= 2.5) cultureLevel = "Зависимый (уровень 3) — управление через вовлечение";
  else if (cultureScore >= 1.5) cultureLevel = "Реактивный (уровень 2) — управление через контроль";
  else if (cultureScore > 0) cultureLevel = "Пассивный (уровень 1) — безопасность не в приоритете";

  // Рекомендации
  const recommendations: string[] = [];

  if (category === "Лидер безопасности") {
    recommendations.push("✅ Вы — явный лидер безопасности. Рекомендуется участвовать в программе развития лидеров и стать наставником для коллег.");
    recommendations.push("🎯 Используйте ваш авторитет для продвижения культуры безопасности в коллективе.");
  } else if (category === "Кандидат в лидеры") {
    recommendations.push("🔄 Вы — потенциальный лидер безопасности. Развивайте коммуникативные навыки и активно участвуйте в инициативах.");
    recommendations.push("📈 Обратите внимание на развитие навыков наставничества.");
  } else if (category === "Лидер сопротивления") {
    recommendations.push("⚠️ Выявлены признаки избегания ответственности. Рекомендуется индивидуальная работа и вовлечение в диалог.");
    recommendations.push("🤝 Попробуйте принять участие в рабочих группах по улучшению безопасности.");
  } else {
    recommendations.push("📌 У вас средние показатели. Развивайте осознанное отношение к безопасности.");
    recommendations.push("📚 Рекомендуется дополнительное обучение по охране труда.");
  }

  if (cultureScore < 2.5 && cultureScore > 0) {
    recommendations.push("📊 Уровень культуры безопасности ниже среднего. Требуется усиление вовлекающих практик.");
  }

  // Сильные и слабые стороны
  const sorted = Object.entries(scores)
    .filter(([k]) => k !== "category")
    .sort((a, b) => b[1] - a[1]);

  const strengths = sorted.slice(0, 2).map(([k, v]) => `${k}: ${v}`);
  const weaknesses = sorted.slice(-2).map(([k, v]) => `${k}: ${v}`);

  return {
    isl_scores: scores,
    category: category,
    culture: {
      score: cultureScore,
      level: cultureLevel,
    },
    strengths: strengths,
    weaknesses: weaknesses,
    recommendations: recommendations,
  };
}

// ============================================================
// 3. МАРШРУТЫ API
// ============================================================

app.get("/", async (c) => {
  return c.text("🛡️ ISL Survey API — Оценка лидерства в безопасности\n\n" +
    "Доступные эндпоинты:\n" +
    "  GET /survey — страница опросника\n" +
    "  GET /api/health — проверка статуса\n" +
    "  POST /api/submit — отправка ответов\n" +
    "  GET /api/questions — получить все вопросы в JSON");
});

app.get("/api/health", async (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    total_questions: ALL_QUESTIONS.length,
  });
});

app.get("/api/questions", async (c) => {
  return c.json({
    total: ALL_QUESTIONS.length,
    questions: ALL_QUESTIONS,
    sections: {
      A: SURVEY_QUESTIONS.sectionA.length,
      B1: SURVEY_QUESTIONS.sectionB1.length,
      B2: SURVEY_QUESTIONS.sectionB2.length,
      B3: SURVEY_QUESTIONS.sectionB3.length,
      B4: SURVEY_QUESTIONS.sectionB4.length,
      B5: SURVEY_QUESTIONS.sectionB5.length,
      V: SURVEY_QUESTIONS.sectionV.length,
      G: SURVEY_QUESTIONS.sectionG.length,
    }
  });
});

app.post("/api/submit", async (c) => {
  try {
    const data = await c.req.json();

    if (!data || Object.keys(data).length === 0) {
      return c.json({ status: "error", message: "Нет данных" }, 400);
    }

    // Проверка — есть ли хоть какие-то ответы
    const hasAnswers = Object.values(data).some(v => v !== undefined && v !== null && v !== "");
    if (!hasAnswers) {
      return c.json({ status: "error", message: "Не заполнено ни одного вопроса" }, 400);
    }

    const report = analyzeISL(data);

    return c.json({
      status: "success",
      response_id: Date.now(),
      report: report,
      message: "Анализ выполнен успешно",
    });
  } catch (error: any) {
    return c.json({
      status: "error",
      message: error.message || "Ошибка обработки",
    }, 500);
  }
});

// ============================================================
// 4. СТРАНИЦА ОПРОСНИКА
// ============================================================

app.get("/survey", async (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISL Опросник — полная версия</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a2a6c, #2d4373);
      min-height: 100vh;
      padding: 30px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { color: #1a2a6c; font-size: 28px; margin-bottom: 5px; }
    .subtitle { color: #666; margin-bottom: 5px; }
    .badge {
      display: inline-block;
      background: #1a2a6c;
      color: white;
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .section-title {
      color: #1a2a6c;
      font-size: 20px;
      margin: 30px 0 15px 0;
      padding-bottom: 5px;
      border-bottom: 2px solid #e8f0fe;
    }
    .section-desc {
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .question-block {
      background: #f8f9fa;
      padding: 15px 20px;
      border-radius: 10px;
      margin-bottom: 12px;
      border-left: 4px solid #1a2a6c;
    }
    .question-block .qtext {
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 15px;
    }
    .question-block .qid {
      color: #999;
      font-size: 12px;
      font-weight: normal;
    }
    .options {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .options label {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    .options label input[type="radio"],
    .options label input[type="checkbox"] {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
    .text-input {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 100%;
      max-width: 400px;
      font-size: 14px;
    }
    .text-input:focus { outline: none; border-color: #1a2a6c; }
    .btn-submit {
      display: block;
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #1a2a6c, #2d4373);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 30px;
      transition: transform 0.2s;
    }
    .btn-submit:hover { transform: translateY(-2px); }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .result {
      margin-top: 25px;
      padding: 25px;
      border-radius: 12px;
      display: none;
    }
    .result.success { background: #e8f5e9; border-left: 4px solid #28a745; display: block; }
    .result.error { background: #fce4ec; border-left: 4px solid #dc3545; display: block; }
    .result h3 { color: #1a2a6c; margin-bottom: 10px; }
    .result table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    .result table td { padding: 6px 10px; border-bottom: 1px solid #eee; }
    .result .rec-list { padding-left: 20px; margin: 10px 0; }
    .result .rec-list li { margin: 5px 0; }
    .progress {
      background: #e0e0e0;
      border-radius: 10px;
      height: 8px;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      background: linear-gradient(135deg, #1a2a6c, #2d4373);
      border-radius: 10px;
      transition: width 0.3s;
      width: 0%;
    }
    .timer { color: #999; font-size: 13px; text-align: right; margin-top: 5px; }
    .note { color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 15px; margin-top: 15px; }
    .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    @media (max-width: 600px) {
      .container { padding: 20px; }
      .options { gap: 10px; }
      .options label { font-size: 13px; }
    }
  </style>
</head>
<body>
<div class="container">
  <h1>🛡️ ISL Опросник</h1>
  <p class="subtitle">Оценка неформального лидерства в безопасности</p>
  <span class="badge">Оренбургский филиал ООО «Газпромтранс»</span>

  <div class="progress"><div class="progress-bar" id="progressBar"></div></div>

  <form id="surveyForm">
    <div id="questionsContainer"></div>

    <p style="color:#999;font-size:13px;margin:15px 0;border-top:1px solid #eee;padding-top:15px;">
      ⏱ Время заполнения: 20-30 минут · <span id="answeredCount">0</span>/<span id="totalCount">0</span> вопросов отвечено
    </p>

    <button type="submit" class="btn-submit" id="submitBtn">📤 Отправить ответы и получить анализ</button>
  </form>

  <div id="result" class="result"></div>
  <div class="footer">© ООО «Газпромтранс» · Оренбургский филиал · 2026</div>
</div>

<script>
  // === ВСЕ ВОПРОСЫ (встроены в HTML) ===
  const questions = ${JSON.stringify(ALL_QUESTIONS)};

  const sectionNames = {
    'А': '📋 Раздел А. Культура безопасности',
    'Б1': '📌 Раздел Б1. Инициативность (Advocacy)',
    'Б2': '🤝 Раздел Б2. Поддержка (Support)',
    'Б3': '🧠 Раздел Б3. Осознанное отношение (Mindset)',
    'Б4': '🔓 Раздел Б4. Открытость (Reporting)',
    'Б5': '⚠️ Раздел Б5. Избегание (Reluctance) — обратная шкала',
    'В': '👥 Раздел В. Социометрия (укажите фамилии)',
    'Г': 'ℹ️ Раздел Г. Дополнительная информация'
  };

  const sectionColors = {
    'А': '#1a2a6c',
    'Б1': '#0077b6',
    'Б2': '#2d6a4f',
    'Б3': '#e76f51',
    'Б4': '#6d597a',
    'Б5': '#b5838d',
    'В': '#e9c46a',
    'Г': '#a7c957'
  };

  let totalQuestions = questions.length;
  let answered = 0;

  function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    let html = '';
    let currentSection = '';

    questions.forEach((q, index) => {
      if (q.section !== currentSection) {
        currentSection = q.section;
        const color = sectionColors[q.section] || '#1a2a6c';
        html += \`
          <div class="section-title" style="border-bottom-color: \${color}">
            \${sectionNames[q.section] || 'Раздел ' + q.section}
          </div>
        \`;
        if (q.section === 'Б5') {
          html += \`<div class="section-desc">⚠️ Внимание! По этому разделу используется обратная шкала (1→5, 2→4, 3→3, 4→2, 5→1)</div>\`;
        }
        if (q.section === 'В') {
          html += \`<div class="section-desc">Укажите от 1 до 5 фамилий коллег из вашего подразделения. Если не знаете, оставьте пустым.</div>\`;
        }
      }

      const isText = q.options && q.options[0] === 'текстовое поле';
      const isSelect = q.options && Array.isArray(q.options) && q.options.length > 1 && !isText;

      html += \`<div class="question-block" style="border-left-color: \${sectionColors[q.section] || '#1a2a6c'}">\`;
      html += \`<div class="qtext">\${index+1}. \${q.text} <span class="qid">(\${q.id})</span></div>\`;

      if (isText) {
        html += \`<input type="text" class="text-input" id="\${q.id}" name="\${q.id}" placeholder="Введите фамилии через запятую..." onchange="updateProgress()">\`;
      } else if (isSelect) {
        html += \`<div class="options">\`;
        q.options.forEach(opt => {
          const val = typeof opt === 'string' ? opt : opt;
          html += \`<label><input type="radio" name="\${q.id}" value="\${val}" onchange="updateProgress()"> \${val}</label>\`;
        });
        html += \`</div>\`;
      } else if (q.options) {
        html += \`<div class="options">\`;
        q.options.forEach(opt => {
          html += \`<label><input type="radio" name="\${q.id}" value="\${opt}" onchange="updateProgress()"> \${opt}</label>\`;
        });
        html += \`</div>\`;
      }

      html += \`</div>\`;
    });

    container.innerHTML = html;
    document.getElementById('totalCount').textContent = totalQuestions;
    updateProgress();
  }

  function updateProgress() {
    const form = document.getElementById('surveyForm');
    const inputs = form.querySelectorAll('input[type="radio"], input[type="text"], select');
    let answeredCount = 0;

    inputs.forEach(input => {
      if (input.type === 'radio') {
        const name = input.name;
        const checked = form.querySelector(\`input[name="\${name}"]:checked\`);
        if (checked) answeredCount++;
      } else if (input.type === 'text' || input.tagName === 'SELECT') {
        if (input.value && input.value.trim() !== '') answeredCount++;
      }
    });

    // Убираем дублирование для radio (каждая группа считается один раз)
    const radioNames = new Set();
    let uniqueAnswered = 0;
    form.querySelectorAll('input[type="radio"]').forEach(r => radioNames.add(r.name));
    radioNames.forEach(name => {
      if (form.querySelector(\`input[name="\${name}"]:checked\`)) uniqueAnswered++;
    });

    // Текстовые поля
    let textAnswered = 0;
    form.querySelectorAll('input[type="text"], select').forEach(inp => {
      if (inp.value && inp.value.trim() !== '') textAnswered++;
    });

    const totalAnswered = uniqueAnswered + textAnswered;
    document.getElementById('answeredCount').textContent = Math.min(totalAnswered, totalQuestions);

    const pct = Math.min((totalAnswered / totalQuestions) * 100, 100);
    document.getElementById('progressBar').style.width = pct + '%';
  }

  // Обработка отправки формы
  document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    const errors = [];

    // Собираем данные
    for (let [key, value] of formData.entries()) {
      // Для radio — если значение пустое, пропускаем
      if (value === '') continue;
      // Для числовых — преобразуем
      const num = Number(value);
      data[key] = isNaN(num) ? value : num;
    }

    // Проверка — ответы есть?
    if (Object.keys(data).length === 0) {
      document.getElementById('result').className = 'result error';
      document.getElementById('result').innerHTML = '❌ Пожалуйста, ответьте хотя бы на несколько вопросов.';
      return;
    }

    // Показываем загрузку
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result';
    resultDiv.innerHTML = '⏳ Отправка данных и анализ...';
    resultDiv.style.display = 'block';

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 'success') {
        const r = result.report;
        const scores = r.isl_scores;

        let tableHtml = \`
          <table>
            <tr><td><strong>Advocacy (Инициативность)</strong></td><td>\${scores.advocacy}</td></tr>
            <tr><td><strong>Support (Поддержка)</strong></td><td>\${scores.support}</td></tr>
            <tr><td><strong>Mindset (Осознанность)</strong></td><td>\${scores.mindset}</td></tr>
            <tr><td><strong>Reporting (Открытость)</strong></td><td>\${scores.reporting}</td></tr>
            <tr><td><strong>Reluctance (Избегание, инверт.)</strong></td><td>\${scores.reluctance}</td></tr>
          </table>
        \`;

        let recHtml = r.recommendations.map(rec => \`<li>\${rec}</li>\`).join('');

        resultDiv.className = 'result success';
        resultDiv.innerHTML = \`
          <h3>📊 Результаты анализа</h3>
          <p><strong>Категория:</strong> <span style="font-size:18px;font-weight:700;color:#1a2a6c;">\${r.category}</span></p>
          <p><strong>Культура безопасности:</strong> \${r.culture.level} (оценка: \${r.culture.score})</p>
          <p><strong>Сильные стороны:</strong> \${r.strengths.join(', ') || '—'}</p>
          <p><strong>Слабые стороны:</strong> \${r.weaknesses.join(', ') || '—'}</p>
          \${tableHtml}
          <h4 style="margin-top:15px;">💡 Рекомендации</h4>
          <ul class="rec-list">\${recHtml}</ul>
          <p style="margin-top:15px;font-size:13px;color:#666;">✅ Ответ сохранён (ID: \${result.response_id})</p>
        \`;
      } else {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = \`❌ Ошибка: \${result.message || 'Неизвестная ошибка'}\`;
      }
    } catch (error) {
      resultDiv.className = 'result error';
      resultDiv.innerHTML = \`❌ Ошибка отправки: \${error.message}\`;
    } finally {
      btn.disabled = false;
    }
  });

  // Рендерим при загрузке
  document.addEventListener('DOMContentLoaded', renderQuestions);
</script>
</body>
</html>
  `);
});

// ============================================================
// 5. ЗАПУСК СЕРВЕРА
// ============================================================

const PORT = parseInt(process.env.PORT || "3000");

console.log(`🚀 ISL Survey API запущен на порту ${PORT}`);
console.log(`📋 Всего вопросов: ${ALL_QUESTIONS.length}`);
console.log(`📊 Разделы: А(10) + Б1(6) + Б2(6) + Б3(6) + Б4(6) + Б5(6) + В(6) + Г(5) = ${ALL_QUESTIONS.length}`);
console.log(`🔗 Откройте /survey для прохождения опроса`);

export default {
  port: PORT,
  fetch: app.fetch,
};