% База знаний о материалах для ремонта

%drink(pobelka):
%    preference('vlagostoikost', 0),
%    preference('temperature stable',  0),


drink(tea) :-
    preference(hot, 1),
    preference(light, 0.5),
    preference(caffeine, 1).

drink(coffee) :-
    preference(hot, 0.7),
    preference(strong, 0.5),
    preference(caffeine, 0.3).

drink(hot_chocolate) :-
    preference(hot, 0.5),
    preference(sweet, 0.8).

drink(orange_juice) :-
    preference(cold, 0.4),
    preference(sweet, 0.3),
    preference(healthy, 0.3).

drink(water) :-
    preference(cold, 0.4),
    preference(neutral, 0.3),
    preference(healthy, 0.3).

drink(lemonade) :-
    preference(cold, 0.4),
    preference(light, 0.3),
    preference(sweet, 0.3).

drink(iced_tea) :-
    preference(cold, 0.4),
    preference(light, 0.3),
    preference(caffeine, 0.3).

drink(milk_shake) :-
    preference(cold, 0.1),
    preference(light, 0.2),
    preference(sweet, 0.3),
    preference(neutral, 0.4).

%----------------------------------------------------------------
% Вопросы и варианты ответов
question('Какой температуры напиток вы предпочитаете?', [
    option('hot', 'Горячий'),
    option('cold', 'Холодный'),
    option('binary_question', '')
]).

question('Какой интенсивности вкус?', [
    option('light', 'Легкий'),
    option('strong', 'Насыщенный'),
    option('neutral', 'Нейтральный')
]).

question('Какие дополнительные предпочтения?', [
    option('sweet', 'Сладкий'),
    option('caffeine', 'С кофеином'),
    option('healthy', 'Полезный для здоровья')
]).

% Предикат для получения текущего вопроса
current_question(Question, Options) :-
    question(Question, Options).

% Предикат для получения всех напитков
current_drink(Drink) :- drink(Drink).