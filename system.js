let session;
let consoleLOG = true;
let questionsData = [];
let currentQuestionIndex = 0;
let materialsData;
let binary = false;
// ------------------------------- ЭКСПЕРТНАЯ СИСТЕМА -------------------------------
// Загрузка программы Prolog
async function initSystem() {
    try {
        // Инициализация Tau Prolog
        session = pl.create();

        // Загрузка программы Prolog
        await session.consult("knowledge.pl", {
            success: function () {
                displayNextQuestion();
            }
        });
    } catch (error) {
        console.error("Ошибка инициализации Tau-Prolog:", error);
        showError("Не удалось загрузить систему");
    }
}

// Сброс введённых данных
function resetSystem() {
    // Очищаем базу предпочтений
    session.query('retractall(preference(_, _)).');
    session.answer(async function () {
        // Очищаем результаты
        document.getElementById('action-header').textContent = 'Выбор материалов для ремонта';
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('result-container').innerHTML = '';

        document.getElementById('question-container').style.display = 'block';
        document.getElementById('preferences-display').innerHTML = '';

        // Начинаем заново
        currentQuestionIndex = 0;
    });
    initSystem()
}

// ------------------------ ВЫГРУЗКА ВОПРОСОВ ДЛЯ ПОЛЬЗОВАТЕЛЯ ------------------------
// Получение вопросов из БЗ и вариантов ответа (опций)
async function fetchAllQuestions() {
    return new Promise((resolve) => {
        const questions = [];
        session.query('question(Question, Options).');
        const answerHandler = (answer) => {
            if (answer) {
                questions.push({
                    label: answer.links.Question,  // Текст вопроса
                    options: answer.links.Options  // Варианты ответов
                });
                session.answer(answerHandler);
            } else {
                resolve(questions);
            }
        };
        session.answer(answerHandler);
    });
}

// Парсинг опций вопроса в массив объектов
function parseOptions(term) {
    const options = [];

    function traverseList(node) {
        if (!node || node.id === '[]') return;
        if (node.id === '.' && node.args.length === 2) {
            const head = node.args[0];
            const tail = node.args[1];

            if (head.id === 'option' && head.args.length === 2) {
                if (head.args[0].id === 'binary_question' && head.args[1].id === '') {
                    binary = true
                } else {
                    options.push({
                        value: head.args[0].id,
                        label: head.args[1].id
                    });
                }
            }
            traverseList(tail); // Рекурсивно обрабатываем хвост
        }
    }

    traverseList(term);
    return options;
}

// ------------------------ ОБРАБОТКА ОТВЕТОВ ПОЛЬЗОВАТЕЛЯ ------------------------
// Получение ответа на вопрос
async function submitAnswers() {
    try {
        const answers = getSelectedAnswers();
        validateAnswers(answers);
        await addNewPreferences(answers);
        await proceedToNextStep();
    } catch (error) {
        handleSubmissionError(error);
    }
}

// Получение выбранных ответов
function getSelectedAnswers() {
    if (!binary) {
        const sliders = document.querySelectorAll('.score-slider');
        const answers = [];

        sliders.forEach(slider => {
            const value = parseInt(slider.value) || 0;
            if (value >= 0) {
                answers.push({
                    option: slider.dataset.option,
                    weight: value / 10 // Нормализация к 0-1
                });
            }
        });
        return answers;

    } else {
        const checkboxes = document.querySelectorAll('input[name="option"]:checked');
        return Array.from(checkboxes).map(cb => cb.value)
    }
}

// Валидация ответов
function validateAnswers(answers) {
    if (answers.length === 0) {
        throw new Error("Пожалуйста, выберите хотя бы один вариант");
    }
}

// Добавление новых предпочтений
async function addNewPreferences(answers) {
    if (!binary) {
        const preferencePromises = answers.map(answer => {
            return new Promise(resolve => {
                // session.query(`assertz(preference(${answer}, 1)).`);
                session.query(`assertz(preference(${answer.option}, ${answer.weight})).`);
                session.answer(() => {
                    console.log(`Добавлено: ${answer.option} (${answer.weight})`);
                    resolve();
                });
            });
        });
        await Promise.all(preferencePromises);
    } else {
        const preferencePromises = answers.map(answer => {
            return new Promise(resolve => {
                session.query(`assertz(preference(${answer}, 1)).`);
                session.answer(() => {
                    console.log(`Добавлено preference: ${answer}`);
                    resolve();
                });
            });
        });
        await Promise.all(preferencePromises);
    }

}

// Переход к следующему шагу
async function proceedToNextStep() {
    currentQuestionIndex++;
    console.log("Все предпочтения добавлены. Текущий вопрос:", currentQuestionIndex);
    binary = false;
    // Условие окончания - заданы все вопросы
    if (currentQuestionIndex >= questionsData.length) {
        await determineMaterial();
    } else {
        await displayNextQuestion();
    }
}

// ------------------------ ОБРАБОТКА РЕШЕНИЯ БЗ ------------------------

// Определение напитка
async function determineMaterial() {
    try {
        if (consoleLOG)
            console.log("Начинаем определение напитка...");

        // Получаем все предпочтения пользователя
        const preferences = await fetchUserPreferences();
        if (preferences.length === 0) {
            return handleNoPreferences();
        }

        // Ищем подходящий ответ
        const suitableMaterials = await findSuitableMaterials(preferences);
        displayMaterialResults(suitableMaterials);

    } catch (error) {
        handleMaterialDeterminationError(error);
    }
}

// Получение предпочтений пользователя с весами
async function fetchUserPreferences() {
    const preferences = [];
    await processPreferences(preferences);
    logPreferencesCount(preferences.length);
    return preferences;
}

// Обработка предпочтений
function processPreferences(preferences) {
    return new Promise((resolve) => {
        session.query('preference(Name, Weight).');
        session.answer(createAnswerHandler(preferences, resolve));
    });
}

// Создание обработчика ответов
function createAnswerHandler(preferences, resolve) {
    return function handleAnswer(answer) {
        if (answer === false) {
            resolve();
            return;
        }

        const preference = extractPreference(answer);
        if (preference) {
            preferences.push(preference);
            logPreference(preference);
        }

        session.answer(handleAnswer);
    };
}

// Извлечение данных предпочтения
function extractPreference(answer) {
    if (!answer?.links) return null;

    const name = extractPreferenceName(answer);
    const weight = extractPreferenceWeight(answer);

    return {
        name,
        weight,
        formattedName: formatPreferenceName(name)
    };
}

// Извлечение названия предпочтения
function extractPreferenceName(answer) {
    return answer.links.Name?.id || 'unknown';
}

// Извлечение веса предпочтения
function extractPreferenceWeight(answer) {
    return answer.links.Weight?.value ?? answer.links.Weight?.id ?? 0;
}

// Логирование предпочтения
function logPreference(preference) {
    console.log(`- Найдено: ${preference.formattedName} (вес: ${preference.weight})`);
}

// Логирование общего количества
function logPreferencesCount(count) {
    console.log(`Всего предпочтений: ${count}`);
}

// Главная функция
async function findSuitableMaterials(preferences) {
    try {
        return calculateMaterialMatches(preferences, materialsData);
    } catch (error) {
        handleCalculationError(error);
        return [];
    }
}

// Расчет соответствия напитков
function calculateMaterialMatches(userPreferences, materialsData) {
    const results = [];

    for (const [materialName, materialInfo] of Object.entries(materialsData)) {
        const matchScore = calculateMaterialScore(materialInfo, userPreferences);
        if (matchScore > 0) {
            results.push(createMaterialResult(materialName, matchScore));
        }
    }

    return sortResults(results);
}

// Расчет score для одного напитка
function calculateMaterialScore(materialInfo, userPreferences) {
    if (!materialInfo?.conditions) return 0;

    let totalScore = 0;
    let maxScore = 0;

    for (const condition of materialInfo.conditions) {
        const {currentScore, currentMax} = processCondition(condition, userPreferences);
        totalScore += currentScore;
        maxScore += currentMax;
    }

    return maxScore > 0 ? totalScore / maxScore : 0;
}

// Обработка одного условия
function processCondition(condition, userPreferences) {
    const condName = condition.name;
    const condWeight = Number(condition.value) || 0;
    let currentScore = 0;

    const userPref = userPreferences.find(p => p.name === condName);
    if (userPref) {
        currentScore = condWeight * (Number(userPref.weight) || 0);
    }

    return {
        currentScore,
        currentMax: condWeight
    };
}

// Создание объекта результата
function createMaterialResult(name, score) {
    return {
        name,
        value: parseFloat(score.toFixed(4))
    };
}

// Сортировка результатов
function sortResults(results) {
    return results.sort((a, b) => b.value - a.value);
}

// Обработка ошибок
function handleCalculationError(error) {
    console.error("Ошибка расчета:", error);
}

// ---------------------- Получение данных о напитках ----------------------------------------
async function getMaterialsData() {
    const rules = session.rules['material/1'] || [];
    return await parseMaterialRules(rules);
}

// Парсинг всех правил напитков
function parseMaterialRules(rules) {
    return rules.reduce((result, rule) => {
        const material = parseMaterialRule(rule);
        return material ? {...result, [material.name]: material.data} : result;
    }, {});
}

// Парсинг одного правила напитка
function parseMaterialRule(rule) {
    if (!isValidMaterialRule(rule)) return null;

    const name = rule.head.args[0].id;
    const conditions = parseConditions(rule.body);

    return {name, data: {conditions, count: conditions.length}};
}

// Проверка валидности правила
function isValidMaterialRule(rule) {
    const head = rule.head;
    return head && head.id === 'material' && head.args && head.args.length === 1;
}

// Парсинг условий напитка
function parseConditions(body) {
    const conditions = [];
    let current = body;

    while (current) {
        const [first, rest] = current.id === ',' ?
            [current.args[0], current.args[1]] :
            [current, null];

        addCondition(first, conditions);
        current = rest;
    }

    return conditions;
}

// Добавление условия
function addCondition(condition, conditions) {
    if (condition.id === 'preference' && condition.args?.length === 2) {
        conditions.push({
            name: condition.args[0].id,
            value: parseNumber(condition.args[1])
        });
    }
}

// -------------------------  ОБЩЕЕ  --------------------------------------
// Парсинг числовых значений из Prolog-термов
function parseNumber(term) {
    if (term.value !== undefined) return term.value;
    if (!isNaN(term.id)) return parseFloat(term.id);
    return 0; // Значение по умолчанию
}

// Обработка отсутствия предпочтений
function handleNoPreferences() {
    console.log("Нет предпочтений для определения напитка");
    showNoMaterialFound();
}

// Отображение результатов
function displayMaterialResults(materials) {
    if (materials.length > 0) {
        showAllMaterialsResult(materials);
    } else {
        showNoMaterialFound();
    }
}

// ------------------------ DEBUG ------------------------
// Корректная версия функции для вывода всех предпочтений
function showAllPreferences() {
    console.log("Получение всех предпочтений...");
    const uiContainer = document.getElementById('preferences-display');

    // Очищаем контейнер перед выводом
    if (uiContainer) uiContainer.innerHTML = '<p>Загрузка предпочтений...</p>';

    // Создаем новый запрос
    session.query('preference(Name, Weight).');

    // Обработчик ответов
    const processAnswer = (answer) => {
        if (answer === false) {
            // Все ответы получены
            console.log("Все предпочтения получены");
            if (uiContainer) {
                if (uiContainer.children.length === 1 &&
                    uiContainer.firstChild.textContent === 'Загрузка предпочтений...') {
                    uiContainer.innerHTML = '<p>Нет добавленных предпочтений</p>';
                }
            }
            return;
        }

        if (answer && answer.links) {
            // Извлекаем данные из ответа
            const prefName = answer.links.Name?.id || 'unknown';
            const prefWeight = answer.links.Weight?.value ?? answer.links.Weight?.id ?? 'unknown';
            const formattedName = formatPreferenceName(prefName);

            // Вывод в консоль
            console.log(`- ${formattedName}: вес = ${prefWeight}`);

            // Вывод в интерфейс
            if (uiContainer && prefWeight !== 0) {
                // Удаляем сообщение о загрузке если оно есть
                if (uiContainer.children.length === 1 &&
                    uiContainer.firstChild.textContent === 'Загрузка предпочтений...') {
                    uiContainer.innerHTML = '';
                }

                const prefElement = document.createElement('div');
                prefElement.className = 'preference-item';
                prefElement.innerHTML = `
                    <span class="pref-name">${formattedName}</span>
                    <span class="pref-weight">${prefWeight * 10} / 10</span>
                `;
                uiContainer.appendChild(prefElement);
            }
        }

        // Продолжаем получать следующие ответы
        session.answer(processAnswer);
    };

    // Начинаем обработку
    session.answer(processAnswer);
}

function showAllMaterials() {
    try {
        // Очищаем контейнер перед выводом
        const uiContainer = document.getElementById('preferences-display');
        uiContainer.innerHTML = '';

        // Проверяем тип данных и преобразуем при необходимости
        let materials;

        if (materialMap instanceof Map) {
            // Если это Map - преобразуем в массив
            materials = Array.from(materialMap.entries());
        } else if (Array.isArray(materialMap)) {
            // Если это массив - используем как есть
            materials = materialMap;
        } else if (typeof materialMap === 'object' && materialMap !== null) {
            // Если это обычный объект - преобразуем в массив
            materials = Object.entries(materialMap);
        } else {
            throw new Error('materialMap должен быть Map, массивом или объектом');
        }

        // Проверяем, есть ли материалы для отображения
        if (materials.length === 0) {
            uiContainer.innerHTML = '<div class="empty-message">Нет сохраненных материалов</div>';
            return;
        }

        // Создаем элементы для каждого материала
        materials.forEach(([key, value]) => {
            const prefElement = document.createElement('div');
            prefElement.className = 'preference-item';

            // Если value - простое значение
            prefElement.innerHTML = `
                    <span class="pref-name">${key}</span>
                    <span class="pref-weight">${value}</span>`;
            uiContainer.appendChild(prefElement);
        });

    } catch (error) {
        console.error('Ошибка при отображении материалов:', error);
        uiContainer.innerHTML = `
            <div class="error-message">
                Ошибка загрузки материалов: ${error.message}
            </div>
        `;
    }
}

// ---------------------- Добавление нового материала ----------------------------------------
function addMaterial() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('result-container').innerHTML = '';
    const container = document.getElementById('question-container');
    container.style.display = 'block';
    document.getElementById('action-header').textContent = 'Добавление нового материала';

    // Загружаем все возможные предпочтения из Prolog
    fetchAllPreferences().then(preferences => {
        container.innerHTML = `
            <div class="add-material-form">
                <div>
                    <label>Название материала (кириллица):</label></br>
                    <input type="text" id="material-name-cyrillic" class="form-input" placeholder="Например: Гипсокартон">
                </div>
                
                <div class="surface-type">
                    <label>Тип поверхности:</label></br>
                    <div id="radioTypeBtn">
                    
                        <div>
                            <input type="radio" id="wall-type" name="surface-type" value="steni" checked>
                            <label for="wall-type">Стены</label>
                        </div>
                        <div>
                            <input type="radio" id="floor-type" name="surface-type" value="pol">
                            <label for="floor-type">Пол</label>
                        </div>
                        <div>
                            <input type="radio" id="ceiling-type" name="surface-type" value="potolok">
                            <label for="ceiling-type">Потолок</label>
                        </div>
                    </div>
                </div>
                
                <div id="preferences-list">
                    <div class="preference-row">
                        <select class="pref-name">
                            <option value="" disabled selected>Выберите предпочтение</option>
                            ${preferences.map(p => `<option value="${p}">${formatPreferenceName(p)}</option>`).join('')}
                        </select>
                        <input type="number" min="0" max="1" step="0.1" value="0.5" class="pref-weight">
                        <button class="btn small" onclick="removePreferenceField(this)">×</button>
                    </div>
                </div>
                
                <button class="btn" onclick="addPreferenceField()">+ Добавить предпочтение</button>
                <div class="form-buttons">
                    <button class="btn" onclick="saveNewMaterial()">Сохранить</button>
                    <button class="btn" onclick="resetSystem()">Отмена</button>
                </div>
            </div>
        `;
    });
}

// Функция для получения всех предпочтений из Prolog
async function fetchAllPreferences() {
    const preferences = new Set();

    // 1. Сначала получаем все material/1 правила из сессии
    const materialRules = session.rules['material/1'] || [];

    // 2. Для каждого правила извлекаем предпочтения
    for (const rule of materialRules) {
        if (rule.head && rule.head.id === 'material' && rule.body) {
            const conditions = parseConditionsLocal(rule.body);
            conditions.forEach(cond => {
                if (cond.name) preferences.add(cond.name);
            });
        }
    }

    return Array.from(preferences);
}

// Оптимизированная функция parseConditions
function parseConditionsLocal(body) {
    const conditions = [];
    let current = body;

    while (current) {
        if (current.id === ',') {
            // Обработка списка условий (A, B, C)
            const head = current.args[0];
            if (head.id === 'preference' && head.args?.length === 2) {
                conditions.push({
                    name: head.args[0].id,
                    value: parseFloat(head.args[1].id) || 0
                });
            }
            current = current.args[1]; // Переходим к хвосту
        } else if (current.id === 'preference' && current.args?.length === 2) {
            // Одиночное условие
            conditions.push({
                name: current.args[0].id,
                value: parseFloat(current.args[1].id) || 0
            });
            break; // Выходим из цикла
        } else {
            break; // Неизвестная структура
        }
    }

    return conditions;
}

// Добавление нового поля предпочтения
function addPreferenceField() {
    const list = document.getElementById('preferences-list');
    const newRow = document.createElement('div');
    newRow.className = 'preference-row';
    newRow.innerHTML = `
        <select class="pref-name">
            <option value="" disabled selected>Выберите предпочтение</option>
            ${Array.from(document.querySelectorAll('.pref-name option'))
        .filter(opt => opt.value)
        .map(opt => opt.outerHTML)
        .join('')}
        </select>
        <input type="number" min="0" max="1" step="0.1" value="0.5" class="pref-weight">
        <button class="btn small" onclick="removePreferenceField(this)">×</button>
    `;
    list.appendChild(newRow);
}

// Удаление поля предпочтения
function removePreferenceField(button) {
    button.parentElement.remove();
}

// Сохранение нового материала
async function saveNewMaterial() {
    try {
        // Получаем данные из формы
        const cyrillicName = document.getElementById('material-name-cyrillic').value.trim();
        const surfaceType = document.querySelector('input[name="surface-type"]:checked').value;

        // Транслитерация кириллицы в латиницу
        const latinName = transliterate(cyrillicName) + '_' + surfaceType;

        // Получаем все предпочтения
        const preferences = Array.from(document.querySelectorAll('.preference-row'))
            .map(row => ({
                name: row.querySelector('.pref-name').value,
                weight: parseFloat(row.querySelector('.pref-weight').value)
            }))
            .filter(p => p.name && !isNaN(p.weight));

        // Валидация
        if (!cyrillicName) {
            throw new Error('Введите название материала!');
        }

        if (preferences.length === 0) {
            throw new Error('Добавьте хотя бы одно предпочтение!');
        }

        // Формируем словарь с данными
        const materialData = {
            material: latinName,
            preferences: preferences.map(p => [p.name, p.weight])
        };

        // Отправляем данные на сервер Node.js
        const response = await fetch('http://localhost:4444/save-material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(materialData)
        });

        if (!response.ok) {
            throw new Error('Ошибка при сохранении материала');
        }

        const result = await response.json();
        if (result.success) {
            materialMap[latinName] = cyrillicName;
            alert('Материал успешно сохранен!');
            resetSystem();
        } else {
            throw new Error(result.message || 'Ошибка при сохранении');
        }

    } catch (error) {
        showError(error.message);
    }
}
