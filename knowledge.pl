% База знаний о материалах для ремонта
drink(pobelka_potolok) :-
    preference('vlagostoikost', 0),
    preference('temperature_stable', 0),
    preference('ecologichnost', 1),
    preference('deshevizna', 1),
    preference('srok_slujbi', 0.1),
    preference('legkost_montaja', 1),
    preference('skrit_communications', 0),
    preference('remontoprigodnost', 0.2),
    preference('varianti_dizaina', 0),
    preference('slojnost_podgotovki_base', 0.1),
    preference('ustoichivost_k_mech_povrejdeniyam', 0.1).

drink(shpaklevka_pokraska_potolok) :-
    preference('vlagostoikost', 0.8),
    preference('temperature_stable', 1),
    preference('ecologichnost', 0.9),
    preference('deshevizna', 0.7),
    preference('srok_slujbi', 0.5),
    preference('legkost_montaja', 0.6),
    preference('skrit_communications', 0),
    preference('remontoprigodnost', 0.8),
    preference('varianti_dizaina', 0.4),
    preference('slojnost_podgotovki_base', 0.2),
    preference('ustoichivost_k_mech_povrejdeniyam', 0.7).

drink(potolochnye_plitki_potolok) :-
    preference('vlagostoikost', 1),
    preference('temperature_stable', 0.3),
    preference('ecologichnost', 0.4),
    preference('deshevizna', 0.6),
    preference('srok_slujbi', 0.7),
    preference('legkost_montaja', 0.7),
    preference('skrit_communications', 0.3),
    preference('remontoprigodnost', 0.5),
    preference('varianti_dizaina', 0.6),
    preference('slojnost_podgotovki_base', 1),
    preference('ustoichivost_k_mech_povrejdeniyam', 0.4).

drink(gipsokarton_potolok) :-
    preference('vlagostoikost', 0.7),
    preference('temperature_stable', 1),
    preference('ecologichnost', 0.8),
    preference('deshevizna', 0.5),
    preference('srok_slujbi', 0.8),
    preference('legkost_montaja', 0.4),
    preference('skrit_communications', 1),
    preference('remontoprigodnost', 0.7),
    preference('varianti_dizaina', 0.9),
    preference('slojnost_podgotovki_base', 1),
    preference('ustoichivost_k_mech_povrejdeniyam', 0.9).

drink(natyazhnoi_potolok) :-
    preference('vlagostoikost', 1),
    preference('temperature_stable', 0.2),
    preference('ecologichnost', 0.5),
    preference('deshevizna', 0.3),
    preference('srok_slujbi', 1),
    preference('legkost_montaja', 0.1),
    preference('skrit_communications', 1),
    preference('remontoprigodnost', 0.1),
    preference('varianti_dizaina', 1),
    preference('slojnost_podgotovki_base', 1),
    preference('ustoichivost_k_mech_povrejdeniyam', 0.3).

drink(oboi_bumazhnye_steni) :-
    preference('vlagostoikost', 0.1),
    preference('temperature_stable', 0.5),
    preference('ecologichnost', 1),
    preference('deshevizna', 0.8),
    preference('srok_slujbi', 0.3),
    preference('legkost_montaja', 0.9),
    preference('skrit_nerovnosti', 0.2),
    preference('remontoprigodnost', 0.1),
    preference('varianti_dizaina', 0.6),
    preference('slojnost_podgotovki', 0.8),
    preference('ustoichivost_meh_povrejdeniyam', 0.2),
    preference('myte', 0).

drink(oboi_vinilovye_steni) :-
    preference('vlagostoikost', 0.9),
    preference('temperature_stable', 0.8),
    preference('ecologichnost', 0.4),
    preference('deshevizna', 0.6),
    preference('srok_slujbi', 0.7),
    preference('legkost_montaja', 0.7),
    preference('skrit_nerovnosti', 0.5),
    preference('remontoprigodnost', 0.5),
    preference('varianti_dizaina', 0.9),
    preference('slojnost_podgotovki', 0.6),
    preference('ustoichivost_meh_povrejdeniyam', 0.7),
    preference('myte', 0.9).

drink(dekorativnaya_shtukaturka_steni) :-
    preference('vlagostoikost', 0.7),
    preference('temperature_stable', 0.9),
    preference('ecologichnost', 0.8),
    preference('deshevizna', 0.4),
    preference('srok_slujbi', 0.9),
    preference('legkost_montaja', 0.3),
    preference('skrit_nerovnosti', 0.9),
    preference('remontoprigodnost', 0.6),
    preference('varianti_dizaina', 1),
    preference('slojnost_podgotovki', 0.3),
    preference('ustoichivost_meh_povrejdeniyam', 0.8),
    preference('myte', 0.8).

drink(pokraska_steni) :-
    preference('vlagostoikost', 0.8),
    preference('temperature_stable', 0.9),
    preference('ecologichnost', 0.9),
    preference('deshevizna', 0.7),
    preference('srok_slujbi', 0.6),
    preference('legkost_montaja', 0.8),
    preference('skrit_nerovnosti', 0.1),
    preference('remontoprigodnost', 0.9),
    preference('varianti_dizaina', 0.7),
    preference('slojnost_podgotovki', 0.9),
    preference('ustoichivost_meh_povrejdeniyam', 0.6),
    preference('myte', 0.7).

drink(keramicheskaya_plitka_steni) :-
    preference('vlagostoikost', 1),
    preference('temperature_stable', 1),
    preference('ecologichnost', 0.7),
    preference('deshevizna', 0.3),
    preference('srok_slujbi', 1),
    preference('legkost_montaja', 0.2),
    preference('skrit_nerovnosti', 0),
    preference('remontoprigodnost', 0.2),
    preference('varianti_dizaina', 0.8),
    preference('slojnost_podgotovki', 0.1),
    preference('ustoichivost_meh_povrejdeniyam', 1),
    preference('myte', 1).

drink(paneli_pvh_mdf_steni) :-
    preference('vlagostoikost', 0.9),
    preference('temperature_stable', 0.7),
    preference('ecologichnost', 0.3),
    preference('deshevizna', 0.5),
    preference('srok_slujbi', 0.7),
    preference('legkost_montaja', 0.8),
    preference('skrit_nerovnosti', 0.8),
    preference('remontoprigodnost', 0.7),
    preference('varianti_dizaina', 0.7),
    preference('slojnost_podgotovki', 0.5),
    preference('ustoichivost_meh_povrejdeniyam', 0.6),
    preference('myte', 0.9).

drink(gipsokarton_steni) :-
    preference('vlagostoikost', 0.7),
    preference('temperature_stable', 0.9),
    preference('ecologichnost', 0.8),
    preference('deshevizna', 0.6),
    preference('srok_slujbi', 0.8),
    preference('legkost_montaja', 0.4),
    preference('skrit_nerovnosti', 1),
    preference('remontoprigodnost', 0.8),
    preference('varianti_dizaina', 0.5),
    preference('slojnost_podgotovki', 0.2),
    preference('ustoichivost_meh_povrejdeniyam', 0.7),
    preference('myte', 0.5).

drink(laminat_pol) :-
    preference('iznosostoikost', 0.7),
    preference('vlagostoikost', 0.4),
    preference('teploizolyaciya', 0.6),
    preference('zvukoizolyaciya', 0.4),
    preference('ecologichnost', 0.6),
    preference('deshevizna', 0.7),
    preference('srok_slujbi', 0.7),
    preference('legkost_montaja', 0.8),
    preference('remontoprigodnost', 0.5),
    preference('myagkost', 0.5),
    preference('slojnost_podgotovki', 0.8),
    preference('ustoichivost_meh_povrejdeniyam', 0.6).

drink(parket_pol) :-
    preference('iznosostoikost', 0.6),
    preference('vlagostoikost', 0.2),
    preference('teploizolyaciya', 0.8),
    preference('zvukoizolyaciya', 0.5),
    preference('ecologichnost', 0.9),
    preference('deshevizna', 0.3),
    preference('srok_slujbi', 0.8),
    preference('legkost_montaja', 0.4),
    preference('remontoprigodnost', 0.7),
    preference('myagkost', 0.7),
    preference('slojnost_podgotovki', 0.9),
    preference('ustoichivost_meh_povrejdeniyam', 0.4).

drink(linoleum_pol) :-
    preference('iznosostoikost', 0.8),
    preference('vlagostoikost', 0.9),
    preference('teploizolyaciya', 0.7),
    preference('zvukoizolyaciya', 0.3),
    preference('ecologichnost', 0.4),
    preference('deshevizna', 0.9),
    preference('srok_slujbi', 0.6),
    preference('legkost_montaja', 0.9),
    preference('remontoprigodnost', 0.3),
    preference('myagkost', 0.6),
    preference('slojnost_podgotovki', 0.7),
    preference('ustoichivost_meh_povrejdeniyam', 0.7).

drink(plitka_keramogranit_pol) :-
    preference('iznosostoikost', 1),
    preference('vlagostoikost', 1),
    preference('teploizolyaciya', 0.2),
    preference('zvukoizolyaciya', 0.1),
    preference('ecologichnost', 0.7),
    preference('deshevizna', 0.6),
    preference('srok_slujbi', 1),
    preference('legkost_montaja', 0.2),
    preference('remontoprigodnost', 0.2),
    preference('myagkost', 0.2),
    preference('slojnost_podgotovki', 0.6),
    preference('ustoichivost_meh_povrejdeniyam', 1).

drink(nalivnoy_pol) :-
    preference('iznosostoikost', 0.9),
    preference('vlagostoikost', 1),
    preference('teploizolyaciya', 0.3),
    preference('zvukoizolyaciya', 0.2),
    preference('ecologichnost', 0.8),
    preference('deshevizna', 0.5),
    preference('srok_slujbi', 0.9),
    preference('legkost_montaja', 0.3),
    preference('remontoprigodnost', 0.1),
    preference('myagkost', 0.3),
    preference('slojnost_podgotovki', 1),
    preference('ustoichivost_meh_povrejdeniyam', 0.9).

drink(probkovoe_pokrytie_pol) :-
    preference('iznosostoikost', 0.5),
    preference('vlagostoikost', 0.3),
    preference('teploizolyaciya', 0.9),
    preference('zvukoizolyaciya', 0.8),
    preference('ecologichnost', 1),
    preference('deshevizna', 0.4),
    preference('srok_slujbi', 0.7),
    preference('legkost_montaja', 0.6),
    preference('remontoprigodnost', 0.9),
    preference('myagkost', 0.8),
    preference('slojnost_podgotovki', 0.7),
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

drink(kovrolin_pol) :-
    preference('iznosostoikost', 0.4),
    preference('vlagostoikost', 0.1),
    preference('teploizolyaciya', 0.8),
    preference('zvukoizolyaciya', 0.9),
    preference('ecologichnost', 0.5),
    preference('deshevizna', 0.8),
    preference('srok_slujbi', 0.5),
    preference('legkost_montaja', 0.8),
    preference('remontoprigodnost', 0.5),
    preference('myagkost', 1),
    preference('slojnost_podgotovki', 0.9),
    preference('ustoichivost_meh_povrejdeniyam', 0.3).

%----------------------------------------------------------------
% Вопросы и варианты ответов
% Общие вопросы для всех поверхностей
question('Материал должен быть влагостойким? (1 - не важно, 10 - очень важно)', [
    option('vlagostoikost', 'Влагостойкость')
]).

question('Нужна термостойкость? (1 - не важно, 10 - очень важно)', [
    option('temperature_stable', 'Термостойкость')
]).

question('Материал должен быть экологичным? (1 - не важно, 10 - очень важно)', [
    option('ecologichnost', 'Экологичность')
]).

question('Важен ли бюджет? (1 - не важно, 10 - максимально бюджетное решение)', [
    option('deshevizna', 'Бюджетность')
]).

question('Планируете монтаж своими силами? (1 - не важно, 10 - очень важно)', [
    option('legkost_montaja', 'Легкость монтажа')
]).

question('Оцените важность срока службы (1 - временное решение, 10 - "на десятилетия")', [
    option('srok_slujbi', 'Срок службы')
]).

question('Насколько важна ремонтопригодность? (1 - готов к полной замене, 10 - только локальный ремонт)', [
    option('remontoprigodnost', 'Ремонтопригодность')
]).

question('Оцените устойчивость к повреждениям (1 - неважно, 10 - активные дети/животные)', [
    option('ustoichivost_k_mech_povrejdeniyam', 'Устойчивость к повреждениям (потолок)'),
    option('ustoichivost_meh_povrejdeniyam', 'Устойчивость к повреждениям (стены/пол)')
]).

question('Оцените сложность подготовки поверхности (1 - поверхность ровная, 10 - нужна черновая отделка)', [
    option('slojnost_podgotovki_base', 'Подготовка основания (потолок)'),
    option('slojnost_podgotovki', 'Подготовка поверхности (стены/пол)')
]).

% Специфические вопросы для стен
question('Насколько важно скрыть неровности стен? (1 - не важно, 10 - очень важно)', [
    option('skrit_nerovnosti', 'Скрытие неровностей стен')
]).

question('Как часто потребуется мытье стен? (1 - почти никогда, 10 - регулярное мытье)', [
    option('myte', 'Устойчивость к мытью')
]).

% Специфические вопросы для пола
question('Насколько важна износостойкость? (1 - не важно, 10 - интенсивная нагрузка)', [
    option('iznosostoikost', 'Износостойкость')
]).

question('Насколько важна теплоизоляция? (1 - не важно, 10 - очень важно)', [
    option('teploizolyaciya', 'Теплоизоляция')
]).

question('Насколько важна звукоизоляция? (1 - не важно, 10 - очень важно)', [
    option('zvukoizolyaciya', 'Звукоизоляция')
]).

question('Насколько важна мягкость покрытия? (1 - не важно, 10 - очень важно)', [
    option('myagkost', 'Мягкость покрытия')
]).

% Предикат для получения текущего вопроса
current_question(Question, Options) :-
    question(Question, Options).

% Предикат для получения всех напитков
current_drink(Drink) :- drink(Drink).