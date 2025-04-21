% База знаний о материалах для ремонта
drink(pobelka) :-
    preference(vlagostoikost, 0),
    preference(temperature_stable, 0),
    preference(ecologichnost, 1),
    preference(deshevizna, 1),
    preference(srok_slujbi, 0.1),
    preference(legkost_montaja, 1),
    preference(skrit_communications, 0),
    preference(remontoprigodnost, 0.2),
    preference(varianti_dizaina, 0),
    preference(slojnost_podgotovki_base, 0.1),
    preference(ustoichivost_k_mech_povrejdeniyam, 0.1).

drink(shpaklevka_pokraska) :-
    preference(vlagostoikost, 0.8),
    preference(temperature_stable, 1),
    preference(ecologichnost, 0.9),
    preference(deshevizna, 0.7),
    preference(srok_slujbi, 0.5),
    preference(legkost_montaja, 0.6),
    preference(skrit_communications, 0),
    preference(remontoprigodnost, 0.8),
    preference(varianti_dizaina, 0.4),
    preference(slojnost_podgotovki_base, 0.2),
    preference(ustoichivost_k_mech_povrejdeniyam, 0.7).

drink(potolochnye_plitki) :-
    preference(vlagostoikost, 1),
    preference(temperature_stable, 0.3),
    preference(ecologichnost, 0.4),
    preference(deshevizna, 0.6),
    preference(srok_slujbi, 0.7),
    preference(legkost_montaja, 0.7),
    preference(skrit_communications, 0.3),
    preference(remontoprigodnost, 0.5),
    preference(varianti_dizaina, 0.6),
    preference(slojnost_podgotovki_base, 1),
    preference(ustoichivost_k_mech_povrejdeniyam, 0.4).

drink(gipsokarton) :-
    preference(vlagostoikost, 0.7),
    preference(temperature_stable, 1),
    preference(ecologichnost, 0.8),
    preference(deshevizna, 0.5),
    preference(srok_slujbi, 0.8),
    preference(legkost_montaja, 0.4),
    preference(skrit_communications, 1),
    preference(remontoprigodnost, 0.7),
    preference(varianti_dizaina, 0.9),
    preference(slojnost_podgotovki_base, 1),
    preference(ustoichivost_k_mech_povrejdeniyam, 0.9).

drink(natyazhnoi_potolok) :-
    preference(vlagostoikost, 1),
    preference(temperature_stable, 0.2),
    preference(ecologichnost, 0.5),
    preference(deshevizna, 0.3),
    preference(srok_slujbi, 1),
    preference(legkost_montaja, 0.1),
    preference(skrit_communications, 1),
    preference(remontoprigodnost, 0.1),
    preference(varianti_dizaina, 1),
    preference(slojnost_podgotovki_base, 1),
    preference(ustoichivost_k_mech_povrejdeniyam, 0.3).
%----------------------------------------------------------------
% Вопросы и варианты ответов


question('Насколько материал должен быть влагостойким?', [
    option('cold', 'Холодный')
]).

question('Какой у вас бюджет?', [
    option('budget', 'Эконом-вариант'),
    option('standard', 'Средний бюджет'),
    option('premium', 'Премиум-материалы'),
    option('binary_question', '')
]).

question('Какой стиль оформления предпочитаете?', [
    option('minimalism', 'Минимализм (гладкие поверхности)'),
    option('classic', 'Классика (декор, фактура)'),
    option('modern', 'Современный (3D-панели, подсветка)')
]).

question('Нужна термостойкость? (Помещения с перепадом температур)', [
    option('cold', 'Холодный')
]).
question('Насколько материал должен быть экологичным?', [
    option('cold', 'Холодный')
]).
question('Нужно максимально бюджетное решение?', [
    option('cold', 'Холодный')
]).
question('Насколько важно скрыть проводку/вентиляцию?', [
    option('cold', 'Холодный')
]).
question('Хотите нестандартный дизайн (многоуровневые конструкции, фотопечать)?', [
    option('cold', 'Холодный')
]).
question('Планируете монтаж своими силами?', [
    option('cold', 'Холодный')
]).

question('Оцените важность срока службы, где 1 — временное решение, 10 — «на десятилетия».', [
    option('cold', 'Холодный')
]).

question('Насколько критична ремонтопригодность, где 1 — готов к полной замене, 10 — только локальный ремонт.', [
    option('cold', 'Холодный')
]).

question('Оцените устойчивость к повреждениям, где 1 — неважно, 10 — в помещении активные дети/животные.', [
    option('cold', 'Холодный')
]).

question('Оцените готовность к подготовке основания, где 1 — потолок ровный, 10 — нужна черновая отделка.', [
    option('cold', 'Холодный')
]).

% Предикат для получения текущего вопроса
current_question(Question, Options) :-
    question(Question, Options).

% Предикат для получения всех напитков
current_drink(Drink) :- drink(Drink).