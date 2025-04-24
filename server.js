const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4444;

app.use(express.json());
app.use(cors());

// Функция для вставки нового материала в правильное место
async function insertMaterialToFile(material, preferences) {
    const filePath = path.join(__dirname, 'knowledge.pl');
    let content = fs.readFileSync(filePath, 'utf8');

    const lines = content.split('\n');

    let lastPreferenceDotIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line.startsWith('preference(') && line.endsWith(').')) {
            lastPreferenceDotIndex = i;
            break;
        }
    }

    if (lastPreferenceDotIndex === -1) {
        throw new Error('Не найдено ни одного предпочтения с точкой в файле');
    }

    let insertPosition = lastPreferenceDotIndex + 1;
    if (insertPosition < lines.length && lines[insertPosition].trim() === '') {
        insertPosition++; // Пропускаем уже существующую пустую строку
    }

    const newMaterial = [
        `material(${material}) :-`,
        ...preferences.map(([name, weight], i) =>
            `    preference('${name}', ${weight})${i === preferences.length - 1 ? '.' : ','}`
        ),
        ''
    ];
    lines.splice(insertPosition, 0, ...newMaterial);

    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

app.post('/save-material', async (req, res) => {
    try {
        if (!req.body?.material || !req.body?.preferences) {
            return res.status(400).json({
                success: false,
                message: 'Необходимы материал и предпочтение'
            });
        }

        const { material, preferences } = req.body;

        if (!Array.isArray(preferences)) {
            return res.status(400).json({
                success: false,
                message: 'Предпочтения должны быть массивом'
            });
        }

        const validPreferences = preferences.map(p => {
            if (!Array.isArray(p) || p.length !== 2 ||
                typeof p[0] !== 'string' || typeof p[1] !== 'number') {
                throw new Error('Каждое предпочтение должно быть массивом [string, number]');
            }
            return [p[0], p[1]];
        });

        await insertMaterialToFile(material, validPreferences);

        res.json({
            success: true,
            message: 'Материал успешно добавлен в knowledge.pl'
        });

    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Ожидание добавления новых материалов...');
});