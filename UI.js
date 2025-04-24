let preferenceMap = {}
let materialMap = {
    // Потолок
    'pobelka_potolok': 'Побелка',
    'shpaklevka_pokraska_potolok': 'Шпаклевка с покраской',
    'potolochnye_plitki_potolok': 'Потолочные плитки',
    'gipsokarton_potolok': 'Гипсокартон',
    'natyazhnoi_potolok': 'Натяжной потолок',

    // Стены
    'oboi_bumazhnye_steni': 'Обои бумажные',
    'oboi_vinilovye_steni': 'Обои виниловые',
    'dekorativnaya_shtukaturka_steni': 'Декоративная штукатурка',
    'pokraska_steni': 'Покраска стен',
    'keramicheskaya_plitka_steni': 'Керамическая плитка',
    'paneli_pvh_mdf_steni': 'Панель пвх/мдф',
    'gipsokarton_steni': 'Гипсокартон',

    // Полы
    'laminat_pol': 'Ламинат',
    'parket_pol': 'Паркет',
    'linoleum_pol': 'Линолеум',
    'plitka_keramogranit_pol': 'Плитка керамогранит',
    'nalivnoy_pol': 'Наливной пол',
    'probkovoe_pokrytie_pol': 'Пробковое покрытие',
    'kovrolin_pol': 'Ковролин'
}

// --------------------------- ВЫВОД ДЛЯ ПОЛЬЗОВАТЕЛЯ ---------------------------
// Показ сообщения, если материал не найден
function showNoMaterialFound() {
    document.getElementById('action-header').textContent = 'Рекомендуемые материалы';
    document.getElementById('question-container').style.display = 'none';
    const container = document.getElementById('result-container');
    container.innerHTML = `<div class="question"><p>Не удалось определить подходящие материалы на основе ваших предпочтений.</p></div>`;
    container.style.display = 'block';
}

// Показ результатов, если материал найден
function showAllMaterialsResult(materials) {
    document.getElementById('action-header').textContent = 'Рекомендуемые материалы';
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    let materialsHtmlPotolok = '<div class="question"><p>Рекомендуемые материалы для потолка:</p><ul>';
    let materialsHtmlPol = '<div class="question"><p>Рекомендуемые материалы для пола:</p><ul>';
    let materialsHtmlSteni = '<div class="question"><p>Рекомендуемые материалы для стен:</p><ul>';
    materials.forEach(material => {
        const percentage = Math.round(material.value * 100);
        const isPerfectMatch = material.value >= 0.99;
        if (material.name.endsWith('_potolok')) {
            materialsHtmlPotolok += `
            <li>
                <strong>${formatMaterialName(material.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
        if (material.name.endsWith('_pol')) {
            materialsHtmlPol += `
            <li>
                <strong>${formatMaterialName(material.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
        if (material.name.endsWith('_steni')) {
            materialsHtmlSteni += `
            <li>
                <strong>${formatMaterialName(material.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
    });

    materialsHtmlPotolok += `</ul></div>` + materialsHtmlSteni + `</ul></div>` + materialsHtmlPol + `</ul></div>`;

    resultContainer.innerHTML = `${materialsHtmlPotolok}`;
}

// Показ ошибки
function showError(message) {
    const container = document.getElementById('error-container');
    document.getElementById('error-modal').innerHTML = '<p>' + message + '</p>';
    container.style.display = 'block';
    setTimeout(() => {
        container.style.display = 'none';
    }, 2000);
}

// Обработка ошибок при вводе ответа
function handleSubmissionError(error) {
    console.error("Ошибка при отправке ответов:", error);
    if (error.message === "Пожалуйста, выберите хотя бы один вариант") {
        showError(error.message);
    } else {
        showError("Произошла ошибка при обработке ваших ответов");
    }
}

// Обработка ошибок при выводе ответа БЗ
function handleMaterialDeterminationError(error) {
    console.error("Ошибка при определении напитка:", error);
    showError("Произошла ошибка при подборе напитка");
    showNoMaterialFound();
}

// вывод следующего вопроса
async function displayNextQuestion() {
    // Если данные ещё не загружены
    if (questionsData.length === 0) {
        questionsData = await fetchAllQuestions();
    }
    getPreferencesName(questionsData);
    if (!materialsData) {
        materialsData = await getMaterialsData();
    }
    // Проверяем, есть ли ещё вопросы
    if (currentQuestionIndex < questionsData.length) {
        const currentQuestion = questionsData[currentQuestionIndex];
        await renderQuestion(currentQuestion.label, currentQuestion.options);
    } else {
        // Вопросы закончились - определяем результат
        await determineMaterial();
    }
}

// Рендеринг вопроса
function renderQuestion(questionText, options) {
    const container = document.getElementById('question-container');
    const template = document.getElementById('question-template');

    const questionClone = template.content.cloneNode(true);
    questionClone.querySelector('.question-text').innerHTML = questionText;
    const optionsContainer = questionClone.querySelector('.options');

    parseOptions(options).forEach(option => {
        if (!binary) {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            optionElement.innerHTML = `
                <div class="option-header">
                    <label>${option.label}</label>
                    <span class="score-value" data-option="${option.value}">0</span>
                </div>
                <input type="range" min="0" max="10" value="0" 
                       class="score-slider" data-option="${option.value}">
            `;

            // Элементы для управления
            const valueDisplay = optionElement.querySelector('.score-value');
            const slider = optionElement.querySelector('.score-slider');

            // Обновление отображаемого значения при движении слайдера
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value;
            });

            optionsContainer.appendChild(optionElement);
        } else {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            optionElement.innerHTML = `
                        <input type="checkbox" id="opt_${option.value}" 
                               name="option" value="${option.value}">
                        <label for="opt_${option.value}">${option.label}</label>
                    `;
            optionsContainer.appendChild(optionElement);
        }
    });

    container.innerHTML = '';
    container.appendChild(questionClone);
}

// Создание словаря предпочтений
function getPreferencesName(questionsData) {
    questionsData.forEach(elem => {
        parseOptions(elem.options).forEach(option => {
            preferenceMap[option.value] = option.label;
        });
    });
}

// Вспомогательная функция для форматирования предпочтений
function formatPreferenceName(name) {
    return preferenceMap[name] || name;
}

// Вспомогательная функция для форматирования названий материалов
function formatMaterialName(name) {
    return materialMap[name] || name;
}

// Функция транслитерации кириллицы в латиницу
function transliterate(text) {
    const cyrillicMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
        'я': 'ya'
    };

    return text.toLowerCase()
        .split('')
        .map(char => cyrillicMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}


