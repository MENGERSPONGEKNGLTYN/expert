% База знаний о материалах для ремонта
material(pobelka_potolok) :-
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

material(shpaklevka_pokraska_potolok) :-
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

material(potolochnye_plitki_potolok) :-
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

material(gipsokarton_potolok) :-
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

material(natyazhnoi_potolok) :-
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

material(oboi_bumazhnye_steni) :-
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

material(oboi_vinilovye_steni) :-
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

material(dekorativnaya_shtukaturka_steni) :-
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

material(pokraska_steni) :-
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

material(keramicheskaya_plitka_steni) :-
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

material(paneli_pvh_mdf_steni) :-
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

material(gipsokarton_steni) :-
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

material(laminat_pol) :-
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

material(parket_pol) :-
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

material(linoleum_pol) :-
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

material(plitka_keramogranit_pol) :-
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

material(nalivnoy_pol) :-
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

material(probkovoe_pokrytie_pol) :-
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

material(kovrolin_pol) :-
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

material(ponos_2_pol) :-
    preference('vlagostoikost', 0.5),
    preference('temperature_stable', 0.5).

material(ponos_3_steni) :-
    preference('srok_slujbi', 0.1),
    preference('vlagostoikost', 1).

material(abrak_steni) :-
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

material(uiuiuiuiapro_steni) :-
    preference('skrit_nerovnosti', 0.5).

material(uiuiuiuirvorvrolv_steni) :-
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

material(sdfghjkl_steni) :-
    preference('slojnost_podgotovki', 0.5).

material(abrakadabrahfghjk_steni) :-
    preference('varianti_dizaina', 0.5).

material(fghjklfghjk_steni) :-
    preference('slojnost_podgotovki', 0.5).

material(dfghjkl_steni) :-
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

material(xcvbn_steni) :-
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

material(fghjkl_steni) :-
    preference('myte', 0.5).

material(werty_steni) :-
    preference('ustoichivost_meh_povrejdeniyam', 0.5).

material(xcvbn_steni) :-
    preference('myagkost', 0.5).

material(zxcvb_steni) :-
    preference('skrit_nerovnosti', 0.5).

material(bnm_steni) :-
    preference('skrit_nerovnosti', 0.5).

material(mnbv_steni) :-
    preference('skrit_nerovnosti', 0.5).

material(yvapro_steni) :-
    preference('slojnost_podgotovki_base', 0.5).

%----------------------------------------------------------------
% Вопросы и варианты ответов
% Общие вопросы для всех поверхностей
question('Материал должен быть влагостойким?<br>(0 - не важно, 10 - очень важно)', [
    option('vlagostoikost', 'Влагостойкость')
]).

question('Нужна термостойкость?<br>(0 - не важно, 10 - очень важно)', [
    option('temperature_stable', 'Термостойкость')
]).

question('Материал должен быть экологичным?<br>(0 - не важно, 10 - очень важно)', [
    option('ecologichnost', 'Экологичность')
]).

question('Важен ли бюджет?<br>(0 - не важно, 10 - максимально бюджетное решение)', [
    option('deshevizna', 'Бюджетность')
]).

question('Планируете монтаж своими силами?<br>(0 - не важно, 10 - очень важно)', [
    option('legkost_montaja', 'Легкость монтажа')
]).

question('Оцените важность срока службы<br>(0 - временное решение, 10 - "на десятилетия")', [
    option('srok_slujbi', 'Срок службы')
]).

question('Насколько важна ремонтопригодность?<br>(0 - готов к полной замене, 10 - только локальный ремонт)', [
    option('remontoprigodnost', 'Ремонтопригодность')
]).

question('Оцените устойчивость к повреждениям<br>(0 - неважно, 10 - активные дети/животные)', [
    option('ustoichivost_k_mech_povrejdeniyam', 'Устойчивость к повреждениям<br>(потолок)'),
    option('ustoichivost_meh_povrejdeniyam', 'Устойчивость к повреждениям<br>(стены/пол)')
]).

question('Оцените сложность подготовки поверхности<br>(0 - поверхность ровная, 10 - нужна черновая отделка)', [
    option('slojnost_podgotovki_base', 'Подготовка основания<br>(потолок)'),
    option('slojnost_podgotovki', 'Подготовка поверхности<br>(стены/пол)')
]).

question('Нужно необычное дизайнерское решение?<br>(0 - не важно, 10 - максимально креативное решение)', [
    option('varianti_dizaina', 'Варианты дизайна')
]).

question('Насколько важна возможность скрыть коммуникации?<br>(0 - не важно, 10 - нужна обязательно)', [
    option('skrit_communications', 'Скрытие коммуникаций')
]).

% Специфические вопросы для стен
question('Насколько важно скрыть неровности стен?<br>(0 - не важно, 10 - очень важно)', [
    option('skrit_nerovnosti', 'Скрытие неровностей стен')
]).

question('Как часто потребуется мытье стен?<br>(0 - почти никогда, 10 - регулярное мытье)', [
    option('myte', 'Устойчивость к мытью')
]).

% Специфические вопросы для пола
question('Насколько важна износостойкость?<br>(0 - не важно, 10 - интенсивная нагрузка)', [
    option('iznosostoikost', 'Износостойкость')
]).

question('Насколько важна теплоизоляция?<br>(0 - не важно, 10 - очень важно)', [
    option('teploizolyaciya', 'Теплоизоляция')
]).

question('Насколько важна звукоизоляция?<br>(0 - не важно, 10 - очень важно)', [
    option('zvukoizolyaciya', 'Звукоизоляция')
]).

question('Насколько важна мягкость покрытия?<br>(0 - не важно, 10 - очень важно)', [
    option('myagkost', 'Мягкость покрытия')
]).

% Предикат для получения текущего вопроса
current_question(Question, Options) :-
    question(Question, Options).

% Предикат для получения всех напитков
current_material(Material) :- material(Material).