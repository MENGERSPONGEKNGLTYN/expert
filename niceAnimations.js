// Показываем прелоадер при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Имитируем загрузку
    setTimeout(function() {
        // Скрываем прелоадер
        document.getElementById('preloader').style.opacity = '0';

        // Показываем основное содержимое
        document.getElementById('content').classList.remove('hidden');

        // Удаляем прелоадер из DOM после анимации
        setTimeout(function() {
            document.getElementById('preloader').remove();
        }, 600);

        // Инициализируем систему
        initSystem();
    }, 0);
});


// Обработчики для модального окна
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("preferencesModal");
    const btn = document.getElementById("showPreferencesBtn");
    const span = document.getElementsByClassName("close")[0];

    // Показываем модальное окно при нажатии кнопки
    btn.onclick = function() {
        modal.style.display = "block";
        showAllPreferences(); // Заполняем таблицу предпочтений
    }

    // Закрываем при клике вне окна
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

// fixme !!!
/* Функция для перезапуска системы
function restartSystem() {
    if(typeof initSystem === 'function') {
        session.close();
        initSystem();
    }
    // Скрываем результаты, если они были показаны
    document.getElementById('result-container').classList.add('hidden');

    // Очищаем предпочтения
    document.getElementById('preferences-display').innerHTML = '';
}

 */