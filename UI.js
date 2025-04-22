let nameMap = {}

// --------------------------- ВЫВОД ДЛЯ ПОЛЬЗОВАТЕЛЯ ---------------------------
// Показ сообщения, если материал не найден
function showNoDrinkFound() {
    document.getElementById('question-container').innerHTML = 'екомендуемые материалы';
    document.getElementById('question-container').style.display = 'none';
    const container = document.getElementById('result-container');
    container.innerHTML = `<div class="question"><p>Не удалось определить подходящие материалы на основе ваших предпочтений.</p></div>`;
    container.style.display = 'block';
}

// Показ результатов, если материал найден
function showAllDrinksResult(drinks) {
    document.getElementById('action-header').textContent = 'Рекомендуемые материалы';
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('question-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    let drinksHtmlPotolok = '<div class="question"><p>Вероятности соответствия вашим предпочтениям (потолок):</p><ul>';
    let drinksHtmlPol = '<div class="question"><p>Вероятности соответствия вашим предпочтениям (пол):</p><ul>';
    let drinksHtmlSteni = '<div class="question"><p>Вероятности соответствия вашим предпочтениям (стены):</p><ul>';
    drinks.forEach(drink => {
        const percentage = Math.round(drink.value * 100);
        const isPerfectMatch = drink.value >= 0.99;
        if (drink.name.endsWith('_potolok')) {
            drinksHtmlPotolok += `
            <li>
                <strong>${formatDrinkName(drink.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
        if (drink.name.endsWith('_pol')) {
            drinksHtmlPol += `
            <li>
                <strong>${formatDrinkName(drink.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
        if (drink.name.endsWith('_steni')) {
            drinksHtmlSteni += `
            <li>
                <strong>${formatDrinkName(drink.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
        }
    });

    drinksHtmlPotolok += `</ul></div>` + drinksHtmlSteni + `</ul></div>` + drinksHtmlPol + `</ul></div>`;

    resultContainer.innerHTML = `${drinksHtmlPotolok}`;
}

// Показ ошибки
function showError(message) {
    const container = document.getElementById('error-container');
    document.getElementById('error-modal').innerHTML = message;
    container.style.display = 'block';
    setTimeout(() => {
        container.style.display = 'none';
    }, 2000);
}

// 6. Обработка ошибок при вводе ответа
function handleSubmissionError(error) {
    console.error("Ошибка при отправке ответов:", error);
    if (error.message === "Пожалуйста, выберите хотя бы один вариант") {
        alert(error.message);
    } else {
        alert("Произошла ошибка при обработке ваших ответов");
    }
}

// 5. Обработка ошибок при выводе ответа БЗ
function handleDrinkDeterminationError(error) {
    console.error("Ошибка при определении напитка:", error);
    showError("Произошла ошибка при подборе напитка");
    showNoDrinkFound();
}

// вывод следующего вопроса
async function displayNextQuestion() {
    // Если данные ещё не загружены
    if (questionsData.length === 0) {
        questionsData = await fetchAllQuestions();
    }
    if (!drinksData) {
        drinksData = await getDrinksData();
    }
    // Проверяем, есть ли ещё вопросы
    if (currentQuestionIndex < questionsData.length) {
        const currentQuestion = questionsData[currentQuestionIndex];
        renderQuestion(currentQuestion.label, currentQuestion.options);
    } else {
        //document.getElementById('next-quest-btn.btn').classList.add('hidden');
        // Вопросы закончились - определяем результат
        determineDrink();
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
            nameMap[option.value] = option.label;
        } else {
            const optionElement = document.createElement('div');
            optionElement.className = 'option-item';
            optionElement.innerHTML = `
                        <input type="checkbox" id="opt_${option.value}" 
                               name="option" value="${option.value}">
                        <label for="opt_${option.value}">${option.label}</label>
                    `;
            optionsContainer.appendChild(optionElement);
            nameMap[option.value] = option.label;
        }
    });

    container.innerHTML = '';
    container.appendChild(questionClone);
}

// Вспомогательная функция для форматирования названий
function formatPreferenceName(name) {
    return nameMap[name] || name;
}

function formatDrinkName(name) {
    const nameMap = {
        // Потолок
        'pobelka_potolok': 'Побелка',
        'shpaklevka_pokraska_potolok': ':)',
        'potolochnye_plitki_potolok': 'Потолочные плитки',
        'gipsokarton_potolok': 'Гипсокартон',
        'natyazhnoi_potolok': 'Натяжной потолок',

        // Стены
        'oboi_bumazhnye_steni': 'Обои бумажные',
        'oboi_vinilovye_steni': 'Обои виниловые',
        'dekorativnaya_shtukaturka_steni': 'Декоративная штукатурка',
        'pokraska_steni': 'Покраска стен',
        'keramicheskaya_plitka_steni': 'Керамическая плитка',
        'paneli_pvh_mdf_steni': ':)',
        'gipsokarton_steni': 'Гипсокартон',

        // Полы
        'laminat_pol': 'Ламинат',
        'parket_pol': 'Паркет',
        'linoleum_pol': 'Линолеум',
        'plitka_keramogranit_pol': 'Плитка керамогранит',
        'nalivnoy_pol': 'Наливной пол',
        'probkovoe_pokrytie_pol': 'Пробковое покрытие',
        'kovrolin_pol': 'Ковролин'

    };
    return nameMap[name] || name;
    // NOTE думаю, лучше это не использовать, но добавлять алиасы в прологе для напитков тоже как-то не хочется
    //return name;
}
