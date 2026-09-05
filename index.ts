import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

// ============================================================
// 1. ВСЕ ВОПРОСЫ (полный список)
// ============================================================

const ALL_QUESTIONS = [
  // Раздел А: Культура безопасности (10 вопросов)
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

  // Раздел Б1: Advocacy (6 вопросов)
  { id: "b1_1", section: "Б1", text: "Этот сотрудник часто говорит коллегам о том, как сделать работу безопаснее", options: [1, 2, 3, 4, 5] },
  { id: "b1_2", section: "Б1", text: "Этот сотрудник предлагает руководству идеи по улучшению безопасности на участке", options: [1, 2, 3, 4, 5] },
  { id: "b1_3", section: "Б1", text: "Этот сотрудник активно участвует в обсуждении вопросов безопасности на собраниях", options: [1, 2, 3, 4, 5] },
  { id: "b1_4", section: "Б1", text: "Этот сотрудник берёт на себя инициативу, когда видит потенциальную опасность", options: [1, 2, 3, 4, 5] },
  { id: "b1_5", section: "Б1", text: "Этот сотрудник делится с коллегами информацией о новых правилах безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b1_6", section: "Б1", text: "Этот сотрудник поощряет других высказываться по вопросам безопасности", options: [1, 2, 3, 4, 5] },

  // Раздел Б2: Support (6 вопросов)
  { id: "b2_1", section: "Б2", text: "К этому сотруднику приходят за советом по вопросам безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b2_2", section: "Б2", text: "Этот сотрудник помогает новым работникам освоить правила безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b2_3", section: "Б2", text: "Этот сотрудник готов прийти на помощь коллегам, если замечает небезопасные действия", options: [1, 2, 3, 4, 5] },
  { id: "b2_4", section: "Б2", text: "Этот сотрудник отзывчив на проблемы безопасности, поднимаемые коллегами", options: [1, 2, 3, 4, 5] },
  { id: "b2_5", section: "Б2", text: "Этот сотрудник даёт практические советы по безопасности, когда его просят", options: [1, 2, 3, 4, 5] },
  { id: "b2_6", section: "Б2", text: "Этот сотрудник поддерживает коллег, которые сообщают о нарушениях", options: [1, 2, 3, 4, 5] },

  // Раздел Б3: Mindset (6 вопросов)
  { id: "b3_1", section: "Б3", text: "Этот сотрудник понимает, почему правила безопасности важны, а не просто знает их", options: [1, 2, 3, 4, 5] },
  { id: "b3_2", section: "Б3", text: "Безопасность для этого сотрудника — личный приоритет, а не формальность", options: [1, 2, 3, 4, 5] },
  { id: "b3_3", section: "Б3", text: "Этот сотрудник может объяснить последствия нарушения правил безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b3_4", section: "Б3", text: "Этот сотрудник знает, как правильно действовать в нештатной ситуации", options: [1, 2, 3, 4, 5] },
  { id: "b3_5", section: "Б3", text: "Этот сотрудник уверен в своих знаниях по охране труда", options: [1, 2, 3, 4, 5] },
  { id: "b3_6", section: "Б3", text: "Этот сотрудник считает, что безопасность не менее важна, чем выполнение плана", options: [1, 2, 3, 4, 5] },

  // Раздел Б4: Reporting (6 вопросов)
  { id: "b4_1", section: "Б4", text: "Этот сотрудник сообщает о нарушениях, чтобы их исправить", options: [1, 2, 3, 4, 5] },
  { id: "b4_2", section: "Б4", text: "Этот сотрудник не боится говорить о проблемах безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b4_3", section: "Б4", text: "Этот сотрудник поощряет коллег сообщать о «почти-инцидентах»", options: [1, 2, 3, 4, 5] },
  { id: "b4_4", section: "Б4", text: "Этот сотрудник честно рассказывает о допущенных ошибках, чтобы предотвратить их повторение", options: [1, 2, 3, 4, 5] },
  { id: "b4_5", section: "Б4", text: "Этот сотрудник поддерживает культуру открытости в вопросах безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b4_6", section: "Б4", text: "Этот сотрудник считает важным документировать все инциденты, даже мелкие", options: [1, 2, 3, 4, 5] },

  // Раздел Б5: Reluctance (6 вопросов)
  { id: "b5_1", section: "Б5", text: "Этот сотрудник редко добровольно участвует в инициативах по безопасности", options: [1, 2, 3, 4, 5] },
  { id: "b5_2", section: "Б5", text: "Этот сотрудник неохотно обсуждает проблемы безопасности, если они не затрагивают его лично", options: [1, 2, 3, 4, 5] },
  { id: "b5_3", section: "Б5", text: "Этот сотрудник редко делится полезной информацией по безопасности с коллегами", options: [1, 2, 3, 4, 5] },
  { id: "b5_4", section: "Б5", text: "Этот сотрудник предпочитает не вмешиваться в вопросы безопасности других", options: [1, 2, 3, 4, 5] },
  { id: "b5_5", section: "Б5", text: "Этот сотрудник считает, что обсуждать безопасности должен руководитель, а не рядовые работники", options: [1, 2, 3, 4, 5] },
  { id: "b5_6", section: "Б5", text: "Этот сотрудник избегает брать на себя ответственность за безопасность на участке", options: [1, 2, 3, 4, 5] },

  // Раздел В: Социометрия (6 вопросов)
  { id: "v1", section: "В", text: "К кому из ваших коллег вы бы обратились за советом по безопасности в сложной ситуации?", options: ["text"] },
  { id: "v2", section: "В", text: "Кого из ваших коллег вы бы НЕ хотели видеть в роли лидера безопасности?", options: ["text"] },
  { id: "v3", section: "В", text: "С кем из ваших коллег вы хотели бы работать над улучшением безопасности?", options: ["text"] },
  { id: "v4", section: "В", text: "Кто из ваших коллег лучше всех знает правила безопасности?", options: ["text"] },
  { id: "v5", section: "В", text: "Кто из ваших коллег чаще всего подаёт пример безопасного поведения?", options: ["text"] },
  { id: "v6", section: "В", text: "Кого из ваших коллег вы бы НЕ хотели видеть в рабочей группе из-за их отношения к безопасности?", options: ["text"] },

  // Раздел Г: Дополнительная информация (5 вопросов)
  { id: "g1", section: "Г", text: "Ваш стаж работы в компании", options: ["менее 1 года", "1-3 года", "3-5 лет", "5-10 лет", "более 10 лет"] },
  { id: "g2", section: "Г", text: "Ваше подразделение (цех, участок)", options: ["text"] },
  { id: "g3", section: "Г", text: "Как часто вы участвуете в мероприятиях по безопасности?", options: ["Всегда", "Часто", "Иногда", "Редко", "Не участвую"] },
  { id: "g4", section: "Г", text: "Как вы оцениваете доступность инструкций по безопасности?", options: ["Отлично", "Хорошо", "Удовлетворительно", "Плохо", "Не знаю"] },
  { id: "g5", section: "Г", text: "Что мешает соблюдать правила безопасности?", options: ["Нехватка времени", "Сложность оборудования", "Неудобство СИЗ", "Непонимание правил", "Отсутствие контроля", "Давление руководства"] },
];

// ============================================================
// 2. ФУНКЦИЯ АНАЛИЗА
// ============================================================

function analyzeISL(data: Record<string, any>) {
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
        if (factor === "reluctance") val = 6 - val;
        sum += val;
        count++;
      }
    }
    scores[factor] = count > 0 ? Math.round((sum / count) * 100) / 100 : 0;
  }

  // Категория
  let category = "Нейтральный";
  if (scores.advocacy >= 4.0 && scores.support >= 4.0 && scores.mindset >= 4.0 && scores.reporting >= 4.0 && scores.reluctance >= 3.5) {
    category = "Лидер безопасности";
  } else if (scores.advocacy >= 3.5 && scores.support >= 3.5 && scores.mindset >= 3.5) {
    category = "Кандидат в лидеры";
  } else if (scores.reluctance < 3.0) {
    category = "Лидер сопротивления";
  }

  // Культура безопасности
  const aValues = [];
  for (let i = 1; i <= 10; i++) {
    const key = `a${i}`;
    if (data[key] !== undefined && data[key] !== null) {
      aValues.push(Number(data[key]));
    }
  }
  const cultureScore = aValues.length > 0 ? Math.round((aValues.reduce((a, b) => a + b, 0) / aValues.length) * 100) / 100 : 0;

  let cultureLevel = "Недостаточно данных";
  if (cultureScore >= 3.5) cultureLevel = "Проактивный (уровень 4) — безопасность как ценность";
  else if (cultureScore >= 2.5) cultureLevel = "Зависимый (уровень 3) — управление через вовлечение";
  else if (cultureScore >= 1.5) cultureLevel = "Реактивный (уровень 2) — управление через контроль";
  else if (cultureScore > 0) cultureLevel = "Пассивный (уровень 1) — безопасность не в приоритете";

  // Рекомендации
  const recommendations: string[] = [];
  if (category === "Лидер безопасности") {
    recommendations.push("✅ Вы — явный лидер безопасности. Участвуйте в программе развития лидеров.");
    recommendations.push("🎯 Используйте ваш авторитет для продвижения культуры безопасности.");
  } else if (category === "Кандидат в лидеры") {
    recommendations.push("🔄 Вы — потенциальный лидер. Развивайте коммуникативные навыки.");
    recommendations.push("📈 Участвуйте в инициативах по безопасности.");
  } else if (category === "Лидер сопротивления") {
    recommendations.push("⚠️ Рекомендуется индивидуальная работа и вовлечение в диалог.");
    recommendations.push("🤝 Примите участие в рабочих группах по улучшению безопасности.");
  } else {
    recommendations.push("📌 Развивайте осознанное отношение к безопасности.");
    recommendations.push("📚 Рекомендуется дополнительное обучение по охране труда.");
  }

  if (cultureScore < 2.5 && cultureScore > 0) {
    recommendations.push("📊 Уровень культуры безопасности ниже среднего.");
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strengths = sorted.slice(0, 2).map(([k, v]) => `${k}: ${v}`);
  const weaknesses = sorted.slice(-2).map(([k, v]) => `${k}: ${v}`);

  return { isl_scores: scores, category, culture: { score: cultureScore, level: cultureLevel }, strengths, weaknesses, recommendations };
}

// ============================================================
// 3. МАРШРУТЫ
// ============================================================

app.get("/", async (c) => c.text("🛡️ ISL Survey API — Оценка лидерства в безопасности\n\nДоступные эндпоинты:\n  GET /survey — страница опросника\n  GET /api/health — проверка статуса\n  POST /api/submit — отправка ответов\n  GET /api/questions — получить все вопросы"));

app.get("/api/health", async (c) => c.json({ status: "ok", timestamp: new Date().toISOString(), version: "1.0.0", total_questions: ALL_QUESTIONS.length }));

app.get("/api/questions", async (c) => c.json({ total: ALL_QUESTIONS.length, questions: ALL_QUESTIONS }));

app.post("/api/submit", async (c) => {
  try {
    const data = await c.req.json();
    if (!data || Object.keys(data).length === 0) return c.json({ status: "error", message: "Нет данных" }, 400);
    const report = analyzeISL(data);
    return c.json({ status: "success", response_id: Date.now(), report });
  } catch (error: any) {
    return c.json({ status: "error", message: error.message }, 500);
  }
});

app.get("/survey", async (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISL Опросник</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1a2a6c, #2d4373); min-height: 100vh; padding: 30px 20px; }
    .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    h1 { color: #1a2a6c; font-size: 28px; margin-bottom: 5px; }
    .subtitle { color: #666; margin-bottom: 5px; }
    .badge { display: inline-block; background: #1a2a6c; color: white; padding: 4px 16px; border-radius: 20px; font-size: 13px; margin-bottom: 20px; }
    .section-title { color: #1a2a6c; font-size: 20px; margin: 30px 0 15px 0; padding-bottom: 5px; border-bottom: 2px solid #e8f0fe; }
    .section-desc { color: #666; font-size: 14px; margin-bottom: 15px; }
    .question-block { background: #f8f9fa; padding: 15px 20px; border-radius: 10px; margin-bottom: 12px; border-left: 4px solid #1a2a6c; }
    .question-block .qtext { font-weight: 500; margin-bottom: 8px; font-size: 15px; }
    .options { display: flex; gap: 15px; flex-wrap: wrap; }
    .options label { display: flex; align-items: center; gap: 5px; cursor: pointer; font-size: 14px; }
    .options label input[type="radio"] { width: 17px; height: 17px; cursor: pointer; }
    .text-input { padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; width: 100%; max-width: 400px; font-size: 14px; }
    .text-input:focus { outline: none; border-color: #1a2a6c; }
    .btn-submit { display: block; width: 100%; padding: 16px; background: linear-gradient(135deg, #1a2a6c, #2d4373); color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: 600; cursor: pointer; margin-top: 30px; }
    .btn-submit:hover { transform: translateY(-2px); }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .result { margin-top: 25px; padding: 25px; border-radius: 12px; display: none; }
    .result.success { background: #e8f5e9; border-left: 4px solid #28a745; display: block; }
    .result.error { background: #fce4ec; border-left: 4px solid #dc3545; display: block; }
    .result h3 { color: #1a2a6c; margin-bottom: 10px; }
    .result table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    .result table td { padding: 6px 10px; border-bottom: 1px solid #eee; }
    .rec-list { padding-left: 20px; margin: 10px 0; }
    .rec-list li { margin: 5px 0; }
    .progress { background: #e0e0e0; border-radius: 10px; height: 8px; margin-bottom: 20px; overflow: hidden; }
    .progress-bar { height: 100%; background: linear-gradient(135deg, #1a2a6c, #2d4373); border-radius: 10px; transition: width 0.3s; width: 0%; }
    .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    @media (max-width: 600px) { .container { padding: 20px; } .options { gap: 10px; } }
  </style>
</head>
<body>
<div class="container">
  <h1>🛡️ ISL Опросник</h1>
  <p class="subtitle">Оценка неформального лидерства в безопасности</p>
  <span class="badge">Оренбургский филиал ООО «Газпромтранс»</span>
  <div class="progress"><div class="progress-bar" id="progressBar"></div></div>
  <form id="surveyForm"><div id="questionsContainer"></div>
    <p style="color:#999;font-size:13px;margin:15px 0;border-top:1px solid #eee;padding-top:15px;">
      ⏱ Время: 20-30 мин · <span id="answeredCount">0</span>/<span id="totalCount">0</span>
    </p>
    <button type="submit" class="btn-submit" id="submitBtn">📤 Отправить и получить анализ</button>
  </form>
  <div id="result" class="result"></div>
  <div class="footer">© ООО «Газпромтранс» · Оренбургский филиал · 2026</div>
</div>
<script>
  const questions = ${JSON.stringify(ALL_QUESTIONS)};
  const sectionNames = {
    'А': '📋 Раздел А. Культура безопасности',
    'Б1': '📌 Раздел Б1. Инициативность (Advocacy)',
    'Б2': '🤝 Раздел Б2. Поддержка (Support)',
    'Б3': '🧠 Раздел Б3. Осознанное отношение (Mindset)',
    'Б4': '🔓 Раздел Б4. Открытость (Reporting)',
    'Б5': '⚠️ Раздел Б5. Избегание (Reluctance)',
    'В': '👥 Раздел В. Социометрия',
    'Г': 'ℹ️ Раздел Г. Дополнительная информация'
  };
  const sectionColors = { 'А': '#1a2a6c', 'Б1': '#0077b6', 'Б2': '#2d6a4f', 'Б3': '#e76f51', 'Б4': '#6d597a', 'Б5': '#b5838d', 'В': '#e9c46a', 'Г': '#a7c957' };
  let totalQuestions = questions.length;

  function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    let html = '';
    let currentSection = '';
    questions.forEach((q, index) => {
      if (q.section !== currentSection) {
        currentSection = q.section;
        const color = sectionColors[q.section] || '#1a2a6c';
        html += \`<div class="section-title" style="border-bottom-color: \${color}">\${sectionNames[q.section] || 'Раздел ' + q.section}</div>\`;
        if (q.section === 'Б5') html += \`<div class="section-desc">⚠️ Обратная шкала: 1→5, 2→4, 3→3, 4→2, 5→1</div>\`;
        if (q.section === 'В') html += \`<div class="section-desc">Укажите фамилии коллег (от 1 до 5), через запятую</div>\`;
      }
      const isText = q.options && q.options[0] === 'text';
      const isSelect = q.options && Array.isArray(q.options) && q.options.length > 1 && !isText;
      html += \`<div class="question-block" style="border-left-color: \${sectionColors[q.section] || '#1a2a6c'}"><div class="qtext">\${index+1}. \${q.text}</div>\`;
      if (isText) {
        html += \`<input type="text" class="text-input" id="\${q.id}" name="\${q.id}" placeholder="Введите фамилии..." onchange="updateProgress()">\`;
      } else if (isSelect) {
        html += \`<div class="options">\${q.options.map(opt => \`<label><input type="radio" name="\${q.id}" value="\${opt}" onchange="updateProgress()"> \${opt}</label>\`).join('')}</div>\`;
      } else if (q.options) {
        html += \`<div class="options">\${q.options.map(opt => \`<label><input type="radio" name="\${q.id}" value="\${opt}" onchange="updateProgress()"> \${opt}</label>\`).join('')}</div>\`;
      }
      html += \`</div>\`;
    });
    container.innerHTML = html;
    document.getElementById('totalCount').textContent = totalQuestions;
    updateProgress();
  }

  function updateProgress() {
    const form = document.getElementById('surveyForm');
    const radioNames = new Set();
    form.querySelectorAll('input[type="radio"]').forEach(r => radioNames.add(r.name));
    let answered = 0;
    radioNames.forEach(name => { if (form.querySelector(\`input[name="\${name}"]:checked\`)) answered++; });
    form.querySelectorAll('input[type="text"]').forEach(inp => { if (inp.value && inp.value.trim() !== '') answered++; });
    document.getElementById('answeredCount').textContent = Math.min(answered, totalQuestions);
    document.getElementById('progressBar').style.width = Math.min((answered / totalQuestions) * 100, 100) + '%';
  }

  document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (value === '') continue;
      const num = Number(value);
      data[key] = isNaN(num) ? value : num;
    }
    if (Object.keys(data).length === 0) {
      const resultDiv = document.getElementById('result');
      resultDiv.className = 'result error';
      resultDiv.innerHTML = '❌ Пожалуйста, ответьте хотя бы на несколько вопросов.';
      return;
    }
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result';
    resultDiv.innerHTML = '⏳ Анализ...';
    resultDiv.style.display = 'block';
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    try {
      const response = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (result.status === 'success') {
        const r = result.report;
        resultDiv.className = 'result success';
        resultDiv.innerHTML = \`
          <h3>📊 Результаты</h3>
          <p><strong>Категория:</strong> <span style="font-size:18px;font-weight:700;color:#1a2a6c;">\${r.category}</span></p>
          <p><strong>Культура безопасности:</strong> \${r.culture.level} (оценка: \${r.culture.score})</p>
          <p><strong>Сильные стороны:</strong> \${r.strengths.join(', ') || '—'}</p>
          <p><strong>Слабые стороны:</strong> \${r.weaknesses.join(', ') || '—'}</p>
          <table>
            <tr><td><strong>Advocacy</strong></td><td>\${r.isl_scores.advocacy}</td></tr>
            <tr><td><strong>Support</strong></td><td>\${r.isl_scores.support}</td></tr>
            <tr><td><strong>Mindset</strong></td><td>\${r.isl_scores.mindset}</td></tr>
            <tr><td><strong>Reporting</strong></td><td>\${r.isl_scores.reporting}</td></tr>
            <tr><td><strong>Reluctance</strong></td><td>\${r.isl_scores.reluctance}</td></tr>
          </table>
          <h4 style="margin-top:15px;">💡 Рекомендации</h4>
          <ul class="rec-list">\${r.recommendations.map(rec => \`<li>\${rec}</li>\`).join('')}</ul>
          <p style="margin-top:15px;font-size:13px;color:#666;">✅ Ответ сохранён (ID: \${result.response_id})</p>
        \`;
      } else {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = \`❌ Ошибка: \${result.message}\`;
      }
    } catch (error) {
      resultDiv.className = 'result error';
      resultDiv.innerHTML = \`❌ Ошибка: \${error.message}\`;
    }
    btn.disabled = false;
  });
  document.addEventListener('DOMContentLoaded', renderQuestions);
</script>
</body>
</html>`);
});

// ============================================================
// 4. ЗАПУСК
// ============================================================

const PORT = parseInt(process.env.PORT || "3000");
console.log(`🚀 ISL Survey API запущен на порту ${PORT}`);
console.log(`📋 Всего вопросов: ${ALL_QUESTIONS.length}`);
console.log(`🔗 Откройте /survey для прохождения опроса`);

export default {
  port: PORT,
  fetch: app.fetch,
};