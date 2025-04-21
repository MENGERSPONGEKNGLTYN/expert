let nameMap = {}

// --------------------------- ВЫВОД ДЛЯ ПОЛЬЗОВАТЕЛЯ ---------------------------
// Показ сообщения, если материал не найден
function showNoDrinkFound() {
    const container = document.getElementById('result-container');
    container.innerHTML = `
                <p>Не удалось определить подходящий напиток на основе ваших предпочтений.</p>
                <button class="btn" onclick="resetSystem()">Попробовать снова</button>
            `;
    container.classList.remove('hidden');
}

// Показ результатов, если материал найден
function showAllDrinksResult(drinks) {
    document.getElementById('question-container').innerHTML = '';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    let drinksHtml = '<p>Вероятности соответствия вашим предпочтениям:</p><ul>';

    drinks.forEach(drink => {
        const percentage = Math.round(drink.value * 100);
        const isPerfectMatch = drink.value >= 0.99;

        drinksHtml += `
            <li>
                <strong>${formatDrinkName(drink.name)}</strong>: 
                ${percentage}%
                ${isPerfectMatch ? ' (полное соответствие)' : ''}
                <div class="progress-bar">
                    <div class="progress" style="width: ${percentage}%"></div>
                </div>
            </li>`;
    });

    drinksHtml += `</ul>`;

    resultContainer.innerHTML = `<h3>Рекомендуемые напитки:</h3>
                             ${drinksHtml}
                             <button class="btn" onclick="resetSystem()">Начать заново</button>`;
}

// Показ ошибки
function showError(message) {
    const container = document.getElementById('error-container');
    container.textContent = message;
    container.style.display = 'block';
    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);
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
        // Вопросы закончились - определяем результат
        determineDrink();
    }
}

// Рендеринг вопроса
function renderQuestion(questionText, options) {
    const container = document.getElementById('question-container');
    const template = document.getElementById('question-template');

    const questionClone = template.content.cloneNode(true);
    questionClone.querySelector('.question-text').textContent = questionText;
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
    /*const nameMap = {
        'tea': 'Чай',
        'coffee': 'Кофе',
        'hot_chocolate': 'Горячий шоколад',
        'orange_juice': 'Апельсиновый сок',
        'water': 'Вода',
        'lemonade': 'Лимонад',
        'iced_tea': 'Холодный чай',
        'milk_shake': 'Молочный коктейль'
    };
    return nameMap[name] || name;*/
    // NOTE думаю, лучше это не использовать, но добавлять алиасы в прологе для напитков тоже как-то не хочется
    return name;
}
