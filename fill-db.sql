INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');
INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(user_id, title, picture, announce, full_text) VALUES
(1, 'Лучшие рок-музыканты 20-века', 'item02.jpg', 'Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.'),
(1, 'Как начать программировать', 'item11.jpg', 'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.', 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.'),
(2, 'Самый лучший музыкальный альбом этого года', 'item03.jpg', 'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой.', 'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Достичь успеха помогут ежедневные повторения.'),
(2, 'Лучшие рок-музыканты 20-века', 'item13.jpg', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.', 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Ёлки — это не просто красивое дерево. Это прочная древесина. Достичь успеха помогут ежедневные повторения.'),
(1, 'Что такое золотое сечение', 'item03.jpg', 'Собрать камни бесконечности легко, если вы прирожденный герой. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят.', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Ёлки — это не просто красивое дерево. Это прочная древесина. Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.'),
(1, 'Как начать программировать', 'item03.jpg', 'Золотое сечение — соотношение двух величин, гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят.', 'Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году.'),
(1, 'Лучшие рок-музыканты 20-века', 'item03.jpg', 'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.', 'Из под его пера вышло 8 платиновых альбомов. Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой.'),
(1, 'Учим HTML и CSS', 'item05.jpg', 'Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?'),
(1, 'Рок — это протест', 'item13.jpg', 'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.', 'Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят.'),
(1, 'Обзор новейшего смартфона', 'item01.jpg', 'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов.'),
(1, 'Обзор новейшего смартфона', 'item02.jpg', 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов.', 'Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой. Из под его пера вышло 8 платиновых альбомов. Достичь успеха помогут ежедневные повторения.'),
(2, 'Как собрать камни бесконечности', 'item04.jpg', 'Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Золотое сечение — соотношение двух величин, гармоническая пропорция.', 'Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.'),
(2, 'Как перестать беспокоиться и начать жить', 'item06.jpg', 'Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.', 'Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов.'),
(1, 'Как достигнуть успеха не вставая с кресла', 'item07.jpg', 'Это один из лучших рок-музыкантов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.', 'Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха.'),
(1, 'Как начать программировать', 'item07.jpg', 'Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.', 'Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.');
ALTER TABLE articles ENABLE TRIGGER ALL;
ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
(1, 9),
(2, 8),
(3, 5),
(4, 6),
(5, 1),
(6, 1),
(7, 3),
(8, 8),
(9, 2),
(10, 2),
(11, 5),
(12, 3),
(13, 1),
(14, 7),
(15, 8);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(article_id, user_id, text) VALUES
(1, 2, 'С чем связана продажа? Почему так дешёво?'),
(1, 2, 'Совсем немного...'),
(1, 2, 'Оплата наличными или перевод на карту?'),
(2, 2, 'Продаю в связи с переездом. Отрываю от сердца. А где блок питания? А сколько игр в комплекте?'),
(3, 2, 'Вы что?! В магазине дешевле. А сколько игр в комплекте?'),
(4, 1, 'Почему в таком ужасном состоянии?'),
(4, 1, 'Вы что?! В магазине дешевле.'),
(4, 1, 'Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.'),
(4, 1, 'С чем связана продажа? Почему так дешёво? А где блок питания? Вы что?! В магазине дешевле.'),
(5, 1, 'Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? А где блок питания?'),
(5, 1, 'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.'),
(5, 2, 'Оплата наличными или перевод на карту?'),
(5, 2, 'Почему в таком ужасном состоянии? Оплата наличными или перевод на карту?'),
(6, 2, 'С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? А где блок питания?'),
(6, 1, 'Оплата наличными или перевод на карту?'),
(6, 2, 'А сколько игр в комплекте?'),
(7, 2, 'Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? Вы что?! В магазине дешевле.'),
(7, 2, 'С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.'),
(7, 1, 'Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?'),
(8, 1, 'А сколько игр в комплекте? Почему в таком ужасном состоянии?'),
(8, 2, 'Совсем немного... Неплохо, но дорого.'),
(8, 1, 'Вы что?! В магазине дешевле.'),
(9, 1, 'Оплата наличными или перевод на карту? Неплохо, но дорого. А где блок питания?'),
(9, 2, 'Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?'),
(9, 2, 'Неплохо, но дорого. С чем связана продажа? Почему так дешёво?'),
(9, 2, 'Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту?'),
(9, 2, 'Оплата наличными или перевод на карту?'),
(10, 1, 'А где блок питания? Вы что?! В магазине дешевле.'),
(10, 1, 'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.'),
(10, 2, 'Почему в таком ужасном состоянии? А сколько игр в комплекте? Неплохо, но дорого.'),
(11, 2, 'Вы что?! В магазине дешевле. Совсем немного...'),
(11, 1, 'Оплата наличными или перевод на карту?'),
(11, 1, 'Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. А где блок питания?'),
(11, 2, 'А сколько игр в комплекте? Совсем немного...'),
(12, 2, 'Совсем немного...'),
(12, 1, 'Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.'),
(12, 1, 'А где блок питания? Совсем немного...'),
(12, 1, 'С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? Совсем немного...'),
(13, 2, 'Продаю в связи с переездом. Отрываю от сердца.'),
(14, 1, 'С чем связана продажа? Почему так дешёво?'),
(14, 1, 'Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? Неплохо, но дорого.'),
(14, 1, 'С чем связана продажа? Почему так дешёво? Совсем немного... Продаю в связи с переездом. Отрываю от сердца.'),
(14, 2, 'Оплата наличными или перевод на карту?'),
(15, 2, 'С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?'),
(15, 1, 'Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.');
ALTER TABLE comments ENABLE TRIGGER ALL;