const questions = {
  "ru": [
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = \"Lydia\";\n  let age = 21;\n}\n\nsayHi();\n```\n *A*: ``Lydia` и `undefined``\n *B*: ``Lydia` и `ReferenceError``\n *C*: ``ReferenceError` и `21``\n *D*: ``undefined` и `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Внутри функции мы сперва определяем переменную `name` с помощью ключевого слова `var`. Это означает, что переменная будет поднята (область памяти под переменную будет выделена во время фазы создания) со значением `undefined` по умолчанию, до тех пора пока исполнение кода не дойдет до строчки, где определяется переменная. Мы еще не определили значение `name` когда пытаемся вывести её в консоль, поэтому в консоли будет `undefined`.  Переменные, определенные с помощью `let` (и `const`), также поднимаются, но в отличие от `var`, не _инициализируются_. Доступ к ним не возможен до тех пор, пока не выполнится строка их определения (инициализации). Это называется \"временная мертвая зона\". Когда мы пытаемся обратиться к переменным до того момента как они определены, JavaScript выбрасывает исключение `ReferenceError`.",
      "correct": "D"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n```\n *A*: ``0 1 2` и `0 1 2``\n *B*: ``0 1 2` и `3 3 3``\n *C*: ``3 3 3` и `0 1 2``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Из-за очереди событий в JavaScript, функция `setTimeout` вызывается _после_ того как цикл будет завершен. Так как переменная `i` в первом цикле была определена с помощью `var`, она будет глобальной. В цикле мы каждый раз увеличиваем значение `i` на `1`, используя унарный оператор `++`. К моменту выполнения функции `setTimeout` значение `i` будет равно `3` в первом примере.  Во втором цикле переменная `i` определена с помощью `let`. Такие переменные (а также `const`) имеют блочную область видимости (блок это что угодно между `{ }`). С каждой итерацией `i` будет иметь новое значение, и каждое значение будет замкнуто в своей области видимости внутри цикла.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius \* 2;\n  },\n  perimeter: () => 2 \* Math.PI \* this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());\n```\n *A*: ``20` и `62.83185307179586``\n *B*: ``20` и `NaN``\n *C*: ``20` и `63``\n *D*: ``NaN` и `63``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Заметьте, что `diameter` это обычная функция, в то время как `perimeter` это стрелочная функция.  У стрелочных функций значение `this` указывает на окружающую область видимости, в отличие от обычных функций! Это значит, что при вызове `perimeter` значение `this` у этой функции указывает не на объект `shape`, а на внешнюю область видимости (например, window).  У этого объекта нет ключа `radius`, поэтому возвращается `undefined`.",
      "correct": "B"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\n+true;\n!\"Lydia\";\n```\n *A*: ``1` и `false``\n *B*: ``false` и `NaN``\n *C*: ``false` и `false``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Унарный плюс приводит операнд к числу. `true` это `1`, а `false` это `0`.  Строка `'Lydia'` это \"истинное\" значение. На самом деле мы спрашиваем \"является ли это истинное значение ложным\"? Ответ: `false`.",
      "correct": "A"
    },
    {
      "title": "Что НЕ является валидным?",
      "code": "```javascript\nconst bird = {\n  size: \"small\",\n};\n\nconst mouse = {\n  name: \"Mickey\",\n  small: true,\n};\n```\n *A*: ``mouse.bird.size``\n *B*: ``mouse[bird.size]``\n *C*: ``mouse[bird[\"size\"]]``\n *D*: `Все варианты валидны`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript все ключи объекта являются строками (кроме Symbol). И хотя мы не _набираем_ их как строки, они всегда преобразовываются к строкам под капотом.  JavaScript интерпретирует (или распаковывает) операторы. При использовании квадратных скобок JS замечает `[` и продолжает пока не встретит `]`. Только после этого он вычислит то, что находится внутри скобок.  `mouse[bird.size]`: Сперва определяется `bird.size`, которое равно `\"small\"`. `mouse[\"small\"]` возвращает `true`.  Но с записью через точку так не происходит. У `mouse` нет ключа `bird`. Таким образом, `mouse.bird` равно `undefined`. Затем мы запрашиваем ключ `size`, используя точечную нотацию: `mouse.bird.size`. Так как `mouse.bird` это `undefined`, мы запрашиваем `undefined.size`. Это не является валидным, и мы получаем ошибку типа `Cannot read property \"size\" of undefined`.",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nlet c = { greeting: \"Hey!\" };\nlet d;\n\nd = c;\nc.greeting = \"Hello\";\nconsole.log(d.greeting);\n```\n *A*: ``Hello``\n *B*: ``Hey!``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript все объекты являются _ссылочными_ типами данных.  Сперва переменная `c` указывает на объект. Затем мы указываем переменной `d` ссылаться на тот же объект, что и `c`.  https://i.imgur.com/ko5k0fs.png Когда вы изменяете один объект, то изменяются значения всех ссылок, указывающих на этот объект.",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nlet a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);\n```\n *A*: ``true` `false` `true``\n *B*: ``false` `false` `true``\n *C*: ``true` `false` `false``\n *D*: ``false` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`new Number()` это встроенный конструктор функции. И хотя он выглядит как число, это не настоящее число: у него есть ряд дополнительных особеннстей, и это объект.  Оператор `==` разрешает приведение типов, он проверяет равенство _значений_. Оба значения равны `3`, поэтому возвращается `true`.  При использовании оператора `===` значение _и_ тип должны быть одинаковыми. Но в нашем случае это не так: `new Number()` это не число, это **объект**. Оба возвращают `false`.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nclass Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = \"green\" } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: \"purple\" });\nfreddie.colorChange(\"orange\");\n```\n *A*: ``orange``\n *B*: ``purple``\n *C*: ``green``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `colorChange` является статической. Статические методы предназначены для работы только в конструкторе, в котором они созданы, и не могут передаваться каким-либо дочерним элементам или вызываться в экземплярах класса. Так как `freddie` является экземпляром класса `Chameleon`, функция не может быть вызвана для него. Будет выдана ошибка `TypeError`.",
      "correct": "D"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nlet greeting;\ngreetign = {}; // Опечатка!\nconsole.log(greetign);\n```\n *A*: ``{}``\n *B*: ``ReferenceError: greetign is not defined``\n *C*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "В консоли выведется объект, потому что мы только что создали пустой объект в глобальном объекте! Когда мы вместо `greeting` написали `greetign`, интерпретатор JS на самом деле увидел:  1. `global.greetign = {}` в Node.js 2. `window.greetign = {}`, `frames.geetign = {}` и `self.greetign` в браузерах. 3. `self.greetign` в веб-воркерах. 4. `globalThis.greetign` во всех окружениях.  Нужно использовать `\"use strict\"`, чтобы избежать такого поведения. Эта запись поможет быть уверенным в том, что переменная была определена перед тем как ей присвоили значение.",
      "correct": "A"
    },
    {
      "title": "Что произойдет?",
      "code": "```javascript\nfunction bark() {\n  console.log(\"Woof!\");\n}\n\nbark.animal = \"dog\";\n```\n *A*: `Ничего, всё в порядке!`\n *B*: ``SyntaxError`. Нельзя добавлять свойства функциям таким способом.`\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript это возможно, т.к. функции это объекты! (Всё есть объект кроме примитивов).  Функция — это специальный тип объекта, который можно вызвать. Кроме того, функция — это объект со свойствами. Свойство такого объекта нельзя вызвать, так как оно не является функцией.",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst member = new Person(\"Lydia\", \"Hallie\");\nPerson.getFullName = function () {\n  return `${this.firstName} ${this.lastName}`;\n};\n\nconsole.log(member.getFullName());\n```\n *A*: ``TypeError``\n *B*: ``SyntaxError``\n *C*: ``Lydia Hallie``\n *D*: ``undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript функции являются объектами, поэтому метод `getFullName` добавляется к самому объекту функции-конструктора. По этой причине мы можем вызвать `Person.getFullName()`, но `member.getFullName` выдает `TypeError`.  Если вы хотите, чтобы метод был доступен для всех экземпляров объекта, вы должны добавить его в свойство прототипа:  ```js Person.prototype.getFullName = function () {   return `${this.firstName} ${this.lastName}`; }; ```",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst lydia = new Person(\"Lydia\", \"Hallie\");\nconst sarah = Person(\"Sarah\", \"Smith\");\n\nconsole.log(lydia);\nconsole.log(sarah);\n```\n *A*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` и `undefined``\n *B*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` и `Person {firstName: \"Sarah\", lastName: \"Smith\"}``\n *C*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` и `{}``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Для `sarah` мы не использовали ключевое слово `new`. Использование `new` приводит к созданию нового объекта. Но без `new` он указывает на **глобальный объект**!  Мы указали, что `this.firstName` равно `\"Sarah\"` и `this.lastName` равно `\"Smith\"`. На самом деле мы определили `global.firstName = 'Sarah'` и `global.lastName = 'Smith'`. `sarah` осталась `undefined`, поскольку мы не возвращаем значение из функции `Person`.",
      "correct": "A"
    },
    {
      "title": "Назовите три фазы распространения событий",
      "code": "*A*: Цель > Захват > Всплытие\n- *B*: Всплытие > Цель > Захват\n- *C*: Цель > Всплытие > Захват\n- *D*: Захват > Цель > Всплытие",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Во время фазы *захвата* событие распространяется с элементов родителей до элемента цели. После достижения *цели* начинается фаза *всплытия*. https://i.imgur.com/N18oRgd.png",
      "correct": "D"
    },
    {
      "title": "Все объекты имеют прототипы",
      "code": "*A*: Да\n*B*: Нет",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "Все объекты имеют прототипы, кроме **базового объекта**. Базовый объект — это объект, созданный пользователем, или объект, созданный с использованием ключевого слова `new`. Базовый объект имеет доступ к некоторым методам и свойствам, таким как `.toString`. Вот почему вы можете использовать встроенные методы JavaScript! Все такие способы доступны в прототипе. Хотя JavaScript не может найти метод непосредственно в вашем объекте, он идет вниз по цепочке прототипов и находит его там, что делает его доступным.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction sum(a, b) {\n  return a + b;\n}\n\nsum(1, \"2\");\n```\n *A*: ``NaN``\n *B*: ``TypeError``\n *C*: ``\"12\"``\n *D*: ``3``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "JavaScript это **динамически типизированный язык**: мы не определяем тип переменных. Переменные могут автоматически быть преобразованы из одного типа в другой без нашего участия, что называется _неявным приведением типов_. **Приведение** это преобразование из одного типа в другой.  В этом примере JavaScript сконвертировал число `1` в строку, чтобы операция внутри функции имела смысл и вернула значение. Во время сложения числа (`1`) и строки (`'2'`) число преобразовывается к строке. Мы можем конкатенировать строки вот так: `\"Hello\" + \"World\"`. Таким образом, `\"1\" + \"2\"` возвращает `\"12\"`.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nlet number = 0;\nconsole.log(number++);\nconsole.log(++number);\nconsole.log(number);\n```\n *A*: ``1` `1` `2``\n *B*: ``1` `2` `2``\n *C*: ``0` `2` `2``\n *D*: ``0` `1` `2``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "**Постфиксный** унарный оператор `++`:  1. Возвращает значение (`0`) 2. Инкрементирует значение (теперь число равно `1`)  **Префиксный** унарный оператор `++`:  1. Инкрементирует значение (число теперь равно `2`) 2. Возвращает значение (`2`)  Результат: `0 2 2`.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction getPersonInfo(one, two, three) {\n  console.log(one);\n  console.log(two);\n  console.log(three);\n}\n\nconst person = \"Lydia\";\nconst age = 21;\n\ngetPersonInfo`${person} is ${age} years old`;\n```\n *A*: ``\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]``\n *B*: ``[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21``\n *C*: ``\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "При использовании [шаблонных строк](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals) первым аргументом всегда будет массив строковых значений. Оставшимися аргументами будут значения переданных выражений!",
      "correct": "B"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction checkAge(data) {\n  if (data === { age: 18 }) {\n    console.log(\"Ты взрослый!\");\n  } else if (data == { age: 18 }) {\n    console.log(\"Ты все еще взрослый.\");\n  } else {\n    console.log(`Хмм.. Кажется, у тебя нет возраста.`);\n  }\n}\n\ncheckAge({ age: 18 });\n```\n *A*: ``Ты взрослый!``\n *B*: ``Ты все еще взрослый.``\n *C*: ``Хмм.. Кажется, у тебя нет возраста.``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "В операциях сравнения примитивы сравниваются по их _значениям_, а объекты по _ссылкам_. JavaScript проверяет, чтобы объекты указывали на одну и ту же область памяти.  Сравниваемые объекты в нашем примере не такие: объект, переданный в качестве параметра, указывает на другую область памяти, чем объекты, используемые в сравнениях.  Поэтому `{ age: 18 } === { age: 18 }` и `{ age: 18 } == { age: 18 }` возвращают `false`.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction getAge(...args) {\n  console.log(typeof args);\n}\n\ngetAge(21);\n```\n *A*: ``\"number\"``\n *B*: ``\"array\"``\n *C*: ``\"object\"``\n *D*: ``\"NaN\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор распространения (`...args`) возвращает массив с аргументами. Массив это объект, поэтому `typeof args` возвращает `\"object\"`.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfunction getAge() {\n  \"use strict\";\n  age = 21;\n  console.log(age);\n}\n\ngetAge();\n```\n *A*: ``21``\n *B*: ``undefined``\n *C*: ``ReferenceError``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Используя `\"use strict\"`, можно быть уверенным, что мы по ошибке не побъявим глобальные переменные. Мы ранее нигде не объявляли переменную `age`, поэтому с использованием `\"use strict\"` возникнет `ReferenceError`. Без использования `\"use strict\"` ошибки не возникнет, а переменная `age` добавится в глобальный объект.",
      "correct": "C"
    },
    {
      "title": "Чему будет равно `sum`?",
      "code": "```javascript\nconst sum = eval(\"10*10+5\");\n```\n *A*: ``105``\n *B*: ``\"105\"``\n *C*: ``TypeError``\n *D*: ``\"10*10+5\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`eval` выполняет код, переданный в виде строки. Если это выражение (как в данном случае), то вычисляется выражение. Выражение `10 \* 10 + 5` вернет число `105`.",
      "correct": "A"
    },
    {
      "title": "Как долго будет доступен cool_secret?",
      "code": "```javascript\nsessionStorage.setItem(\"cool_secret\", 123);\n```\n *A*: `Всегда, данные не потеряются.`\n *B*: `Пока пользователь не закроет вкладку.`\n *C*: `Пока пользователь не закроет браузер, а не только вкладку.`\n *D*: `Пока пользователь не выключит компьютер.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Данные, сохраненные в `sessionStorage` очищаются после закрытия _вкладки_. При использовании `localStorage` данные сохраняются навсегда. Очистить их можно, например, используя `localStorage.clear()`.",
      "correct": "B"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nvar num = 8;\nvar num = 10;\n\nconsole.log(num);\n```\n *A*: ``8``\n *B*: ``10``\n *C*: ``SyntaxError``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью ключевого слова `var` можно определять сколько угодно переменных с одним и тем же именем. Переменная будет хранить последнее присвоенное значение.  Но такой трюк нельзя проделать с `let` и `const`, т.к. у них блочная область видимости.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nconst obj = { 1: \"a\", 2: \"b\", 3: \"c\" };\nconst set = new Set([1, 2, 3, 4, 5]);\n\nobj.hasOwnProperty(\"1\");\nobj.hasOwnProperty(1);\nset.has(\"1\");\nset.has(1);\n```\n *A*: ``false` `true` `false` `true``\n *B*: ``false` `true` `true` `true``\n *C*: ``true` `true` `false` `true``\n *D*: ``true` `true` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Все ключи объектов (кроме Symbols) являются строками, даже если заданы не в виде строк. Поэтому `obj.hasOwnProperty('1')` так же возвращает true.  Но это не работает для `set`. Значения `'1'` нет в `set`: `set.has('1')` возвращает `false`. Но `set.has(1)` вернет `true`.",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nconst obj = { a: \"one\", b: \"two\", a: \"three\" };\nconsole.log(obj);\n```\n *A*: ``{ a: \"one\", b: \"two\" }``\n *B*: ``{ b: \"two\", a: \"three\" }``\n *C*: ``{ a: \"three\", b: \"two\" }``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Если есть два ключа с одинаковым именем, то ключ будет перезаписан. Его позиция сохранится, но значением будет последнее указанное.",
      "correct": "C"
    },
    {
      "title": "Глобальный контекст исполнения создает две вещи: глобальный объект и `this`",
      "code": "",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Базовый контекст исполнения это глобальный контекст исполнения: это то, что доступно где угодно в твоем коде.",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nfor (let i = 1; i < 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```\n *A*: ``1` `2``\n *B*: ``1` `2` `3``\n *C*: ``1` `2` `4``\n *D*: ``1` `3` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор `continue` пропускает итерацию, если условие возвращает `true`.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nString.prototype.giveLydiaPizza = () => {\n  return \"Just give Lydia pizza already!\";\n};\n\nconst name = \"Lydia\";\n\nconsole.log(name.giveLydiaPizza());\n```\n *A*: ``\"Just give Lydia pizza already!\"``\n *B*: ``TypeError: not a function``\n *C*: ``SyntaxError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`String` это встроенный конструктор, к которому можно добавлять свойства. Я добавила метод к его прототипу. Строки-примитивы автоматически конвертируются к строкам-объектам. Поэтому все строки (строковые объекты) имеют доступ к этому методу!",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nconst a = {};\nconst b = { key: \"b\" };\nconst c = { key: \"c\" };\n\na[b] = 123;\na[c] = 456;\n\nconsole.log(a[b]);\n```\n *A*: ``123``\n *B*: ``456``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ключи объекта автоматически конвертируются в строки. Мы собираемся добавить объект в качестве ключа к объекту `a` со значением `123`.  Тем не менее, когда мы приводим объект к строке, он становится `\"[object Object]\"`. Таким образом, мы говорим, что `a[\"object Object\"] = 123`. Потом мы делаем то же самое. `c` это другой объект, который мы неявно приводим к строке. Поэтому `a[\"object Object\"] = 456`.  Затем, когда мы выводим `a[b]`, мы имеем в виду `a[\"object Object\"]`. Мы только что установили туда значение `456`, поэтому в результате получаем `456`.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nconst foo = () => console.log(\"First\");\nconst bar = () => setTimeout(() => console.log(\"Second\"));\nconst baz = () => console.log(\"Third\");\n\nbar();\nfoo();\nbaz();\n```\n *A*: ``First` `Second` `Third``\n *B*: ``First` `Third` `Second``\n *C*: ``Second` `First` `Third``\n *D*: ``Second` `Third` `First``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы вызываем функцию `setTimeout` первой. Тем не менее, она выводится в консоль последней  Это происходит из-за того, что в браузерах у нас есть не только рантайм движок, но и `WebAPI`. `WebAPI` предоставляет нам функцию `setTimeout` и много других возможностей. Например, DOM.  После того как _коллбек_ отправлен в `WebAPI`, функция `setTimeout` (но не коллбек!) вынимается из стека.  https://i.imgur.com/X5wsHOg.png  Теперь вызывается `foo`, и `\"First\"` выводится в консоль.  https://i.imgur.com/Pvc0dGq.png  `foo` достается из стека, и вызывается `baz`. `\"Third\"` выводится в консоль.  https://i.imgur.com/WhA2bCP.png  WebAPI не может добавлять содержимое в стек когда захочет. Вместо этого он отправляет коллбек-функцию в так называемую _очередь_.  https://i.imgur.com/NSnDZmU.png  Здесь на сцену выходит цикл событий (event loop). **Event loop** проверяет стек и очередь задач. Если стек пустой, то он берет первый элемент из очереди и отправляет его в стек.  https://i.imgur.com/uyiScAI.png  Вызывается `bar`, в консоль выводится `\"Second\"` и эта функция достается из стека.",
      "correct": "B"
    },
    {
      "title": "Что будет в event.target после клика на кнопку?",
      "code": "```javascript\n<div onclick=\"console.log('first div')\">\n  <div onclick=\"console.log('second div')\">\n    <button onclick=\"console.log('button')\">Кликни!</button>\n  </div>\n</div>\n```\n *A*: `Внешний `div``\n *B*: `Внутренний `div``\n *C*: ``button``\n *D*: `Массив со всеми вложенными элементами`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Целью события является самый глубокий вложенный элемент. Остановить распространение событий можно с помощью `event.stopPropagation`",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли после клика по параграфу?",
      "code": "```javascript\n<div onclick=\"console.log('div')\">\n  <p onclick=\"console.log('p')\">Кликни меня!</p>\n</div>\n```\n *A*: ``p` `div``\n *B*: ``div` `p``\n *C*: ``p``\n *D*: ``div``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "После клика по `p` будет выведено `p` и `div`. В цикле жизни события есть три фазы: захват, цель и всплытие. По умолчанию обработчики событий выполняются на фазе всплытия (если не установлен параметр `useCapture` в `true`). Всплытие идет с самого глубокого элемента вверх.",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nconst person = { name: \"Lydia\" };\n\nfunction sayHi(age) {\n  console.log(`${this.name} is ${age}`);\n}\n\nsayHi.call(person, 21);\nsayHi.bind(person, 21);\n```\n *A*: ``undefined is 21` `Lydia is 21``\n *B*: ``function` `function``\n *C*: ``Lydia is 21` `Lydia is 21``\n *D*: ``Lydia is 21` `function``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В обоих случаях мы передаем объект, на который будет указывать `this`. Но `.call` _выполняется сразу же_!  `.bind` возвращает _копию_ функции, но с привязанным контекстом. Она не выполняется незамедлительно.",
      "correct": "D"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction sayHi() {\n  return (() => 0)();\n}\n\nconsole.log(typeof sayHi());\n```\n *A*: ``\"object\"``\n *B*: ``\"number\"``\n *C*: ``\"function\"``\n *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `sayHi` возвращает значение, возвращаемое из немедленно вызываемого функционального выражения (IIFE). Результатом является `0` типа `\"number\"`.  Для информации: в JS 8 встроенных типов: `null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol` и `bigint`. `\"function\"` не является отдельным типом, т.к. функции являются объектами типа `\"object\"`.",
      "correct": "B"
    },
    {
      "title": "Какие из этих значений являются \"ложными\"?",
      "code": "```javascript\n0;\nnew Number(0);\n(\"\");\n(\" \");\nnew Boolean(false);\nundefined;\n```\n *A*: ``0`, `''`, `undefined``\n *B*: ``0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined``\n *C*: ``0`, `''`, `new Boolean(false)`, `undefined``\n *D*: `Все являются \"ложными\"`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Есть только восемь (8) \"ложных\" значений:  - `undefined` - `null` - `NaN` - `false` - `''` (пустая строка) - `0` - `-0` - `0n` (BigInt(0))  Конструкторы функций, такие как `new Number` и `new Boolean` являются \"истинными\".",
      "correct": "A"
    },
    {
      "title": "Что будет в консоли",
      "code": "```javascript\nconsole.log(typeof typeof 1);\n```\n *A*: ``\"number\"``\n *B*: ``\"string\"``\n *C*: ``\"object\"``\n *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`typeof 1` возвращает `\"number\"`. `typeof \"number\"` возвращает `\"string\"`",
      "correct": "B"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\nconst numbers = [1, 2, 3];\nnumbers[10] = 11;\nconsole.log(numbers);\n```\n *A*: ``[1, 2, 3, 7 x null, 11]``\n *B*: ``[1, 2, 3, 11]``\n *C*: ``[1, 2, 3, 7 x empty, 11]``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Когда в массив добавляется значение, которое выходит за пределы длины массива, JavaScript создает так называемые \"пустые ячейки\". На самом деле они имеют значения `undefined`, но в консоли выводятся так:  `[1, 2, 3, 7 x empty, 11]`  в зависимости от окружения (может отличаться для браузеров, Node, и т.д.).",
      "correct": "C"
    },
    {
      "title": "Что будет в консоли?",
      "code": "```javascript\n(() => {\n  let x, y;\n  try {\n    throw new Error();\n  } catch (x) {\n    (x = 1), (y = 2);\n    console.log(x);\n  }\n  console.log(x);\n  console.log(y);\n})();\n```\n *A*: ``1` `undefined` `2``\n *B*: ``undefined` `undefined` `undefined``\n *C*: ``1` `1` `2``\n *D*: ``1` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Блок `catch` получает аргумент `x`. Это не тот же `x`, который определен в качестве переменной перед строкой `try {`  Затем мы присваиваем этому аргументу значение `1` и устанавливаем значение для переменной `y`. Потом выводим в консоль значение аргумента `x`, которое равно `1`.  За пределами блока `catch` переменная `x` все еще `undefined`, а `y` равно `2`. Когда мы вызываем `console.log(x)` за пределами блока `catch`, этот вызов возвращает `undefined`, а `y` возвращает `2`.",
      "correct": "A"
    },
    {
      "title": "Всё в JavaScript это...",
      "code": "",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript есть только примитивы и объекты.  Типы примитивов: `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, и `symbol`.  Отличием примитива от объекта является то, что примитивы не имеют свойств или методов. Тем не менее, `'foo'.toUpperCase()` преобразуется в `'FOO'` и не вызывает `TypeError`. Это происходит потому, что при попытке получения свойства или метода у примитива (например, строки), JavaScript неявно обернет примитив объектом, используя один из классов-оберток (например, `String`), а затем сразу же уничтожит обертку после вычисления выражения. Все примитивы кроме `null` и `undefined` ведут себя таким образом.",
      "correct": "A"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\n[\n  [0, 1],\n  [2, 3],\n].reduce(\n  (acc, cur) => {\n    return acc.concat(cur);\n  },\n  [1, 2]\n);\n```\n *A*: ``[0, 1, 2, 3, 1, 2]``\n *B*: ``[6, 1, 2]``\n *C*: ``[1, 2, 0, 1, 2, 3]``\n *D*: ``[1, 2, 6]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`[1, 2]` - начальное значение, с которым инициализируется переменная `acc`. После первого прохода `acc` будет равно `[1,2]`, а `cur` будет `[0,1]`. После конкатенации результат будет `[1, 2, 0, 1]`.  Затем `acc` равно `[1, 2, 0, 1]`, а `cur` равно `[2, 3]`. После слияния получим `[1, 2, 0, 1, 2, 3]`.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\n!!null;\n!!\"\";\n!!1;\n```\n *A*: ``false` `true` `false``\n *B*: ``false` `false` `true``\n *C*: ``false` `true` `true``\n *D*: ``true` `true` `false``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`null` - \"ложный\". `!null` возвращает `true`. `!true` возвращает `false`.  `\"\"` - \"ложный\". `!\"\"` возвращает `true`. `!true` возвращает `false`.  `1` - \"истинный\". `!1` возвращает `false`. `!false` возвращает `true`.",
      "correct": "B"
    },
    {
      "title": "Что возвращает метод `setInterval` в браузере?",
      "code": "```javascript\nsetInterval(() => console.log(\"Hi\"), 1000);\n```\n *A*: `уникальный id`\n *B*: `указанное количество миллисекунд`\n *C*: `переданную функцию`\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Это метод возвращает уникальный id. Этот id может быть использован для очищения интервала с помощью функции `clearInterval()`.",
      "correct": "A"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\n[...\"Lydia\"];\n```\n *A*: ``[\"L\", \"y\", \"d\", \"i\", \"a\"]``\n *B*: ``[\"Lydia\"]``\n *C*: ``[[], \"Lydia\"]``\n *D*: ``[[\"L\", \"y\", \"d\", \"i\", \"a\"]]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Строка является итерируемой сущностью. Оператор распространения преобразовывает каждый символ в отдельный элемент.",
      "correct": "A"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction* generator(i) {\n  yield i;\n  yield i * 2;\n}\n\nconst gen = generator(10);\n\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\n```\n *A*: ``[0, 10], [10, 20]``\n *B*: ``20, 20``\n *C*: ``10, 20``\n *D*: ``0, 10 and 10, 20``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Обычные функции не могут быть остановлены на полпути после вызова. Однако функцию генератор можно \"остановить\" на полпути, а затем продолжить с того места, где она остановилась. Каждый раз, когда в функции-генераторе встречает ключевое слово `yield`, функция возвращает значение, указанное после него. Обратите внимание, что функция генератора в этом случае не _return_ значение, оно _yields_ значение.  Сначала мы инициализируем функцию генератор с `i`, равным `10`. Мы вызываем функцию генератор, используя метод `next ()`. Когда мы в первый раз вызываем функцию генератора, `i` равно `10`. Он встречает первое ключевое слово `yield`, получая значение `i`. Генератор теперь \"приостановлен\", и `10` выводится в консоль.  Затем мы снова вызываем функцию с помощью метода `next ()`. Она запускается с того места, где остановилась ранее, все еще с `i`, равным `10`. Теперь он встречает следующее ключевое слово `yield` и возвращает `i * 2`. `i` равно `10`, поэтому он возвращает `10 * 2`, то есть `20`. Это приводит к 10, 20.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nconst firstPromise = new Promise((res, rej) => {\n  setTimeout(res, 500, \"один\");\n});\n\nconst secondPromise = new Promise((res, rej) => {\n  setTimeout(res, 100, \"два\");\n});\n\nPromise.race([firstPromise, secondPromise]).then((res) => console.log(res));\n```\n *A*: ``\"один\"``\n *B*: ``\"два\"``\n *C*: ``\"два\" \"один\"``\n *D*: ``\"один\" \"два\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Когда мы передаем несколько промисов методу `Promise.race`, он разрешает/отклоняет _первый_ промис, который разрешается/отклоняется. В метод `setTimeout` мы передаем таймер: 500 мс для первого промиса (`firstPromise`) и 100 мс для второго промиса (`secondPromise`). Это означает, что `secondPromise` разрешается первым со значением `'два'`. `res` теперь содержит значение `'два'`, которое выводиться в консоль.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nlet person = { name: \"Lydia\" };\nconst members = [person];\nperson = null;\n\nconsole.log(members);\n```\n *A*: ``null``\n *B*: ``[null]``\n *C*: ``[{}]``\n *D*: ``[{ name: \"Lydia\" }]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Сначала мы объявляем переменную `person` со значением объекта, у которого есть свойство` name`.  https://i.imgur.com/TML1MbS.png  Затем мы объявляем переменную с именем `members`. Мы устанавливаем первый элемент этого массива равным значению переменной `person`. Объекты взаимодействуют посредством _ссылок_ при установке их равными друг другу. Когда вы назначаете ссылку из одной переменной в другую, вы создаете _копию_ этой ссылки. (обратите внимание, что у них _не одинаковые_ ссылки!)  https://i.imgur.com/FSG5K3F.png  Затем мы присваиваем переменной `person` значение `null`.  https://i.imgur.com/sYjcsMT.png  Мы изменили только значение переменной `person`, а не первый элемент в массиве, поскольку этот элемент имеет другую (скопированную) ссылку на объект. Первый элемент в `members` по-прежнему содержит ссылку на исходный объект. Когда мы выводим в консоль массив `members`, первый элемент по-прежнему содержит значение объекта, который выводится в консоль.",
      "correct": "D"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nfor (const item in person) {\n  console.log(item);\n}\n```\n *A*: ``{ name: \"Lydia\" }, { age: 21 }``\n *B*: ``\"name\", \"age\"``\n *C*: ``\"Lydia\", 21``\n *D*: ``[\"name\", \"Lydia\"], [\"age\", 21]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью цикла `for-in` мы можем перебирать ключи объекта, в данном случае `name` и `age`. Под капотом ключи объекта являются строками (если они не являются Symbol). В каждом цикле мы устанавливаем значение `item` равным текущему ключу, по которому он перебирается. Сначала, `item` равен `name`, и выводится в консоль. Затем `item` равен `age`, который выводится в консоль.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nconsole.log(3 + 4 + \"5\");\n```\n *A*: ``\"345\"``\n *B*: ``\"75\"``\n *C*: ``12``\n *D*: ``\"12\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ассоциативность операторов - это порядок, в котором компилятор оценивает выражения, слева направо или справа налево. Это происходит только в том случае, если все операторы имеют _одинаковый_ приоритет. У нас есть только один тип оператора: `+`. Кроме того, ассоциативность слева направо.  `3 + 4` оценивается первым. Это приводит к числу `7`.  `7 + '5'` приводит к `\"75\"` из-за принуждения. JavaScript преобразует число `7` в строку, см. вопрос 15. Мы можем объединить две строки, используя оператор `+`. `\"7\" + \"5\"` приводит к `\"75\"`.",
      "correct": "B"
    },
    {
      "title": "Какое значение `num`?",
      "code": "```javascript\nconst num = parseInt(\"7\*6\", 10);\n```\n *A*: ``42``\n *B*: ``\"42\"``\n *C*: ``7``\n *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Только первые числа в строке возвращаются. На основе _системы счисления_ (второй аргумент, чтобы указать, к какому типу чисел мы хотим его анализировать: основание 10, шестнадцатеричное, восьмеричное, двоичное и т.д.), `ParseInt` проверяет, являются ли символы в строке допустимыми. Как только он встречает символ, который не является допустимым числом в основании, он прекращает синтаксический анализ и игнорирует следующие символы.  `\*` не является допустимым числом. Он только разбирает `\"7\"` в десятичную `7`. `num` теперь содержит значение` 7`.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\n[1, 2, 3].map((num) => {\n  if (typeof num === \"number\") return;\n  return num \* 2;\n});\n```\n *A*: ``[]``\n *B*: ``[null, null, null]``\n *C*: ``[undefined, undefined, undefined]``\n *D*: ``[ 3 x empty ]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "При использовании метода map, значение `num` равно элементу, над которым он в данный момент зацикливается. В этом случае элементы являются числами, поэтому условие оператора if `typeof num === \"number\"` возвращает `true`. Функция map создает новый массив и вставляет значения, возвращаемые функцией.  Однако мы не возвращаем значение. Когда мы не возвращаем значение из функции, функция возвращает значение `undefined`. Для каждого элемента в массиве вызывается функциональный блок, поэтому для каждого элемента мы возвращаем `undefined`.",
      "correct": "C"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction getInfo(member, year) {\n  member.name = \"Lydia\";\n  year = 1998;\n}\n\nconst person = { name: \"Sarah\" };\nconst birthYear = \"1997\";\n\ngetInfo(person, birthYear);\n\nconsole.log(person, birthYear);\n```\n *A*: ``{ name: \"Lydia\" }, \"1997\"``\n *B*: ``{ name: \"Sarah\" }, \"1998\"``\n *C*: ``{ name: \"Lydia\" }, \"1998\"``\n *D*: ``{ name: \"Sarah\" }, \"1997\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Аргументы передаются _значением_, если их значение не является объектом, то они передаются _ссылкой_. `birthYear` передается по значению, поскольку это строка, а не объект. Когда мы передаем аргументы по значению, создается _копия_ этого значения (см. вопрос 46).  Переменная `birthYear` имеет ссылку на значение `\"1997\"`. Аргумент `year` также имеет ссылку на значение`\"1997\"`, но это не то же самое значение, на которое имеется ссылка для `birthYear`. Когда мы обновляем значение `year`, устанавливая `year` равным `\"1998\"`, мы обновляем только значение `year`. `birthYear` по-прежнему равно `\"1997\"`.  Значение `person` является объектом. Аргумент `member` имеет (скопированную) ссылку на _тот же_ объект. Когда мы изменяем свойство объекта, на который `member` ссылается, значение `person` также будет изменено, поскольку они оба имеют ссылку на один и тот же объект. Свойство `name` объекта `person` теперь равно значению `\"Lydia\"`.",
      "correct": "A"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction greeting() {\n  throw \"Hello world!\";\n}\n\nfunction sayHi() {\n  try {\n    const data = greeting();\n    console.log(\"It worked!\", data);\n  } catch (e) {\n    console.log(\"Oh no an error:\", e);\n  }\n}\n\nsayHi();\n```\n *A*: ``It worked! Hello world!``\n *B*: ``Oh no an error: undefined``\n *C*: ``SyntaxError: can only throw Error objects``\n *D*: ``Oh no an error: Hello world!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью оператора `throw` мы можем создавать собственные ошибки. С этим оператором вы можете генерировать исключения. Исключением может быть *строка*, *число*, *логическое значение* или *объект*. В этом случае нашим исключением является строка `'Hello world'`.  С помощью оператора `catch` мы можем указать, что делать, если в блоке` try` выдается исключение. Исключение: строка `'Hello world'`. `e` теперь равно той строке, которую мы записываем. Это приводит к `'Oh no an error: Hello world'`.",
      "correct": "D"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\nfunction Car() {\n  this.make = \"Lamborghini\";\n  return { make: \"Maserati\" };\n}\n\nconst myCar = new Car();\nconsole.log(myCar.make);\n```\n *A*: ``\"Lamborghini\"``\n *B*: ``\"Maserati\"``\n *C*: ``ReferenceError``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Когда вы возвращаете свойство, значение свойства равно _возвращаемому_ значению, а не значению, установленному в функции конструктора. Мы возвращаем строку `\"Maserati\"`, поэтому `myCar.make` равно `\"Maserati\"`.",
      "correct": "B"
    },
    {
      "title": "Каким будет результат?",
      "code": "```javascript\n(() => {\n  let x = (y = 10);\n})();\n\nconsole.log(typeof x);\nconsole.log(typeof y);\n```\n *A*: ``\"undefined\", \"number\"``\n *B*: ``\"number\", \"number\"``\n *C*: ``\"object\", \"number\"``\n *D*: ``\"number\", \"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`let x = y = 10;` на самом деле является сокращением для:  ```javascript y = 10; let x = y; ```  Когда мы устанавливаем `y` равным` 10`, мы фактически добавляем свойство `y` к глобальному объекту (`window` в браузере, `global` в Node). В браузере `window.y` теперь равен` 10`.  Затем мы объявляем переменную `x` со значением `y`, которое равно `10`. Переменные, объявленные с ключевым словом `let`, имеют _блочную видимость_, они определены только в блоке, в котором они объявлены; немедленно вызванная функция (IIFE) в этом случае. Когда мы используем оператор `typeof`, операнд `x` не определен: мы пытаемся получить доступ к `x` вне блока, в котором он объявлен. Это означает, что `x` не определен. Значения, которым не присвоено или не объявлено значение, имеют тип `\"undefined\"`. `console.log(typeof x)` возвращает `\"undefined\"`.  Однако мы создали глобальную переменную `y`, установив `y` равным `10`. Это значение доступно в любом месте нашего кода. `y` определен и содержит значение типа `\"number\"`. `console.log(typeof y)` возвращает `\"number\"`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nDog.prototype.bark = function () {\n  console.log(`Woof I am ${this.name}`);\n};\n\nconst pet = new Dog(\"Mara\");\n\npet.bark();\n\ndelete Dog.prototype.bark;\n\npet.bark();\n```\n *A*: ``\"Woof I am Mara\"`, `TypeError``\n *B*: ``\"Woof I am Mara\"`, `\"Woof I am Mara\"``\n *C*: ``\"Woof I am Mara\"`, `undefined``\n *D*: ``TypeError`, `TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы можем удалить свойства из объектов, используя ключевое слово `delete`, также в прототипе. Удаляя свойство в прототипе, оно больше не доступно в цепочке прототипов. В этом случае функция `bark` больше не доступна в прототипе после`delete Dog.prototype.bark`, но мы все еще пытаемся получить к ней доступ.  Когда мы пытаемся вызвать что-то, что не является функцией, выдается `TypeError`. В этом случае `TypeError: pet.bark не является функцией`, поскольку` pet.bark` является `undefined`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst set = new Set([1, 1, 2, 3, 4]);\n\nconsole.log(set);\n```\n *A*: ``[1, 1, 2, 3, 4]``\n *B*: ``[1, 2, 3, 4]``\n *C*: ``{1, 1, 2, 3, 4}``\n *D*: ``{1, 2, 3, 4}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Объект `Set` является коллекцией _unique_ значений: значение может появляться только один раз в наборе.  Мы передали последовательность `[1, 1, 2, 3, 4]` с повторяющимся значением `1`. Поскольку в наборе не может быть двух одинаковых значений, одно из них удаляется. Это приводит к `{1, 2, 3, 4}`.",
      "correct": "D"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\n// counter.js\nlet counter = 10;\nexport default counter;\n```\n *A*: ``10``\n *B*: ``11``\n *C*: ``Error``\n *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Импортированный модуль является _read-only_: вы не можете изменить импортированный модуль. Только модуль, который их экспортирует, может изменить его значение.  Когда мы пытаемся увеличить значение `myCounter`, выдается ошибка: `myCounter` доступен только для чтения и не может быть изменен.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst name = \"Lydia\";\nage = 21;\n\nconsole.log(delete name);\nconsole.log(delete age);\n```\n *A*: ``false`, `true``\n *B*: ``\"Lydia\"`, `21``\n *C*: ``true`, `true``\n *D*: ``undefined`, `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор `delete` возвращает логическое значение: `true` при успешном удалении, иначе он вернет `false`. Однако переменные, объявленные с ключевым словом `var`,` const` или `let`, не могут быть удалены с помощью оператора` delete`.  Переменная `name` была объявлена ​​с ключевым словом `const`, поэтому ее удаление не было успешным: возвращается `false`. Когда мы устанавливаем `age` равным `21`, мы фактически добавляем свойство с именем `age` к глобальному объекту. Вы можете успешно удалить свойства из объектов, в том числе из глобального объекта, поэтому `delete age` возвращает `true`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst [y] = numbers;\n\nconsole.log(y);\n```\n *A*: ``[[1, 2, 3, 4, 5]]``\n *B*: ``[1, 2, 3, 4, 5]``\n *C*: ``1``\n *D*: ``[1]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы можем распаковать значения из массивов или свойств из объектов путем деструктуризации. Например:  ```javascript [a, b] = [1, 2]; ```  https://i.imgur.com/ADFpVop.png Значение `a` теперь равно `1`, а значение `b` теперь равно `2`. Что мы на самом деле сделали в этом вопросе, так это:  ```javascript [y] = [1, 2, 3, 4, 5]; ```  https://i.imgur.com/NzGkMNk.png Это означает, что значение `y` равно первому значению в массиве, которое является числом` 1`. Когда мы регистрируем `y`, возвращается `1`.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst user = { name: \"Lydia\", age: 21 };\nconst admin = { admin: true, ...user };\n\nconsole.log(admin);\n```\n *A*: ``{ admin: true, user: { name: \"Lydia\", age: 21 } }``\n *B*: ``{ admin: true, name: \"Lydia\", age: 21 }``\n *C*: ``{ admin: true, user: [\"Lydia\", 21] }``\n *D*: ``{ admin: true }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Можно комбинировать объекты с помощью оператора распространения `...`. Это позволяет создавать копии пар ключ/значение одного объекта и добавлять их в другой объект. В этом случае мы создаем копии объекта `user` и добавляем их в объект `admin`. Объект `admin` теперь содержит скопированные пары ключ/значение, что приводит к `{admin: true, name: \"Lydia\", age: 21}`.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst person = { name: \"Lydia\" };\n\nObject.defineProperty(person, \"age\", { value: 21 });\n\nconsole.log(person);\nconsole.log(Object.keys(person));\n```\n *A*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]``\n *B*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\"]``\n *C*: ``{ name: \"Lydia\"}`, `[\"name\", \"age\"]``\n *D*: ``{ name: \"Lydia\"}`, `[\"age\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `defineProperty` мы можем добавлять новые свойства к объекту или изменять существующие. Когда мы добавляем свойство к объекту с помощью метода `defineProperty`, они по умолчанию _не перечисляемые_. Метод `Object.keys` возвращает все имена _enumerable_ свойств объекта, в данном случае только `\"name\"`.  Свойства, добавленные с помощью метода `defineProperty`, по умолчанию неизменны. Вы можете переопределить это поведение, используя свойства `writable`, `configurable` и `enumerable`. Таким образом, метод `defineProperty` дает вам гораздо больший контроль над свойствами, которые вы добавляете к объекту.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst settings = {\n  username: \"lydiahallie\",\n  level: 19,\n  health: 90,\n};\n\nconst data = JSON.stringify(settings, [\"level\", \"health\"]);\nconsole.log(data);\n```\n *A*: ``\"{\"level\":19, \"health\":90}\"``\n *B*: ``\"{\"username\": \"lydiahallie\"}\"``\n *C*: ``\"[\"level\", \"health\"]\"``\n *D*: ``\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Второй аргумент `JSON.stringify` - это _replacer_. Заменитель может быть либо функцией, либо массивом, и позволяет вам контролировать, что и как должны быть преобразованы в значения.  Если заменитель является _массивом_, только свойства, имена которых включены в массив, будут добавлены в строку JSON. В этом случае включаются только свойства с именами `\"level\"` и `\"health\"`, `\"username\"` исключается. `data` теперь равен `\"{\"level\":19, \"health\":90}\"`.  Если заменитель является _function_, эта функция вызывается для каждого свойства объекта, который вы преобразуете. Значение, возвращаемое из этой функции, будет значением свойства при добавлении в строку JSON. Если значение равно undefined, это свойство исключается из строки JSON.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nlet num = 10;\n\nconst increaseNumber = () => num++;\nconst increasePassedNumber = (number) => number++;\n\nconst num1 = increaseNumber();\nconst num2 = increasePassedNumber(num1);\n\nconsole.log(num1);\nconsole.log(num2);\n```\n *A*: ``10`, `10``\n *B*: ``10`, `11``\n *C*: ``11`, `11``\n *D*: ``11`, `12``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Унарный оператор `++` _сначала возвращает_ значение операнда, _затем приращивает_ значение операнда. Значение `num1` равно `10`, так как функция увеличений вначале возвращает значение `num`, которое равно `10`, и только затем увеличивает значение `num`.  `num2` - это `10`, так как мы передали `num1` в `incpasePassedNumber`. `number` равно `10` (значение `num1`. Опять же, унарный оператор `++` _сначала возвращает_ значение операнда, _затем увеличивает_ значение операнда. Значение `number` равно `10`, поэтому `num2` равно `10`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst value = { number: 10 };\n\nconst multiply = (x = { ...value }) => {\n  console.log((x.number \*= 2));\n};\n\nmultiply();\nmultiply();\nmultiply(value);\nmultiply(value);\n```\n *A*: ``20`, `40`, `80`, `160``\n *B*: ``20`, `40`, `20`, `40``\n *C*: ``20`, `20`, `20`, `40``\n *D*: ``NaN`, `NaN`, `20`, `40``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В ES6 мы можем инициализировать параметры значением по умолчанию. Значением параметра будет значение по умолчанию, если никакое другое значение не было передано функции, или если значение параметра равно `\"undefined\"`. В этом случае мы распространяем свойства объекта `value` на новый объект, поэтому значение `x` по умолчанию равно `{number: 10}`.  Аргумент по умолчанию реализуется в момент _call time_! Каждый раз, когда мы вызываем функцию, создается _new_ объект. Мы вызываем функцию `multiply` первые два раза, не передавая значение: `x` имеет значение по умолчанию `{number: 10}`. Затем мы записываем умноженное значение этого числа, которое равно `20`.  В третий раз, когда мы вызываем multiply, мы передаем аргумент: объект с именем `value`. Оператор `\*=` на самом деле является сокращением для `x.number = x.number \* 2`: мы изменяем значение `x.number` и записываем умноженное значение `20`.  В четвертый раз мы снова передаем объект `value`. `x.number` ранее был изменен на `20`, поэтому `x.number \* = 2` записывает `40`.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\n[1, 2, 3, 4].reduce((x, y) => console.log(x, y));\n```\n *A*: ``1` `2`, `3` `3` и `6` `4``\n *B*: ``1` `2`, `2` `3` и `3` `4``\n *C*: ``1` `undefined`, `2` `undefined`, `3` `undefined` и `4` `undefined``\n *D*: ``1` `2`, `undefined` `3` и `undefined` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Первым аргументом, который получает метод `reduce`, является _аккумулятором_, в данном случае `x`. Второй аргумент - это _текущее значение_, `y`. С помощью метода `reduce` мы выполняем функцию обратного вызова для каждого элемента в массиве, что в конечном итоге может привести к единственному значению.  В этом примере мы не возвращаем никаких значений, мы просто регистрируем значения аккумулятора и текущее значение.  Значение аккумулятора равно ранее возвращенному значению функции обратного вызова. Если вы не передадите необязательный аргумент `initialValue` методу `reduce`, аккумулятор будет равен первому элементу при первом вызове.  При первом вызове аккумулятор (`x`) равен `1`, а текущее значение (`y`) равно `2`. Мы не возвращаемся из функции обратного вызова, мы регистрируем аккумулятор и текущее значение: `1` и `2` регистрируются.  Если вы не возвращаете значение из функции, она возвращает значение `undefined`. При следующем вызове аккумулятор равен `undefined`, а текущее значение равно 3. `undefined` и `3` будут зарегистрированы.  При четвертом вызове мы снова не возвращаемся из функции обратного вызова. Аккумулятор снова равен `undefined`, а текущее значение равно `4`. `undefined` и` 4` будут зарегистрированы.",
      "correct": "D"
    },
    {
      "title": "С помощью какого конструктора мы можем успешно расширить класс `Dog`?",
      "code": "```javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n};\n\nclass Labrador extends Dog {\n  // 1\n  constructor(name, size) {\n    this.size = size;\n  }\n  // 2\n  constructor(name, size) {\n    super(name);\n    this.size = size;\n  }\n  // 3\n  constructor(size) {\n    super(name);\n    this.size = size;\n  }\n  // 4\n  constructor(name, size) {\n    this.name = name;\n    this.size = size;\n  }\n\n};\n```\n *A*: `1`\n *B*: `2`\n *C*: `3`\n *D*: `4`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В производном классе вы не можете получить доступ к ключевому слову `this` до вызова `super`. Если вы попытаетесь это сделать, он выдаст ReferenceError: 1 и 4 приведут к ошибке ссылки.  С ключевым словом `super` мы вызываем конструктор родительского класса с заданными аргументами. Конструктор родителя получает аргумент `name`, поэтому нам нужно передать `name` в `super`.  Класс `Labrador` получает два аргумента: `name`, поскольку он расширяет `Dog`, и `size` в качестве дополнительного свойства класса `Labrador`. Они оба должны быть переданы в функцию конструктора в `Labrador`, что делается правильно с помощью конструктора 2.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\n// index.js\nconsole.log(\"running index.js\");\nimport { sum } from \"./sum.js\";\nconsole.log(sum(1, 2));\n\n// sum.js\nconsole.log(\"running sum.js\");\nexport const sum = (a, b) => a + b;\n```\n *A*: ``running index.js`, `running sum.js`, `3``\n *B*: ``running sum.js`, `running index.js`, `3``\n *C*: ``running sum.js`, `3`, `running index.js``\n *D*: ``running index.js`, `undefined`, `running sum.js``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С ключевым словом `import` все импортируемые модули являются _pre-parsed_. Это означает, что импортированные модули запускаются _первыми_, код в файле, который импортирует модуль, исполняется _после_.  В этом разница между `require()` в CommonJS и `import`! С помощью `require()` вы можете загружать зависимости по требованию во время выполнения кода. Если бы мы использовали `require` вместо `import`, в консоль были бы записаны `running index.js`, `running sum.js`, `3`.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconsole.log(Number(2) === Number(2));\nconsole.log(Boolean(false) === Boolean(false));\nconsole.log(Symbol(\"foo\") === Symbol(\"foo\"));\n```\n *A*: ``true`, `true`, `false``\n *B*: ``false`, `true`, `false``\n *C*: ``true`, `false`, `true``\n *D*: ``true`, `true`, `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Каждый `Symbol` совершенно уникален. Цель аргумента, переданного `Symbol`, состоит в том, чтобы дать `Symbol` описание. Значение `Symbol` не зависит от переданного аргумента. Когда мы проверяем равенство, мы создаем два совершенно новых `Symbol`: первый `Symbol('foo')` и второй `Symbol('foo')`. Эти два значения уникальны и не равны друг другу, `Symbol('foo') === Symbol('foo')` возвращает `false`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\nconsole.log(name.padStart(13));\nconsole.log(name.padStart(2));\n```\n *A*: ``\"Lydia Hallie\"`, `\"Lydia Hallie\"``\n *B*: ``\"           Lydia Hallie\"`, `\"  Lydia Hallie\"` (`\"[13x whitespace]Lydia Hallie\"`, `\"[2x whitespace]Lydia Hallie\"`)`\n *C*: ``\" Lydia Hallie\"`, `\"Lydia Hallie\"` (`\"[1x whitespace]Lydia Hallie\"`, `\"Lydia Hallie\"`)`\n *D*: ``\"Lydia Hallie\"`, `\"Lyd\"`,`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `padStart` мы можем добавить отступ в начало строки. Значение, передаваемое этому методу, представляет собой _общую_ длину строки вместе с отступом. Строка `\"Lydia Hallie\"` имеет длину `12`. `name.padStart(13)` вставляет 1 пробел в начале строки, потому что 12 + 1 равно 13.  Если аргумент, переданный методу `padStart`, меньше длины строки, заполнение не будет добавлено.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconsole.log(\"🥑\" + \"💻\");\n```\n *A*: ``\"🥑💻\"``\n *B*: ``257548``\n *C*: `Строка, содержащая кодовые обозначения`\n *D*: `Error`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью оператора `+` вы можете объединять строки. В этом случае мы объединяем строку `\"🥑\"` со строкой `\"💻\"`, что приводит к `\"🥑💻\"`.",
      "correct": "A"
    },
    {
      "title": "Как мы можем вывести в лог значения, которые закомментированы после оператора console.log?",
      "code": "```javascript\nfunction\* startGame() {\n  const answer = yield 'Do you love JavaScript?';\n  if (answer !== 'Yes') {\n    return 'Oh wow... Guess we're gone here';\n  }\n  return 'JavaScript loves you back ❤️';\n}\n\nconst game = startGame();\nconsole.log(/\* 1 \*/); // Do you love JavaScript?\nconsole.log(/\* 2 \*/); // JavaScript loves you back ❤️\n```\n *A*: ``game.next(\"Yes\").value` и `game.next().value``\n *B*: ``game.next.value(\"Yes\")` и `game.next.value()``\n *C*: ``game.next().value` и `game.next(\"Yes\").value``\n *D*: ``game.next.value()` и `game.next.value(\"Yes\")``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция генератора \"приостанавливает\" выполнение, когда видит ключевое слово yield. Во-первых, мы должны позволить функции выдать строку \"Do you love JavaScript?\", что можно сделать, вызвав `game.next().value`.  Каждая строка выполняется до тех пор, пока не найдет первое ключевое слово `yield`. В первой строке функции есть ключевое слово `yield` на первом месте: выполнение останавливается с первым выходом! _Это означает, что переменная `answer` еще не определена!_  Когда мы вызываем `game.next(\"Yes\").value`, предыдущий `yield` заменяется значением параметров, переданных функции `next()`, в данном случае `\"Yes\"`. Значение переменной `answer` теперь равно `\"Yes\"`. Условие if возвращает `false`, а `JavaScript loves you back ❤️`, регистрируется.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconsole.log(String.raw`Hello\nworld`);\n```\n *A*: ``Hello world!``\n *B*: ``Hello` <br />&nbsp; &nbsp; &nbsp;`world``\n *C*: ``Hello\nworld``\n *D*: ``Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`String.raw` возвращает строку, в которой экранированные символы (`\n`, `\v`, `\t` и т.д.) игнорируются! Обратная косая черта может быть проблемой, так как вы можете получить что-то вроде:  `` const path = `C:\Documents\Projects\table.html` ``  Что приведет к:  `\"C:DocumentsProjects able.html\"`  С `String.raw` он просто проигнорирует управляющий знак и напечатает:  `C:\Documents\Projects\table.html`  В этом случае строка `Hello\nworld`, которая и выводится.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nasync function getData() {\n  return await Promise.resolve(\"I made it!\");\n}\n\nconst data = getData();\nconsole.log(data);\n```\n *A*: ``\"I made it!\"``\n *B*: ``Promise {<resolved>: \"I made it!\"}``\n *C*: ``Promise {<pending>}``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Асинхронная функция всегда возвращает обещание. `await` все еще должен ждать разрешения обещания: ожидаемое обещание возвращается, когда мы вызываем `getData()`, чтобы установить `data` равным ему.  Если бы мы хотели получить доступ к разрешенному значению `\"I made it\"`, мы могли бы использовать метод `.then()` для `data`:  `data.then(res => console.log(res))`  Тогда это бы вывело `\"I made it!\"`",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction addToList(item, list) {\n  return list.push(item);\n}\n\nconst result = addToList(\"apple\", [\"banana\"]);\nconsole.log(result);\n```\n *A*: ``['apple', 'banana']``\n *B*: ``2``\n *C*: ``true``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метод `.push()` возвращает _длину_ нового массива! Ранее массив содержал один элемент (строка `\"banana\"`) и имел длину `1`. После добавления в массив строки `\"apple\"`, массив содержит два элемента и имеет длину `2`. Это возвращается из функции `addToList`.  Метод `push` изменяет исходный массив. Если вы хотите вернуть _массив_ из функции, а не _длину массива_, вы должны были вернуть `list` после добавления в нее `item`.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst box = { x: 10, y: 20 };\n\nObject.freeze(box);\n\nconst shape = box;\nshape.x = 100;\n\nconsole.log(shape);\n```\n *A*: ``{ x: 100, y: 20 }``\n *B*: ``{ x: 10, y: 20 }``\n *C*: ``{ x: 100 }``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`Object.freeze` делает невозможным добавление, удаление или изменение свойств объекта (если только значение свойства не является другим объектом).  Когда мы создаем переменную `shape` и устанавливаем ее равной замороженному объекту `box`, `shape` также ссылается на замороженный объект. Вы можете проверить, заморожен ли объект, используя `Object.isFrozen`. В этом случае `Object.isFrozen(shape)` возвращает true, поскольку переменная `shape` имеет ссылку на замороженный объект.  Поскольку `shape` заморожен, и поскольку значение `x` не является объектом, мы не можем изменить свойство `x`. `x` по-прежнему равно `10`, и `{x: 10, y: 20}` регистрируется.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst { firstName: myName } = { firstName: \"Lydia\" };\n\nconsole.log(firstName);\n```\n *A*: ``\"Lydia\"``\n *B*: ``\"myName\"``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Используя [деструктурирующее присваивание](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), мы можем распаковывать значения из массивов или свойства из объектов в отдельные переменные:  ```javascript const { firstName } = { firstName: \"Lydia\" }; // Версия ES5: // var firstName = { firstName: 'Lydia' }.firstName;  console.log(firstName); // \"Lydia\" ```  Также свойство можно распаковать из объекта и присвоить переменной с именем, отличным от имени свойства объекта:  ```javascript const { firstName: myName } = { firstName: \"Lydia\" }; // Версия ES5: // var myName = { firstName: 'Lydia' }.firstName;  console.log(myName); // \"Lydia\" console.log(firstName); // Тут будет ошибка Uncaught ReferenceError: firstName is not defined ```  В этом случае `firstName` не существует как переменная, поэтому попытка доступа к ее значению вызовет `ReferenceError`.  **Примечание.** Помните о свойствах глобальной области видимости:  ```javascript const { name: myName } = { name: \"Lydia\" };  console.log(myName); // \"lydia\" console.log(name); // \"\" ----- Браузер, например, Chrome console.log(name); // ReferenceError: name is not defined  ----- NodeJS ```  Всякий раз, когда Javascript не может найти переменную в _текущей области видимости_, то поднимается вверх по [цепочке областей видимости](https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures#лексическая_область_видимости) и ищет ее на каждом уровне, и если достигает области верхнего уровня, также известной как **Глобальная область**, и все еще не находит нужной ссылки, то выдает `ReferenceError`.  - В **браузерах**, таких как _Chrome_, `name` является _устаревшим свойством глобальной области_. В этом примере код выполняется внутри _глобальной области_ и нет определяемой пользователем локальной переменной `name`, поэтому интерпретатор ищет предопределенные _переменные/свойства_ в глобальной области видимости, что в случае браузеров происходит через объект `window` и возвращается значение [window.name](https://developer.mozilla.org/en-US/docs/Web/API/Window/name), которое равно **пустой строке**.  - В **NodeJS** такого свойства в \"глобальном\" объекте нет, поэтому попытка доступа к несуществующей переменной вызовет [ReferenceError](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Errors/Not_defined).",
      "correct": "D"
    },
    {
      "title": "Это чистая функция?",
      "code": "```javascript\nfunction sum(a, b) {\n  return a + b;\n}\n```\n *A*: `Да`\n *B*: `Нет`",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "Чистая функция - это функция, которая всегда возвращает тот же результат, если переданы одинаковые аргументы.  Функция `sum` всегда возвращает один и тот же результат. Если мы передадим `1` и `2`, он всегда вернет `3` без побочных эффектов. Если мы передадим `5` и `10`, он всегда вернет `15` и так далее. Это определение чистой функции.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst add = () => {\n  const cache = {};\n  return (num) => {\n    if (num in cache) {\n      return `From cache! ${cache[num]}`;\n    } else {\n      const result = num + 10;\n      cache[num] = result;\n      return `Calculated! ${result}`;\n    }\n  };\n};\n\nconst addFunction = add();\nconsole.log(addFunction(10));\nconsole.log(addFunction(10));\nconsole.log(addFunction(5 \* 2));\n```\n *A*: ``Calculated! 20` `Calculated! 20` `Calculated! 20``\n *B*: ``Calculated! 20` `From cache! 20` `Calculated! 20``\n *C*: ``Calculated! 20` `From cache! 20` `From cache! 20``\n *D*: ``Calculated! 20` `From cache! 20` `Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `add` является функцией _запоминателем_. С помощью запоминания мы можем кэшировать результаты функции, чтобы ускорить ее выполнение. В этом случае мы создаем объект `cache`, в котором хранятся ранее возвращенные значения.  Если мы снова вызываем функцию `addFunction` с тем же аргументом, она сначала проверяет, получило ли оно уже это значение в своем кеше. В этом случае будет возвращено значение кэша, что экономит время выполнения. Иначе, если он не кэшируется, он вычислит значение и сохранит его после.  Мы вызываем функцию `addFunction` три раза с одним и тем же значением: при первом вызове значение функции, когда `num` равно `10`, еще не кэшировано. Условие оператора if `num in cache` возвращает `false`, и выполняется блок else: `Calculated! 20` регистрируется, и значение результата добавляется в объект кеша. `cache` теперь выглядит как `{10: 20}`.  Во второй раз объект `cache` содержит значение, возвращаемое для `10`. Условие оператора if `num in cache` возвращает `true`, а `'From cache! 20'` выводится в лог.  В третий раз мы передаем `5 \* 2` в функцию, которая оценивается как `10`. Объект `cache` содержит значение, возвращаемое для `10`. Условие оператора if `num in cache` возвращает `true`, а `'From cache! 20'` регистрируется.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst myLifeSummedUp = [\"☕\", \"💻\", \"🍷\", \"🍫\"];\n\nfor (let item in myLifeSummedUp) {\n  console.log(item);\n}\n\nfor (let item of myLifeSummedUp) {\n  console.log(item);\n}\n```\n *A*: ``0` `1` `2` `3` и `\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"``\n *B*: ``\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"` и `\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"``\n *C*: ``\"☕\"` ` \"💻\"` `\"🍷\"` `\"🍫\"` и `0` `1` `2` `3``\n *D*: ``0` `1` `2` `3` и `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью цикла _for-in_ мы можем перебирать **перечисляемые** свойства. В массиве перечисляемые свойства являются \"ключами\" элементов массива, которые фактически являются их индексами. Вы можете увидеть массив как:  `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`  Где ключи - перечисляемые свойства. `0` `1` `2` `3` войти в систему.  С помощью цикла _for-of_ мы можем выполнять итерацию **итераций**. Массив является итеративным. Когда мы выполняем итерацию по массиву, переменная \"item\" равна элементу, по которому она итерируется в данный момент, `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` выводится в лог.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst list = [1 + 2, 1 \* 2, 1 / 2];\nconsole.log(list);\n```\n *A*: ``[\"1 + 2\", \"1 \* 2\", \"1 / 2\"]``\n *B*: ``[\"12\", 2, 0.5]``\n *C*: ``[3, 2, 0.5]``\n *D*: ``[1, 1, 1]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Элементы массива могут содержать любые значения. Числа, строки, объекты, другие массивы, ноль, логические значения, неопределенные и другие выражения, такие как даты, функции и вычисления.  Элемент будет равен возвращаемому значению. `1 + 2` вернет `3`, `1 \* 2` вернет `2`, а `1 / 2` вернет `0.5`.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction sayHi(name) {\n  return `Hi there, ${name}`;\n}\n\nconsole.log(sayHi());\n```\n *A*: ``Hi there, ``\n *B*: ``Hi there, undefined``\n *C*: ``Hi there, null``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "По умолчанию аргументы имеют значение `undefined`, если только значение не было передано функции. В этом случае мы не передали значение для аргумента `name`. `name` равно логгируемому `undefined`.  В ES6 мы можем перезаписать значение по умолчанию `undefined` параметрами по умолчанию. Например:  `function sayHi(name = \"Lydia\") { ... }`  В этом случае, если мы не передали значение или если мы передали `undefined`, `name` всегда будет равно строке `Lydia`",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nvar status = \"😎\";\n\nsetTimeout(() => {\n  const status = \"😍\";\n\n  const data = {\n    status: \"🥑\",\n    getStatus() {\n      return this.status;\n    },\n  };\n\n  console.log(data.getStatus());\n  console.log(data.getStatus.call(this));\n}, 0);\n```\n *A*: ``\"🥑\"` и `\"😍\"``\n *B*: ``\"🥑\"` и `\"😎\"``\n *C*: ``\"😍\"` и `\"😎\"``\n *D*: ``\"😎\"` и `\"😎\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Значение ключевого слова `this` зависит от того, где вы его используете. В **методе**, как и в методе `getStatus`, ключевое слово `this` ссылается на объект, которому принадлежит метод. Метод принадлежит объекту `data`, поэтому `this` относится к объекту `data`. Когда мы регистрируем `this.status`, регистрируется свойство `status` объекта `data`, которое является `\"🥑\"`.  С помощью метода `call` мы можем изменить объект, на который ссылается ключевое слово `this`. В **функциях** ключевое слово `this` относится к _объекту, которому принадлежит функция_. Мы объявили функцию `setTimeout` для объекта _global_, поэтому в функции `setTimeout` ключевое слово `this` ссылается на объект _global_. В глобальном объекте есть переменная с именем _status_ со значением `\"😎\"`. При регистрации `this.status` выводится `\"😎\"`.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nlet city = person.city;\ncity = \"Amsterdam\";\n\nconsole.log(person);\n```\n *A*: ``{ name: \"Lydia\", age: 21 }``\n *B*: ``{ name: \"Lydia\", age: 21, city: \"Amsterdam\" }``\n *C*: ``{ name: \"Lydia\", age: 21, city: undefined }``\n *D*: ``\"Amsterdam\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы устанавливаем переменную `city` равной значению свойства с именем `city` для объекта `person`. У этого объекта нет свойства с именем `city`, поэтому переменная `city` имеет значение `undefined`.  Обратите внимание, что мы _не_ ссылаемся на сам объект person! Мы просто устанавливаем переменную `city` равной текущему значению свойства `city` объекта `person`.  Затем мы устанавливаем `city` равным строке `\"Amsterdam\"`. Это не меняет объект person - нет ссылки на этот объект.  При регистрации объекта `person` возвращается неизмененный объект.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction checkAge(age) {\n  if (age < 18) {\n    const message = \"Sorry, you're too young.\";\n  } else {\n    const message = \"Yay! You're old enough!\";\n  }\n\n  return message;\n}\n\nconsole.log(checkAge(21));\n```\n *A*: ``\"Sorry, you're too young.\"``\n *B*: ``\"Yay! You're old enough!\"``\n *C*: ``ReferenceError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Переменные с ключевыми словами `const` и `let` имеют _блочную видимость_. Блок - это что-то между фигурными скобками (`{}`). В этом случае в фигурных скобках операторов if/else. Вы не можете ссылаться на переменную за пределами блока, в котором она объявлена, вызывается ReferenceError.",
      "correct": "C"
    },
    {
      "title": "Какая информация будетвыведена в лог?",
      "code": "```javascript\nfetch(\"https://www.website.com/api/user/1\")\n  .then((res) => res.json())\n  .then((res) => console.log(res));\n```\n *A*: `Результат метода `fetch`.`\n *B*: `Результат второго вызова метода `fetch`.`\n *C*: `Результат коллбэка в предыдущем `.then()`.`\n *D*: `Всегда будет `undefined`.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Значение `res` во втором `.then` равно возвращенному значению предыдущего `.then`. Вы можете продолжать цепочку `.then` таким образом; значение передается следующему обработчику.",
      "correct": "C"
    },
    {
      "title": "Какая опция позволяет установить hasName равным `true`, если вы не можете передать`true` в качестве аргумента?",
      "code": "```javascript\nfunction getName(name) {\n  const hasName = //\n}\n```\n *A*: ``!!name``\n *B*: ``name``\n *C*: ``new Boolean(name)``\n *D*: ``name.length``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью `!!name` мы определяем, является ли значение `name` истинным или ложным. Если имя истинное, которое мы хотим проверить, то `!name` возвращает `false`. А `!false` (это то, чем на самом деле является `!! name`) возвращает `true`.  Устанавливая `hasName` равным `name`, вы устанавливаете `hasName` равным любому значению, которое вы передали функции `getName`, а не логическому значению `true`.  `new Boolean (true)` возвращает объектную оболочку, а не само логическое значение.  `name.length` возвращает длину переданного аргумента, независимо от того, является ли он `true`.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconsole.log(\"I want pizza\"[0]);\n```\n *A*: ``\"\"\"``\n *B*: ``\"I\"``\n *C*: ``SyntaxError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Чтобы получить символ по определенному индексу в строке, вы можете использовать скобочную нотацию. Первый символ в строке имеет индекс 0 и т.д. В этом случае мы хотим получить элемент с индексом 0, символ `'I'`, который выводится в лог.  Обратите внимание, что этот метод не поддерживается в IE7 и ниже. В этом случае используйте `.charAt()`",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction sum(num1, num2 = num1) {\n  console.log(num1 + num2);\n}\n\nsum(10);\n```\n *A*: ``NaN``\n *B*: ``20``\n *C*: ``ReferenceError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Вы можете установить значение параметра по умолчанию равным другому параметру функции, если они были определены _до_ параметров по умолчанию. Мы передаем значение `10` в функцию `sum`. Если функция `sum` принимает только один аргумент, это означает, что значение для `num2` не передано, и в этом случае значение `num1` равно переданному значению `10`. Значением по умолчанию `num2` является значение `num1`, которое равно `10`. `num1 + num2` возвращает `20`.  Если вы пытаетесь установить значение параметра по умолчанию равным параметру, который определен _после_ (справа), то значение параметра еще не было инициализировано; это приведет к ошибке.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\n// module.js\nexport default () => \"Hello world\";\nexport const name = \"Lydia\";\n\n// index.js\nimport \* as data from \"./module\";\n\nconsole.log(data);\n```\n *A*: ``{ default: function default(), name: \"Lydia\" }``\n *B*: ``{ default: function default() }``\n *C*: ``{ default: \"Hello world\", name: \"Lydia\" }``\n *D*: `Global object of `module.js``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С синтаксисом `import \* as name` мы импортируем _все exports_ из файла `module.js` в файл `index.js`, тогда и создается новый объект с именем `data`. В файле `module.js` есть два экспорта: экспорт по умолчанию и именованный экспорт. Экспорт по умолчанию - это функция, которая возвращает строку `\"Hello World\"`, а именованный экспорт - это переменная с именем `name`, которая имеет значение строки `\"Lydia\"`.  Объект `data` имеет свойство `default` для экспорта по умолчанию, другие свойства имеют имена именованных экспортов и их соответствующие значения.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nconst member = new Person(\"John\");\nconsole.log(typeof member);\n```\n *A*: ``\"class\"``\n *B*: ``\"function\"``\n *C*: ``\"object\"``\n *D*: ``\"string\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Классы являются синтаксическим сахаром для конструкторов функций. Эквивалентом класса `Person` в качестве конструктора функции будет:  ```javascript function Person() {   this.name = name; } ```  Вызов конструктора функции с `new` приводит к созданию экземпляра `Person`, ключевое слово `typeof` возвращает `\"object\"` для экземпляра. `typeof member` возвращает `\"object\"`.",
      "correct": "C"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nlet newList = [1, 2, 3].push(4);\n\nconsole.log(newList.push(5));\n```\n *A*: ``[1, 2, 3, 4, 5]``\n *B*: ``[1, 2, 3, 5]``\n *C*: ``[1, 2, 3, 4]``\n *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метод `.push` возвращает _новую длину_ массива, а не сам массив! Устанавливая `newList` равным `[1, 2, 3].push(4)`, мы устанавливаем `newList` равным новой длине массива: `4`.  Затем мы пытаемся использовать метод `.push` для `newList`. Поскольку `newList` является числовым значением `4`, мы не можем использовать метод `.push`: выдается ошибка TypeError.",
      "correct": "D"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction giveLydiaPizza() {\n  return \"Here is pizza!\";\n}\n\nconst giveLydiaChocolate = () =>\n  \"Here's chocolate... now go hit the gym already.\";\n\nconsole.log(giveLydiaPizza.prototype);\nconsole.log(giveLydiaChocolate.prototype);\n```\n *A*: ``{ constructor: ...}` `{ constructor: ...}``\n *B*: ``{}` `{ constructor: ...}``\n *C*: ``{ constructor: ...}` `{}``\n *D*: ``{ constructor: ...}` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Обычные функции, такие как функция `giveLydiaPizza`, имеют свойство `prototype`, которое является объектом (прототипом объекта) со свойством `constructor`. Однако функции со стрелками, такие как функция `giveLydiaChocolate`, не имеют этого свойства `prototype`. `undefined` возвращается при попытке доступа к свойству `prototype` с использованием `giveLydiaChocolate.prototype`.",
      "correct": "D"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nfor (const [x, y] of Object.entries(person)) {\n  console.log(x, y);\n}\n```\n *A*: ``name` `Lydia` and `age` `21``\n *B*: ``[\"name\", \"Lydia\"]` and `[\"age\", 21]``\n *C*: ``[\"name\", \"age\"]` and `undefined``\n *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`Object.entries (person)` возвращает массив вложенных массивов, содержащий ключи и объекты:  `[ [ 'name', 'Lydia' ], [ 'age', 21 ] ]`  Используя цикл `for-of`, мы можем перебирать каждый элемент массива, в данном случае подмассивы. Мы можем мгновенно деструктурировать подмассивы в цикле for, используя `const [x, y]`. `x` равен первому элементу в подмассиве, `y` равен второму элементу в подмассиве.  Первым подмассивом является `[ \"name\", \"Lydia\" ]`, где `x` равно `\"name\"`, и `y` равно `\"Lydia\"`, которые выводятся в лог. Вторым подмассивом является `[ \"age\", 21 ]`, где `x` равно `\"age\"`, и `y` равно `21`, которые выводятся в лог.",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction getItems(fruitList, ...args, favoriteFruit) {\n  return [...fruitList, ...args, favoriteFruit]\n}\n\ngetItems([\"banana\", \"apple\"], \"pear\", \"orange\")\n```\n *A*: ``[\"banana\", \"apple\", \"pear\", \"orange\"]``\n *B*: ``[[\"banana\", \"apple\"], \"pear\", \"orange\"]``\n *C*: ``[\"banana\", \"apple\", [\"pear\"], \"orange\"]``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`... args` - прочие параметры. Значение прочих параметров - это массив, содержащий все оставшиеся аргументы **и может быть передан только последним**! В этом примере прочие параметры были вторым аргументом. Это невозможно, и это приведет к синтаксической ошибке.  ```javascript function getItems(fruitList, favoriteFruit, ...args) {   return [...fruitList, ...args, favoriteFruit]; }  getItems([\"banana\", \"apple\"], \"pear\", \"orange\"); ```  Приведенный выше пример работает. Это возвращает массив `[ 'banana', 'apple', 'orange', 'pear' ]`",
      "correct": "D"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nfunction nums(a, b) {\n  if (a > b) console.log(\"a is bigger\");\n  else console.log(\"b is bigger\");\n  return;\n  a + b;\n}\n\nconsole.log(nums(4, 2));\nconsole.log(nums(1, 2));\n```\n *A*: ``a is bigger`, `6` and `b is bigger`, `3``\n *B*: ``a is bigger`, `undefined` and `b is bigger`, `undefined``\n *C*: ``undefined` and `undefined``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript мы _не должны_ явно указывать точку с запятой (`;`), однако движок JavaScript все равно добавляет их после операторов. Это называется **автоматической вставкой точек с запятой**. Например, оператором могут быть переменные или ключевые слова, такие как `throw`, `return`, `break` и т.д.  Здесь мы написали инструкцию `return` и другое значение `a + b` в новой строке. Однако, поскольку это новая линия, движок не знает, что это на самом деле значение, которое мы хотели бы вернуть. Вместо этого он автоматически добавляет точку с запятой после `return`. Вы можете увидеть это как:  ```javascript return; a + b; ```  Это означает, что `a + b` никогда не достигается, так как функция перестает выполняться после ключевого слова `return`. Если значение не возвращается, как здесь, функция возвращает значение `undefined`. Обратите внимание, что после операторов `if / else` автоматической вставки нет!",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nclass Person {\n  constructor() {\n    this.name = \"Lydia\";\n  }\n}\n\nPerson = class AnotherPerson {\n  constructor() {\n    this.name = \"Sarah\";\n  }\n};\n\nconst member = new Person();\nconsole.log(member.name);\n```\n *A*: ``\"Lydia\"``\n *B*: ``\"Sarah\"``\n *C*: ``Error: cannot redeclare Person``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы можем установить классы равными другим классам/конструкторам функций. В этом случае мы устанавливаем `Person` равным `AnotherPerson`. Свойство `name` этого конструктора - `Sarah`, поэтому свойство `name` для нового экземпляра класса `Person` `member` - это `Sarah`.",
      "correct": "B"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst info = {\n  [Symbol(\"a\")]: \"b\",\n};\n\nconsole.log(info);\nconsole.log(Object.keys(info));\n```\n *A*: ``{Symbol('a'): 'b'}` and `[\"{Symbol('a')\"]``\n *B*: ``{}` and `[]``\n *C*: ``{ a: \"b\" }` and `[\"a\"]``\n *D*: ``{Symbol('a'): 'b'}` and `[]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`Symbol` не является _перечисляемый_. Метод `Object.keys` возвращает все _перечисляемые_ свойства ключа для объекта. `Symbol` не просматривается таким образом, и возвращается пустой массив. При регистрации всего объекта будут видны все свойства, даже не перечисляемые.  Это одно из многих качеств символа: помимо представления совершенно уникального значения (которое предотвращает случайное столкновение имен в объектах, например, при работе с 2 библиотеками, которые хотят добавить свойства к одному и тому же объекту), вы также можете \"скрыть\" свойства объектов таким образом (хотя и не полностью. Вы можете получить доступ к символам, используя метод `Object.getOwnPropertySymbols()`).",
      "correct": "D"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst getList = ([x, ...y]) => [x, y]\nconst getUser = user => { name: user.name, age: user.age }\n\nconst list = [1, 2, 3, 4]\nconst user = { name: \"Lydia\", age: 21 }\n\nconsole.log(getList(list))\nconsole.log(getUser(user))\n```\n *A*: ``[1, [2, 3, 4]]` and `undefined``\n *B*: ``[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }``\n *C*: ``[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }``\n *D*: ``Error` and `{ name: \"Lydia\", age: 21 }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `getList` получает массив в качестве аргумента. Между скобками функции `getList` мы сразу же деструктурируем этот массив. Вы можете увидеть это как:  `[x, ...y] = [1, 2, 3, 4]`  С помощью оставшихся параметров `... y` мы помещаем все \"оставшиеся\" аргументы в массив. Остальные аргументы - это `2`, `3` и `4` в этом случае. Значение `y` является массивом, содержащим все остальные параметры. В этом случае значение `x` равно `1`, поэтому, мы видим в логе `[x, y]`, `[1, [2, 3, 4]]`.  Функция `getUser` получает объект. В стрелочных функциях нам _не нужно_ писать фигурные скобки, если мы просто возвращаем одно значение. Однако, если вы хотите мгновенно вернуть _object_ из стрелочной функции, вы должны написать его между круглыми скобками, иначе все, что находится между двумя фигурными скобками, будет интерпретироваться как оператор блока. В этом случае код между фигурными скобками не является допустимым кодом JavaScript, поэтому выдается `SyntaxError`.  Следующая функция вернула бы объект:  `const getUser = user => ({ name: user.name, age: user.age })`",
      "correct": "A"
    },
    {
      "title": "Какой будет вывод?",
      "code": "```javascript\nconst name = \"Lydia\";\n\nconsole.log(name());\n```\n *A*: ``SyntaxError``\n *B*: ``ReferenceError``\n *C*: ``TypeError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Переменная `name` содержит значение строки, которая не является функцией, поэтому не может вызываться.  Ошибки типа выдаются, когда значение не соответствует ожидаемому типу. JavaScript ожидал, что `name` будет функцией, так как мы пытаемся вызвать ее. Однако это была строка, поэтому выдается ошибка TypeError: name не является функцией!  Синтаксические ошибки генерируются, когда вы написали что-то, что не является допустимым JavaScript, например, когда вы написали слово `return` как `retrun`. ReferenceErrors генерируется, когда JavaScript не может найти ссылку на значение, к которому вы пытаетесь получить доступ.",
      "correct": "C"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\n// 🎉✨ This is my 100th question! ✨🎉\n\nconst output = `${[] && \"Im\"}possible!\nYou should${\"\" && `n't`} see a therapist after so much JavaScript lol`;\n```\n *A*: ``possible! You should see a therapist after so much JavaScript lol``\n *B*: ``Impossible! You should see a therapist after so much JavaScript lol``\n *C*: ``possible! You shouldn't see a therapist after so much JavaScript lol``\n *D*: ``Impossible! You shouldn't see a therapist after so much JavaScript lol``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`[]` - истинное значение. С оператором `&&` будет возвращено правое значение, если левое значение является истинным значением. В этом случае левое значение `[]` является истинным значением, поэтому возвращается `'Im'`.  `\"\"` - ложное значение. Если левое значение ложно, ничего не возвращается. `n't` не возвращается.",
      "correct": "B"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconst one = false || {} || null;\nconst two = null || false || \"\";\nconst three = [] || 0 || true;\n\nconsole.log(one, two, three);\n```\n *A*: ``false` `null` `[]``\n *B*: ``null` `\"\"` `true``\n *C*: ``{}` `\"\"` `[]``\n *D*: ``null` `null` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью оператора `||` мы можем вернуть первый истинный операнд. Если все значения ложны, последний операнд возвращается.  `(false || {} || null)`: пустой объект `{}` является истинным значением. Это первое (и единственное) истинное значение, которое возвращается. `one` содержит `{}`.  `(null || false || \"\")`: все операнды являются ложными значениями. Это означает, что прошедший операнд `\"\"` возвращается. `two` содержит `\"\"`.  `([] || 0 || \"\")`: пустой массив `[]` является истинным значением. Это первое истинное значение, которое возвращается. `three` присвоено `[]`.",
      "correct": "C"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconst myPromise = () => Promise.resolve(\"I have resolved!\");\n\nfunction firstFunction() {\n  myPromise().then((res) => console.log(res));\n  console.log(\"second\");\n}\n\nasync function secondFunction() {\n  console.log(await myPromise());\n  console.log(\"second\");\n}\n\nfirstFunction();\nsecondFunction();\n```\n *A*: ``I have resolved!`, `second` and `I have resolved!`, `second``\n *B*: ``second`, `I have resolved!` and `second`, `I have resolved!``\n *C*: ``I have resolved!`, `second` and `second`, `I have resolved!``\n *D*: ``second`, `I have resolved!` and `I have resolved!`, `second``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С обещанием мы в основном говорим: _\"Я хочу выполнить эту функцию и откладываю ее, пока она выполняется, поскольку это может занять некоторое время. Только когда определенное значение разрешено (или отклонено), и когда стек вызовов пуст, я хочу использовать это значение_\".  Мы можем получить это значение с помощью ключевого слова `.then` и `await` в функции `async`. Хотя мы можем получить значение обещания с помощью `.then` и `await`, они работают немного по-разному.  В `firstFunction` мы (вроде) отложили функцию `myPromise` во время ее работы, но продолжили выполнение другого кода, в данном случае `console.log ('second')`. Затем функция разрешается строкой `I have resolved`, которая затем логируется после того, как она увидела, что стек вызовов пуст.  Используя ключевое слово `await` в `secondFunction`, мы буквально приостанавливаем выполнение асинхронной функции до тех пор, пока значение не будет разрешено до перехода на следующую строку.  Это означает, что мы ожидали разрешения `myPromise` со значением `I have resolved`, и только когда это произошло, мы перешли к следующей строке: `second` была выведена в консоль последней.",
      "correct": "D"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconst set = new Set();\n\nset.add(1);\nset.add(\"Lydia\");\nset.add({ name: \"Lydia\" });\n\nfor (let item of set) {\n  console.log(item + 2);\n}\n```\n *A*: ``3`, `NaN`, `NaN``\n *B*: ``3`, `7`, `NaN``\n *C*: ``3`, `Lydia2`, `[object Object]2``\n *D*: ``\"12\"`, `Lydia2`, `[object Object]2``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор `+` используется не только для добавления числовых значений, но мы также можем использовать его для объединения строк. Всякий раз, когда движок JavaScript видит, что одно или несколько значений не являются числом, он приводит число к строке.  Первым является `1`, который является числовым значением. `1 + 2` возвращает число `3`.  Тем не менее, вторая строка `\"Lydia\"`. `\"Lydia\"` является строкой, а `2` является числом: `2` приводится к строке. `\"Lydia\"` и `\"2\"` объединяются, что приводит к результирующей строке `\"Lydia2\"`.  `{name: \"Lydia\"}` является объектом. Ни число, ни объект не являются строкой, поэтому они приводятся к строке. Всякий раз, когда мы приводим обычный объект, он становится `\"[object Object]\"`. `\"[object Object]\"`, объединенный с `\"2\"`, становится `\"[object Object]2\"`.",
      "correct": "C"
    },
    {
      "title": "Чему равно значение?",
      "code": "```javascript\nPromise.resolve(5);\n```\n *A*: ``5``\n *B*: ``Promise {<pending>: 5}``\n *C*: ``Promise {<fulfilled>: 5}``\n *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы можем передать любой тип значения, которое мы хотим, в `Promise.resolve`, либо обещание, либо не обещание. Сам метод возвращает обещание с разрешенным значением (`<fulfilled>`). Если вы передадите обычную функцию, это будет разрешенное обещание с обычным значением. Если вы передадите обещание, это будет разрешенное обещание с разрешенным значением этого пройденного обещания.  В этом случае мы просто передали числовое значение `5`. Возвращается разрешенное обещание со значением `5`.",
      "correct": "C"
    },
    {
      "title": "Чему равно значение?",
      "code": "```javascript\nfunction compareMembers(person1, person2 = person) {\n  if (person1 !== person2) {\n    console.log(\"Not the same!\");\n  } else {\n    console.log(\"They are the same!\");\n  }\n}\n\nconst person = { name: \"Lydia\" };\n\ncompareMembers(person);\n```\n *A*: ``Not the same!``\n *B*: ``They are the same!``\n *C*: ``ReferenceError``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Объекты передаются по ссылке. Когда мы проверяем объекты на строгое равенство (`===`), мы сравниваем их ссылки.  Мы устанавливаем значение по умолчанию для `person2`, равное объекту `person`, и передаем объект `person` в качестве значения для `person1`.  Это означает, что оба значения имеют ссылку на одно и то же место в памяти, поэтому они равны.  Блок кода в операторе `else` запускается, и в лог выводится `They are the same!`.",
      "correct": "B"
    },
    {
      "title": "Чему равно значение?",
      "code": "```javascript\nconst colorConfig = {\n  red: true,\n  blue: false,\n  green: true,\n  black: true,\n  yellow: false,\n};\n\nconst colors = [\"pink\", \"red\", \"blue\"];\n\nconsole.log(colorConfig.colors[1]);\n```\n *A*: ``true``\n *B*: ``false``\n *C*: ``undefined``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript у нас есть два способа доступа к свойствам объекта: нотация в скобках или нотация в точках. В этом примере мы используем точечную нотацию (`colorConfig.colors`) вместо скобочной нотации (`colorConfig[\"colors\"]`).  В точечной нотации JavaScript пытается найти свойство объекта с таким точным именем. В этом примере JavaScript пытается найти свойство с именем `colors` в объекте `colorConfig`. Не существует свойства с именем `colors`, поэтому возвращается `undefined`. Затем мы пытаемся получить доступ к значению первого элемента, используя `[1]`. Мы не можем сделать это для значения, которое `undefined`, поэтому оно выдает `TypeError`: `Cannot read свойство '1' of undefined`.  JavaScript интерпретирует (или распаковывает) операторы. Когда мы используем скобочные обозначения, он видит первую открывающую скобку `[` и продолжает работать, пока не найдет закрывающую скобку `]`. Только тогда он оценит утверждение. Если бы мы использовали `colorConfig[colors [1]]`, он бы возвратил значение свойства `red` объекта `colorConfig`.",
      "correct": "D"
    },
    {
      "title": "Чему равно значение?",
      "code": "```javascript\nconsole.log(\"❤️\" === \"❤️\");\n```\n *A*: ``true``\n *B*: ``false``",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "Под капотом смайлики - это юникоды. Юникод для сердца смайликов `\"U+2764 U+FE0F\"`. Они всегда одинаковы для одного и того же смайлика, поэтому мы сравниваем две одинаковые строки друг с другом, что возвращает `true`.",
      "correct": "A"
    },
    {
      "title": "Какой из этих методов модифицирует исходный массив?",
      "code": "```javascript\nconst emojis = [\"✨\", \"🥑\", \"😍\"];\n\nemojis.map((x) => x + \"✨\");\nemojis.filter((x) => x !== \"🥑\");\nemojis.find((x) => x !== \"🥑\");\nemojis.reduce((acc, cur) => acc + \"✨\");\nemojis.slice(1, 2, \"✨\");\nemojis.splice(1, 2, \"✨\");\n```\n *A*: ``All of them``\n *B*: ``map` `reduce` `slice` `splice``\n *C*: ``map` `slice` `splice``\n *D*: ``splice``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Используя метод `splice`, мы модифицируем исходный массив, удаляя, заменяя или добавляя элементы. В этом случае мы удалили 2 элемента из индекса 1 (мы удалили `'🥑'` и `'😍'`) и добавили `✨` emoji.  `map`, `filter` и `slice` возвращают новый массив, `find` возвращает элемент, а `reduce` возвращает аккумулированное значение.",
      "correct": "D"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconst food = [\"🍕\", \"🍫\", \"🥑\", \"🍔\"];\nconst info = { favoriteFood: food[0] };\n\ninfo.favoriteFood = \"🍝\";\n\nconsole.log(food);\n```\n *A*: ``['🍕', '🍫', '🥑', '🍔']``\n *B*: ``['🍝', '🍫', '🥑', '🍔']``\n *C*: ``['🍝', '🍕', '🍫', '🥑', '🍔']``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы устанавливаем значение свойства `favourFood` для объекта `info` равным строке со смайликами для пиццы, `'🍕'`. Строка является примитивным типом данных. В JavaScript примитивные типы данных передаются по ссылке ...  В JavaScript примитивные типы данных (все, что не является объектом) передаются как _значение_. В этом случае мы устанавливаем значение свойства `favourFood` объекта `info` равным значению первого элемента в массиве `food`, в данном случае это строка с emoji пиццы (`'🍕'`). Строка является примитивным типом данных и взаимодействует по значению (см. мой [пост в блоге](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference), если вы заинтересованы в получении дополнительной информации).  Затем мы меняем значение свойства `favourFood` объекта `info`. Массив `food` не изменился, поскольку значение `favourFood` было просто _скопировано_ из значения первого элемента в массиве и не имеет ссылки на то же место в памяти, что и элемент на `food[0]`. Когда мы выводим в лог `food`, это все равно исходный массив, `['🍕', '🍫', '🥑', '🍔']`.",
      "correct": "A"
    },
    {
      "title": "Что делает этот метод?",
      "code": "```javascript\nJSON.parse();\n```\n *A*: `Разбирает JSON в значение JavaScript`\n *B*: `Разбирает объект JavaScript в JSON`\n *C*: `Разбирает любое значение JavaScript в JSON`\n *D*: `Разбирает JSON непосредственно в объект JavaScript`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `JSON.parse ()` мы можем разобрать строку JSON в значение JavaScript.  ```javascript // Преобразование числа в допустимый JSON, затем преобразование строки JSON в значение JavaScript: const jsonNumber = JSON.stringify(4); // '4' JSON.parse(jsonNumber); // 4  // Преобразование значения массива в допустимый JSON, затем разбор строки JSON в значение JavaScript: const jsonArray = JSON.stringify([1, 2, 3]); // '[1, 2, 3]' JSON.parse(jsonArray); // [1, 2, 3]  // Преобразование объекта в допустимый JSON, затем преобразование строки JSON в значение JavaScript: const jsonArray = JSON.stringify({ name: \"Lydia\" }); // '{\"name\":\"Lydia\"}' JSON.parse(jsonArray); // { name: 'Lydia' } ```",
      "correct": "A"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nlet name = \"Lydia\";\n\nfunction getName() {\n  console.log(name);\n  let name = \"Sarah\";\n}\n\ngetName();\n```\n *A*: `Lydia`\n *B*: `Sarah`\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Каждая функция имеет свой собственный _контекст исполнения_ (или _область видимости_). Функция `getName` сначала ищет в своем собственном контексте (области видимости), чтобы увидеть, содержит ли она переменную `name`, к которой мы пытаемся получить доступ. В этом случае функция `getName` содержит собственную переменную `name`: мы объявляем переменную `name` с ключевым словом `let` и значением `'Sarah'`.  Переменные с ключевым словом `let` (и `const`) поднимаются в начало функции, в отличие от `var`, которые _не инициализируется_. Они недоступны до того, как мы объявим (инициализируем) их строку. Это называется \"временной мертвой зоной\". Когда мы пытаемся получить доступ к переменным до их объявления, JavaScript выдает `ReferenceError`.  Если бы мы не объявили переменную `name` в функции `getName`, движок javascript посмотрел бы вниз по _цепочки области действия_. Внешняя область имеет переменную с именем `name` со значением `Lydia`. В этом случае он бы записал `Lydia`.  ```javascript let name = \"Lydia\";  function getName() {   console.log(name); }  getName(); // Lydia ```",
      "correct": "D"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nfunction\* generatorOne() {\n  yield [\"a\", \"b\", \"c\"];\n}\n\nfunction\* generatorTwo() {\n  yield\* [\"a\", \"b\", \"c\"];\n}\n\nconst one = generatorOne();\nconst two = generatorTwo();\n\nconsole.log(one.next().value);\nconsole.log(two.next().value);\n```\n *A*: ``a` and `a``\n *B*: ``a` and `undefined``\n *C*: ``['a', 'b', 'c']` and `a``\n *D*: ``a` and `['a', 'b', 'c']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Используя ключевое слово `yield`, мы получаем значения в функции генератора. С помощью ключевого слова `yield\*` мы можем получить значения из другой функции-генератора или итерируемого объекта (например, массива).  В `generatorOne` мы получаем весь массив `['a', 'b', 'c']`, используя ключевое слово `yield`. Значение свойства `value` для объекта, возвращаемого методом `next` для `one` (`one.next().value`), равно всему массиву `['a', 'b', 'c']`.  ```javascript console.log(one.next().value); // ['a', 'b', 'c'] console.log(one.next().value); // undefined ```  В файле `generatorTwo` мы используем ключевое слово `yield\*`. Это означает, что первое полученное значение `two` равно первому полученному значению в итераторе. Итератор - это массив `['a', 'b', 'c']`. Первым полученным значением является `a`, поэтому в первый раз, когда мы вызываем `two.next().value`, возвращается `a`.  ```javascript console.log(two.next().value); // 'a' console.log(two.next().value); // 'b' console.log(two.next().value); // 'c' console.log(two.next().value); // undefined ```",
      "correct": "C"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconsole.log(`${((x) => x)(\"I love\")} to program`);\n```\n *A*: ``I love to program``\n *B*: ``undefined to program``\n *C*: ``${(x => x)('I love') to program``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Выражения внутри литералов шаблона расчитываются первыми. Это означает, что строка будет содержать возвращаемое значение выражения, в данном случае немедленно исполняемую функцию `(x => x)('I love')`. Мы передаем значение `'I love'` в качестве аргумента стрелочной функции `x => x`. `x` равно `'I love'`, которое и возвращается. Это приводит к `I love to program`.",
      "correct": "A"
    },
    {
      "title": "Что произойдет?",
      "code": "```javascript\nlet config = {\n  alert: setInterval(() => {\n    console.log(\"Alert!\");\n  }, 1000),\n};\n\nconfig = null;\n```\n *A*: `обратный вызов `setInterval` не будет вызван`\n *B*: `обратный вызов `setInterval` будет вызван один раз`\n *C*: `обратный вызов `setInterval` будет вызываться каждую секунду`\n *D*: `мы никогда не вызовем `config.alert()`, т.к. `config` равно `null``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Обычно, когда мы устанавливаем объекты равными `null`, эти объекты получают статус _собрано в мусор_, так как больше нет ссылок на этот объект. Однако, поскольку функция обратного вызова внутри `setInterval` является стрелочной функцией (таким образом, привязанной к объекту `config`), функция обратного вызова по-прежнему содержит ссылку на объект `config`. Пока есть ссылка, объект не будет собирать мусор. Так как это интервал, установка `config` в `null` или `delete`-ing `config.alert` не приведет к сбору мусора для интервала, поэтому интервал все равно будет вызываться. Его следует очистить с помощью `clearInterval(config.alert)`, чтобы удалить его из памяти. Поскольку он не был очищен, функция обратного вызова `setInterval` будет по-прежнему вызываться каждые 1000мс (1с).",
      "correct": "C"
    },
    {
      "title": "Какие методы вернут значение `'Hello world!'`?",
      "code": "```javascript\nconst myMap = new Map();\nconst myFunc = () => \"greeting\";\n\nmyMap.set(myFunc, \"Hello world!\");\n\n//1\nmyMap.get(\"greeting\");\n//2\nmyMap.get(myFunc);\n//3\nmyMap.get(() => \"greeting\");\n```\n *A*: `1`\n *B*: `2`\n *C*: `2 и 3`\n *D*: `Каждый из них`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "При добавлении пары ключ/значение с использованием метода `set` имя ключа будет равно значению первого аргумента, переданного в функцию `set`, а значением будет второй аргумент, переданный в функцию `set`. В данном случае ключом является _функция_ `() => 'greeting'` и значение `'Hello world'`. `myMap` теперь это `{ () => 'greeting' => 'Hello world!' }`.  1 неверно, поскольку ключ не `'greeting'`, а `() => 'greeting'`. 3 неверно, так как мы создаем новую функцию, передавая ее в качестве параметра методу `get`. Объект взаимодействует со _ссылкой_. Функции - это объекты, поэтому две функции никогда не бывают строго равными, даже если они идентичны: они имеют ссылки на разные места в памяти.",
      "correct": "B"
    },
    {
      "title": "Какое значение будет на выходе?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nconst changeAge = (x = { ...person }) => (x.age += 1);\nconst changeAgeAndName = (x = { ...person }) => {\n  x.age += 1;\n  x.name = \"Sarah\";\n};\n\nchangeAge(person);\nchangeAgeAndName();\n\nconsole.log(person);\n```\n *A*: ``{name: \"Sarah\", age: 22}``\n *B*: ``{name: \"Sarah\", age: 23}``\n *C*: ``{name: \"Lydia\", age: 22}``\n *D*: ``{name: \"Lydia\", age: 23}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функции `changeAge` и `changeAgeAndName` имеют параметр по умолчанию, а именно _вновь_ созданный объект `{ ...person }`. Этот объект имеет копии всех ключей/значений объекта `person`.  Сначала мы вызываем функцию `changeAge` и передаем объект `person` в качестве аргумента. Эта функция увеличивает значение свойства `age` на 1. `person` теперь `{name: \"Lydia\", age: 22}`.  Затем мы вызываем функцию `changeAgeAndName`, однако мы не передаем параметр. Вместо этого значение `x` равно новому объекту: `{ ... person }`. Поскольку это новый объект, он не влияет на значения свойств объекта `person`. `person` по-прежнему равен `{name: \"Lydia\", age: 22}`.",
      "correct": "C"
    },
    {
      "title": "Какой из следующих наборов параметров вернет `6`?",
      "code": "```javascript\nfunction sumValues(x, y, z) {\n  return x + y + z;\n}\n```\n *A*: ``sumValues([...1, 2, 3])``\n *B*: ``sumValues([...[1, 2, 3]])``\n *C*: ``sumValues(...[1, 2, 3])``\n *D*: ``sumValues([1, 2, 3])``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью оператора распространения (spread) `...` мы можем _распределить_ итерации в отдельньные элементы. `sumValues` принимает три аргумента:`x`, `y` и `z`. `...[1, 2, 3]` приведет к перечню `1, 2, 3`, который мы передаем функции `sumValues`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nlet num = 1;\nconst list = [\"🥳\", \"🤠\", \"🥰\", \"🤪\"];\n\nconsole.log(list[(num += 1)]);\n```\n *A*: ``🤠``\n *B*: ``🥰``\n *C*: ``SyntaxError``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С операндом `+=` мы увеличиваем значение `num` на `1`. `num` имеет начальное значение `1`, поэтому `1 + 1` равно `2`. Элементом второго индекса в массиве `list` и является вывод `console.log (list [2])`🥰.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst person = {\n  firstName: \"Lydia\",\n  lastName: \"Hallie\",\n  pet: {\n    name: \"Mara\",\n    breed: \"Dutch Tulip Hound\",\n  },\n  getFullName() {\n    return `${this.firstName} ${this.lastName}`;\n  },\n};\n\nconsole.log(person.pet?.name);\nconsole.log(person.pet?.family?.name);\nconsole.log(person.getFullName?.());\nconsole.log(member.getLastName?.());\n```\n *A*: ``undefined` `undefined` `undefined` `undefined``\n *B*: ``Mara` `undefined` `Lydia Hallie` `undefined``\n *C*: ``Mara` `null` `Lydia Hallie` `null``\n *D*: ``null` `ReferenceError` `null` `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С необязательным оператором связывания `?.` нам больше не нужно явно проверять, действительны ли более глубокие вложенные значения или нет. Если мы пытаемся получить доступ к свойству со (_нулевым_) значением `undefined` или `null`, выражение замыкается и возвращает `undefined`.  `person.pet?.name`: `person` имеет свойство с именем `pet`: `person.pet` не нулевое. Оно имеет свойство с именем `name`, и возвращает `Mara`. `person.pet?.family?.name`: `person` имеет свойство с именем `pet`: `person.pet` не нулевое. `pet` _не_ имеет свойство с именем `family`, `person.pet.family` нулевое. Выражение возвращает `undefined`. `person.getFullName?.()`: `person` имеет свойство с именем `getFullName`: `person.getFullName()` не нулевое, и может быть вызвано, возвращает `Lydia Hallie`. `member.getLastName?.()`: `member` не определено: `member.getLastName()` нулевое. Выражение возвращает `undefined`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst groceries = [\"banana\", \"apple\", \"peanuts\"];\n\nif (groceries.indexOf(\"banana\")) {\n  console.log(\"We have to buy bananas!\");\n} else {\n  console.log(`We don't have to buy bananas!`);\n}\n```\n *A*: `We have to buy bananas!`\n *B*: `We don't have to buy bananas`\n *C*: ``undefined``\n *D*: ``1``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы передали условие `groceries.indexOf(\"banana\")` в оператор `if`. `groceries.indexOf(\"banana\")` возвращает `0`, что является ложным значением. Поскольку условие в операторе `if` ложно, выполняется код в блоке `else`, и в лог выводится `We don't have to buy bananas!`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst config = {\n  languages: [],\n  set language(lang) {\n    return this.languages.push(lang);\n  },\n};\n\nconsole.log(config.language);\n```\n *A*: ``function language(lang) { this.languages.push(lang }``\n *B*: ``0``\n *C*: ``[]``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метод `language` является `сеттером`. Сеттеры не содержат действительного значения, их целью является изменение свойств. При вызове метода `setter` возвращается `undefined`.",
      "correct": "D"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\n\nconsole.log(!typeof name === \"object\");\nconsole.log(!typeof name === \"string\");\n```\n *A*: ``false` `true``\n *B*: ``true` `false``\n *C*: ``false` `false``\n *D*: ``true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`typeof name` возвращает `\"строку\"`. Строка `\"string\"` является истинным значением, поэтому `!typeof name` возвращает логическое значение `false`. `false === \"object\"` и `false === \"string\"` оба возвращают `false`.  (Если бы мы хотели проверить, был ли тип (не)равен определенному типу, мы должны были написать `!==` вместо `!typeof`)",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst add = (x) => (y) => (z) => {\n  console.log(x, y, z);\n  return x + y + z;\n};\n\nadd(4)(5)(6);\n```\n *A*: ``4` `5` `6``\n *B*: ``6` `5` `4``\n *C*: ``4` `function` `function``\n *D*: ``undefined` `undefined` `6``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `add` возвращает стрелочную функцию, которая возвращает стрелочную функцию, которая возвращает стрелочную функцию (все еще тут?). Первая функция получает аргумент `x` со значением `4`. Мы вызываем вторую функцию, которая получает аргумент `y` со значением `5`. Затем мы вызываем третью функцию, которая получает аргумент `z` со значением `6`. Когда мы пытаемся получить доступ к значениям `x`, `y` и `z` в функции последней стрелки, движок JS поднимается вверх по цепочке областей видимости, чтобы найти значения для `x` и `y` соответственно. Это возвращает `4` `5` `6`.",
      "correct": "A"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nasync function\* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield Promise.resolve(i);\n  }\n}\n\n(async () => {\n  const gen = range(1, 3);\n  for await (const item of gen) {\n    console.log(item);\n  }\n})();\n```\n *A*: ``Promise {1}` `Promise {2}` `Promise {3}``\n *B*: ``Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}``\n *C*: ``1` `2` `3``\n *D*: ``undefined` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция генератора `range` возвращает асинхронный объект с обещаниями для каждого элемента в диапазоне, который мы передаем: `Promise {1}`, `Promise {2}`, `Promise {3}`. Мы устанавливаем переменную `gen` равной асинхронному объекту, после чего зацикливаем ее, используя цикл `for await ... of`. Мы устанавливаем переменную `item` равной возвращаемым значениям `Promise`: сначала `Promise {1}`, затем `Promise {2}`, затем `Promise {3}`. Так как мы _ожидаем_ значение `item`, разрешается обещание, возвращаются разрешенные _значения_ обещания: `1`, `2`, затем `3`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst myFunc = ({ x, y, z }) => {\n  console.log(x, y, z);\n};\n\nmyFunc(1, 2, 3);\n```\n *A*: ``1` `2` `3``\n *B*: ``{1: 1}` `{2: 2}` `{3: 3}``\n *C*: ``{ 1: undefined }` `undefined` `undefined``\n *D*: ``undefined` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`myFunc` ожидает объект со свойствами `x`, `y` и `z` в качестве аргумента. Поскольку мы передаем только три отдельных числовых значения (1, 2, 3) вместо одного объекта со свойствами `x`, `y` и `z` ({x: 1, y: 2, z: 3}), то `x`, `y` и `z` имеют значение по умолчанию` undefined`.",
      "correct": "D"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nfunction getFine(speed, amount) {\n  const formattedSpeed = new Intl.NumberFormat({\n    'en-US',\n    { style: 'unit', unit: 'mile-per-hour' }\n  }).format(speed)\n\n  const formattedAmount = new Intl.NumberFormat({\n    'en-US',\n    { style: 'currency', currency: 'USD' }\n  }).format(amount)\n\n  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`\n}\n\nconsole.log(getFine(130, 300))\n```\n *A*: `The driver drove 130 and has to pay 300`\n *B*: `The driver drove 130 mph and has to pay \$300.00`\n *C*: `The driver drove undefined and has to pay undefined`\n *D*: `The driver drove 130.00 and has to pay 300.00`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `Intl.NumberFormat` мы можем форматировать числовые значения в любой локали. Мы форматируем числовое значение `130` для локали `en-US` как `unit` в `mile-per-hour`, что приводит к `130 mph`. Числовое значение `300` для локали `en-US` в качестве `currentcy` в `USD` приводит к `$300.00`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst spookyItems = [\"👻\", \"🎃\", \"🕸\"];\n({ item: spookyItems[3] } = { item: \"💀\" });\n\nconsole.log(spookyItems);\n```\n *A*: ``[\"👻\", \"🎃\", \"🕸\"]``\n *B*: ``[\"👻\", \"🎃\", \"🕸\", \"💀\"]``\n *C*: ``[\"👻\", \"🎃\", \"🕸\", { item: \"💀\" }]``\n *D*: ``[\"👻\", \"🎃\", \"🕸\", \"[object Object]\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Деструктурируя объекты, мы можем распаковать значения из правого объекта и присвоить распакованному значению значение того же по имени свойства в левом объекте. В этом случае мы присваиваем значение \"💀\" `spookyItems[3]`. Это означает, что мы модифицируем массив `spookyItems`, добавляем к нему «💀». При логировании `spookyItems` выводится ` [\"👻\", \"🎃\", \"🕸\", \"💀\"]`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\nconst age = 21;\n\nconsole.log(Number.isNaN(name));\nconsole.log(Number.isNaN(age));\n\nconsole.log(isNaN(name));\nconsole.log(isNaN(age));\n```\n *A*: ``true` `false` `true` `false``\n *B*: ``true` `false` `false` `false``\n *C*: ``false` `false` `true` `false``\n *D*: ``false` `true` `false` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `Number.isNaN` вы можете проверить, является ли передаваемое вами значение _числовым значением_ и равно ли оно `NaN`. `name` не является числовым значением, поэтому `Number.isNaN(name)` возвращает `false`. `age` является числовым значением, но не равно `NaN`, поэтому `Number.isNaN(age)` возвращает `false`.  С помощью метода `isNaN` вы можете проверить, не является ли передаваемое вами значение числом. `name` не является числом, поэтому `isNaN(name)` возвращает true. `age` - это число, поэтому `isNaN(age)` возвращает `false`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst randomValue = 21;\n\nfunction getInfo() {\n  console.log(typeof randomValue);\n  const randomValue = \"Lydia Hallie\";\n}\n\ngetInfo();\n```\n *A*: ``\"number\"``\n *B*: ``\"string\"``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Переменные, объявленные с ключевым словом `const`, не имеют ссылки до их инициализации: это называется _временная мертвая зона_. В функции `getInfo` переменная `randomValue` находится в области видимости `getInfo`. В строке, где мы хотим записать значение `typeof randomValue`, переменная `randomValue` еще не инициализирована: выдается `ReferenceError`! Движок не пошел по цепочке областей видимости, так как мы объявили переменную `randomValue` в функции `getInfo`.",
      "correct": "D"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst myPromise = Promise.resolve(\"Woah some cool data\");\n\n(async () => {\n  try {\n    console.log(await myPromise);\n  } catch {\n    throw new Error(`Oops didn't work`);\n  } finally {\n    console.log(\"Oh finally!\");\n  }\n})();\n```\n *A*: ``Woah some cool data``\n *B*: ``Oh finally!``\n *C*: ``Woah some cool data` `Oh finally!``\n *D*: ``Oops didn't work` `Oh finally!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В блоке `try` мы выводим в лог ожидаемое значение переменной `myPromise`: `\"Woah some cool data\"`. Поскольку в блоке `try` не было выдано никаких ошибок, код в блоке `catch` не запускается. Код в блоке `finally` _всегда_ выполняется, `\"Oh finally!\"` также выводится в лог.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst emojis = [\"🥑\", [\"✨\", \"✨\", [\"🍕\", \"🍕\"]]];\n\nconsole.log(emojis.flat(1));\n```\n *A*: ``['🥑', ['✨', '✨', ['🍕', '🍕']]]``\n *B*: ``['🥑', '✨', '✨', ['🍕', '🍕']]``\n *C*: ``['🥑', ['✨', '✨', '🍕', '🍕']]``\n *D*: ``['🥑', '✨', '✨', '🍕', '🍕']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `flat` мы можем создать новый плоский массив. Глубина уплощенного массива зависит от значения, которое мы передаем. В этом случае мы передали значение `1` (которое нам не нужно, это значение по умолчанию), что означает, что будут объединены только массивы на первой глубине. `['🥑']` и `['✨', '✨', ['🍕', '🍕']]` в этом случае. Конкатенация этих двух массивов приводит к `['🥑', '✨', '✨', ['🍕', '🍕']]`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nclass Counter {\n  constructor() {\n    this.count = 0;\n  }\n\n  increment() {\n    this.count++;\n  }\n}\n\nconst counterOne = new Counter();\ncounterOne.increment();\ncounterOne.increment();\n\nconst counterTwo = counterOne;\ncounterTwo.increment();\n\nconsole.log(counterOne.count);\n```\n *A*: ``0``\n *B*: ``1``\n *C*: ``2``\n *D*: ``3``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`counterOne` экземпляр класса `Counter`. Counter класс содержит метод `increment` и свойство `count` в конструкторе. Сперва, при помощи `counterOne.increment()`, мы дважды вызываем метод `increment`. `counterOne.count` становится `2`.  https://i.imgur.com/KxLlTm9.png  Затем, мы создаем новую переменную `counterTwo`, и присваиваем ей `counterOne`. Поскольку объекты передаются по ссылке, мы просто создаем новую ссылку на то же место в памяти, на которое указывает `counterOne`. Поскольку переменные ссылаются на то же место в памяти, любые изменения, внесенные в объект, на который ссылается `counterTwo`, также применяются к` counterOne`. Теперь `counterTwo.count` равно `2`.  Мы вызываем `counterTwo.increment()`, что устанавливает значение `count` равное `3`. Затем мы выводим в консоль значение переменной `counterOne`, которое равно `3`.  https://i.imgur.com/BNBHXmc.png",
      "correct": "D"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst myPromise = Promise.resolve(Promise.resolve(\"Promise!\"));\n\nfunction funcOne() {\n  myPromise.then((res) => res).then((res) => console.log(res));\n  setTimeout(() => console.log(\"Timeout!\", 0));\n  console.log(\"Last line!\");\n}\n\nasync function funcTwo() {\n  const res = await myPromise;\n  console.log(await res);\n  setTimeout(() => console.log(\"Timeout!\", 0));\n  console.log(\"Last line!\");\n}\n\nfuncOne();\nfuncTwo();\n```\n *A*: ``Promise! Last line! Promise! Last line! Last line! Promise!``\n *B*: ``Last line! Timeout! Promise! Last line! Timeout! Promise!``\n *C*: ``Promise! Last line! Last line! Promise! Timeout! Timeout!``\n *D*: ``Last line! Promise! Promise! Last line! Timeout! Timeout!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Сначала мы вызываем `funcOne`. В первой строке `funcOne` мы вызываем _асинхронную_ функцию `setTimeout`, из которой обратный вызов отправляется в веб-API. (см. мою статью о цикле событий <a href=\"https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif\">здесь</a>.)  Затем мы вызываем обещание `myPromise`, которое является _асинхронной_ операцией.  И обещание, и тайм-аут являются асинхронными операциями, функция продолжает работать, пока она занята выполнением обещания и обработкой обратного вызова `setTimeout`. Это означает, что `Last line 1!` регистрируется первой, так как это не асинхронная операция.  Поскольку стек вызовов еще не пуст, функция `setTimeout` и обещание в `funcOne` еще не могут быть добавлены в стек вызовов.  В `funcTwo` переменная `res` получает `Promise`, потому что `Promise.resolve(Promise.resolve('Promise'))` эквивалентно `Promise.resolve('Promise')`, так как разрешение обещания просто разрешает его стоимость. `await` в этой строке останавливает выполнение функции до тех пор, пока она не получит разрешение промиса, а затем продолжает работать синхронно до завершения, поэтому `Promise 2!`, а затем `Last line 2!` регистрируются, а `setTimeout` отправляется в Web API.  Тогда стек вызовов пуст. Промисы — это _микрозадачи_, поэтому они решаются первыми, когда стек вызовов пуст, поэтому `Promise 1!` регистрируется.  Теперь, поскольку `funcTwo` выталкивается из стека вызовов, стек вызовов пуст. Обратные вызовы, ожидающие в очереди (`() => console.log(\"Timeout 1!\")` из `funcOne`, и `() => console.log(\"Timeout 2!\")` из `funcTwo`) добавляются в стек вызовов один за другим. Первый обратный вызов регистрирует `Timeout 1!` и удаляется из стека. Затем второй обратный вызов регистрирует `Timeout 2!` и удаляется из стека.",
      "correct": "D"
    },
    {
      "title": "Как мы можем вызвать функцию `sum` в `sum.js` из `index.js?`",
      "code": "```javascript\n// sum.js\nexport default function sum(x) {\n  return x + x;\n}\n\n// index.js\nimport * as sum from \"./sum\";\n```\n *A*: ``sum(4)``\n *B*: ``sum.sum(4)``\n *C*: ``sum.default(4)``\n *D*: `Нельзя импортировать значения по умолчанию используя `*`, только именованные экспорты`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Используя звездочку `*`, мы импортируем все экспортируемые значения из файла, включая именнованные экспорты и экспорты по умолчанию. Если бы у нас был следующий файл:  ```javascript // info.js export const name = \"Lydia\"; export const age = 21; export default \"I love JavaScript\";  // index.js import * as info from \"./info\"; console.log(info); ```  В лог попадёт следующее:  ```javascript {   default: 'I love JavaScript',   name: 'Lydia',   age: 21 } ```  Для примера `sum` это означает, что импортированное значение `sum` будет таким:  ```javascript { default: function sum(x) { return x + x } } ```  Следовательно, мы можем вызвать эту функцию используя `sum.default`",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst handler = {\n  set: () => console.log(\"Added a new property!\"),\n  get: () => console.log(\"Accessed a property!\"),\n};\n\nconst person = new Proxy({}, handler);\n\nperson.name = \"Lydia\";\nperson.name;\n```\n *A*: ``Added a new property!``\n *B*: ``Accessed a property!``\n *C*: ``Added a new property!` `Accessed a property!``\n *D*: `В лог ничего не попадёт`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "C помощью Proxy мы можем добавить собственное поведению объекту, которое мы передаем вторым аргументом. В нашем случае мы передаем объект `handler` который содержит свойства: `set` и `get`. `set` вызывается каждый раз когда мы _устанавливаем_ значения свойств, `get` же вызывается всякий раз когда мы _получаем_ значения свойств.  Первый аргумент — пустой объект `{}`, который является значением `person`. Для него будет добавлено собственное поведение, описанное в объекте `handler`. При добавлении значения для объекта `person` будет вызвано свойство `set`. При запросе к значению `person` вызовется свойство `get`.  Сначала мы устанавливаем новое свойство `name` для объекта Proxy (`person.name = \"Lydia\"`). Вызывается `set` и в лог попадает `\"Added a new property!\"`.  Затем мы обращаемся к значению Proxy-объекта. Вызывается свойство `get` объекта `handler`. `\"Accessed a property!\"` попадает в лог.",
      "correct": "C"
    },
    {
      "title": "Какое из перечисленных действий может модифицировать объект `person`?",
      "code": "```javascript\nconst person = { name: \"Lydia Hallie\" };\n\nObject.seal(person);\n```\n *A*: ``person.name = \"Evan Bacon\"``\n *B*: ``person.age = 21``\n *C*: ``delete person.name``\n *D*: ``Object.assign(person, { age: 21 })``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью `Object.seal` мы можем предотвращать как _добавление_ новых свойств, так и _удаление_ существующих.  Однако, изменение существующих свойств остаётся доступным.",
      "correct": "A"
    },
    {
      "title": "Какое из перечисленных действий может модифицировать объект `person`?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  address: {\n    street: \"100 Main St\",\n  },\n};\n\nObject.freeze(person);\n```\n *A*: ``person.name = \"Evan Bacon\"``\n *B*: ``delete person.address``\n *C*: ``person.address.street = \"101 Main St\"``\n *D*: ``person.pet = { name: \"Mara\" }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "С помощью метода `Object.freeze` мы можем _заморозить_ объект. Свойства не могут быть добавлены, изменены или удалены.  Однако, это _неглубоко_ замораживает объект. Замораживаются только _непосредственные_ свойства объекта. Если свойством является другой объект(в нашем примере `address`), свойства этого объекта не замораживаются и могут быть изменены.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst add = (x) => x + x;\n\nfunction myFunc(num = 2, value = add(num)) {\n  console.log(num, value);\n}\n\nmyFunc();\nmyFunc(3);\n```\n *A*: ``2` `4` and `3` `6``\n *B*: ``2` `NaN` and `3` `NaN``\n *C*: ``2` `Error` and `3` `6``\n *D*: ``2` `4` and `3` `Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Во-первых, мы вызваем `myFunc()` без передачи каких-либо аргументов. Поскольку мы не передаем аргументы, `num` и `value` получают свои значения по умолчанию: `num` равно `2`, а `value` возвращаемое значение функции `add`. В функцию `add` мы передаем в качестве аргумента `num` со значением `2`. `add` возвращает `4`, что является значением `value`.  Затем мы вызваем `myFunc(3)` и передаем значение `3` в качестве значения аргумента `num`. Мы не передаем аргумент для `value`. Поскольку мы не передаем значение для аргумента `value`, он получаеи значение по умолчанию: возвращаемое значение функции `add`. В `add` мы передаем `num`, значение которого равно `3`. `add` возвращает `6`, что является значением `value`.",
      "correct": "A"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nclass Counter {\n  #number = 10;\n\n  increment() {\n    this.#number++;\n  }\n\n  getNum() {\n    return this.#number;\n  }\n}\n\nconst counter = new Counter();\ncounter.increment();\n\nconsole.log(counter.#number);\n```\n *A*: ``10``\n *B*: ``11``\n *C*: ``undefined``\n *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В ES2020 мы можем добавлять приватные переменные в классы с помощью символа `#`. Мы не можем получить доступ к этим переменным вне класса. Когда мы пытаемся записать `counter.#number`, выдается `SyntaxError`: мы не можем получить доступ вне класса `Counter`!",
      "correct": "D"
    },
    {
      "title": "В каком случае не будет ошибки?",
      "code": "```javascript\nconst teams = [\n  { name: \"Team 1\", members: [\"Paul\", \"Lisa\"] },\n  { name: \"Team 2\", members: [\"Laura\", \"Tim\"] },\n];\n\nfunction\* getMembers(members) {\n  for (let i = 0; i < members.length; i++) {\n    yield members[i];\n  }\n}\n\nfunction\* getTeams(teams) {\n  for (let i = 0; i < teams.length; i++) {\n    // ✨ SOMETHING IS MISSING HERE ✨\n  }\n}\n\nconst obj = getTeams(teams);\nobj.next(); // { value: \"Paul\", done: false }\nobj.next(); // { value: \"Lisa\", done: false }\n```\n *A*: ``yield getMembers(teams[i].members)``\n *B*: ``yield\* getMembers(teams[i].members)``\n *C*: ``return getMembers(teams[i].members)``\n *D*: ``return yield getMembers(teams[i].members)``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Чтобы выполнить итерацию по `members` в каждом элементе массива `teams`, нам нужно передать `teams[i].members` в функцию генератора `getMembers`. Функция генератора возвращает объект генератора. Чтобы перебрать каждый элемент в этом объекте-генераторе, нам нужно использовать `yield\*`.  Если бы мы написали `yield`, `return yield` или `return`, вся функция генератора была бы возвращена при первом вызове метода `next`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  hobbies: [\"coding\"],\n};\n\nfunction addHobby(hobby, hobbies = person.hobbies) {\n  hobbies.push(hobby);\n  return hobbies;\n}\n\naddHobby(\"running\", []);\naddHobby(\"dancing\");\naddHobby(\"baking\", person.hobbies);\n\nconsole.log(person.hobbies);\n```\n *A*: ``[\"coding\"]``\n *B*: ``[\"coding\", \"dancing\"]``\n *C*: ``[\"coding\", \"dancing\", \"baking\"]``\n *D*: ``[\"coding\", \"running\", \"dancing\", \"baking\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `addHobby` получает два аргумента, `hobby` и `hobbies`, со значением по умолчанию массива `hobbies` в объекте `person`.  Во-первых, мы вызываем функцию `addHobby` и передаем `\"running\"` в качестве значения для `hobby`, а пустой массив в качестве значения для `hobbies`. Так как мы передаем пустой массив в качестве значения для `hobbies`, `\"running\"` добавляется к этому пустому массиву.  Затем мы вызываем функцию `addHobby` и передаем `dancing` в качестве значения для `hobby`. Мы не передавали значение для `hobbies`, поэтому оно получает значение по умолчанию, свойство `hobbies` объекта `person`. Мы помещаем хобби `dancing` в массив `person.hobbies`.  Наконец, мы вызываем функцию `addHobby` и передаем `\"baking\"` в качестве значения для `hobby`, а массив `person.hobbies` в качестве значения для `hobbies`. Мы помещаем хобби `baking` в массив `person.hobbies`.  После нажатия `танцы` и `выпечка`, значение `person.hobbies` равно `[\"coding\", \"dancing\", \"baking\"]`",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nclass Bird {\n  constructor() {\n    console.log(\"I'm a bird. 🦢\");\n  }\n}\n\nclass Flamingo extends Bird {\n  constructor() {\n    console.log(\"I'm pink. 🌸\");\n    super();\n  }\n}\n\nconst pet = new Flamingo();\n```\n *A*: ``I'm pink. 🌸``\n *B*: ``I'm pink. 🌸` `I'm a bird. 🦢``\n *C*: ``I'm a bird. 🦢` `I'm pink. 🌸``\n *D*: `Nothing, we didn't call any method`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы создаем переменную `pet`, которая является экземпляром класса `Flamingo`. Когда мы создаем этот экземпляр, вызывается `constructor` для `Flamingo`. Сначала регистрируется `\"I'm pink. 🌸\"`, после чего мы вызываем `super()`. `super()` вызывает конструктор родительского класса `Bird`. Конструктор в `Bird` вызывается и регистрирует `\"I'm a bird. 🦢\"`.",
      "correct": "B"
    },
    {
      "title": "Какой/какие из вариантов приведет к ошибке?",
      "code": "```javascript\nconst emojis = [\"🎄\", \"🎅🏼\", \"🎁\", \"⭐\"];\n\n/* 1 */ emojis.push(\"🦌\");\n/* 2 */ emojis.splice(0, 2);\n/* 3 */ emojis = [...emojis, \"🥂\"];\n/* 4 */ emojis.length = 0;\n```\n *A*: `1`\n *B*: `1 и 2`\n *C*: `3 и 4`\n *D*: `3`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ключевое слово `const` просто означает, что мы не можем _повторно объявить_ значение этой переменной, оно доступно только для чтения. Однако само значение не является неизменным. Свойства массива `emojis` можно изменить, например, добавив новые значения, объединив их или установив длину массива на 0.",
      "correct": "D"
    },
    {
      "title": "Что нам нужно добавить к объекту `person`, чтобы получить `[\"Lydia Hallie\", 21]` в качестве вывода `[...person]`?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  age: 21\n}\n\n[...person] // [\"Lydia Hallie\", 21]\n```\n *A*: `Ничего, объекты итерируется по умолчанию`\n *B*: ``\*[Symbol.iterator]() { for (let x in this) yield\* this[x] }``\n *C*: ``\*[Symbol.iterator]() { yield\* Object.values(this) }``\n *D*: ``\*[Symbol.iterator]() { for (let x in this) yield this }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "По умолчанию объекты не являются итерируемыми. Итерируемым объект становится, если присутствует протокол итератора. Мы можем добавить это вручную, добавив символ итератора `[Symbol.iterator]`, который должен возвращать объект-генератор, например, сделав его функцией-генератором `\*[Symbol.iterator]() {}`. Эта функция-генератор должна возвращать `Object.values` объекта `person`, если мы хотим, чтобы он возвращал массив `[\"Lydia Hallie\", 21]`: `yield\* Object.values(this)`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nlet count = 0;\nconst nums = [0, 1, 2, 3];\n\nnums.forEach((num) => {\n  if (num) count += 1;\n});\n\nconsole.log(count);\n```\n *A*: `1`\n *B*: `2`\n *C*: `3`\n *D*: `4`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Условие `if` внутри цикла `forEach` проверяет, является ли значение `num` истинным или ложным. Поскольку первое число в массиве `nums` равно `0`, то есть ложное значение, блок оператора `if` не будет выполнен. `count` увеличивается только для остальных 3 чисел в массиве `nums`: `1`, `2` и `3`. Поскольку `count` увеличивается на 1 3 раза, значение `count` равно `3`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nfunction getFruit(fruits) {\n  console.log(fruits?.[1]?.[1]);\n}\n\ngetFruit([[\"🍊\", \"🍌\"], [\"🍍\"]]);\ngetFruit();\ngetFruit([[\"🍍\"], [\"🍊\", \"🍌\"]]);\n```\n *A*: ``null`, `undefined`, 🍌`\n *B*: ``[]`, `null`, 🍌`\n *C*: ``[]`, `[]`, 🍌`\n *D*: ``undefined`, `undefined`, 🍌`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`?` позволяет нам дополнительно получить доступ к более глубоким вложенным свойствам внутри объектов. Мы пытаемся зарегистрировать элемент с индексом `1` в подмассиве с индексом `1` массива `fruits`. Если подмассив с индексом `1` в массиве `fruits` не существует, он просто вернет `undefined`. Если подмассив с индексом `1` в массиве `fruits` существует, но в этом подмассиве нет элемента с индексом `1`, он также вернет значение `undefined`.  Во-первых, мы пытаемся зарегистрировать второй элемент в `['🍍']` подмассива `[['🍊', '🍌'], ['🍍']]`. Этот подмассив содержит только один элемент, что означает, что в индексе `1` нет элемента, и возвращает значение `undefined`.  Затем мы вызываем функцию `getFruits` без передачи значения в качестве аргумента, что означает, что `fruits` по умолчанию имеет значение `undefined`. Поскольку мы условно связываем элемент с индексом `1` массива `fruits`, он возвращает значение `undefined`, поскольку этот элемент с индексом `1` не существует.  Наконец, мы попытаемся зарегистрировать второй элемент в `['🍊', '🍌']` подмассива `['🍍'], ['🍊', '🍌']`. Элемент с индексом `1` в этом подмассиве — `🍌`, который регистрируется.",
      "correct": "D"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nclass Calc {\n  constructor() {\n    this.count = 0;\n  }\n\n  increase() {\n    this.count++;\n  }\n}\n\nconst calc = new Calc();\nnew Calc().increase();\n\nconsole.log(calc.count);\n```\n *A*: ``0``\n *B*: ``1``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Мы устанавливаем переменную `calc` равной новому экземпляру класса `Calc`. Затем мы создаем экземпляр нового экземпляра `Calc` и вызываем метод увеличения для этого экземпляра. Поскольку свойство `count` находится в конструкторе класса `Calc`, свойство `count` не используется в прототипе `Calc`. Это означает, что значение `count` не было обновлено для экземпляра, на который указывает `calc`, `count` по-прежнему равен `0`.",
      "correct": "A"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst user = {\n  email: \"e@mail.com\",\n  password: \"12345\",\n};\n\nconst updateUser = ({ email, password }) => {\n  if (email) {\n    Object.assign(user, { email });\n  }\n\n  if (password) {\n    user.password = password;\n  }\n\n  return user;\n};\n\nconst updatedUser = updateUser({ email: \"new@email.com\" });\n\nconsole.log(updatedUser === user);\n```\n *A*: ``false``\n *B*: ``true``\n *C*: ``TypeError``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `updateUser` обновляет значения свойств `email` и `password` у пользователя, если их значения переданы в функцию, после чего функция возвращает объект `user`. Возвращаемое значение функции `updateUser` — это объект `user`, что означает, что значение `updatedUser` является ссылкой на тот же объект `user`, на который указывает `user`. `updatedUser === user` равно `true`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst fruit = [\"🍌\", \"🍊\", \"🍎\"];\n\nfruit.slice(0, 1);\nfruit.splice(0, 1);\nfruit.unshift(\"🍇\");\n\nconsole.log(fruit);\n```\n *A*: ``['🍌', '🍊', '🍎']``\n *B*: ``['🍊', '🍎']``\n *C*: ``['🍇', '🍊', '🍎']``\n *D*: ``['🍇', '🍌', '🍊', '🍎']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Во-первых, мы вызываем метод `slice` для массива фруктов. Метод `slice` не изменяет исходный массив, а возвращает значение, которое было вырезано из массива: банановый смайлик. Затем мы вызываем метод `splice` для массива фруктов. Метод `splice` изменяет исходный массив, что означает, что массив фруктов теперь состоит из `['🍊', '🍎']`. Наконец, мы вызываем метод `unshift` для массива `fruit`, который изменяет исходный массив, добавляя предоставленное значение, в данном случае `🍇`, в качестве первого элемента в массиве. Массив фруктов теперь состоит из `['🍇', '🍊', '🍎']`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst animals = {};\nlet dog = { emoji: \"🐶\" };\nlet cat = { emoji: \"🐈\" };\n\nanimals[dog] = { ...dog, name: \"Mara\" };\nanimals[cat] = { ...cat, name: \"Sara\" };\n\nconsole.log(animals[dog]);\n```\n *A*: ``{ emoji: \"🐶\", name: \"Mara\" }``\n *B*: ``{ emoji: \"🐈\", name: \"Sara\" }``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ключи объекта преобразуются в строки.  Поскольку значение `dog` является объектом, `animals[dog]` на самом деле означает, что мы создаем новое свойство под названием `\"object Object\"`, равное новому объекту. `animals[\"object Object\"]` теперь равно `{ emoji: \"🐶\", name: \"Mara\"}`.  `cat` также является объектом, что означает, что `animals[cat]` на самом деле означает, что мы перезаписываем значение `animals[\"object Object\"]` новыми свойствами кота.  Регистрация `animals[dog]`, или фактически `animals[\"object Object\"]`, поскольку преобразование объекта `dog` в строку приводит к `\"object Object\"`, возвращает `{ emoji: \"🐈\", name: \" Сара\"}`.",
      "correct": "B"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst user = {\n  email: \"my@email.com\",\n  updateEmail: (email) => {\n    this.email = email;\n  },\n};\n\nuser.updateEmail(\"new@email.com\");\nconsole.log(user.email);\n```\n *A*: ``my@email.com``\n *B*: ``new@email.com``\n *C*: ``undefined``\n *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функция `updateEmail` представляет собой стрелочную функцию и не привязана к объекту пользователя. Это означает, что ключевое слово `this` не относится к объекту `user`, а в данном случае относится к глобальной области видимости. Значение `email` в объекте `user` не обновляется. При регистрации значения `user.email` возвращается исходное значение `my@email.com`.",
      "correct": "A"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst promise1 = Promise.resolve(\"First\");\nconst promise2 = Promise.resolve(\"Second\");\nconst promise3 = Promise.reject(\"Third\");\nconst promise4 = Promise.resolve(\"Fourth\");\n\nconst runPromises = async () => {\n  const res1 = await Promise.all([promise1, promise2]);\n  const res2 = await Promise.all([promise3, promise4]);\n  return [res1, res2];\n};\n\nrunPromises()\n  .then((res) => console.log(res))\n  .catch((err) => console.log(err));\n```\n *A*: ``[['First', 'Second'], ['Fourth']]``\n *B*: ``[['First', 'Second'], ['Third', 'Fourth']]``\n *C*: ``[['First', 'Second']]``\n *D*: ``'Third'``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метод `Promise.all` выполняет переданные промисы параллельно. Если одно обещание не выполняется, метод `Promise.all` _отколняется_ со значением отклоненного обещания. В этом случае `promise3` отклонен со значением `\"Third\"`. Мы перехватываем отклоненное значение в цепочке методов `catch` при вызове `runPromises`, чтобы перехватывать любые ошибки внутри функции `runPromises`. Только `\"Third\"` регистрируется, так как `promise3` отклонено с этим значением.",
      "correct": "D"
    },
    {
      "title": "Каким должно быть значение `method` для регистрации `{ name: \"Lydia\", age: 22 }`?",
      "code": "```javascript\nconst keys = [\"name\", \"age\"];\nconst values = [\"Lydia\", 22];\n\nconst method =\n  /* ?? */\n  Object[method](\n    keys.map((_, i) => {\n      return [keys[i], values[i]];\n    })\n  ); // { name: \"Lydia\", age: 22 }\n```\n *A*: ``entries``\n *B*: ``values``\n *C*: ``fromEntries``\n *D*: ``forEach``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метод `fromEntries` превращает двумерный массив в объект. Первый элемент в каждом подмассиве будет ключом, а второй элемент в каждом подмассиве будет значением. В этом случае мы сопоставляем массив `keys`, который возвращает массив, первый элемент которого является элементом массива ключей текущего индекса, а второй элемент является элементом массива значений текущего индекса.  Это создает массив подмассивов, содержащих правильные ключи и значения, что приводит к `{ name: \"Lydia\", age: 22 }`",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nconst createMember = ({ email, address = {} }) => {\n  const validEmail = /.+\@.+..+/.test(email);\n  if (!validEmail) throw new Error(\"Valid email pls\");\n\n  return {\n    email,\n    address: address ? address : null,\n  };\n};\n\nconst member = createMember({ email: \"my@email.com\" });\nconsole.log(member);\n```\n *A*: ``{ email: \"my@email.com\", address: null }``\n *B*: ``{ email: \"my@email.com\" }``\n *C*: ``{ email: \"my@email.com\", address: {} }``\n *D*: ``{ email: \"my@email.com\", address: undefined }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Значением по умолчанию для `address` является пустой объект `{}`. Когда мы устанавливаем переменную `member` равной объекту, возвращаемому функцией `createMember`, мы не передаем значение для адреса, что означает, что значение адреса является пустым объектом по умолчанию `{}`. Пустой объект является истинным значением, что означает, что условие `address ? address : null` условно возвращает `true`. Значением адреса является пустой объект `{}`.",
      "correct": "C"
    },
    {
      "title": "Что будет на выходе?",
      "code": "```javascript\nlet randomValue = { name: \"Lydia\" };\nrandomValue = 23;\n\nif (!typeof randomValue === \"string\") {\n  console.log(\"It's not a string!\");\n} else {\n  console.log(\"Yay it's a string!\");\n}\n```\n *A*: ``It's not a string!``\n *B*: ``Yay it's a string!``\n *C*: ``TypeError``\n *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Условие в операторе `if` проверяет, равно ли значение `!typeof randomValue` \"строке\". Оператор `!` преобразует значение в логическое значение. Если значение истинно, возвращаемое значение будет \"ложным\", если значение ложным, возвращаемое значение будет \"истинным\". В этом случае возвращаемое значение `typeof randomValue` является истинным значением `\"number\"`, что означает, что значение `!typeof randomValue` является логическим значением `false`.  `!typeof randomValue === \"string\"` всегда возвращает `false`, поскольку на самом деле мы проверяем `false === \"string\"`. Поскольку условие вернуло `false`, запускается блок кода оператора `else`, и в журнал заносится сообщение `Yay it's a string!`.",
      "correct": "B"
    }
  ],
  "en": [
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\n\nsayHi();\n```\n- *A*: ``Lydia` and `undefined``\n- *B*: ``Lydia` and `ReferenceError``\n- *C*: ``ReferenceError` and `21``\n- *D*: ``undefined` and `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Withinthe function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.  Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get _initialized_. They are not accessible before the line we declare (initialize) them. This is called the \"temporal dead zone\". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n```\n- *A*: ``0 1 2` and `0 1 2``\n- *B*: ``0 1 2` and `3 3 3``\n- *C*: ``3 3 3` and `0 1 2``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.  In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius \* 2;\n  },\n  perimeter: () => 2 \* Math.PI \* this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());\n```\n- *A*: ``20` and `62.83185307179586``\n- *B*: ``20` and `NaN``\n- *C*: ``20` and `63``\n- *D*: ``NaN` and `63``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.  With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).  Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 \* Math.PI`, results in `NaN`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n+true;\n!\"Lydia\";\n```\n- *A*: ``1` and `false``\n- *B*: ``false` and `NaN``\n- *C*: ``false` and `false``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`.  The string `'Lydia'` is a truthy value. What we're actually asking, is \"Is this truthy value falsy?\". This returns `false`.",
      "correct": "A"
    },
    {
      "title": "Which one is true?",
      "code": "```javascript\nconst bird = {\n  size: \"small\",\n};\n\nconst mouse = {\n  name: \"Mickey\",\n  small: true,\n};\n```\n- *A*: ``mouse.bird.size` is not valid`\n- *B*: ``mouse[bird.size]` is not valid`\n- *C*: ``mouse[bird[\"size\"]]` is not valid`\n- *D*: `All of them are valid`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not _type_ them as strings, they are always converted into strings under the hood.  JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement.  `mouse[bird.size]`: First it evaluates `bird.size`, which is `\"small\"`. `mouse[\"small\"]` returns `true`  However, with dot notation, this doesn't happen. `mouse` does not have a key called `bird`, which means that `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we're actually asking `undefined.size`. This isn't valid, and will throw an error similar to `Cannot read property \"size\" of undefined`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet c = { greeting: \"Hey!\" };\nlet d;\n\nd = c;\nc.greeting = \"Hello\";\nconsole.log(d.greeting);\n```\n- *A*: ``Hello``\n- *B*: ``Hey!``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In JavaScript, all objects interact by _reference_ when setting them equal to each other.  First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.  https://i.imgur.com/ko5k0fs.png When you change one object, you change all of them.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);\n```\n- *A*: ``true` `false` `true``\n- *B*: ``false` `false` `true``\n- *C*: ``true` `false` `false``\n- *D*: ``false` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.  When we use the `==` operator (Equality operator), it only checks whether it has the same _value_. They both have the value of `3`, so it returns `true`.  However, when we use the `===` operator (Strict equality operator), both value _and_ type should be the same. It's not: `new Number()` is not a number, it's an **object**. Both return `false.`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = \"green\" } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: \"purple\" });\nconsole.log(freddie.colorChange(\"orange\"));\n```\n- *A*: ``orange``\n- *B*: ``purple``\n- *C*: ``green``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);\n```\n- *A*: ``{}``\n- *B*: ``ReferenceError: greetign is not defined``\n- *C*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as:  1. `global.greetign = {}` in Node.js 2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers. 3. `self.greetign` in web workers. 4. `globalThis.greetign` in all environments.  In order to avoid this, we can use `\"use strict\"`. This makes sure that you have declared a variable before setting it equal to anything.",
      "correct": "A"
    },
    {
      "title": "What happens when we do this?",
      "code": "```javascript\nfunction bark() {\n  console.log(\"Woof!\");\n}\n\nbark.animal = \"dog\";\n```\n- *A*: `Nothing, this is totally fine!`\n- *B*: ``SyntaxError`. You cannot add properties to a function this way.`\n- *C*: ``\"Woof\"` gets logged.`\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)  A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst member = new Person(\"Lydia\", \"Hallie\");\nPerson.getFullName = function () {\n  return `${this.firstName} ${this.lastName}`;\n};\n\nconsole.log(member.getFullName());\n```\n- *A*: ``TypeError``\n- *B*: ``SyntaxError``\n- *C*: ``Lydia Hallie``\n- *D*: ``undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In JavaScript, functions are objects, and therefore, the method `getFullName` gets added to the constructor function object itself. For that reason, we can call `Person.getFullName()`, but `member.getFullName` throws a `TypeError`.  If you want a method to be available to all object instances, you have to add it to the prototype property:  ```js Person.prototype.getFullName = function () {   return `${this.firstName} ${this.lastName}`; }; ```",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst lydia = new Person(\"Lydia\", \"Hallie\");\nconst sarah = Person(\"Sarah\", \"Smith\");\n\nconsole.log(lydia);\nconsole.log(sarah);\n```\n- *A*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `undefined``\n- *B*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `Person {firstName: \"Sarah\", lastName: \"Smith\"}``\n- *C*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `{}``\n- *D*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` and `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we create. However, if you don't add `new`, `this` refers to the **global object**!  We said that `this.firstName` equals `\"Sarah\"` and `this.lastName` equals `\"Smith\"`. What we actually did, is defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`, since we don't return a value from the `Person` function.",
      "correct": "A"
    },
    {
      "title": "What are the three phases of event propagation?",
      "code": "- *A*: `Target > Capturing > Bubbling`\n- *B*: `Bubbling > Target > Capturing`\n- *C*: `Target > Bubbling > Capturing`\n- *D*: `Capturing > Target > Bubbling`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "During the **capturing** phase, the event goes through the ancestor elements down to the target element. It then reaches the **target** element, and **bubbling** begins.  https://i.imgur.com/N18oRgd.png",
      "correct": "D"
    },
    {
      "title": "All object have prototypes.",
      "code": "- *A*: `true`\n- *B*: `false`",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "All objects have prototypes, except for the **base object**. The base object is the object created by the user, or an object that is created using the `new` keyword. The base object has access to some methods and properties, such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction sum(a, b) {\n  return a + b;\n}\n\nsum(1, \"2\");\n```\n- *A*: ``NaN``\n- *B*: ``TypeError``\n- *C*: ``\"12\"``\n- *D*: ``3``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "JavaScript is a **dynamically typed language**: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called _implicit type coercion_. **Coercion** is converting from one type into another.  In this example, JavaScript converts the number `1` into a string, in order for the function to make sense and return a value. During the addition of a numeric type (`1`) and a string type (`'2'`), the number is treated as a string. We can concatenate strings like `\"Hello\" + \"World\"`, so what's happening here is `\"1\" + \"2\"` which returns `\"12\"`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet number = 0;\nconsole.log(number++);\nconsole.log(++number);\nconsole.log(number);\n```\n- *A*: ``1` `1` `2``\n- *B*: ``1` `2` `2``\n- *C*: ``0` `2` `2``\n- *D*: ``0` `1` `2``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The **postfix** unary operator `++`:  1. Returns the value (this returns `0`) 2. Increments the value (number is now `1`)  The **prefix** unary operator `++`:  1. Increments the value (number is now `2`) 2. Returns the value (this returns `2`)  This returns `0 2 2`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getPersonInfo(one, two, three) {\n  console.log(one);\n  console.log(two);\n  console.log(three);\n}\n\nconst person = \"Lydia\";\nconst age = 21;\n\ngetPersonInfo`${person} is ${age} years old`;\n```\n- *A*: ``\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]``\n- *B*: ``[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21``\n- *C*: ``\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction checkAge(data) {\n  if (data === { age: 18 }) {\n    console.log(\"You are an adult!\");\n  } else if (data == { age: 18 }) {\n    console.log(\"You are still an adult.\");\n  } else {\n    console.log(`Hmm.. You don't have an age I guess`);\n  }\n}\n\ncheckAge({ age: 18 });\n```\n- *A*: ``You are an adult!``\n- *B*: ``You are still an adult.``\n- *C*: ``Hmm.. You don't have an age I guess``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "When testing equality, primitives are compared by their _value_, while objects are compared by their _reference_. JavaScript checks if the objects have a reference to the same location in memory.  The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.  This is why both `{ age: 18 } === { age: 18 }` and `{ age: 18 } == { age: 18 }` return `false`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getAge(...args) {\n  console.log(typeof args);\n}\n\ngetAge(21);\n```\n- *A*: ``\"number\"``\n- *B*: ``\"array\"``\n- *C*: ``\"object\"``\n- *D*: ``\"NaN\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The rest parameter (`...args`) lets us \"collect\" all remaining arguments into an array. An array is an object, so `typeof args` returns `\"object\"`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getAge() {\n  \"use strict\";\n  age = 21;\n  console.log(age);\n}\n\ngetAge();\n```\n- *A*: ``21``\n- *B*: ``undefined``\n- *C*: ``ReferenceError``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With `\"use strict\"`, you can make sure that you don't accidentally declare global variables. We never declared the variable `age`, and since we use `\"use strict\"`, it will throw a reference error. If we didn't use `\"use strict\"`, it would have worked, since the property `age` would have gotten added to the global object.",
      "correct": "C"
    },
    {
      "title": "What's the value of `sum`?",
      "code": "```javascript\nconst sum = eval(\"10*10+5\");\n```\n- *A*: ``105``\n- *B*: ``\"105\"``\n- *C*: ``TypeError``\n- *D*: ``\"10*10+5\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`eval` evaluates code that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is `10 \* 10 + 5`. This returns the number `105`.",
      "correct": "A"
    },
    {
      "title": "How long is cool_secret accessible?",
      "code": "```javascript\nsessionStorage.setItem(\"cool_secret\", 123);\n```\n- *A*: `Forever, the data doesn't get lost.`\n- *B*: `When the user closes the tab.`\n- *C*: `When the user closes the entire browser, not only the tab.`\n- *D*: `When the user shuts off their computer.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The data stored in `sessionStorage` is removed after closing the _tab_.  If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is invoked.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nvar num = 8;\nvar num = 10;\n\nconsole.log(num);\n```\n- *A*: ``8``\n- *B*: ``10``\n- *C*: ``SyntaxError``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `var` keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.  You cannot do this with `let` or `const` since they're block-scoped and therefore can't be redeclared.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst obj = { 1: \"a\", 2: \"b\", 3: \"c\" };\nconst set = new Set([1, 2, 3, 4, 5]);\n\nobj.hasOwnProperty(\"1\");\nobj.hasOwnProperty(1);\nset.has(\"1\");\nset.has(1);\n```\n- *A*: ``false` `true` `false` `true``\n- *B*: ``false` `true` `true` `true``\n- *C*: ``true` `true` `false` `true``\n- *D*: ``true` `true` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why `obj.hasOwnProperty('1')` also returns true.  It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the numeric type `1`, `set.has(1)` returns `true`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst obj = { a: \"one\", b: \"two\", a: \"three\" };\nconsole.log(obj);\n```\n- *A*: ``{ a: \"one\", b: \"two\" }``\n- *B*: ``{ b: \"two\", a: \"three\" }``\n- *C*: ``{ a: \"three\", b: \"two\" }``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.",
      "correct": "C"
    },
    {
      "title": "The JavaScript global execution context creates two things for you: the global object, and the 'this' keyword.",
      "code": "- *A*: `true`\n- *B*: `false`\n- *C*: `it depends`",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "The base execution context is the global execution context: it's what's accessible everywhere in your code.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfor (let i = 1; i < 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```\n- *A*: ``1` `2``\n- *B*: ``1` `2` `3``\n- *C*: ``1` `2` `4``\n- *D*: ``1` `3` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `continue` statement skips an iteration if a certain condition returns `true`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nString.prototype.giveLydiaPizza = () => {\n  return \"Just give Lydia pizza already!\";\n};\n\nconst name = \"Lydia\";\n\nconsole.log(name.giveLydiaPizza());\n```\n- *A*: ``\"Just give Lydia pizza already!\"``\n- *B*: ``TypeError: not a function``\n- *C*: ``SyntaxError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`String` is a built-in constructor, that we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst a = {};\nconst b = { key: \"b\" };\nconst c = { key: \"c\" };\n\na[b] = 123;\na[c] = 456;\n\nconsole.log(a[b]);\n```\n- *A*: ``123``\n- *B*: ``456``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Object keys are automatically converted into strings. We are trying to set an object as a key to object `a`, with the value of `123`.  However, when we stringify an object, it becomes `\"[object Object]\"`. So what we are saying here, is that `a[\"[object Object]\"] = 123`. Then, we can try to do the same again. `c` is another object that we are implicitly stringifying. So then, `a[\"[object Object]\"] = 456`.  Then, we log `a[b]`, which is actually `a[\"[object Object]\"]`. We just set that to `456`, so it returns `456`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst foo = () => console.log(\"First\");\nconst bar = () => setTimeout(() => console.log(\"Second\"));\nconst baz = () => console.log(\"Third\");\n\nbar();\nfoo();\nbaz();\n```\n- *A*: ``First` `Second` `Third``\n- *B*: ``First` `Third` `Second``\n- *C*: ``Second` `First` `Third``\n- *D*: ``Second` `Third` `First``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We have a `setTimeout` function and invoked it first. Yet, it was logged last.  This is because in browsers, we don't just have the runtime engine, we also have something called a `WebAPI`. The `WebAPI` gives us the `setTimeout` function to start with, and for example the DOM.  After the _callback_ is pushed to the WebAPI, the `setTimeout` function itself (but not the callback!) is popped off the stack.  https://i.imgur.com/X5wsHOg.png  Now, `foo` gets invoked, and `\"First\"` is being logged.`foo` is popped off the stack, and `baz` gets invoked. `\"Third\"` gets logged. The WebAPI can't just add stuff to the stack whenever it's ready. Instead, it pushes the callback function to something called the _queue_. This is where an event loop starts to work. An **event loop** looks at the stack and task queue. If the stack is empty, it takes the first thing on the queue and pushes it onto the stack.`bar` gets invoked, `\"Second\"` gets logged, and it's popped off the stack.",
      "correct": "B"
    },
    {
      "title": "What is the event.target when clicking the button?",
      "code": "```javascript\n<div onclick=\"console.log('first div')\">\n  <div onclick=\"console.log('second div')\">\n    <button onclick=\"console.log('button')\">Click!</button>\n  </div>\n</div>\n```\n- *A*: `Outer `div``\n- *B*: `Inner `div``\n- *C*: ``button``\n- *D*: `An array of all nested elements.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The deepest nested element that caused the event is the target of the event. You can stop bubbling by `event.stopPropagation`",
      "correct": "C"
    },
    {
      "title": "When you click the paragraph, what's the logged output?",
      "code": "```javascript\n<div onclick=\"console.log('div')\">\n  <p onclick=\"console.log('p')\">Click here!</p>\n</div>\n```\n- *A*: ``p` `div``\n- *B*: ``div` `p``\n- *C*: ``p``\n- *D*: ``div``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "If we click `p`, we see two logs: `p` and `div`. During event propagation, there are 3 phases: capturing, targeting, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set `useCapture` to `true`). It goes from the deepest nested element outwards.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = { name: \"Lydia\" };\n\nfunction sayHi(age) {\n  return `${this.name} is ${age}`;\n}\n\nconsole.log(sayHi.call(person, 21));\nconsole.log(sayHi.bind(person, 21));\n```\n- *A*: ``undefined is 21` `Lydia is 21``\n- *B*: ``function` `function``\n- *C*: ``Lydia is 21` `Lydia is 21``\n- *D*: ``Lydia is 21` `function``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With both, we can pass the object to which we want the `this` keyword to refer to. However, `.call` is also _executed immediately_!  `.bind.` returns a _copy_ of the function, but with a bound context! It is not executed immediately.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction sayHi() {\n  return (() => 0)();\n}\n\nconsole.log(typeof sayHi());\n```\n- *A*: ``\"object\"``\n- *B*: ``\"number\"``\n- *C*: ``\"function\"``\n- *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `sayHi` function returns the returned value of the immediately invoked function expression (IIFE). This function returned `0`, which is type `\"number\"`. FYI: `typeof` can return the following list of values: `undefined`, `boolean`, `number`, `bigint`, `string`, `symbol`, `function` and `object`. Note that `typeof null` returns `\"object\"`.",
      "correct": "B"
    },
    {
      "title": "Which of these values are falsy?",
      "code": "```javascript\n0;\nnew Number(0);\n(\"\");\n(\" \");\nnew Boolean(false);\nundefined;\n```\n- *A*: ``0`, `''`, `undefined``\n- *B*: ``0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined``\n- *C*: ``0`, `''`, `new Boolean(false)`, `undefined``\n- *D*: `All of them are falsy`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "There are 8 falsy values:  - `undefined` - `null` - `NaN` - `false` - `''` (empty string) - `0` - `-0` - `0n` (BigInt(0))  Function constructors, like `new Number` and `new Boolean` are truthy.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(typeof typeof 1);\n```\n- *A*: ``\"number\"``\n- *B*: ``\"string\"``\n- *C*: ``\"object\"``\n- *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`typeof 1` returns `\"number\"`. `typeof \"number\"` returns `\"string\"`",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst numbers = [1, 2, 3];\nnumbers[10] = 11;\nconsole.log(numbers);\n```\n- *A*: ``[1, 2, 3, null x 7, 11]``\n- *B*: ``[1, 2, 3, 11]``\n- *C*: ``[1, 2, 3, empty x 7, 11]``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called \"empty slots\". These actually have the value of `undefined`, but you will see something like:  `[1, 2, 3, empty x 7, 11]`  depending on where you run it (it's different for every browser, node, etc.)",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n(() => {\n  let x, y;\n  try {\n    throw new Error();\n  } catch (x) {\n    (x = 1), (y = 2);\n    console.log(x);\n  }\n  console.log(x);\n  console.log(y);\n})();\n```\n- *A*: ``1` `undefined` `2``\n- *B*: ``undefined` `undefined` `undefined``\n- *C*: ``1` `1` `2``\n- *D*: ``1` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments. This variable `x` is block-scoped.  Later, we set this block-scoped variable equal to `1`, and set the value of the variable `y`. Now, we log the block-scoped variable `x`, which is equal to `1`.  Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. When we want to `console.log(x)` outside of the `catch` block, it returns `undefined`, and `y` returns `2`.",
      "correct": "A"
    },
    {
      "title": "Everything in JavaScript is either a...",
      "code": "- *A*: `primitive or object`\n- *B*: `function or object`\n- *C*: `trick question! only objects`\n- *D*: `number or object`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "JavaScript only has primitive types and objects.  Primitive types are `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, and `symbol`.  What differentiates a primitive from an object is that primitives do not have any properties or methods; however, you'll note that `'foo'.toUpperCase()` evaluates to `'FOO'` and does not result in a `TypeError`. This is because when you try to access a property or method on a primitive like a string, JavaScript will implicitly wrap the primitive type using one of the wrapper classes, i.e. `String`, and then immediately discard the wrapper after the expression evaluates. All primitives except for `null` and `undefined` exhibit this behavior.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n[\n  [0, 1],\n  [2, 3],\n].reduce(\n  (acc, cur) => {\n    return acc.concat(cur);\n  },\n  [1, 2]\n);\n```\n- *A*: ``[0, 1, 2, 3, 1, 2]``\n- *B*: ``[6, 1, 2]``\n- *C*: ``[1, 2, 0, 1, 2, 3]``\n- *D*: ``[1, 2, 6]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During the first round, `acc` is `[1,2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`.  Then, `[1, 2, 0, 1]` is `acc` and `[2, 3]` is `cur`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n!!null;\n!!\"\";\n!!1;\n```\n- *A*: ``false` `true` `false``\n- *B*: ``false` `false` `true``\n- *C*: ``false` `true` `true``\n- *D*: ``true` `true` `false``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`null` is falsy. `!null` returns `true`. `!true` returns `false`.  `\"\"` is falsy. `!\"\"` returns `true`. `!true` returns `false`.  `1` is truthy. `!1` returns `false`. `!false` returns `true`.",
      "correct": "B"
    },
    {
      "title": "What does the `setInterval` method return in the browser?",
      "code": "```javascript\nsetInterval(() => console.log(\"Hi\"), 1000);\n```\n- *A*: `a unique id`\n- *B*: `the amount of milliseconds specified`\n- *C*: `the passed function`\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function.",
      "correct": "A"
    },
    {
      "title": "What does this return?",
      "code": "```javascript\n[...\"Lydia\"];\n```\n- *A*: ``[\"L\", \"y\", \"d\", \"i\", \"a\"]``\n- *B*: ``[\"Lydia\"]``\n- *C*: ``[[], \"Lydia\"]``\n- *D*: ``[[\"L\", \"y\", \"d\", \"i\", \"a\"]]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "A string is an iterable. The spread operator maps every character of an iterable to one element.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction* generator(i) {\n  yield i;\n  yield i * 2;\n}\n\nconst gen = generator(10);\n\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\n```\n- *A*: ``[0, 10], [10, 20]``\n- *B*: ``20, 20``\n- *C*: ``10, 20``\n- *D*: ``0, 10 and 10, 20``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Regular functions cannot be stopped mid-way after invocation. However, a generator function can be \"stopped\" midway, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword, the function yields the value specified after it. Note that the generator function in that case doesn’t _return_ the value, it _yields_ the value.  First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first `yield` keyword: it yields the value of `i`. The generator is now \"paused\", and `10` gets logged.  Then, we invoke the function again with the `next()` method. It starts to continue where it stopped previously, still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to `10`, so it returns `10 * 2`, which is `20`. This results in `10, 20`.",
      "correct": "C"
    },
    {
      "title": "What does this return?",
      "code": "```javascript\nconst firstPromise = new Promise((res, rej) => {\n  setTimeout(res, 500, \"one\");\n});\n\nconst secondPromise = new Promise((res, rej) => {\n  setTimeout(res, 100, \"two\");\n});\n\nPromise.race([firstPromise, secondPromise]).then((res) => console.log(res));\n```\n- *A*: ``\"one\"``\n- *B*: ``\"two\"``\n- *C*: ``\"two\" \"one\"``\n- *D*: ``\"one\" \"two\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "When we pass multiple promises to the `Promise.race` method, it resolves/rejects the _first_ promise that resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`), and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the value of `'two'`. `res` now holds the value of `'two'`, which gets logged.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet person = { name: \"Lydia\" };\nconst members = [person];\nperson = null;\n\nconsole.log(members);\n```\n- *A*: ``null``\n- *B*: ``[null]``\n- *C*: ``[{}]``\n- *D*: ``[{ name: \"Lydia\" }]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "First, we declare a variable `person` with the value of an object that has a `name` property.  https://i.imgur.com/TML1MbS.png  Then, we declare a variable called `members`. We set the first element of that array equal to the value of the `person` variable. Objects interact by _reference_ when setting them equal to each other. When you assign a reference from one variable to another, you make a _copy_ of that reference. (note that they don't have the _same_ reference!)  https://i.imgur.com/FSG5K3F.png Then, we set the variable `person` equal to `null`.  We are only modifying the value of the `person` variable, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in `members` still holds its reference to the original object. When we log the `members` array, the first element still holds the value of the object, which gets logged.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nfor (const item in person) {\n  console.log(item);\n}\n```\n- *A*: ``{ name: \"Lydia\" }, { age: 21 }``\n- *B*: ``\"name\", \"age\"``\n- *C*: ``\"Lydia\", 21``\n- *D*: ``[\"name\", \"Lydia\"], [\"age\", 21]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object keys are strings (if they're not a Symbol). On every loop, we set the value of `item` equal to the current key it’s iterating over. First, `item` is equal to `name`, and gets logged. Then, `item` is equal to `age`, which gets logged.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(3 + 4 + \"5\");\n```\n- *A*: ``\"345\"``\n- *B*: ``\"75\"``\n- *C*: ``12``\n- *D*: ``\"12\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the _same_ precedence. We only have one type of operator: `+`. For addition, the associativity is left-to-right.  `3 + 4` gets evaluated first. This results in the number `7`.  `7 + '5'` results in `\"75\"` because of coercion. JavaScript converts the number `7` into a string, see question 15. We can concatenate two strings using the `+`operator. `\"7\" + \"5\"` results in `\"75\"`.",
      "correct": "B"
    },
    {
      "title": "What's the value of `num`?",
      "code": "```javascript\nconst num = parseInt(\"7\*6\", 10);\n```\n- *A*: ``42``\n- *B*: ``\"42\"``\n- *C*: ``7``\n- *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Only the first number in the string is returned. Based on the _radix_ (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), the `parseInt` checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters.  `\*` is not a valid number. It only parses `\"7\"` into the decimal `7`. `num` now holds the value of `7`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n[1, 2, 3].map((num) => {\n  if (typeof num === \"number\") return;\n  return num \* 2;\n});\n```\n- *A*: ``[]``\n- *B*: ``[null, null, null]``\n- *C*: ``[undefined, undefined, undefined]``\n- *D*: ``[ 3 x empty ]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "When mapping over the array, the value of `num` is equal to the element it’s currently looping over. In this case, the elements are numbers, so the condition of the if statement `typeof num === \"number\"` returns `true`. The map function creates a new array and inserts the values returned from the function.  However, we don’t return a value. When we don’t return a value from the function, the function returns `undefined`. For every element in the array, the function block gets called, so for each element we return `undefined`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getInfo(member, year) {\n  member.name = \"Lydia\";\n  year = \"1998\";\n}\n\nconst person = { name: \"Sarah\" };\nconst birthYear = \"1997\";\n\ngetInfo(person, birthYear);\n\nconsole.log(person, birthYear);\n```\n- *A*: ``{ name: \"Lydia\" }, \"1997\"``\n- *B*: ``{ name: \"Sarah\" }, \"1998\"``\n- *C*: ``{ name: \"Lydia\" }, \"1998\"``\n- *D*: ``{ name: \"Sarah\" }, \"1997\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Arguments are passed by _value_, unless their value is an object, then they're passed by _reference_. `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a _copy_ of that value is created (see question 46).  The variable `birthYear` has a reference to the value `\"1997\"`. The argument `year` also has a reference to the value `\"1997\"`, but it's not the same value as `birthYear` has a reference to. When we update the value of `year` by setting `year` equal to `\"1998\"`, we are only updating the value of `year`. `birthYear` is still equal to `\"1997\"`.  The value of `person` is an object. The argument `member` has a (copied) reference to the _same_ object. When we modify a property of the object `member` has a reference to, the value of `person` will also be modified, since they both have a reference to the same object. `person`'s `name` property is now equal to the value `\"Lydia\"`",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction greeting() {\n  throw \"Hello world!\";\n}\n\nfunction sayHi() {\n  try {\n    const data = greeting();\n    console.log(\"It worked!\", data);\n  } catch (e) {\n    console.log(\"Oh no an error:\", e);\n  }\n}\n\nsayHi();\n```\n- *A*: ``It worked! Hello world!``\n- *B*: ``Oh no an error: undefined``\n- *C*: ``SyntaxError: can only throw Error objects``\n- *D*: ``Oh no an error: Hello world!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a *string*, a *number*, a *boolean* or an *object*. In this case, our exception is the string `'Hello world!'`.  With the `catch` statement, we can specify what to do if an exception is thrown in the `try` block. An exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results in `'Oh an error: Hello world!'`.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction Car() {\n  this.make = \"Lamborghini\";\n  return { make: \"Maserati\" };\n}\n\nconst myCar = new Car();\nconsole.log(myCar.make);\n```\n- *A*: ``\"Lamborghini\"``\n- *B*: ``\"Maserati\"``\n- *C*: ``ReferenceError``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "When a constructor function is called with the `new` keyword, it creates an object and sets the `this` keyword to refer to that object. By default, if the constructor function doesn't explicitly return anything, it will return the newly created object.  In this case, the constructor function `Car` explicitly returns a new object with `make` set to `\"Maserati\"`, which overrides the default behavior. Therefore, when `new Car()` is called, the _returned_ object is assigned to `myCar`, resulting in the output being `\"Maserati\"` when `myCar.make` is accessed.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n(() => {\n  let x = (y = 10);\n})();\n\nconsole.log(typeof x);\nconsole.log(typeof y);\n```\n- *A*: ``\"undefined\", \"number\"``\n- *B*: ``\"number\", \"number\"``\n- *C*: ``\"object\", \"number\"``\n- *D*: ``\"number\", \"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`let x = (y = 10);` is actually shorthand for:  ```javascript y = 10; let x = y; ```  When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in the browser, `global` in Node). In a browser, `window.y` is now equal to `10`.  Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with the `let` keyword are _block scoped_, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we are trying to access `x` outside of the block it's declared in. This means that `x` is not defined. Values who haven't been assigned a value or declared are of type `\"undefined\"`. `console.log(typeof x)` returns `\"undefined\"`.  However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in our code. `y` is defined, and holds a value of type `\"number\"`. `console.log(typeof y)` returns `\"number\"`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nDog.prototype.bark = function () {\n  console.log(`Woof I am ${this.name}`);\n};\n\nconst pet = new Dog(\"Mara\");\n\npet.bark();\n\ndelete Dog.prototype.bark;\n\npet.bark();\n```\n- *A*: ``\"Woof I am Mara\"`, `TypeError``\n- *B*: ``\"Woof I am Mara\"`, `\"Woof I am Mara\"``\n- *C*: ``\"Woof I am Mara\"`, `undefined``\n- *D*: ``TypeError`, `TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We can delete properties from objects using the `delete` keyword, also on the prototype. By deleting a property on the prototype, it is not available anymore in the prototype chain. In this case, the `bark` function is not available anymore on the prototype after `delete Dog.prototype.bark`, yet we still try to access it.  When we try to invoke something that is not a function, a `TypeError` is thrown. In this case `TypeError: pet.bark is not a function`, since `pet.bark` is `undefined`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst set = new Set([1, 1, 2, 3, 4]);\n\nconsole.log(set);\n```\n- *A*: ``[1, 1, 2, 3, 4]``\n- *B*: ``[1, 2, 3, 4]``\n- *C*: ``{1, 1, 2, 3, 4}``\n- *D*: ``{1, 2, 3, 4}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `Set` object is a collection of _unique_ values: a value can only occur once in a set.  We passed the iterable `[1, 1, 2, 3, 4]` with a duplicate value `1`. Since we cannot have two of the same values in a set, one of them is removed. This results in `{1, 2, 3, 4}`.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n// counter.js\nlet counter = 10;\nexport default counter;\n```\n- *A*: ``10``\n- *B*: ``11``\n- *C*: ``Error``\n- *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "An imported module is _read-only_: you cannot modify the imported module. Only the module that exports them can change its value.  When we try to increment the value of `myCounter`, it throws an error: `myCounter` is read-only and cannot be modified.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst name = \"Lydia\";\nage = 21;\n\nconsole.log(delete name);\nconsole.log(delete age);\n```\n- *A*: ``false`, `true``\n- *B*: ``\"Lydia\"`, `21``\n- *C*: ``true`, `true``\n- *D*: ``undefined`, `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `delete` operator returns a boolean value: `true` on a successful deletion, else it'll return `false`. However, variables declared with the `var`, `const`, or `let` keywords cannot be deleted using the `delete` operator.  The `name` variable was declared with a `const` keyword, so its deletion is not successful: `false` is returned. When we set `age` equal to `21`, we actually added a property called `age` to the global object. You can successfully delete properties from objects this way, also the global object, so `delete age` returns `true`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst [y] = numbers;\n\nconsole.log(y);\n```\n- *A*: ``[[1, 2, 3, 4, 5]]``\n- *B*: ``[1, 2, 3, 4, 5]``\n- *C*: ``1``\n- *D*: ``[1]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We can unpack values from arrays or properties from objects through destructuring. For example:  ```javascript [a, b] = [1, 2]; ```  https://i.imgur.com/ADFpVop.png The value of `a` is now `1`, and the value of `b` is now `2`. What we actually did in the question, is:  ```javascript [y] = [1, 2, 3, 4, 5]; ```  https://i.imgur.com/NzGkMNk.png This means that the value of `y` is equal to the first value in the array, which is the number `1`. When we log `y`, `1` is returned.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst user = { name: \"Lydia\", age: 21 };\nconst admin = { admin: true, ...user };\n\nconsole.log(admin);\n```\n- *A*: ``{ admin: true, user: { name: \"Lydia\", age: 21 } }``\n- *B*: ``{ admin: true, name: \"Lydia\", age: 21 }``\n- *C*: ``{ admin: true, user: [\"Lydia\", 21] }``\n- *D*: ``{ admin: true }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "It's possible to combine objects using the spread operator `...`. It lets you create copies of the key/value pairs of one object, and add them to another object. In this case, we create copies of the `user` object, and add them to the `admin` object. The `admin` object now contains the copied key/value pairs, which results in `{ admin: true, name: \"Lydia\", age: 21 }`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = { name: \"Lydia\" };\n\nObject.defineProperty(person, \"age\", { value: 21 });\n\nconsole.log(person);\nconsole.log(Object.keys(person));\n```\n- *A*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]``\n- *B*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\"]``\n- *C*: ``{ name: \"Lydia\"}`, `[\"name\", \"age\"]``\n- *D*: ``{ name: \"Lydia\"}`, `[\"age\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the `defineProperty` method, they are by default _not enumerable_. The `Object.keys` method returns all _enumerable_ property names from an object, in this case only `\"name\"`.  Properties added using the `defineProperty` method are immutable by default. You can override this behavior using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives you a lot more control over the properties you're adding to an object.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst settings = {\n  username: \"lydiahallie\",\n  level: 19,\n  health: 90,\n};\n\nconst data = JSON.stringify(settings, [\"level\", \"health\"]);\nconsole.log(data);\n```\n- *A*: ``\"{\"level\":19, \"health\":90}\"``\n- *B*: ``\"{\"username\": \"lydiahallie\"}\"``\n- *C*: ``\"[\"level\", \"health\"]\"``\n- *D*: ``\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The second argument of `JSON.stringify` is the _replacer_. The replacer can either be a function or an array, and lets you control what and how the values should be stringified.  If the replacer is an _array_, only the property names included in the array will be added to the JSON string. In this case, only the properties with the names `\"level\"` and `\"health\"` are included, `\"username\"` is excluded. `data` is now equal to `\"{\"level\":19, \"health\":90}\"`.  If the replacer is a _function_, this function gets called on every property in the object you're stringifying. The value returned from this function will be the value of the property when it's added to the JSON string. If the value is `undefined`, this property is excluded from the JSON string.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet num = 10;\n\nconst increaseNumber = () => num++;\nconst increasePassedNumber = (number) => number++;\n\nconst num1 = increaseNumber();\nconst num2 = increasePassedNumber(num1);\n\nconsole.log(num1);\nconsole.log(num2);\n```\n- *A*: ``10`, `10``\n- *B*: ``10`, `11``\n- *C*: ``11`, `11``\n- *D*: ``11`, `12``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The unary operator `++` _first returns_ the value of the operand, _then increments_ the value of the operand. The value of `num1` is `10`, since the `increaseNumber` function first returns the value of `num`, which is `10`, and only increments the value of `num` afterward.  `num2` is `10`, since we passed `num1` to the `increasePassedNumber`. `number` is equal to `10`(the value of `num1`). Again, the unary operator `++` _first returns_ the value of the operand, _then increments_ the value of the operand. The value of `number` is `10`, so `num2` is equal to `10`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst value = { number: 10 };\n\nconst multiply = (x = { ...value }) => {\n  console.log((x.number \*= 2));\n};\n\nmultiply();\nmultiply();\nmultiply(value);\nmultiply(value);\n```\n- *A*: ``20`, `40`, `80`, `160``\n- *B*: ``20`, `40`, `20`, `40``\n- *C*: ``20`, `20`, `20`, `40``\n- *D*: ``NaN`, `NaN`, `20`, `40``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In ES6, we can initialize parameters with a default value. The value of the parameter will be the default value, if no other value has been passed to the function, or if the value of the parameter is `\"undefined\"`. In this case, we spread the properties of the `value` object into a new object, so `x` has the default value of `{ number: 10 }`.  The default argument is evaluated at _call time_! Every time we call the function, a _new_ object is created. We invoke the `multiply` function the first two times without passing a value: `x` has the default value of `{ number: 10 }`. We then log the multiplied value of that number, which is `20`.  The third time we invoke multiply, we do pass an argument: the object called `value`. The `\*=` operator is actually shorthand for `x.number = x.number \* 2`: we modify the value of `x.number`, and log the multiplied value `20`.  The fourth time, we pass the `value` object again. `x.number` was previously modified to `20`, so `x.number \*= 2` logs `40`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n[1, 2, 3, 4].reduce((x, y) => console.log(x, y));\n```\n- *A*: ``1` `2` and `3` `3` and `6` `4``\n- *B*: ``1` `2` and `2` `3` and `3` `4``\n- *C*: ``1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined``\n- *D*: ``1` `2` and `undefined` `3` and `undefined` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The first argument that the `reduce` method receives is the _accumulator_, `x` in this case. The second argument is the _current value_, `y`. With the reduce method, we execute a callback function on every element in the array, which could ultimately result in one single value.  In this example, we are not returning any values, we are simply logging the values of the accumulator and the current value.  The value of the accumulator is equal to the previously returned value of the callback function. If you don't pass the optional `initialValue` argument to the `reduce` method, the accumulator is equal to the first element on the first call.  On the first call, the accumulator (`x`) is `1`, and the current value (`y`) is `2`. We don't return from the callback function, we log the accumulator, and the current values: `1` and `2` get logged.  If you don't return a value from a function, it returns `undefined`. On the next call, the accumulator is `undefined`, and the current value is `3`. `undefined` and `3` get logged.  On the fourth call, we again don't return from the callback function. The accumulator is again `undefined`, and the current value is `4`. `undefined` and `4` get logged.",
      "correct": "D"
    },
    {
      "title": "With which constructor can we successfully extend the `Dog` class?",
      "code": "```javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n};\n\nclass Labrador extends Dog {\n  // 1\n  constructor(name, size) {\n    this.size = size;\n  }\n  // 2\n  constructor(name, size) {\n    super(name);\n    this.size = size;\n  }\n  // 3\n  constructor(size) {\n    super(name);\n    this.size = size;\n  }\n  // 4\n  constructor(name, size) {\n    this.name = name;\n    this.size = size;\n  }\n\n};\n```\n- *A*: `1`\n- *B*: `2`\n- *C*: `3`\n- *D*: `4`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In a derived class, you cannot access the `this` keyword before calling `super`. If you try to do that, it will throw a ReferenceError: 1 and 4 would throw a reference error.  With the `super` keyword, we call that parent class's constructor with the given arguments. The parent's constructor receives the `name` argument, so we need to pass `name` to `super`.  The `Labrador` class receives two arguments, `name` since it extends `Dog`, and `size` as an extra property on the `Labrador` class. They both need to be passed to the constructor function on `Labrador`, which is done correctly using constructor 2.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n// index.js\nconsole.log(\"running index.js\");\nimport { sum } from \"./sum.js\";\nconsole.log(sum(1, 2));\n\n// sum.js\nconsole.log(\"running sum.js\");\nexport const sum = (a, b) => a + b;\n```\n- *A*: ``running index.js`, `running sum.js`, `3``\n- *B*: ``running sum.js`, `running index.js`, `3``\n- *C*: ``running sum.js`, `3`, `running index.js``\n- *D*: ``running index.js`, `undefined`, `running sum.js``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `import` keyword, all imported modules are _pre-parsed_. This means that the imported modules get run _first_, and the code in the file that imports the module gets executed _after_.  This is a difference between `require()` in CommonJS and `import`! With `require()`, you can load dependencies on demand while the code is being run. If we had used `require` instead of `import`, `running index.js`, `running sum.js`, `3` would have been logged to the console.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(Number(2) === Number(2));\nconsole.log(Boolean(false) === Boolean(false));\nconsole.log(Symbol(\"foo\") === Symbol(\"foo\"));\n```\n- *A*: ``true`, `true`, `false``\n- *B*: ``false`, `true`, `false``\n- *C*: ``true`, `false`, `true``\n- *D*: ``true`, `true`, `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Every Symbol is entirely unique. The purpose of the argument passed to the Symbol is to give the Symbol a description. The value of the Symbol is not dependent on the passed argument. As we test equality, we are creating two entirely new symbols: the first `Symbol('foo')`, and the second `Symbol('foo')`. These two values are unique and not equal to each other, `Symbol('foo') === Symbol('foo')` returns `false`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\nconsole.log(name.padStart(13));\nconsole.log(name.padStart(2));\n```\n- *A*: ``\"Lydia Hallie\"`, `\"Lydia Hallie\"``\n- *B*: ``\" Lydia Hallie\"`, `\" Lydia Hallie\"` (`\"[13x whitespace]Lydia Hallie\"`, `\"[2x whitespace]Lydia Hallie\"`)`\n- *C*: ``\" Lydia Hallie\"`, `\"Lydia Hallie\"` (`\"[1x whitespace]Lydia Hallie\"`, `\"Lydia Hallie\"`)`\n- *D*: ``\"Lydia Hallie\"`, `\"Lyd\"`,`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `padStart` method, we can add padding to the beginning of a string. The value passed to this method is the _total_ length of the string together with the padding. The string `\"Lydia Hallie\"` has a length of `12`. `name.padStart(13)` inserts 1 space at the start of the string, because 12 + 1 is 13.  If the argument passed to the `padStart` method is smaller than the length of the array, no padding will be added.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(\"🥑\" + \"💻\");\n```\n- *A*: ``\"🥑💻\"``\n- *B*: ``257548``\n- *C*: `A string containing their code points`\n- *D*: `Error`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `+` operator, you can concatenate strings. In this case, we are concatenating the string `\"🥑\"` with the string `\"💻\"`, resulting in `\"🥑💻\"`.",
      "correct": "A"
    },
    {
      "title": "How can we log the values that are commented out after the console.log statement?",
      "code": "```javascript\nfunction\* startGame() {\n  const answer = yield \"Do you love JavaScript?\";\n  if (answer !== \"Yes\") {\n    return \"Oh wow... Guess we're done here\";\n  }\n  return \"JavaScript loves you back ❤️\";\n}\n\nconst game = startGame();\nconsole.log(/\* 1 \*/); // Do you love JavaScript?\nconsole.log(/\* 2 \*/); // JavaScript loves you back ❤️\n```\n- *A*: ``game.next(\"Yes\").value` and `game.next().value``\n- *B*: ``game.next.value(\"Yes\")` and `game.next.value()``\n- *C*: ``game.next().value` and `game.next(\"Yes\").value``\n- *D*: ``game.next.value()` and `game.next.value(\"Yes\")``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "A generator function \"pauses\" its execution when it sees the `yield` keyword. First, we have to let the function yield the string \"Do you love JavaScript?\", which can be done by calling `game.next().value`.  Every line is executed, until it finds the first `yield` keyword. There is a `yield` keyword on the first line within the function: the execution stops with the first yield! _This means that the variable `answer` is not defined yet!_  When we call `game.next(\"Yes\").value`, the previous `yield` is replaced with the value of the parameters passed to the `next()` function, `\"Yes\"` in this case. The value of the variable `answer` is now equal to `\"Yes\"`. The condition of the if-statement returns `false`, and `JavaScript loves you back ❤️` gets logged.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(String.raw`Hello\\nworld`);\n```\n- *A*: ``Hello world!``\n- *B*: ``Hello` <br />&nbsp; &nbsp; &nbsp;`world``\n- *C*: ``Hello\\nworld``\n- *D*: ``Hello\\n` <br /> &nbsp; &nbsp; &nbsp;`world``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`String.raw` returns a string where the escapes (`\\n`, `\\v`, `\\t` etc.) are ignored! Backslashes can be an issue since you could end up with something like:  `` const path = `C:\\Documents\\Projects\\table.html` ``  Which would result in:  `\"C:DocumentsProjects able.html\"`  With `String.raw`, it would simply ignore the escape and print:  `C:\\Documents\\Projects\\table.html`  In this case, the string is `Hello\\nworld`, which gets logged.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nasync function getData() {\n  return await Promise.resolve(\"I made it!\");\n}\n\nconst data = getData();\nconsole.log(data);\n```\n- *A*: ``\"I made it!\"``\n- *B*: ``Promise {<resolved>: \"I made it!\"}``\n- *C*: ``Promise {<pending>}``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "An async function always returns a promise. The `await` still has to wait for the promise to resolve: a pending promise gets returned when we call `getData()` in order to set `data` equal to it.  If we wanted to get access to the resolved value `\"I made it\"`, we could have used the `.then()` method on `data`:  `data.then(res => console.log(res))`  This would've logged `\"I made it!\"`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction addToList(item, list) {\n  return list.push(item);\n}\n\nconst result = addToList(\"apple\", [\"banana\"]);\nconsole.log(result);\n```\n- *A*: ``['apple', 'banana']``\n- *B*: ``2``\n- *C*: ``true``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `.push()` method returns the _length_ of the new array! Previously, the array contained one element (the string `\"banana\"`) and had a length of `1`. After adding the string `\"apple\"` to the array, the array contains two elements, and has a length of `2`. This gets returned from the `addToList` function.  The `push` method modifies the original array. If you wanted to return the _array_ from the function rather than the _length of the array_, you should have returned `list` after pushing `item` to it.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst box = { x: 10, y: 20 };\n\nObject.freeze(box);\n\nconst shape = box;\nshape.x = 100;\n\nconsole.log(shape);\n```\n- *A*: ``{ x: 100, y: 20 }``\n- *B*: ``{ x: 10, y: 20 }``\n- *C*: ``{ x: 100 }``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`Object.freeze` makes it impossible to add, remove, or modify properties of an object (unless the property's value is another object).  When we create the variable `shape` and set it equal to the frozen object `box`, `shape` also refers to a frozen object. You can check whether an object is frozen by using `Object.isFrozen`. In this case, `Object.isFrozen(shape)` would return true, since the variable `shape` has a reference to a frozen object.  Since `shape` is frozen, and since the value of `x` is not an object, we cannot modify the property `x`. `x` is still equal to `10`, and `{ x: 10, y: 20 }` gets logged.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst { firstName: myName } = { firstName: \"Lydia\" };\n\nconsole.log(firstName);\n```\n- *A*: ``\"Lydia\"``\n- *B*: ``\"myName\"``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "By using [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax we can unpack values from arrays, or properties from objects, into distinct variables:  ```javascript const { firstName } = { firstName: \"Lydia\" }; // ES5 version: // var firstName = { firstName: 'Lydia' }.firstName;  console.log(firstName); // \"Lydia\" ```  Also, a property can be unpacked from an object and assigned to a variable with a different name than the object property:  ```javascript const { firstName: myName } = { firstName: \"Lydia\" }; // ES5 version: // var myName = { firstName: 'Lydia' }.firstName;  console.log(myName); // \"Lydia\" console.log(firstName); // Uncaught ReferenceError: firstName is not defined ```  Therefore, `firstName` does not exist as a variable, thus attempting to access its value will raise a `ReferenceError`.  **Note:** Be aware of the `global scope` properties:  ```javascript const { name: myName } = { name: \"Lydia\" };  console.log(myName); // \"lydia\" console.log(name); // \"\" ----- Browser e.g. Chrome console.log(name); // ReferenceError: name is not defined  ----- NodeJS ```  Whenever Javascript is unable to find a variable within the _current scope_, it climbs up the [Scope chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md) and searches for it and if it reaches the top-level scope, aka **Global scope**, and still doesn't find it, it will throw a `ReferenceError`.  - In **Browsers** such as _Chrome_, `name` is a _deprecated global scope property_. In this example, the code is running inside _global scope_ and there is no user-defined local variable for `name`, therefore it searches the predefined _variables/properties_ in the global scope which is in the case of browsers, it searches through `window` object and it will extract the [window.name](https://developer.mozilla.org/en-US/docs/Web/API/Window/name) value which is equal to an **empty string**.  - In **NodeJS**, there is no such property on the `global` object, thus attempting to access a non-existent variable will raise a [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined).",
      "correct": "D"
    },
    {
      "title": "Is this a pure function?",
      "code": "```javascript\nfunction sum(a, b) {\n  return a + b;\n}\n```\n- *A*: `Yes`\n- *B*: `No`",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "A pure function is a function that _always_ returns the same result, if the same arguments are passed.  The `sum` function always returns the same result. If we pass `1` and `2`, it will _always_ return `3` without side effects. If we pass `5` and `10`, it will _always_ return `15`, and so on. This is the definition of a pure function.",
      "correct": "A"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nconst add = () => {\n  const cache = {};\n  return (num) => {\n    if (num in cache) {\n      return `From cache! ${cache[num]}`;\n    } else {\n      const result = num + 10;\n      cache[num] = result;\n      return `Calculated! ${result}`;\n    }\n  };\n};\n\nconst addFunction = add();\nconsole.log(addFunction(10));\nconsole.log(addFunction(10));\nconsole.log(addFunction(5 \* 2));\n```\n- *A*: ``Calculated! 20` `Calculated! 20` `Calculated! 20``\n- *B*: ``Calculated! 20` `From cache! 20` `Calculated! 20``\n- *C*: ``Calculated! 20` `From cache! 20` `From cache! 20``\n- *D*: ``Calculated! 20` `From cache! 20` `Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `add` function is a _memoized_ function. With memoization, we can cache the results of a function in order to speed up its execution. In this case, we create a `cache` object that stores the previously returned values.  If we call the `addFunction` function again with the same argument, it first checks whether it has already gotten that value in its cache. If that's the case, the cache value will be returned, which saves execution time. Otherwise, if it's not cached, it will calculate the value and store it afterward.  We call the `addFunction` function three times with the same value: on the first invocation, the value of the function when `num` is equal to `10` isn't cached yet. The condition of the if-statement `num in cache` returns `false`, and the else block gets executed: `Calculated! 20` gets logged, and the value of the result gets added to the cache object. `cache` now looks like `{ 10: 20 }`.  The second time, the `cache` object contains the value that gets returned for `10`. The condition of the if-statement `num in cache` returns `true`, and `'From cache! 20'` gets logged.  The third time, we pass `5 \* 2` to the function which gets evaluated to `10`. The `cache` object contains the value that gets returned for `10`. The condition of the if-statement `num in cache` returns `true`, and `'From cache! 20'` gets logged.",
      "correct": "C"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nconst myLifeSummedUp = [\"☕\", \"💻\", \"🍷\", \"🍫\"];\n\nfor (let item in myLifeSummedUp) {\n  console.log(item);\n}\n\nfor (let item of myLifeSummedUp) {\n  console.log(item);\n}\n```\n- *A*: ``0` `1` `2` `3` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"``\n- *B*: ``\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"``\n- *C*: ``\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` and `0` `1` `2` `3``\n- *D*: ``0` `1` `2` `3` and `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With a _for-in_ loop, we can iterate over **enumerable** properties. In an array, the enumerable properties are the \"keys\" of array elements, which are actually their indexes. You could see an array as:  `{0: \"☕\", 1: \"💻\", 2: \"🍷\", 3: \"🍫\"}`  Where the keys are the enumerable properties. `0` `1` `2` `3` get logged.  With a _for-of_ loop, we can iterate over **iterables**. An array is an iterable. When we iterate over the array, the variable \"item\" is equal to the element it's currently iterating over, `\"☕\"` `\"💻\"` `\"🍷\"` `\"🍫\"` get logged.",
      "correct": "A"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nconst list = [1 + 2, 1 \* 2, 1 / 2];\nconsole.log(list);\n```\n- *A*: ``[\"1 + 2\", \"1 \* 2\", \"1 / 2\"]``\n- *B*: ``[\"12\", 2, 0.5]``\n- *C*: ``[3, 2, 0.5]``\n- *D*: ``[1, 1, 1]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Array elements can hold any value. Numbers, strings, objects, other arrays, null, boolean values, undefined, and other expressions such as dates, functions, and calculations.  The element will be equal to the returned value. `1 + 2` returns `3`, `1 \* 2` returns `2`, and `1 / 2` returns `0.5`.",
      "correct": "C"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nfunction sayHi(name) {\n  return `Hi there, ${name}`;\n}\n\nconsole.log(sayHi());\n```\n- *A*: ``Hi there,``\n- *B*: ``Hi there, undefined``\n- *C*: ``Hi there, null``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "By default, arguments have the value of `undefined`, unless a value has been passed to the function. In this case, we didn't pass a value for the `name` argument. `name` is equal to `undefined` which gets logged.  In ES6, we can overwrite this default `undefined` value with default parameters. For example:  `function sayHi(name = \"Lydia\") { ... }`  In this case, if we didn't pass a value or if we passed `undefined`, `name` would always be equal to the string `Lydia`",
      "correct": "B"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nvar status = \"😎\";\n\nsetTimeout(() => {\n  const status = \"😍\";\n\n  const data = {\n    status: \"🥑\",\n    getStatus() {\n      return this.status;\n    },\n  };\n\n  console.log(data.getStatus());\n  console.log(data.getStatus.call(this));\n}, 0);\n```\n- *A*: ``\"🥑\"` and `\"😍\"``\n- *B*: ``\"🥑\"` and `\"😎\"``\n- *C*: ``\"😍\"` and `\"😎\"``\n- *D*: ``\"😎\"` and `\"😎\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The value of the `this` keyword is dependent on where you use it. In a **method**, like the `getStatus` method, the `this` keyword refers to _the object that the method belongs to_. The method belongs to the `data` object, so `this` refers to the `data` object. When we log `this.status`, the `status` property on the `data` object gets logged, which is `\"🥑\"`.  With the `call` method, we can change the object to which the `this` keyword refers. In **functions**, the `this` keyword refers to the _the object that the function belongs to_. We declared the `setTimeout` function on the _global object_, so within the `setTimeout` function, the `this` keyword refers to the _global object_. On the global object, there is a variable called _status_ with the value of `\"😎\"`. When logging `this.status`, `\"😎\"` gets logged.",
      "correct": "B"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nlet city = person.city;\ncity = \"Amsterdam\";\n\nconsole.log(person);\n```\n- *A*: ``{ name: \"Lydia\", age: 21 }``\n- *B*: ``{ name: \"Lydia\", age: 21, city: \"Amsterdam\" }``\n- *C*: ``{ name: \"Lydia\", age: 21, city: undefined }``\n- *D*: ``\"Amsterdam\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We set the variable `city` equal to the value of the property called `city` on the `person` object. There is no property on this object called `city`, so the variable `city` has the value of `undefined`.  Note that we are _not_ referencing the `person` object itself! We simply set the variable `city` equal to the current value of the `city` property on the `person` object.  Then, we set `city` equal to the string `\"Amsterdam\"`. This doesn't change the person object: there is no reference to that object.  When logging the `person` object, the unmodified object gets returned.",
      "correct": "A"
    },
    {
      "title": "What is the output?",
      "code": "```javascript\nfunction checkAge(age) {\n  if (age < 18) {\n    const message = \"Sorry, you're too young.\";\n  } else {\n    const message = \"Yay! You're old enough!\";\n  }\n\n  return message;\n}\n\nconsole.log(checkAge(21));\n```\n- *A*: ``\"Sorry, you're too young.\"``\n- *B*: ``\"Yay! You're old enough!\"``\n- *C*: ``ReferenceError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Variables with the `const` and `let` keywords are _block-scoped_. A block is anything between curly brackets (`{ }`). In this case, the curly brackets of the if/else statements. You cannot reference a variable outside of the block it's declared in, a ReferenceError gets thrown.",
      "correct": "C"
    },
    {
      "title": "What kind of information would get logged?",
      "code": "```javascript\nfetch(\"https://www.website.com/api/user/1\")\n  .then((res) => res.json())\n  .then((res) => console.log(res));\n```\n- *A*: `The result of the `fetch` method.`\n- *B*: `The result of the second invocation of the `fetch` method.`\n- *C*: `The result of the callback in the previous `.then()`.`\n- *D*: `It would always be undefined.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The value of `res` in the second `.then` is equal to the returned value of the previous `.then`. You can keep chaining `.then`s like this, where the value is passed to the next handler.",
      "correct": "C"
    },
    {
      "title": "Which option is a way to set `hasName` equal to `true`, provided you cannot pass `true` as an argument?",
      "code": "```javascript\nfunction getName(name) {\n  const hasName = //\n}\n```\n- *A*: ``!!name``\n- *B*: ``name``\n- *C*: ``new Boolean(name)``\n- *D*: ``name.length``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With `!!name`, we determine whether the value of `name` is truthy or falsy. If the name is truthy, which we want to test for, `!name` returns `false`. `!false` (which is what `!!name` practically is) returns `true`.  By setting `hasName` equal to `name`, you set `hasName` equal to whatever value you passed to the `getName` function, not the boolean value `true`.  `new Boolean(true)` returns an object wrapper, not the boolean value itself.  `name.length` returns the length of the passed argument, not whether it's `true`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(\"I want pizza\"[0]);\n```\n- *A*: ``\"\"\"``\n- *B*: ``\"I\"``\n- *C*: ``SyntaxError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In order to get a character at a specific index of a string, you can use bracket notation. The first character in the string has index 0, and so on. In this case, we want to get the element with index 0, the character `\"I'`, which gets logged.  Note that this method is not supported in IE7 and below. In that case, use `.charAt()`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction sum(num1, num2 = num1) {\n  console.log(num1 + num2);\n}\n\nsum(10);\n```\n- *A*: ``NaN``\n- *B*: ``20``\n- *C*: ``ReferenceError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "You can set a default parameter's value equal to another parameter of the function, as long as they've been defined _before_ the default parameter. We pass the value `10` to the `sum` function. If the `sum` function only receives 1 argument, it means that the value for `num2` is not passed, and the value of `num1` is equal to the passed value `10` in this case. The default value of `num2` is the value of `num1`, which is `10`. `num1 + num2` returns `20`.  If you're trying to set a default parameter's value equal to a parameter that is defined _after_ (to the right), the parameter's value hasn't been initialized yet, which will throw an error.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\n// module.js\nexport default () => \"Hello world\";\nexport const name = \"Lydia\";\n\n// index.js\nimport \* as data from \"./module\";\n\nconsole.log(data);\n```\n- *A*: ``{ default: function default(), name: \"Lydia\" }``\n- *B*: ``{ default: function default() }``\n- *C*: ``{ default: \"Hello world\", name: \"Lydia\" }``\n- *D*: `Global object of `module.js``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `import \* as name` syntax, we import _all exports_ from the `module.js` file into the `index.js` file as a new object called `data` is created. In the `module.js` file, there are two exports: the default export, and a named export. The default export is a function that returns the string `\"Hello World\"`, and the named export is a variable called `name` which has the value of the string `\"Lydia\"`.  The `data` object has a `default` property for the default export, other properties have the names of the named exports and their corresponding values.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Person {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nconst member = new Person(\"John\");\nconsole.log(typeof member);\n```\n- *A*: ``\"class\"``\n- *B*: ``\"function\"``\n- *C*: ``\"object\"``\n- *D*: ``\"string\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Classes are syntactical sugar for function constructors. The equivalent of the `Person` class as a function constructor would be:  ```javascript function Person(name) {   this.name = name; } ```  Calling a function constructor with `new` results in the creation of an instance of `Person`, `typeof` keyword returns `\"object\"` for an instance. `typeof member` returns `\"object\"`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet newList = [1, 2, 3].push(4);\n\nconsole.log(newList.push(5));\n```\n- *A*: ``[1, 2, 3, 4, 5]``\n- *B*: ``[1, 2, 3, 5]``\n- *C*: ``[1, 2, 3, 4]``\n- *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `.push` method returns the _new length_ of the array, not the array itself! By setting `newList` equal to `[1, 2, 3].push(4)`, we set `newList` equal to the new length of the array: `4`.  Then, we try to use the `.push` method on `newList`. Since `newList` is the numerical value `4`, we cannot use the `.push` method: a TypeError is thrown.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction giveLydiaPizza() {\n  return \"Here is pizza!\";\n}\n\nconst giveLydiaChocolate = () =>\n  \"Here's chocolate... now go hit the gym already.\";\n\nconsole.log(giveLydiaPizza.prototype);\nconsole.log(giveLydiaChocolate.prototype);\n```\n- *A*: ``{ constructor: ...}` `{ constructor: ...}``\n- *B*: ``{}` `{ constructor: ...}``\n- *C*: ``{ constructor: ...}` `{}``\n- *D*: ``{ constructor: ...}` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Regular functions, such as the `giveLydiaPizza` function, have a `prototype` property, which is an object (prototype object) with a `constructor` property. Arrow functions however, such as the `giveLydiaChocolate` function, do not have this `prototype` property. `undefined` gets returned when trying to access the `prototype` property using `giveLydiaChocolate.prototype`.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nfor (const [x, y] of Object.entries(person)) {\n  console.log(x, y);\n}\n```\n- *A*: ``name` `Lydia` and `age` `21``\n- *B*: ``[\"name\", \"Lydia\"]` and `[\"age\", 21]``\n- *C*: ``[\"name\", \"age\"]` and `undefined``\n- *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`Object.entries(person)` returns an array of nested arrays, containing the keys and objects:  `[ [ 'name', 'Lydia' ], [ 'age', 21 ] ]`  Using the `for-of` loop, we can iterate over each element in the array, the subarrays in this case. We can destructure the subarrays instantly in the for-of loop, using `const [x, y]`. `x` is equal to the first element in the subarray, `y` is equal to the second element in the subarray.  The first subarray is `[ \"name\", \"Lydia\" ]`, with `x` equal to `\"name\"`, and `y` equal to `\"Lydia\"`, which get logged. The second subarray is `[ \"age\", 21 ]`, with `x` equal to `\"age\"`, and `y` equal to `21`, which get logged.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getItems(fruitList, ...args, favoriteFruit) {\n  return [...fruitList, ...args, favoriteFruit]\n}\n\ngetItems([\"banana\", \"apple\"], \"pear\", \"orange\")\n```\n- *A*: ``[\"banana\", \"apple\", \"pear\", \"orange\"]``\n- *B*: ``[[\"banana\", \"apple\"], \"pear\", \"orange\"]``\n- *C*: ``[\"banana\", \"apple\", [\"pear\"], \"orange\"]``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`...args` is a rest parameter. The rest parameter's value is an array containing all remaining arguments, **and can only be the last parameter**! In this example, the rest parameter was the second parameter. This is not possible, and will throw a syntax error.  ```javascript function getItems(fruitList, favoriteFruit, ...args) {   return [...fruitList, ...args, favoriteFruit]; }  getItems([\"banana\", \"apple\"], \"pear\", \"orange\"); ```  The above example works. This returns the array `[ 'banana', 'apple', 'orange', 'pear' ]`",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction nums(a, b) {\n  if (a > b) console.log(\"a is bigger\");\n  else console.log(\"b is bigger\");\n  return;\n  a + b;\n}\n\nconsole.log(nums(4, 2));\nconsole.log(nums(1, 2));\n```\n- *A*: ``a is bigger`, `6` and `b is bigger`, `3``\n- *B*: ``a is bigger`, `undefined` and `b is bigger`, `undefined``\n- *C*: ``undefined` and `undefined``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In JavaScript, we don't _have_ to write the semicolon (`;`) explicitly, however the JavaScript engine still adds them after statements. This is called **Automatic Semicolon Insertion**. A statement can for example be variables, or keywords like `throw`, `return`, `break`, etc.  Here, we wrote a `return` statement, and another value `a + b` on a _new line_. However, since it's a new line, the engine doesn't know that it's actually the value that we wanted to return. Instead, it automatically added a semicolon after `return`. You could see this as:  ```javascript return; a + b; ```  This means that `a + b` is never reached, since a function stops running after the `return` keyword. If no value gets returned, like here, the function returns `undefined`. Note that there is no automatic insertion after `if/else` statements!",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Person {\n  constructor() {\n    this.name = \"Lydia\";\n  }\n}\n\nPerson = class AnotherPerson {\n  constructor() {\n    this.name = \"Sarah\";\n  }\n};\n\nconst member = new Person();\nconsole.log(member.name);\n```\n- *A*: ``\"Lydia\"``\n- *B*: ``\"Sarah\"``\n- *C*: ``Error: cannot redeclare Person``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We can set classes equal to other classes/function constructors. In this case, we set `Person` equal to `AnotherPerson`. The name on this constructor is `Sarah`, so the name property on the new `Person` instance `member` is `\"Sarah\"`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst info = {\n  [Symbol(\"a\")]: \"b\",\n};\n\nconsole.log(info);\nconsole.log(Object.keys(info));\n```\n- *A*: ``{Symbol('a'): 'b'}` and `[\"{Symbol('a')\"]``\n- *B*: ``{}` and `[]``\n- *C*: ``{ a: \"b\" }` and `[\"a\"]``\n- *D*: ``{Symbol('a'): 'b'}` and `[]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "A Symbol is not _enumerable_. The Object.keys method returns all _enumerable_ key properties on an object. The Symbol won't be visible, and an empty array is returned. When logging the entire object, all properties will be visible, even non-enumerable ones.  This is one of the many qualities of a symbol: besides representing an entirely unique value (which prevents accidental name collision on objects, for example when working with 2 libraries that want to add properties to the same object), you can also \"hide\" properties on objects this way (although not entirely. You can still access symbols using the `Object.getOwnPropertySymbols()` method).",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst getList = ([x, ...y]) => [x, y]\nconst getUser = user => { name: user.name, age: user.age }\n\nconst list = [1, 2, 3, 4]\nconst user = { name: \"Lydia\", age: 21 }\n\nconsole.log(getList(list))\nconsole.log(getUser(user))\n```\n- *A*: ``[1, [2, 3, 4]]` and `SyntaxError``\n- *B*: ``[1, [2, 3, 4]]` and `{ name: \"Lydia\", age: 21 }``\n- *C*: ``[1, 2, 3, 4]` and `{ name: \"Lydia\", age: 21 }``\n- *D*: ``Error` and `{ name: \"Lydia\", age: 21 }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `getList` function receives an array as its argument. Between the parentheses of the `getList` function, we destructure this array right away. You could see this as:  `[x, ...y] = [1, 2, 3, 4]`  With the rest parameter `...y`, we put all \"remaining\" arguments in an array. The remaining arguments are `2`, `3` and `4` in this case. The value of `y` is an array, containing all the rest parameters. The value of `x` is equal to `1` in this case, so when we log `[x, y]`, `[1, [2, 3, 4]]` gets logged.  The `getUser` function receives an object. With arrow functions, we don't _have_ to write curly brackets if we just return one value. However, if you want to instantly return an _object_ from an arrow function, you have to write it between parentheses, otherwise everything between the two braces will be interpreted as a block statement. In this case the code between the braces is not a valid JavaScript code, so a `SyntaxError` gets thrown.  The following function would have returned an object:  `const getUser = user => ({ name: user.name, age: user.age })`",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst name = \"Lydia\";\n\nconsole.log(name());\n```\n- *A*: ``SyntaxError``\n- *B*: ``ReferenceError``\n- *C*: ``TypeError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The variable `name` holds the value of a string, which is not a function, and thus cannot be invoked.  TypeErrors get thrown when a value is not of the expected type. JavaScript expected `name` to be a function since we're trying to invoke it. It was a string however, so a TypeError gets thrown: name is not a function!  SyntaxErrors get thrown when you've written something that isn't valid JavaScript, for example when you've written the word `return` as `retrun`. ReferenceErrors get thrown when JavaScript isn't able to find a reference to a value that you're trying to access.",
      "correct": "C"
    },
    {
      "title": "What's the value of output?",
      "code": "```javascript\n// 🎉✨ This is my 100th question! ✨🎉\n\nconst output = `${[] && \"Im\"}possible!\nYou should${\"\" && `n't`} see a therapist after so much JavaScript lol`;\n```\n- *A*: ``possible! You should see a therapist after so much JavaScript lol``\n- *B*: ``Impossible! You should see a therapist after so much JavaScript lol``\n- *C*: ``possible! You shouldn't see a therapist after so much JavaScript lol``\n- *D*: ``Impossible! You shouldn't see a therapist after so much JavaScript lol``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`[]` is a truthy value. With the `&&` operator, the right-hand value will be returned if the left-hand value is a truthy value. In this case, the left-hand value `[]` is a truthy value, so `\"Im'` gets returned.  `\"\"` is a falsy value. If the left-hand value is falsy, nothing gets returned. `n't` doesn't get returned.",
      "correct": "B"
    },
    {
      "title": "What's the value of output?",
      "code": "```javascript\nconst one = false || {} || null;\nconst two = null || false || \"\";\nconst three = [] || 0 || true;\n\nconsole.log(one, two, three);\n```\n- *A*: ``false` `null` `[]``\n- *B*: ``null` `\"\"` `true``\n- *C*: ``{}` `\"\"` `[]``\n- *D*: ``null` `null` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `||` operator, we can return the first truthy operand. If all values are falsy, the last operand gets returned.  `(false || {} || null)`: the empty object `{}` is a truthy value. This is the first (and only) truthy value, which gets returned. `one` is equal to `{}`.  `(null || false || \"\")`: all operands are falsy values. This means that the last operand, `\"\"` gets returned. `two` is equal to `\"\"`.  `([] || 0 || \"\")`: the empty array`[]` is a truthy value. This is the first truthy value, which gets returned. `three` is equal to `[]`.",
      "correct": "C"
    },
    {
      "title": "What's the value of output?",
      "code": "```javascript\nconst myPromise = () => Promise.resolve(\"I have resolved!\");\n\nfunction firstFunction() {\n  myPromise().then((res) => console.log(res));\n  console.log(\"second\");\n}\n\nasync function secondFunction() {\n  console.log(await myPromise());\n  console.log(\"second\");\n}\n\nfirstFunction();\nsecondFunction();\n```\n- *A*: ``I have resolved!`, `second` and `I have resolved!`, `second``\n- *B*: ``second`, `I have resolved!` and `second`, `I have resolved!``\n- *C*: ``I have resolved!`, `second` and `second`, `I have resolved!``\n- *D*: ``second`, `I have resolved!` and `I have resolved!`, `second``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With a promise, we basically say _I want to execute this function, but I'll put it aside for now while it's running since this might take a while. Only when a certain value is resolved (or rejected), and when the call stack is empty, I want to use this value._  We can get this value with both `.then` and the `await` keywords in an `async` function. Although we can get a promise's value with both `.then` and `await`, they work a bit differently.  In the `firstFunction`, we (sort of) put the myPromise function aside while it was running, but continued running the other code, which is `console.log('second')` in this case. Then, the function resolved with the string `I have resolved`, which then got logged after it saw that the callstack was empty.  With the await keyword in `secondFunction`, we literally pause the execution of an async function until the value has been resolved before moving to the next line.  This means that it waited for the `myPromise` to resolve with the value `I have resolved`, and only once that happened, we moved to the next line: `second` got logged.",
      "correct": "D"
    },
    {
      "title": "What's the value of output?",
      "code": "```javascript\nconst set = new Set();\n\nset.add(1);\nset.add(\"Lydia\");\nset.add({ name: \"Lydia\" });\n\nfor (let item of set) {\n  console.log(item + 2);\n}\n```\n- *A*: ``3`, `NaN`, `NaN``\n- *B*: ``3`, `7`, `NaN``\n- *C*: ``3`, `Lydia2`, `[object Object]2``\n- *D*: ``\"12\"`, `Lydia2`, `[object Object]2``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `+` operator is not only used for adding numerical values, but we can also use it to concatenate strings. Whenever the JavaScript engine sees that one or more values are not a number, it coerces the number into a string.  The first one is `1`, which is a numerical value. `1 + 2` returns the number 3.  However, the second one is a string `\"Lydia\"`. `\"Lydia\"` is a string and `2` is a number: `2` gets coerced into a string. `\"Lydia\"` and `\"2\"` get concatenated, which results in the string `\"Lydia2\"`.  `{ name: \"Lydia\" }` is an object. Neither a number nor an object is a string, so it stringifies both. Whenever we stringify a regular object, it becomes `\"[object Object]\"`. `\"[object Object]\"` concatenated with `\"2\"` becomes `\"[object Object]2\"`.",
      "correct": "C"
    },
    {
      "title": "What's its value?",
      "code": "```javascript\nPromise.resolve(5);\n```\n- *A*: ``5``\n- *B*: ``Promise {<pending>: 5}``\n- *C*: ``Promise {<fulfilled>: 5}``\n- *D*: ``Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We can pass any type of value we want to `Promise.resolve`, either a promise or a non-promise. The method itself returns a promise with the resolved value (`<fulfilled>`). If you pass a regular function, it'll be a resolved promise with a regular value. If you pass a promise, it'll be a resolved promise with the resolved value of that passed promise.  In this case, we just passed the numerical value `5`. It returns a resolved promise with the value `5`.",
      "correct": "C"
    },
    {
      "title": "What's its value?",
      "code": "```javascript\nfunction compareMembers(person1, person2 = person) {\n  if (person1 !== person2) {\n    console.log(\"Not the same!\");\n  } else {\n    console.log(\"They are the same!\");\n  }\n}\n\nconst person = { name: \"Lydia\" };\n\ncompareMembers(person);\n```\n- *A*: ``Not the same!``\n- *B*: ``They are the same!``\n- *C*: ``ReferenceError``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Objects are passed by reference. When we check objects for strict equality (`===`), we're comparing their references.  We set the default value for `person2` equal to the `person` object, and passed the `person` object as the value for `person1`.  This means that both values have a reference to the same spot in memory, thus they are equal.  The code block in the `else` statement gets run, and `They are the same!` gets logged.",
      "correct": "B"
    },
    {
      "title": "What's its value?",
      "code": "```javascript\nconst colorConfig = {\n  red: true,\n  blue: false,\n  green: true,\n  black: true,\n  yellow: false,\n};\n\nconst colors = [\"pink\", \"red\", \"blue\"];\n\nconsole.log(colorConfig.colors[1]);\n```\n- *A*: ``true``\n- *B*: ``false``\n- *C*: ``undefined``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In JavaScript, we have two ways to access properties on an object: bracket notation, or dot notation. In this example, we use dot notation (`colorConfig.colors`) instead of bracket notation (`colorConfig[\"colors\"]`).  With dot notation, JavaScript tries to find the property on the object with that exact name. In this example, JavaScript tries to find a property called `colors` on the `colorConfig` object. There is no property called `colors`, so this returns `undefined`. Then, we try to access the value of the first element by using `[1]`. We cannot do this on a value that's `undefined`, so it throws a `TypeError`: `Cannot read property '1' of undefined`.  JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement. If we would've used `colorConfig[colors[1]]`, it would have returned the value of the `red` property on the `colorConfig` object.",
      "correct": "D"
    },
    {
      "title": "What's its value?",
      "code": "```javascript\nconsole.log(\"❤️\" === \"❤️\");\n```\n- *A*: ``true``\n- *B*: ``false``",
      "answers": [
        "A",
        "B"
      ],
      "explanation": "Under the hood, emojis are unicodes. The unicodes for the heart emoji is `\"U+2764 U+FE0F\"`. These are always the same for the same emojis, so we're comparing two equal strings to each other, which returns true.",
      "correct": "A"
    },
    {
      "title": "Which of these methods modifies the original array?",
      "code": "```javascript\nconst emojis = [\"✨\", \"🥑\", \"😍\"];\n\nemojis.map((x) => x + \"✨\");\nemojis.filter((x) => x !== \"🥑\");\nemojis.find((x) => x !== \"🥑\");\nemojis.reduce((acc, cur) => acc + \"✨\");\nemojis.slice(1, 2, \"✨\");\nemojis.splice(1, 2, \"✨\");\n```\n- *A*: ``All of them``\n- *B*: ``map` `reduce` `slice` `splice``\n- *C*: ``map` `slice` `splice``\n- *D*: ``splice``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With `splice` method, we modify the original array by deleting, replacing or adding elements. In this case, we removed 2 items from index 1 (we removed `'🥑'` and `'😍'`) and added the ✨ emoji instead.  `map`, `filter` and `slice` return a new array, `find` returns an element, and `reduce` returns a reduced value.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst food = [\"🍕\", \"🍫\", \"🥑\", \"🍔\"];\nconst info = { favoriteFood: food[0] };\n\ninfo.favoriteFood = \"🍝\";\n\nconsole.log(food);\n```\n- *A*: ``['🍕', '🍫', '🥑', '🍔']``\n- *B*: ``['🍝', '🍫', '🥑', '🍔']``\n- *C*: ``['🍝', '🍕', '🍫', '🥑', '🍔']``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We set the value of the `favoriteFood` property on the `info` object equal to the string with the pizza emoji, `'🍕'`. A string is a primitive data type. In JavaScript, primitive data types don't interact by reference.  In JavaScript, primitive data types (everything that's not an object) interact by _value_. In this case, we set the value of the `favoriteFood` property on the `info` object equal to the value of the first element in the `food` array, the string with the pizza emoji in this case (`'🍕'`). A string is a primitive data type, and interact by value (see my [blogpost](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference) if you're interested in learning more)  Then, we change the value of the `favoriteFood` property on the `info` object. The `food` array hasn't changed, since the value of `favoriteFood` was merely a _copy_ of the value of the first element in the array, and doesn't have a reference to the same spot in memory as the element on `food[0]`. When we log food, it's still the original array, `['🍕', '🍫', '🥑', '🍔']`.",
      "correct": "A"
    },
    {
      "title": "What does this method do?",
      "code": "```javascript\nJSON.parse();\n```\n- *A*: `Parses JSON to a JavaScript value`\n- *B*: `Parses a JavaScript object to JSON`\n- *C*: `Parses any JavaScript value to JSON`\n- *D*: `Parses JSON to a JavaScript object only`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `JSON.parse()` method, we can parse JSON string to a JavaScript value.\n  ```javascript // Stringifying a number into valid JSON, then parsing the JSON string to a JavaScript value:\n const jsonNumber = JSON.stringify(4); // '4'\n JSON.parse(jsonNumber); // 4\n  // Stringifying an array value into valid JSON, then parsing the JSON string to a JavaScript value:\n const jsonArray = JSON.stringify([1, 2, 3]); // '[1, 2, 3]'\n JSON.parse(jsonArray); // [1, 2, 3]\n  // Stringifying an object  into valid JSON, then parsing the JSON string to a JavaScript value:\n const jsonArray = JSON.stringify({ name: \"Lydia\" }); // '{\"name\":\"Lydia\"}'\n JSON.parse(jsonArray); // { name: 'Lydia' }\n ```",
      "correct": "A"
    }, {
      "title": "What's the output?",
      "code": "```javascript\nlet name = \"Lydia\";\n\nfunction getName() {\n  console.log(name);\n  let name = \"Sarah\";\n}\n\ngetName();\n```\n- *A*: `Lydia`\n- *B*: `Sarah`\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Each function has its own _execution context_ (or _scope_). The `getName` function first looks within its own context (scope) to see if it contains the variable `name` we're trying to access. In this case, the `getName` function contains its own `name` variable: we declare the variable `name` with the `let` keyword, and with the value of `'Sarah'`.  Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get _initialized_. They are not accessible before the line we declare (initialize) them. This is called the \"temporal dead zone\". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.  If we wouldn't have declared the `name` variable within the `getName` function, the javascript engine would've looked down the _scope chain_. The outer scope has a variable called `name` with the value of `Lydia`. In that case, it would've logged `Lydia`.  ```javascript let name = \"Lydia\";  function getName() {   console.log(name); }  getName(); // Lydia ```",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction\* generatorOne() {\n  yield [\"a\", \"b\", \"c\"];\n}\n\nfunction\* generatorTwo() {\n  yield\* [\"a\", \"b\", \"c\"];\n}\n\nconst one = generatorOne();\nconst two = generatorTwo();\n\nconsole.log(one.next().value);\nconsole.log(two.next().value);\n```\n- *A*: ``a` and `a``\n- *B*: ``a` and `undefined``\n- *C*: ``['a', 'b', 'c']` and `a``\n- *D*: ``a` and `['a', 'b', 'c']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `yield` keyword, we `yield` values in a generator function. With the `yield\*` keyword, we can yield values from another generator function, or iterable object (for example an array).  In `generatorOne`, we yield the entire array `['a', 'b', 'c']` using the `yield` keyword. The value of `value` property on the object returned by the `next` method on `one` (`one.next().value`) is equal to the entire array `['a', 'b', 'c']`.  ```javascript console.log(one.next().value); // ['a', 'b', 'c'] console.log(one.next().value); // undefined ```  In `generatorTwo`, we use the `yield\*` keyword. This means that the first yielded value of `two`, is equal to the first yielded value in the iterator. The iterator is the array `['a', 'b', 'c']`. The first yielded value is `a`, so the first time we call `two.next().value`, `a` is returned.  ```javascript console.log(two.next().value); // 'a' console.log(two.next().value); // 'b' console.log(two.next().value); // 'c' console.log(two.next().value); // undefined ```",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconsole.log(`${((x) => x)(\"I love\")} to program`);\n```\n- *A*: ``I love to program``\n- *B*: ``undefined to program``\n- *C*: ``${(x => x)('I love') to program``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Expressions within template literals are evaluated first. This means that the string will contain the returned value of the expression, the immediately invoked function `(x => x)('I love')` in this case. We pass the value `'I love'` as an argument to the `x => x` arrow function. `x` is equal to `'I love'`, which gets returned. This results in `I love to program`.",
      "correct": "A"
    },
    {
      "title": "What will happen?",
      "code": "```javascript\nlet config = {\n  alert: setInterval(() => {\n    console.log(\"Alert!\");\n  }, 1000),\n};\n\nconfig = null;\n```\n- *A*: `The `setInterval` callback won't be invoked`\n- *B*: `The `setInterval` callback gets invoked once`\n- *C*: `The `setInterval` callback will still be called every second`\n- *D*: `We never invoked `config.alert()`, config is `null``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Normally when we set objects equal to `null`, those objects get _garbage collected_ as there is no reference anymore to that object. However, since the callback function within `setInterval` is an arrow function (thus bound to the `config` object), the callback function still holds a reference to the `config` object. As long as there is a reference, the object won't get garbage collected. Since this is an interval, setting `config` to `null` or `delete`-ing `config.alert` won't garbage-collect the interval, so the interval will still be called. It should be cleared with `clearInterval(config.alert)` to remove it from memory. Since it was not cleared, the `setInterval` callback function will still get invoked every 1000ms (1s).",
      "correct": "C"
    },
    {
      "title": "Which method(s) will return the value `'Hello world!'`?",
      "code": "```javascript\nconst myMap = new Map();\nconst myFunc = () => \"greeting\";\n\nmyMap.set(myFunc, \"Hello world!\");\n\n//1\nmyMap.get(\"greeting\");\n//2\nmyMap.get(myFunc);\n//3\nmyMap.get(() => \"greeting\");\n```\n- *A*: `1`\n- *B*: `2`\n- *C*: `2 and 3`\n- *D*: `All of them`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "When adding a key/value pair using the `set` method, the key will be the value of the first argument passed to the `set` function, and the value will be the second argument passed to the `set` function. The key is the _function_ `() => 'greeting'` in this case, and the value `'Hello world'`. `myMap` is now `{ () => 'greeting' => 'Hello world!' }`.  1 is wrong, since the key is not `'greeting'` but `() => 'greeting'`. 3 is wrong, since we're creating a new function by passing it as a parameter to the `get` method. Object interacts by _reference_. Functions are objects, which is why two functions are never strictly equal, even if they are identical: they have a reference to a different spot in memory.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nconst changeAge = (x = { ...person }) => (x.age += 1);\nconst changeAgeAndName = (x = { ...person }) => {\n  x.age += 1;\n  x.name = \"Sarah\";\n};\n\nchangeAge(person);\nchangeAgeAndName();\n\nconsole.log(person);\n```\n- *A*: ``{name: \"Sarah\", age: 22}``\n- *B*: ``{name: \"Sarah\", age: 23}``\n- *C*: ``{name: \"Lydia\", age: 22}``\n- *D*: ``{name: \"Lydia\", age: 23}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Both the `changeAge` and `changeAgeAndName` functions have a default parameter, namely a _newly_ created object `{ ...person }`. This object has copies of all the key/values in the `person` object.  First, we invoke the `changeAge` function and pass the `person` object as its argument. This function increases the value of the `age` property by 1. `person` is now `{ name: \"Lydia\", age: 22 }`.  Then, we invoke the `changeAgeAndName` function, however we don't pass a parameter. Instead, the value of `x` is equal to a _new_ object: `{ ...person }`. Since it's a new object, it doesn't affect the values of the properties on the `person` object. `person` is still equal to `{ name: \"Lydia\", age: 22 }`.",
      "correct": "C"
    },
    {
      "title": "Which of the following options will return `6`?",
      "code": "```javascript\nfunction sumValues(x, y, z) {\n  return x + y + z;\n}\n```\n- *A*: ``sumValues([...1, 2, 3])``\n- *B*: ``sumValues([...[1, 2, 3]])``\n- *C*: ``sumValues(...[1, 2, 3])``\n- *D*: ``sumValues([1, 2, 3])``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the spread operator `...`, we can _spread_ iterables to individual elements. The `sumValues` function receives three arguments: `x`, `y` and `z`. `...[1, 2, 3]` will result in `1, 2, 3`, which we pass to the `sumValues` function.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet num = 1;\nconst list = [\"🥳\", \"🤠\", \"🥰\", \"🤪\"];\n\nconsole.log(list[(num += 1)]);\n```\n- *A*: ``🤠``\n- *B*: ``🥰``\n- *C*: ``SyntaxError``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `+=` operator, we're incrementing the value of `num` by `1`. `num` had the initial value `1`, so `1 + 1` is `2`. The item on the second index in the `list` array is 🥰, `console.log(list[2])` prints 🥰.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = {\n  firstName: \"Lydia\",\n  lastName: \"Hallie\",\n  pet: {\n    name: \"Mara\",\n    breed: \"Dutch Tulip Hound\",\n  },\n  getFullName() {\n    return `${this.firstName} ${this.lastName}`;\n  },\n};\n\nconsole.log(person.pet?.name);\nconsole.log(person.pet?.family?.name);\nconsole.log(person.getFullName?.());\nconsole.log(member.getLastName?.());\n```\n- *A*: ``undefined` `undefined` `undefined` `undefined``\n- *B*: ``Mara` `undefined` `Lydia Hallie` `ReferenceError``\n- *C*: ``Mara` `null` `Lydia Hallie` `null``\n- *D*: ``null` `ReferenceError` `null` `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the optional chaining operator `?.`, we no longer have to explicitly check whether the deeper nested values are valid or not. If we're trying to access a property on an `undefined` or `null` value (_nullish_), the expression short-circuits and returns `undefined`.  `person.pet?.name`: `person` has a property named `pet`: `person.pet` is not nullish. It has a property called `name`, and returns `Mara`. `person.pet?.family?.name`: `person` has a property named `pet`: `person.pet` is not nullish. `pet` does _not_ have a property called `family`, `person.pet.family` is nullish. The expression returns `undefined`. `person.getFullName?.()`: `person` has a property named `getFullName`: `person.getFullName()` is not nullish and can get invoked, which returns `Lydia Hallie`. `member.getLastName?.()`: variable `member` is non-existent therefore a `ReferenceError` gets thrown!",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst groceries = [\"banana\", \"apple\", \"peanuts\"];\n\nif (groceries.indexOf(\"banana\")) {\n  console.log(\"We have to buy bananas!\");\n} else {\n  console.log(`We don't have to buy bananas!`);\n}\n```\n- *A*: `We have to buy bananas!`\n- *B*: `We don't have to buy bananas`\n- *C*: ``undefined``\n- *D*: ``1``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We passed the condition `groceries.indexOf(\"banana\")` to the if-statement. `groceries.indexOf(\"banana\")` returns `0`, which is a falsy value. Since the condition in the if-statement is falsy, the code in the `else` block runs, and `We don't have to buy bananas!` gets logged.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst config = {\n  languages: [],\n  set language(lang) {\n    return this.languages.push(lang);\n  },\n};\n\nconsole.log(config.language);\n```\n- *A*: ``function language(lang) { this.languages.push(lang }``\n- *B*: ``0``\n- *C*: ``[]``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `language` method is a `setter`. Setters don't hold an actual value, their purpose is to _modify_ properties. When calling a `setter` method, `undefined` gets returned.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\n\nconsole.log(!typeof name === \"object\");\nconsole.log(!typeof name === \"string\");\n```\n- *A*: ``false` `true``\n- *B*: ``true` `false``\n- *C*: ``false` `false``\n- *D*: ``true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`typeof name` returns `\"string\"`. The string `\"string\"` is a truthy value, so `!typeof name` returns the boolean value `false`. `false === \"object\"` and `false === \"string\"` both return`false`.  (If we wanted to check whether the type was (un)equal to a certain type, we should've written `!==` instead of `!typeof`)",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst add = (x) => (y) => (z) => {\n  console.log(x, y, z);\n  return x + y + z;\n};\n\nadd(4)(5)(6);\n```\n- *A*: ``4` `5` `6``\n- *B*: ``6` `5` `4``\n- *C*: ``4` `function` `function``\n- *D*: ``undefined` `undefined` `6``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `add` function returns an arrow function, which returns an arrow function, which returns an arrow function (still with me?). The first function receives an argument `x` with the value of `4`. We invoke the second function, which receives an argument `y` with the value `5`. Then we invoke the third function, which receives an argument `z` with the value `6`. When we're trying to access the value `x`, `y` and `z` within the last arrow function, the JS engine goes up the scope chain in order to find the values for `x` and `y` accordingly. This returns `4` `5` `6`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nasync function\* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield Promise.resolve(i);\n  }\n}\n\n(async () => {\n  const gen = range(1, 3);\n  for await (const item of gen) {\n    console.log(item);\n  }\n})();\n```\n- *A*: ``Promise {1}` `Promise {2}` `Promise {3}``\n- *B*: ``Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}``\n- *C*: ``1` `2` `3``\n- *D*: ``undefined` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The generator function `range` returns an async object with promises for each item in the range we pass: `Promise{1}`, `Promise{2}`, `Promise{3}`. We set the variable `gen` equal to the async object, after which we loop over it using a `for await ... of` loop. We set the variable `item` equal to the returned Promise values: first `Promise{1}`, then `Promise{2}`, then `Promise{3}`. Since we're _awaiting_ the value of `item`, the resolved promise, the resolved _values_ of the promises get returned: `1`, `2`, then `3`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst myFunc = ({ x, y, z }) => {\n  console.log(x, y, z);\n};\n\nmyFunc(1, 2, 3);\n```\n- *A*: ``1` `2` `3``\n- *B*: ``{1: 1}` `{2: 2}` `{3: 3}``\n- *C*: ``{ 1: undefined }` `undefined` `undefined``\n- *D*: ``undefined` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`myFunc` expects an object with properties `x`, `y` and `z` as its argument. Since we're only passing three separate numeric values (1, 2, 3) instead of one object with properties `x`, `y` and `z` ({x: 1, y: 2, z: 3}), `x`, `y` and `z` have their default value of `undefined`.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getFine(speed, amount) {\n  const formattedSpeed = new Intl.NumberFormat(\"en-US\", {\n    style: \"unit\",\n    unit: \"mile-per-hour\",\n  }).format(speed);\n\n  const formattedAmount = new Intl.NumberFormat(\"en-US\", {\n    style: \"currency\",\n    currency: \"USD\",\n  }).format(amount);\n\n  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`;\n}\n\nconsole.log(getFine(130, 300));\n```\n- *A*: `The driver drove 130 and has to pay 300`\n- *B*: `The driver drove 130 mph and has to pay \\$300.00`\n- *C*: `The driver drove undefined and has to pay undefined`\n- *D*: `The driver drove 130.00 and has to pay 300.00`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `Intl.NumberFormat` method, we can format numeric values to any locale. We format the numeric value `130` to the `en-US` locale as a `unit` in `mile-per-hour`, which results in `130 mph`. The numeric value `300` to the `en-US` locale as a `currency` in `USD` results in `$300.00`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst spookyItems = [\"👻\", \"🎃\", \"🕸\"];\n({ item: spookyItems[3] } = { item: \"💀\" });\n\nconsole.log(spookyItems);\n```\n- *A*: ``[\"👻\", \"🎃\", \"🕸\"]``\n- *B*: ``[\"👻\", \"🎃\", \"🕸\", \"💀\"]``\n- *C*: ``[\"👻\", \"🎃\", \"🕸\", { item: \"💀\" }]``\n- *D*: ``[\"👻\", \"🎃\", \"🕸\", \"[object Object]\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "By destructuring objects, we can unpack values from the right-hand object, and assign the unpacked value to the value of the same property name on the left-hand object. In this case, we're assigning the value \"💀\" to `spookyItems[3]`. This means that we're modifying the `spookyItems` array, we're adding the \"💀\" to it. When logging `spookyItems`, `[\"👻\", \"🎃\", \"🕸\", \"💀\"]` gets logged.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst name = \"Lydia Hallie\";\nconst age = 21;\n\nconsole.log(Number.isNaN(name));\nconsole.log(Number.isNaN(age));\n\nconsole.log(isNaN(name));\nconsole.log(isNaN(age));\n```\n- *A*: ``true` `false` `true` `false``\n- *B*: ``true` `false` `false` `false``\n- *C*: ``false` `false` `true` `false``\n- *D*: ``false` `true` `false` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `Number.isNaN` method, you can check if the value you pass is a _numeric value_ and equal to `NaN`. `name` is not a numeric value, so `Number.isNaN(name)` returns `false`. `age` is a numeric value, but is not equal to `NaN`, so `Number.isNaN(age)` returns `false`.  With the `isNaN` method, you can check if the value you pass is not a number. `name` is not a number, so `isNaN(name)` returns true. `age` is a number, so `isNaN(age)` returns `false`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst randomValue = 21;\n\nfunction getInfo() {\n  console.log(typeof randomValue);\n  const randomValue = \"Lydia Hallie\";\n}\n\ngetInfo();\n```\n- *A*: ``\"number\"``\n- *B*: ``\"string\"``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Variables declared with the `const` keyword are not referenceable before their initialization: this is called the _temporal dead zone_. In the `getInfo` function, the variable `randomValue` is scoped in the functional scope of `getInfo`. On the line where we want to log the value of `typeof randomValue`, the variable `randomValue` isn't initialized yet: a `ReferenceError` gets thrown! The engine didn't go down the scope chain since we declared the variable `randomValue` in the `getInfo` function.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst myPromise = Promise.resolve(\"Woah some cool data\");\n\n(async () => {\n  try {\n    console.log(await myPromise);\n  } catch {\n    throw new Error(`Oops didn't work`);\n  } finally {\n    console.log(\"Oh finally!\");\n  }\n})();\n```\n- *A*: ``Woah some cool data``\n- *B*: ``Oh finally!``\n- *C*: ``Woah some cool data` `Oh finally!``\n- *D*: ``Oops didn't work` `Oh finally!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In the `try` block, we're logging the awaited value of the `myPromise` variable: `\"Woah some cool data\"`. Since no errors were thrown in the `try` block, the code in the `catch` block doesn't run. The code in the `finally` block _always_ runs, `\"Oh finally!\"` gets logged.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst emojis = [\"🥑\", [\"✨\", \"✨\", [\"🍕\", \"🍕\"]]];\n\nconsole.log(emojis.flat(1));\n```\n- *A*: ``['🥑', ['✨', '✨', ['🍕', '🍕']]]``\n- *B*: ``['🥑', '✨', '✨', ['🍕', '🍕']]``\n- *C*: ``['🥑', ['✨', '✨', '🍕', '🍕']]``\n- *D*: ``['🥑', '✨', '✨', '🍕', '🍕']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the `flat` method, we can create a new, flattened array. The depth of the flattened array depends on the value that we pass. In this case, we passed the value `1` (which we didn't have to, that's the default value), meaning that only the arrays on the first depth will be concatenated. `['🥑']` and `['✨', '✨', ['🍕', '🍕']]` in this case. Concatenating these two arrays results in `['🥑', '✨', '✨', ['🍕', '🍕']]`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Counter {\n  constructor() {\n    this.count = 0;\n  }\n\n  increment() {\n    this.count++;\n  }\n}\n\nconst counterOne = new Counter();\ncounterOne.increment();\ncounterOne.increment();\n\nconst counterTwo = counterOne;\ncounterTwo.increment();\n\nconsole.log(counterOne.count);\n```\n- *A*: ``0``\n- *B*: ``1``\n- *C*: ``2``\n- *D*: ``3``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`counterOne` is an instance of the `Counter` class. The counter class contains a `count` property on its constructor, and an `increment` method. First, we invoked the `increment` method twice by calling `counterOne.increment()`. Currently, `counterOne.count` is `2`.  https://i.imgur.com/KxLlTm9.png Then, we create a new variable `counterTwo`, and set it equal to `counterOne`. Since objects interact by reference, we're just creating a new reference to the same spot in memory that `counterOne` points to. Since it has the same spot in memory, any changes made to the object that `counterTwo` has a reference to, also apply to `counterOne`. Currently, `counterTwo.count` is `2`.  We invoke `counterTwo.increment()`, which sets `count` to `3`. Then, we log the count on `counterOne`, which logs `3`.  https://i.imgur.com/BNBHXmc.png",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst myPromise = Promise.resolve(Promise.resolve(\"Promise\"));\n\nfunction funcOne() {\n  setTimeout(() => console.log(\"Timeout 1!\"), 0);\n  myPromise.then((res) => res).then((res) => console.log(`${res} 1!`));\n  console.log(\"Last line 1!\");\n}\n\nasync function funcTwo() {\n  const res = await myPromise;\n  console.log(`${res} 2!`);\n  setTimeout(() => console.log(\"Timeout 2!\"), 0);\n  console.log(\"Last line 2!\");\n}\n\nfuncOne();\nfuncTwo();\n```\n- *A*: ``Promise 1! Last line 1! Promise 2! Last line 2! Timeout 1! Timeout 2!``\n- *B*: ``Last line 1! Timeout 1! Promise 1! Last line 2! Promise2! Timeout 2! ``\n- *C*: ``Last line 1! Promise 2! Last line 2! Promise 1! Timeout 1! Timeout 2!``\n- *D*: ``Timeout 1! Promise 1! Last line 1! Promise 2! Timeout 2! Last line 2!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "First, we invoke `funcOne`. On the first line of `funcOne`, we call the _asynchronous_ `setTimeout` function, from which the callback is sent to the Web API. (see my article on the event loop <a href=\"https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif\">here</a>.)  Then we call the `myPromise` promise, which is an _asynchronous_ operation. Pay attention, that now only the first then clause was added to the microtask queue.  Both the promise and the timeout are asynchronous operations, the function keeps on running while it's busy completing the promise and handling the `setTimeout` callback. This means that `Last line 1!` gets logged first, since this is not an asynchonous operation.  Since the callstack is not empty yet, the `setTimeout` function and promise in `funcOne` cannot get added to the callstack yet.  In `funcTwo`, the variable `res` gets `Promise` because `Promise.resolve(Promise.resolve('Promise'))` is equivalent to `Promise.resolve('Promise')` since resolving a promise just resolves it's value. The `await` in this line stops the execution of the function until it receives the resolution of the promise and then keeps on running synchronously until completion, so `Promise 2!` and then `Last line 2!` are logged and the `setTimeout` is sent to the Web API. If the first then clause in `funcOne` had its own log statement, it would be printed before `Promise 2!`. Howewer, it executed silently and put the second then clause in microtask queue. So, the second clause will be printed after `Promise 2!`.  Then the call stack is empty. Promises are _microtasks_ so they are resolved first when the call stack is empty so `Promise 1!` gets to be logged.  Now, since `funcTwo` popped off the call stack, the call stack is empty. The callbacks waiting in the queue (`() => console.log(\"Timeout 1!\")` from `funcOne`, and `() => console.log(\"Timeout 2!\")` from `funcTwo`) get added to the call stack one by one. The first callback logs `Timeout 1!`, and gets popped off the stack. Then, the second callback logs `Timeout 2!`, and gets popped off the stack.",
      "correct": "C"
    },
    {
      "title": "How can we invoke `sum` in `sum.js` from `index.js?`",
      "code": "```javascript\n// sum.js\nexport default function sum(x) {\n  return x + x;\n}\n\n// index.js\nimport * as sum from \"./sum\";\n```\n- *A*: ``sum(4)``\n- *B*: ``sum.sum(4)``\n- *C*: ``sum.default(4)``\n- *D*: `Default aren't imported with `*`, only named exports`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With the asterisk `*`, we import all exported values from that file, both default and named. If we had the following file:  ```javascript // info.js export const name = \"Lydia\"; export const age = 21; export default \"I love JavaScript\";  // index.js import * as info from \"./info\"; console.log(info); ```  The following would get logged:  ```javascript {   default: \"I love JavaScript\",   name: \"Lydia\",   age: 21 } ```  For the `sum` example, it means that the imported value `sum` looks like this:  ```javascript { default: function sum(x) { return x + x } } ```  We can invoke this function, by calling `sum.default`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst handler = {\n  set: () => console.log(\"Added a new property!\"),\n  get: () => console.log(\"Accessed a property!\"),\n};\n\nconst person = new Proxy({}, handler);\n\nperson.name = \"Lydia\";\nperson.name;\n```\n- *A*: ``Added a new property!``\n- *B*: ``Accessed a property!``\n- *C*: ``Added a new property!` `Accessed a property!``\n- *D*: `Nothing gets logged`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With a Proxy object, we can add custom behavior to an object that we pass to it as the second argument. In this case, we pass the `handler` object which contains two properties: `set` and `get`. `set` gets invoked whenever we _set_ property values, and `get` gets invoked whenever we _get_ (access) property values.  The first argument is an empty object `{}`, which is the value of `person`. To this object, the custom behavior specified in the `handler` object gets added. If we add a property to the `person` object, `set` will get invoked. If we access a property on the `person` object, `get` gets invoked.  First, we added a new property `name` to the proxy object (`person.name = \"Lydia\"`). `set` gets invoked, and logs `\"Added a new property!\"`.  Then, we access a property value on the proxy object, and the `get` property on the handler object is invoked. `\"Accessed a property!\"` gets logged.",
      "correct": "C"
    },
    {
      "title": "Which of the following will modify the `person` object?",
      "code": "```javascript\nconst person = { name: \"Lydia Hallie\" };\n\nObject.seal(person);\n```\n- *A*: ``person.name = \"Evan Bacon\"``\n- *B*: ``person.age = 21``\n- *C*: ``delete person.name``\n- *D*: ``Object.assign(person, { age: 21 })``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "With `Object.seal` we can prevent new properties from being _added_, or existing properties to be _removed_.  However, you can still modify the value of existing properties.",
      "correct": "A"
    },
    {
      "title": "Which of the following will modify the `person` object?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  address: {\n    street: \"100 Main St\",\n  },\n};\n\nObject.freeze(person);\n```\n- *A*: ``person.name = \"Evan Bacon\"``\n- *B*: ``delete person.address``\n- *C*: ``person.address.street = \"101 Main St\"``\n- *D*: ``person.pet = { name: \"Mara\" }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `Object.freeze` method _freezes_ an object. No properties can be added, modified, or removed.  However, it only _shallowly_ freezes the object, meaning that only _direct_ properties on the object are frozen. If the property is another object, like `address` in this case, the properties on that object aren't frozen, and can be modified.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst add = (x) => x + x;\n\nfunction myFunc(num = 2, value = add(num)) {\n  console.log(num, value);\n}\n\nmyFunc();\nmyFunc(3);\n```\n- *A*: ``2` `4` and `3` `6``\n- *B*: ``2` `NaN` and `3` `NaN``\n- *C*: ``2` `Error` and `3` `6``\n- *D*: ``2` `4` and `3` `Error``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "First, we invoked `myFunc()` without passing any arguments. Since we didn't pass arguments, `num` and `value` got their default values: num is `2`, and `value` is the returned value of the function `add`. To the `add` function, we pass `num` as an argument, which had the value of `2`. `add` returns `4`, which is the value of `value`.  Then, we invoked `myFunc(3)` and passed the value `3` as the value for the argument `num`. We didn't pass an argument for `value`. Since we didn't pass a value for the `value` argument, it got the default value: the returned value of the `add` function. To `add`, we pass `num`, which has the value of `3`. `add` returns `6`, which is the value of `value`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Counter {\n  #number = 10;\n\n  increment() {\n    this.#number++;\n  }\n\n  getNum() {\n    return this.#number;\n  }\n}\n\nconst counter = new Counter();\ncounter.increment();\n\nconsole.log(counter.#number);\n```\n- *A*: ``10``\n- *B*: ``11``\n- *C*: ``undefined``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In ES2020, we can add private variables in classes by using the `#`. We cannot access these variables outside of the class. When we try to log `counter.#number`, a SyntaxError gets thrown: we cannot access it outside the `Counter` class!",
      "correct": "D"
    },
    {
      "title": "What's missing?",
      "code": "```javascript\nconst teams = [\n  { name: \"Team 1\", members: [\"Paul\", \"Lisa\"] },\n  { name: \"Team 2\", members: [\"Laura\", \"Tim\"] },\n];\n\nfunction\* getMembers(members) {\n  for (let i = 0; i < members.length; i++) {\n    yield members[i];\n  }\n}\n\nfunction\* getTeams(teams) {\n  for (let i = 0; i < teams.length; i++) {\n    // ✨ SOMETHING IS MISSING HERE ✨\n  }\n}\n\nconst obj = getTeams(teams);\nobj.next(); // { value: \"Paul\", done: false }\nobj.next(); // { value: \"Lisa\", done: false }\n```\n- *A*: ``yield getMembers(teams[i].members)``\n- *B*: ``yield\* getMembers(teams[i].members)``\n- *C*: ``return getMembers(teams[i].members)``\n- *D*: ``return yield getMembers(teams[i].members)``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "In order to iterate over the `members` in each element in the `teams` array, we need to pass `teams[i].members` to the `getMembers` generator function. The generator function returns a generator object. In order to iterate over each element in this generator object, we need to use `yield\*`.  If we would've written `yield`, `return yield`, or `return`, the entire generator function would've gotten returned the first time we called the `next` method.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  hobbies: [\"coding\"],\n};\n\nfunction addHobby(hobby, hobbies = person.hobbies) {\n  hobbies.push(hobby);\n  return hobbies;\n}\n\naddHobby(\"running\", []);\naddHobby(\"dancing\");\naddHobby(\"baking\", person.hobbies);\n\nconsole.log(person.hobbies);\n```\n- *A*: ``[\"coding\"]``\n- *B*: ``[\"coding\", \"dancing\"]``\n- *C*: ``[\"coding\", \"dancing\", \"baking\"]``\n- *D*: ``[\"coding\", \"running\", \"dancing\", \"baking\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `addHobby` function receives two arguments, `hobby` and `hobbies` with the default value of the `hobbies` array on the `person` object.  First, we invoke the `addHobby` function, and pass `\"running\"` as the value for `hobby` and an empty array as the value for `hobbies`. Since we pass an empty array as the value for `hobbies`, `\"running\"` gets added to this empty array.  Then, we invoke the `addHobby` function, and pass `\"dancing\"` as the value for `hobby`. We didn't pass a value for `hobbies`, so it gets the default value, the `hobbies` property on the `person` object. We push the hobby `dancing` to the `person.hobbies` array.  Last, we invoke the `addHobby` function, and pass `\"baking\"` as the value for `hobby`, and the `person.hobbies` array as the value for `hobbies`. We push the hobby `baking` to the `person.hobbies` array.  After pushing `dancing` and `baking`, the value of `person.hobbies` is `[\"coding\", \"dancing\", \"baking\"]`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Bird {\n  constructor() {\n    console.log(\"I'm a bird. 🦢\");\n  }\n}\n\nclass Flamingo extends Bird {\n  constructor() {\n    console.log(\"I'm pink. 🌸\");\n    super();\n  }\n}\n\nconst pet = new Flamingo();\n```\n- *A*: ``I'm pink. 🌸``\n- *B*: ``I'm pink. 🌸` `I'm a bird. 🦢``\n- *C*: ``I'm a bird. 🦢` `I'm pink. 🌸``\n- *D*: `Nothing, we didn't call any method`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We create the variable `pet` which is an instance of the `Flamingo` class. When we instantiate this instance, the `constructor` on `Flamingo` gets called. First, `\"I'm pink. 🌸\"` gets logged, after which we call `super()`. `super()` calls the constructor of the parent class, `Bird`. The constructor in `Bird` gets called, and logs `\"I'm a bird. 🦢\"`.",
      "correct": "B"
    },
    {
      "title": "Which of the options result(s) in an error?",
      "code": "```javascript\nconst emojis = [\"🎄\", \"🎅🏼\", \"🎁\", \"⭐\"];\n\n/* 1 */ emojis.push(\"🦌\");\n/* 2 */ emojis.splice(0, 2);\n/* 3 */ emojis = [...emojis, \"🥂\"];\n/* 4 */ emojis.length = 0;\n```\n- *A*: `1`\n- *B*: `1 and 2`\n- *C*: `3 and 4`\n- *D*: `3`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `const` keyword simply means we cannot _redeclare_ the value of that variable, it's _read-only_. However, the value itself isn't immutable. The properties on the `emojis` array can be modified, for example by pushing new values, splicing them, or setting the length of the array to 0.",
      "correct": "D"
    },
    {
      "title": "What do we need to add to the `person` object to get `[\"Lydia Hallie\", 21]` as the output of `[...person]`?",
      "code": "```javascript\nconst person = {\n  name: \"Lydia Hallie\",\n  age: 21\n}\n\n[...person] // [\"Lydia Hallie\", 21]\n```\n- *A*: `Nothing, object are iterable by default`\n- *B*: ``\*[Symbol.iterator]() { for (let x in this) yield\* this[x] }``\n- *C*: ``\*[Symbol.iterator]() { yield\* Object.values(this) }``\n- *D*: ``\*[Symbol.iterator]() { for (let x in this) yield this }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Objects aren't iterable by default. An iterable is an iterable if the iterator protocol is present. We can add this manually by adding the iterator symbol `[Symbol.iterator]`, which has to return a generator object, for example by making it a generator function `\*[Symbol.iterator]() {}`. This generator function has to yield the `Object.values` of the `person` object if we want it to return the array `[\"Lydia Hallie\", 21]`: `yield\* Object.values(this)`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet count = 0;\nconst nums = [0, 1, 2, 3];\n\nnums.forEach((num) => {\n  if (num) count += 1;\n});\n\nconsole.log(count);\n```\n- *A*: `1`\n- *B*: `2`\n- *C*: `3`\n- *D*: `4`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `if` condition within the `forEach` loop checks whether the value of `num` is truthy or falsy. Since the first number in the `nums` array is `0`, a falsy value, the `if` statement's code block won't be executed. `count` only gets incremented for the other 3 numbers in the `nums` array, `1`, `2` and `3`. Since `count` gets incremented by `1` 3 times, the value of `count` is `3`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nfunction getFruit(fruits) {\n  console.log(fruits?.[1]?.[1]);\n}\n\ngetFruit([[\"🍊\", \"🍌\"], [\"🍍\"]]);\ngetFruit();\ngetFruit([[\"🍍\"], [\"🍊\", \"🍌\"]]);\n```\n- *A*: ``null`, `undefined`, 🍌`\n- *B*: ``[]`, `null`, 🍌`\n- *C*: ``[]`, `[]`, 🍌`\n- *D*: ``undefined`, `undefined`, 🍌`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `?` allows us to optionally access deeper nested properties within objects. We're trying to log the item on index `1` within the subarray that's on index `1` of the `fruits` array. If the subarray on index `1` in the `fruits` array doesn't exist, it'll simply return `undefined`. If the subarray on index `1` in the `fruits` array exists, but this subarray doesn't have an item on its `1` index, it'll also return `undefined`.  First, we're trying to log the second item in the `['🍍']` subarray of `[['🍊', '🍌'], ['🍍']]`. This subarray only contains one item, which means there is no item on index `1`, and returns `undefined`.  Then, we're invoking the `getFruits` function without passing a value as an argument, which means that `fruits` has a value of `undefined` by default. Since we're conditionally chaining the item on index `1` of`fruits`, it returns `undefined` since this item on index `1` does not exist.  Lastly, we're trying to log the second item in the `['🍊', '🍌']` subarray of `['🍍'], ['🍊', '🍌']`. The item on index `1` within this subarray is `🍌`, which gets logged.",
      "correct": "D"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nclass Calc {\n  constructor() {\n    this.count = 0;\n  }\n\n  increase() {\n    this.count++;\n  }\n}\n\nconst calc = new Calc();\nnew Calc().increase();\n\nconsole.log(calc.count);\n```\n- *A*: ``0``\n- *B*: ``1``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "We set the variable `calc` equal to a new instance of the `Calc` class. Then, we instantiate a new instance of `Calc`, and invoke the `increase` method on this instance. Since the count property is within the constructor of the `Calc` class, the count property is not shared on the prototype of `Calc`. This means that the value of count has not been updated for the instance calc points to, count is still `0`.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst user = {\n  email: \"e@mail.com\",\n  password: \"12345\",\n};\n\nconst updateUser = ({ email, password }) => {\n  if (email) {\n    Object.assign(user, { email });\n  }\n\n  if (password) {\n    user.password = password;\n  }\n\n  return user;\n};\n\nconst updatedUser = updateUser({ email: \"new@email.com\" });\n\nconsole.log(updatedUser === user);\n```\n- *A*: ``false``\n- *B*: ``true``\n- *C*: ``TypeError``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `updateUser` function updates the values of the `email` and `password` properties on user, if their values are passed to the function, after which the function returns the `user` object. The returned value of the `updateUser` function is the `user` object, which means that the value of updatedUser is a reference to the same `user` object that `user` points to. `updatedUser === user` equals `true`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst fruit = [\"🍌\", \"🍊\", \"🍎\"];\n\nfruit.slice(0, 1);\nfruit.splice(0, 1);\nfruit.unshift(\"🍇\");\n\nconsole.log(fruit);\n```\n- *A*: ``['🍌', '🍊', '🍎']``\n- *B*: ``['🍊', '🍎']``\n- *C*: ``['🍇', '🍊', '🍎']``\n- *D*: ``['🍇', '🍌', '🍊', '🍎']``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "First, we invoke the `slice` method on the fruit array. The slice method does not modify the original array, but returns the value that it sliced off the array: the banana emoji. Then, we invoke the `splice` method on the fruit array. The splice method does modify the original array, which means that the fruit array now consists of `['🍊', '🍎']`. At last, we invoke the `unshift` method on the `fruit` array, which modifies the original array by adding the provided value, ‘🍇’ in this case, as the first element in the array. The fruit array now consists of `['🍇', '🍊', '🍎']`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst animals = {};\nlet dog = { emoji: \"🐶\" };\nlet cat = { emoji: \"🐈\" };\n\nanimals[dog] = { ...dog, name: \"Mara\" };\nanimals[cat] = { ...cat, name: \"Sara\" };\n\nconsole.log(animals[dog]);\n```\n- *A*: ``{ emoji: \"🐶\", name: \"Mara\" }``\n- *B*: ``{ emoji: \"🐈\", name: \"Sara\" }``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Object keys are converted to strings.  Since the value of `dog` is an object, `animals[dog]` actually means that we’re creating a new property called `\"[object Object]\"` equal to the new object. `animals[\"[object Object]\"]` is now equal to `{ emoji: \"🐶\", name: \"Mara\"}`.  `cat` is also an object, which means that `animals[cat]` actually means that we’re overwriting the value of `animals[\"[object Object]\"]` with the new cat properties.  Logging `animals[dog]`, or actually `animals[\"[object Object]\"]` since converting the `dog` object to a string results `\"[object Object]\"`, returns the `{ emoji: \"🐈\", name: \"Sara\" }`.",
      "correct": "B"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst user = {\n  email: \"my@email.com\",\n  updateEmail: (email) => {\n    this.email = email;\n  },\n};\n\nuser.updateEmail(\"new@email.com\");\nconsole.log(user.email);\n```\n- *A*: ``my@email.com``\n- *B*: ``new@email.com``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `updateEmail` function is an arrow function, and is not bound to the `user` object. This means that the `this` keyword is not referring to the `user` object, but refers to the global scope in this case. The value of `email` within the `user` object does not get updated. When logging the value of `user.email`, the original value of `my@email.com` gets returned.",
      "correct": "A"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst promise1 = Promise.resolve(\"First\");\nconst promise2 = Promise.resolve(\"Second\");\nconst promise3 = Promise.reject(\"Third\");\nconst promise4 = Promise.resolve(\"Fourth\");\n\nconst runPromises = async () => {\n  const res1 = await Promise.all([promise1, promise2]);\n  const res2 = await Promise.all([promise3, promise4]);\n  return [res1, res2];\n};\n\nrunPromises()\n  .then((res) => console.log(res))\n  .catch((err) => console.log(err));\n```\n- *A*: ``[['First', 'Second'], ['Fourth']]``\n- *B*: ``[['First', 'Second'], ['Third', 'Fourth']]``\n- *C*: ``[['First', 'Second']]``\n- *D*: ``'Third'``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `Promise.all` method runs the passed promises in parallel. If one promise fails, the `Promise.all` method _rejects_ with the value of the rejected promise. In this case, `promise3` is rejected with the value `\"Third\"`. We’re catching the rejected value in the chained `catch` method on the `runPromises` invocation to catch any errors within the `runPromises` function. Only `\"Third\"` gets logged, since `promise3` is rejected with this value.",
      "correct": "D"
    },
    {
      "title": "What should the value of `method` be to log `{ name: \"Lydia\", age: 22 }`?",
      "code": "```javascript\nconst keys = [\"name\", \"age\"];\nconst values = [\"Lydia\", 22];\n\nconst method =\n  /* ?? */\n  Object[method](\n    keys.map((_, i) => {\n      return [keys[i], values[i]];\n    })\n  ); // { name: \"Lydia\", age: 22 }\n```\n- *A*: ``entries``\n- *B*: ``values``\n- *C*: ``fromEntries``\n- *D*: ``forEach``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The `fromEntries` method turns a 2d array into an object. The first element in each subarray will be the key, and the second element in each subarray will be the value. In this case, we’re mapping over the `keys` array, which returns an array that the first element is the item on the key array on the current index, and the second element is the item of the values array on the current index.  This creates an array of subarrays containing the correct keys and values, which results in `{ name: \"Lydia\", age: 22 }`",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nconst createMember = ({ email, address = {} }) => {\n  const validEmail = /.+\\@.+\\..+/.test(email);\n  if (!validEmail) throw new Error(\"Valid email pls\");\n\n  return {\n    email,\n    address: address ? address : null,\n  };\n};\n\nconst member = createMember({ email: \"my@email.com\" });\nconsole.log(member);\n```\n- *A*: ``{ email: \"my@email.com\", address: null }``\n- *B*: ``{ email: \"my@email.com\" }``\n- *C*: ``{ email: \"my@email.com\", address: {} }``\n- *D*: ``{ email: \"my@email.com\", address: undefined }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The default value of `address` is an empty object `{}`. When we set the variable `member` equal to the object returned by the `createMember` function, we didn't pass a value for the address, which means that the value of the address is the default empty object `{}`. An empty object is a truthy value, which means that the condition of the `address ? address : null` conditional returns `true`. The value of the address is the empty object `{}`.",
      "correct": "C"
    },
    {
      "title": "What's the output?",
      "code": "```javascript\nlet randomValue = { name: \"Lydia\" };\nrandomValue = 23;\n\nif (!typeof randomValue === \"string\") {\n  console.log(\"It's not a string!\");\n} else {\n  console.log(\"Yay it's a string!\");\n}\n```\n- *A*: ``It's not a string!``\n- *B*: ``Yay it's a string!``\n- *C*: ``TypeError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "The condition within the `if` statement checks whether the value of `!typeof randomValue` is equal to `\"string\"`. The `!` operator converts the value to a boolean value. If the value is truthy, the returned value will be `false`, if the value is falsy, the returned value will be `true`. In this case, the returned value of `typeof randomValue` is the truthy value `\"number\"`, meaning that the value of `!typeof randomValue` is the boolean value `false`.  `!typeof randomValue === \"string\"` always returns false, since we're actually checking `false === \"string\"`. Since the condition returned `false`, the code block of the `else` statement gets run, and `Yay it's a string!` gets logged.",
      "correct": "B"
    }
  ],
  "uk": [
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = \"Lydia\";\n  let age = 21;\n}\n\nsayHi();\n```\n- *A*: ``Lydia` та `undefined``\n- *B*: ``Lydia` та `ReferenceError``\n- *C*: ``ReferenceError` та `21``\n- *D*: ``undefined` та `ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Всередині функції ми спершу визначаємо змінну `name` за допомогою ключового слова `var`. Це означає, що змінна буде знайдена (область пам'яті під змінну буде виділена під час створення) зі значенням `undefined` за замовчуванням, до тих пір поки виконання коду не дійде до рядка, де визначається змінна. Ми ще не визначили значення `name`, коли намагаємося вивести її в консоль, тому в консолі буде `undefined`.  Змінні, визначені за допомогою `let` (і `const`), також знаходяться, але на відміну від `var`, не <i>створюються</i>. Доступ до них неможливий до тих пір, поки не виконається рядок їх визначення (ініціалізації). Це називається \"тимчасова мертва зона\". Коли ми намагаємося звернутися до змінних до того моменту як вони визначені, JavaScript видає `ReferenceError`.",
      "correct": "D"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n```\n- *A*: ``0 1 2` та `0 1 2``\n- *B*: ``0 1 2` та `3 3 3``\n- *C*: ``3 3 3` та `0 1 2``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Через черги подій в JavaScript, функція `setTimeout` викликається _після того_ як цикл буде завершено. Так як змінна `i` в першому циклі була визначена за допомогою `var`, вона буде глобальною. У циклі ми кожен раз збільшуємо значення `i` на `1`, використовуючи унарний оператор `++.` До моменту виконання функції `setTimeout` значення `i` дорівнюватиме `3`, як показано в першому прикладі.  У другому циклі змінна `i` визначена за допомогою `let`. Такі змінні (а також `const`) мають блокову область видимості (блок це що завгодно між `{}`). З кожною ітерацією `i` матиме нове значення, і кожне значення буде замкнуто у своїй області видимості всередині циклу.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nshape.diameter();\nshape.perimeter();\n```\n- *A*: ``20` та `62.83185307179586``\n- *B*: ``20` та `NaN``\n- *C*: ``20` та `63``\n- *D*: ``NaN` та `63``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Зауваж, що `diameter` це звичайна функція, в той час як `perimeter` це стрілкова функція.  У стрілкових функцій значення `this` вказує на навколишню область видимості, на відміну від звичайних функцій! Це означає, що при виклику `perimeter` значення `this` у цій функції вказує не на об'єкт `shape`, а на зовнішню область видимості (наприклад, window).  У цього об'єкта немає ключа `radius`, тому повертається `undefined`.",
      "correct": "B"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\n+true;\n!\"Lydia\";\n```\n- *A*: ``1` та `false``\n- *B*: ``false` та `NaN``\n- *C*: ``false` та `false``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Унарний плюс призводить операнд до числа. `true` це `1`, а `false` це `0`.  Строка `'Lydia'` це \"справжнє\" значення. Ми запитуємо \"справжнє значення є помилковим\"? Відповідь: `false`.",
      "correct": "A"
    },
    {
      "title": "Що з цього не є коректним?",
      "code": "```javascript\nconst bird = {\n  size: \"small\",\n};\n\nconst mouse = {\n  name: \"Mickey\",\n  small: true,\n};\n```\n- *A*: ``mouse.bird.size` не є коректно`\n- *B*: ``mouse[bird.size]` не є коректно`\n- *C*: ``mouse[bird[\"size\"]]` не є коректно`\n- *D*: `Все варіант коректні`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript все ключі об'єкта є рядками (крім `Symbol`). І хоча ми не _набираємо_ їх як рядки, вони завжди перетворюються до рядків під капотом.  JavaScript інтерпретує (або розпаковує) оператори. При використанні квадратних дужок JS зауважує `[` і продовжує поки не зустріне `]`. Тільки після цього він вирахує то, що знаходиться всередині дужок.  `mouse[bird.size]`: Спершу визначається `bird.size`, що дорівнює `\"small\"`. `mouse[\"small\"]` повертає `true`.  Але із записом через крапку так не відбувається. У `mouse` немає ключа `bird`. Таким чином, `mouse.bird` дорівнює `undefined`. Потім ми запитуємо ключ `size`, використовуючи крапкову нотацію: `mouse.bird.size`. Так як `mouse.bird` це `undefined`, ми запитуємо `undefined.size`. Це не є дійсним, тому ми отримуємо помилку типу: `Can not read property \"size\" of undefined`.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nlet c = { greeting: \"Hey!\" };\nlet d;\n\nd = c;\nc.greeting = \"Hello\";\nconsole.log(d.greeting);\n```\n- *A*: ``Hello``\n- *B*: ``Hey``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript всі об'єкти є _посилальними_ типами даних.  Спершу змінна `c` вказує на об'єкт. Потім ми вказуємо змінної `d` посилатися на той самий об'єкт, що і `c`.  https://i.imgur.com/ko5k0fs.png  Коли ти змінюєш один об'єкт, то змінюються значення всіх посилань, що вказують на цей об'єкт.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nlet a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);\n```\n- *A*: ``true` `false` `true``\n- *B*: ``false` `false` `true``\n- *C*: ``true` `false` `false``\n- *D*: ``false` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`new Number()` це вбудований конструктор функції. І хоча він виглядає як число, це не справжнє число: у нього є ряд додаткових фіч і це об'єкт.  Оператор `==` призводить типи даних до якогось одного і перевіряє рівність _значень_. Обидва значення рівні `3`, тому повертається `true`.  При використанні оператора `===` значення і тип повинні бути однаковими. Але в нашому випадку це не так: `new Number()` це не число, це **об'єкт**. Тому обидва повертають `false`.",
      "correct": "C"
    },
    {
      "title": "Яким буде результат?",
      "code": "```javascript\nclass Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = \"green\" } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: \"purple\" });\nfreddie.colorChange(\"orange\");\n```\n- *A*: ``orange``\n- *B*: ``purple``\n- *C*: ``green``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функція `colorChange` є статичною. Статичні методи не мають доступу до екземплярів класу. Так як `freddie` це екземпляр, то статичний метод там не доступний. Тому результатом є помилка `TypeError`.",
      "correct": "D"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nlet greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);\n```\n- *A*: ``{}``\n- *B*: ``ReferenceError: greetign is not defined``\n- *C*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "В консолі виведеться об'єкт, тому що ми щойно створили порожній об'єкт в глобальному об'єкті! Коли ми замість `greeting` написали `greetign`, інтерпретатор JS насправді виконав `global.greetign = {}` (або `window.greetign = {}` в браузері).  Потрібно використовувати `\"use strict\"`, щоб уникнути такої поведінки. Цей запис допоможе бути впевненим в тому, що змінна була визначена перед тим як їй присвоїли значення.",
      "correct": "A"
    },
    {
      "title": "Що станеться?",
      "code": "```javascript\nfunction bark() {\n  console.log(\"Woof!\");\n}\n\nbark.animal = \"dog\";\n```\n- *A*: `Нічого, все ок.`\n- *B*: ``SyntaxError`. Не можна додавати властивості функцій таким способом.`\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript це можливо, тому що функції це об'єкти! (Все є об'єктами крім примітивів).  Функція - це спеціальний тип об'єкта, який можна викликати. Крім того, функція - це об'єкт з властивостями. Властивість такого об'єкта не можна викликати, так як воно не є функцією.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst member = new Person(\"Lydia\", \"Hallie\");\nPerson.getFullName = function () {\n  return `${this.firstName} ${this.lastName}`;\n};\n\nconsole.log(member.getFullName());\n```\n- *A*: ``TypeError``\n- *B*: ``SyntaxError``\n- *C*: ``Lydia Hallie``\n- *D*: ``undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Не можна додавати властивості конструктору, як звичайному об'єкту. Якщо потрібно додати фічу до всіх об'єктів, то необхідно використовувати прототипи. В даному випадку,  ```js Person.prototype.getFullName = function () {   return `${this.firstName} ${this.lastName}`; }; ```  зробить метод `member.getFullName()` чинним. У чому тут перевага? Припустимо, що ми додали цей метод до конструктора. Можливо, не кожному екземпляру `Person` потрібен цей метод. Це призведе до великих втрат пам'яті, тому що всі екземпляри будуть мати цю властивість. Навпаки, якщо ми додамо цей метод тільки до прототипу, у нас буде тільки одне місце в пам'яті, до якого зможуть звертатися всі екземпляри!",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction Person(firstName, lastName) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n}\n\nconst lydia = new Person(\"Lydia\", \"Hallie\");\nconst sarah = Person(\"Sarah\", \"Smith\");\n\nconsole.log(lydia);\nconsole.log(sarah);\n```\n- *A*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` та `undefined``\n- *B*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` та `Person {firstName: \"Sarah\", lastName: \"Smith\"}``\n- *C*: ``Person {firstName: \"Lydia\", lastName: \"Hallie\"}` та `{}``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Для `sarah` ми не використали ключове слово `new`. Використання `new` призводить до створення нового об'єкта. Але без `new` він вказує на **глобальний об'єкт**!  Ми вказали, що `this.firstName` дорівнює `\"Sarah\"` і `this.lastName` дорівнює `\"Smith\"`. Насправді ми визначили `global.firstName = 'Sarah'` і `global.lastName = 'Smith'`. `sarah` залишилася `undefined`.",
      "correct": "A"
    },
    {
      "title": "Назвіть три фази поширення подій",
      "code": `- A: Мета (Target) > Захоплення (Capturing) > Спливання (Bubbling)\n- B: Спливання (Bubbling) > Мета (Target) > Захоплення (Capturing)\n- C: Мета (Target) > Спливання (Bubbling) > Захоплення (Capturing)\n- D: Захоплення (Capturing) > Мета (Target) > Спливання (Bubbling)`,
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Під час фази **захоплення** подія поширюється від батьківського елемента до елемента мети. Після досягнення **мети** починається фаза **спливання**.  https://i.imgur.com/N18oRgd.png",
      "correct": "D"
    },
    {
      "title": "Всі об'єкти мають прототипи?",
      "code": `- A: Так\n- B: Ні`,
      "answers": [
        "A",
        "B"
      ],
      "explanation": "Всі об'єкти мають прототипи, крім **базового об'єкта**. Базовий об'єкт має доступ до деяких методів і властивостей, таких як `.toString`. Саме тому ми можемо використовувати вбудовані методи JavaScript! Всі ці методи доступні в прототипі. Якщо JavaScript не може знайти метод безпосередньо у об'єкту, він продовжує пошук по ланцюжку прототипів поки не знайде.",
      "correct": "B"
    },
    {
      "title": "Результат коду?",
      "code": "```javascript\nfunction sum(a, b) {\n  return a + b;\n}\n\nsum(1, \"2\");\n```\n- *A*: ``NaN``\n- *B*: ``TypeError``\n- *C*: ``\"12\"``\n- *D*: ``3``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "JavaScript це **динамічно типізована мова**: ми не визначаємо тип змінних. Змінні можуть автоматично бути перетворені з одного типу в інший без нашої участі, що називається _неявним приведенням типів_. **Приведення** це перетворення з одного типу в інший.  У цьому прикладі, JavaScript конвертувати число `1` в рядок, щоб операція всередині функції мала сенс і повернула значення. Під час складання числа (`1`) і рядки (`'2'`) число перетворюється до рядка. Ми можемо додавати рядки ось так: `\"Hello\" + \"World\"`. Таким чином, \"`1\"` + `\"2\"` повертає \"`12\"`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nlet number = 0;\nconsole.log(number++);\nconsole.log(++number);\nconsole.log(number);\n```\n- *A*: ``1` `1` `2``\n- *B*: ``1` `2` `2``\n- *C*: ``0` `2` `2``\n- *D*: ``0` `1` `2``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "**Постфіксний** унарний оператор `++`:  1. Повертає значення (`0`) 2. Інкрементує значення (тепер число дорівнює `1`)  **Префіксний** унарний оператор `++`:  1. Інкрементує значення (тепер число дорівнює `2`) 2. Повертає значення (`2`)  Результат: `0 2 2`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction getPersonInfo(one, two, three) {\n  console.log(one);\n  console.log(two);\n  console.log(three);\n}\n\nconst person = \"Lydia\";\nconst age = 21;\n\ngetPersonInfo`${person} is ${age} years old`;\n```\n- *A*: ``\"Lydia\"` `21` `[\"\", \" is \", \" years old\"]``\n- *B*: ``[\"\", \" is \", \" years old\"]` `\"Lydia\"` `21``\n- *C*: ``\"Lydia\"` `[\"\", \" is \", \" years old\"]` `21``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "При використанні тегованих шаблонних літералів першим аргументом завжди буде масив строкових значень. Решта аргументів будуть значення мати переданих виразів!",
      "correct": "B"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction checkAge(data) {\n  if (data === { age: 18 }) {\n    console.log(\"You are an adult!\");\n  } else if (data == { age: 18 }) {\n    console.log(\"You are still an adult.\");\n  } else {\n    console.log(`Hmm.. You don't have an age I guess`);\n  }\n}\n\ncheckAge({ age: 18 });\n```\n- *A*: ``You are an adult!``\n- *B*: ``You are still an adult.``\n- *C*: ``Hmm.. You don't have an age I guess``",
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "В операціях порівняння примітиви порівнюються за їх _значенням_, а об'єкти за _посиланнями_. JavaScript перевіряє, щоб об'єкти вказували на одну і ту ж область пам'яті.  Порівнювані об'єкти в нашому прикладі не такі: об'єкт, переданий як параметр, вказує на іншу область пам'яті, ніж об'єкти, що використовуються в порівнянні.  Тому `{age: 18} === {age: 18}` і `{age: 18} == {age: 18}` повертають `false`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction getAge(...args) {\n  console.log(typeof args);\n}\n\ngetAge(21);\n```\n- *A*: ``\"number\"``\n- *B*: ``\"array\"``\n- *C*: ``\"object\"``\n- *D*: ``\"NaN\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор поширення (`... args`) повертає масив з аргументами. Масив це об'єкт, тому `typeof args` повертає `\"object\"`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfunction getAge() {\n  \"use strict\";\n  age = 21;\n  console.log(age);\n}\n\ngetAge();\n```\n- *A*: ``21``\n- *B*: ``undefined``\n- *C*: ``ReferenceError``\n- *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Використовуючи `\"use strict\"`, можна бути впевненим, що ми помилково не оголосимо глобальні змінні. Ми раніше ніде не оголошували змінну `age`, тому з використанням `\"use strict\"` виникне ReferenceError. Без використання `\"use strict\"` помилки не виникне, а змінна `age` додасться в глобальний об'єкт.",
      "correct": "C"
    },
    {
      "title": "Чому дорівнюватиме sum?",
      "code": "```javascript\nconst sum = eval(\"10*10+5\");\n```\n- *A*: ``105``\n- *B*: ``\"105\"``\n- *C*: ``TypeError``\n- *D*: ``\"10*10+5\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`eval` виконує код, переданий у вигляді рядка. Якщо це рядок (як в такому випадку), то обчислюється вираз. Вираз `10 * 10 + 5` поверне число `105`.",
      "correct": "A"
    },
    {
      "title": "Як довго буде доступний cool_secret?",
      "code": "```javascript\nsessionStorage.setItem(\"cool_secret\", 123);\n```\n- *A*: `Завжди, дані не загубляться.`\n- *B*: `Поки користувач не закриває вкладку.`\n- *C*: `Поки користувач не закриє браузер, а не тільки вкладку.`\n- *D*: `Поки користувач не вимикає комп'ютер.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Дані, збережені в `sessionStorage` очищаються після закриття _вкладки_.  При використанні `localStorage` дані зберігаються назавжди. Очистити їх можна, наприклад, використовуючи `localStorage.clear()`.",
      "correct": "B"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nvar num = 8;\nvar num = 10;\n\nconsole.log(num);\n```\n- *A*: ``8``\n- *B*: ``10``\n- *C*: ``SyntaxError``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "За допомогою ключового слова `var`, можна визначати скільки завгодно змінних з одним і тим же ім'ям. Змінна зберігатиме останнє присвоєне значення.  Ви не можете зробити це з `let` або` const`, оскільки вони блочні.",
      "correct": "B"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst obj = { 1: \"a\", 2: \"b\", 3: \"c\" };\nconst set = new Set([1, 2, 3, 4, 5]);\n\nobj.hasOwnProperty(\"1\");\nobj.hasOwnProperty(1);\nset.has(\"1\");\nset.has(1);\n```\n- *A*: ``false` `true` `false` `true``\n- *B*: ``false` `true` `true` `true``\n- *C*: ``true` `true` `false` `true``\n- *D*: ``true` `true` `true` `true``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Всі ключі об'єктів (крім `Symbols`) є рядками, навіть якщо задано не в вигляді рядків. Тому `obj.hasOwnProperty('1')` так само повертає `true`.  Але це не працює для `set`. Значення `\"1\"` немає в `set`: `set.has ('1')`, тому повертається `false`. Але `set.has(1)` поверне `true`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst obj = { a: \"one\", b: \"two\", a: \"three\" };\nconsole.log(obj);\n```\n- *A*: ``{ a: \"one\", b: \"two\" }``\n- *B*: ``{ b: \"two\", a: \"three\" }``\n- *C*: ``{ a: \"three\", b: \"two\" }``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Якщо є два ключі з однаковим ім'ям, то ключ буде перезаписаний. Його позиція збережеться, але значенням буде встановлено останнім.",
      "correct": "C"
    },
    {
      "title": "Глобальний контекст виконання створює дві речі: глобальний об'єкт і this",
      "code": `- A: Так\n- B: Ні\n- C: В залежності від ситуації`,
      "answers": [
        "A",
        "B",
        "C"
      ],
      "explanation": "Базовий контекст виконання це глобальний контекст виконання: це те, що є де завгодно у твоєму коді.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nfor (let i = 1; i < 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}\n```\n- *A*: ``1` `2``\n- *B*: ``1` `2` `3``\n- *C*: ``1` `2` `4``\n- *D*: ``1` `3` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор `continue` пропускає ітерацію, якщо умова повертає `true`.",
      "correct": "C"
    },
    {
      "title": "Яким буде результат?",
      "code": "```javascript\nString.prototype.giveLydiaPizza = () => {\n  return \"Just give Lydia pizza already!\";\n};\n\nconst name = \"Lydia\";\n\nconsole.log(name.giveLydiaPizza());\n```\n- *A*: ``\"Just give Lydia pizza already!\"``\n- *B*: ``TypeError: not a function``\n- *C*: ``SyntaxError``\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`String` це вбудований конструктор, до якого можна додавати властивості. Я додала метод до його прототипу. Рядки-примітиви автоматично конвертуються до рядків-об'єктів. Тому всі рядки (строкові об'єкти) мають доступ до цього методу!",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst a = {};\nconst b = { key: \"b\" };\nconst c = { key: \"c\" };\n\na[b] = 123;\na[c] = 456;\n\nconsole.log(a[b]);\n```\n- *A*: ``123``\n- *B*: ``456``\n- *C*: ``undefined``\n- *D*: ``ReferenceError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ключі об'єкта автоматично конвертуються в рядки. Ми збираємося додати об'єкт в якості ключа до об'єкта `a` зі значенням `123`.  Проте, коли ми наводимо об'єкт до рядка, він стає `\"[object Object]\"`. Таким чином, ми говоримо, що `a[\"object Object\"] = 123`. Потім ми робимо те ж саме. `c` це інший об'єкт, який ми неявно наводимо до рядка. Тому `a[\"object Object\"] = 456`.  Потім, коли ми виводимо `a[b]`, ми маємо на увазі `a[\"object Object\"]`. Ми тільки що встановили туди значення `456`, тому в результаті отримуємо `456`.",
      "correct": "B"
    },
    {
      "title": "Яким буде результат?",
      "code": "```javascript\nconst foo = () => console.log(\"First\");\nconst bar = () => setTimeout(() => console.log(\"Second\"));\nconst baz = () => console.log(\"Third\");\n\nbar();\nfoo();\nbaz();\n```\n- *A*: ``First` `Second` `Third``\n- *B*: ``First` `Third` `Second``\n- *C*: ``Second` `First` `Third``\n- *D*: ``Second` `Third` `First``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ми викликаємо функцію `setTimeout` першою. Тим не менш, вона виводиться в консоль останньою.  Це відбувається через те, що в браузерах у нас є не тільки рантайм движок, але і `WebAPI`. `WebAPI` надає нам функцію `setTimeout` і багато інших можливостей. Наприклад, DOM.  Після того як _коллбек_ відправлений в `WebAPI`, функція `setTimeout` (але не коллбек!) виймається з стека.  https://i.imgur.com/X5wsHOg.png  Тепер викликається `foo`, і `\"First\"` виводиться в консоль.  https://i.imgur.com/Pvc0dGq.png  `foo` дістається з стека, і викликається `baz`. `\"Third\"` виводиться в консоль.  https://i.imgur.com/WhA2bCP.png  `WebAPI` не може додавати вміст в стек коли захоче. Замість цього він відправляє коллбек-функцію в так звану _чергу_.  https://i.imgur.com/NSnDZmU.png  Тут на сцену виходить цикл подій (event loop). **Event loop** перевіряє стек і черга завдань. Якщо стек порожній, то він бере перший елемент з черги і відправляє його в стек.  https://i.imgur.com/uyiScAI.png  Викликається `bar`, в консоль виводиться `\"Second\"` і ця функція дістається з стека.",
      "correct": "B"
    },
    {
      "title": "Що буде в `event.target` після кліка на кнопку?",
      "code": "```html\n<div onclick=\"console.log('first div')\">\n  <div onclick=\"console.log('second div')\">\n    <button onclick=\"console.log('button')\">Кликни!</button>\n  </div>\n</div>\n```\n *A*: `Зовнішній `div``\n *B*: `Внутрішній `div``\n *C*: ``button``\n *D*: `Масив з усіма вкладеними елементами`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Метою події є **найглибший** вкладений елемент. Зупинити поширення подій можна за допомогою `event.stopPropagation`",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі після кліка по параграфу?",
      "code": "```javascript\n<div onclick=\"console.log('div')\">\n  <p onclick=\"console.log('p')\">Click here!</p>\n</div>\n```\n *A*: ``p` `div``\n *B*: ``div` `p``\n *C*: ``p``\n *D*: ``div``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Після кліка по `p` буде виведено `p` та `div`. У циклі життя події є три фази: **захоплення**, **мета** і **спливання**. За замовчуванням обробники подій виконуються на фазі спливання (якщо не встановлено параметр `useCapture` в `true`). Спливання йде з найглибшого елемента вгору.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst person = {name: \"Lydia\" };\n\nfunction sayHi(age) {\n  console.log(`${this.name} is ${age}`);\n}\n\nsayHi.call(person, 21);\nsayHi.bind(person, 21);\n```\n- *A*: ``undefined is 21` `Lydia is 21``\n- *B*: ``function` `function``\n- *C*: ``Lydia is 21` `Lydia is 21``\n- *D*: ``Lydia is 21` `function``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В обох випадках ми передаємо об'єкт, на який буде вказувати `this`. Але `.call` виконується _відразу ж_!  `.bind` повертає _копію_ функції, але з прив'язаним контекстом. Вона не виконується негайно.",
      "correct": "D"
    },
    {
      "title": "Яким буде результат?",
      "code": "```javascript\nfunction sayHi() {\n  return (() => 0)();\n}\n\ntypeof sayHi();\n```\n- *A*: ``\"object\"``\n- *B*: ``\"number\"``\n- *C*: ``\"function\"``\n- *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Функція `sayHi` повертає значення, що повертається з _негайно викликаного функціонального виразу_ (IIFE). Результатом є `0` типу `\"number\"`.  Для інформації: в JS 7 вбудованих типів: `null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol`, та `bigint`. `\"Function\"` не є окремим типом, тому що функції є об'єктами типу `\"object\"`.",
      "correct": "B"
    },
    {
      "title": "Які з цих значень є \"помилковими\"?",
      "code": "```javascript\n0;\nnew Number(0);\n(\"\");\n(\" \");\nnew Boolean(false);\nundefined;\n```\n- *A*: ``0`, `''`, `undefined``\n- *B*: ``0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined``\n- *C*: ``0`, `''`, `new Boolean(false)`, `undefined``\n- *D*: `Всі значення.`",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Є тільки шість \"помилкових\" значень:  - `undefined` - `null` - `NaN` - `0` - `''` (порожній рядок) - `false`  Конструктори функцій, такі як new `Number` та `new Boolean` є \"істинними\".",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconsole.log(typeof typeof 1);\n```\n- *A*: ``\"number\"``\n- *B*: ``\"string\"``\n- *C*: ``\"object\"``\n- *D*: ``\"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`typeof 1` повертає `\"number\"`. `typeof \"number\"` повертає `\"string\"`",
      "correct": "B"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\nconst numbers = [1, 2, 3];\nnumbers[10] = 11;\nconsole.log(numbers);\n```\n- *A*: ``[1, 2, 3, 7 x null, 11]``\n- *B*: ``[1, 2, 3, 11]``\n- *C*: ``[1, 2, 3, 7 x empty, 11]``\n- *D*: ``SyntaxError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Коли в масив додається значення, яке виходить за межі довжини масиву, JavaScript створює так звані \"порожні клітинки\". Насправді вони мають значення `undefined`, але в консолі виводяться так:  `[1, 2, 3, 7 x empty, 11]`  в залежності від місця використання (може відрізнятися для браузерів, Node, і т.д.).",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\n(() => {\n  let x, y;\n  try {\n    throw new Error();\n  } catch (x) {\n    (x = 1), (y = 2);\n    console.log(x);\n  }\n  console.log(x);\n  console.log(y);\n})();\n```\n- *A*: ``1` `undefined` `2``\n- *B*: ``undefined` `undefined` `undefined``\n- *C*: ``1` `1` `2``\n- *D*: ``1` `undefined` `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Блок `catch` отримує аргумент `x`. Це не той же `x`, який визначено в якості змінної перед рядком `try`.  Потім ми присвоюємо даному аргументу значення `1` та встановлюємо значення для змінної `y`. Потім виводимо в консоль значення аргументу `x`, що дорівнює `1`.  За межами блоку `catch` змінна `x` все ще `undefined`, а `y` дорівнює `2`. Коли ми викликаємо` console.log(x)` за межами блоку `catch`, цей виклик повертає `undefined`, а `y` повертає `2`.",
      "correct": "A"
    },
    {
      "title": "Все в JavaScript це...",
      "code": `- A: примітив або об'єкт\n- B: функція або об'єкт\n- C: питання з підступом! тільки об'єкти\n- D: число або об'єкт`,
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В JavaScript є тільки примітиви й об'єкти.  Типи примітивів: `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, та `symbol`.  Відмінністю примітиву від об'єкта є те, що примітиви не мають властивостей або методів. Проте, `'foo'.toUpperCase()` перетворюється в `'FOO'` та не викликає `TypeError`. Це відбувається тому, що при спробі отримання властивості або методу у примітиву (наприклад, рядки), JavaScript неявно оберне примітив об'єктом, використовуючи один з класів-обгорток (наприклад, `String`), а потім відразу ж знищить обгортку після обчислення виразу. Всі примітиви крім `null` та `undefined` поводяться таким чином.",
      "correct": "A"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\n[\n  [0, 1],\n  [2, 3],\n].reduce(\n  (acc, cur) => {\n    return acc.concat(cur);\n  },\n  [1, 2]\n);\n```\n- *A*: ``[0, 1, 2, 3, 1, 2]``\n- *B*: ``[6, 1, 2]``\n- *C*: ``[1, 2, 0, 1, 2, 3]``\n- *D*: ``[1, 2, 6]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`[1, 2]` - початкове значення, з яким ініціалізується змінна `acc`. Після першого проходу `acc` дорівнюватиме `[1,2]`, а `cur` буде `[0,1]`. Після конкатенації результат буде `[1, 2, 0, 1]`.  Потім `acc` дорівнює `[1, 2, 0, 1]`, а cur `[2, 3]`. Після злиття отримаємо `[1, 2, 0, 1, 2, 3]`.",
      "correct": "C"
    },
    {
      "title": "Що буде в консолі?",
      "code": "```javascript\n!!null;\n!!\"\";\n!!1;\n```\n- *A*: ``false` `true` `false``\n- *B*: ``false` `false` `true``\n- *C*: ``false` `true` `true``\n- *D*: ``true` `true` `false``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`null` \"НЕправдивий\". `!null` повертає `true`. `!true` повертає `false`.  `\"\"` \"НЕправдивий\". `!\"\"` повертає `true`. `!true` повертає `false`.  `1` \"правдивий\". `!1` повертає `false`. `!false` повертає `true`.",
      "correct": "B"
    },
    {
      "title": "Що повертає метод `setInterval`?",
      "code": "```javascript\nsetInterval(() => console.log(\"Hi\"), 1000);\n```\n- *A*: `унікальний id`\n- *B*: `вказану кількість мілісекунд`\n- *C*: `передану функцію`\n- *D*: ``undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Цей метод повертає унікальний id, який може бути використаний для очищення інтервалу за допомогою функції `clearInterval()`.",
      "correct": "A"
    },
    {
      "title": "Що повернеться?",
      "code": "```javascript\n[...\"Lydia\"];\n```\n- *A*: ``[\"L\", \"y\", \"d\", \"i\", \"a\"]``\n- *B*: ``[\"Lydia\"]``\n- *C*: ``[[], \"Lydia\"]``\n- *D*: ``[[\"L\", \"y\", \"d\", \"i\", \"a\"]]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Рядок є ітерабельною сутністю. Оператор поширення перетворює кожен символ в окремий елемент.",
      "correct": "A"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nfunction* generator(i) {\n  yield i;\n  yield i * 2;\n}\n\nconst gen = generator(10);\n\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\n`\n *A*: ``[0, 10], [10, 20]``\n *B*: ``20, 20``\n *C*: ``10, 20``\n *D*: ``0, 10 and 10, 20``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Звичайні функції не можуть бути зупинені на півдорозі після виклику. Однак функцію генератор можна \"зупинити\" на півдорозі, а потім продовжити з того місця, де вона зупинилася. Кожного разу, коли у функції-генераторі зустрічається ключове слово `yield`, функція повертає значення, вказане після нього. Зверніть увагу, що функція генератора в цьому випадку не _return_ значення, воно _yields_ значення. Спочатку ми ініціалізуємо функцію генератор з `i`, що дорівнює `10`. Ми викликаємо функцію генератор, використовуючи метод `next()`. Коли ми вперше викликаємо функцію генератора, `i` дорівнює `10`. Він зустрічає перше ключове слово `yield`, отримуючи значення `i`. Генератор тепер \"призупинено\", і `10` виводиться в консоль. Потім ми знову викликаємо функцію за допомогою методу `next()`. Вона запускається з того місця, де зупинилася раніше, все ще з `i`, що дорівнює `10`. Тепер він зустрічає наступне ключове слово `yield` і повертає `i * 2`. `i` дорівнює `10`, тому він повертає `10 * 2`, тобто `20`. Це призводить до 10, 20.",
      "correct": "C"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nconst firstPromise = new Promise((res, rej) => {\n  setTimeout(res, 500, \"один\");\n});\n\nconst secondPromise = new Promise((res, rej) => {\n  setTimeout(res, 100, \"два\");\n});\n\nPromise.race([firstPromise, secondPromise]).then((res) => console.log(res));\n`\n *A*: ``\"один\"``\n *B*: ``\"два\"``\n *C*: ``\"два\" \"один\"``\n *D*: ``\"один\" \"два\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Коли ми передаємо кілька промісів методу `Promise.race`, він розв'язує/відхиляє _перший_ проміс, який розв'язується/відхиляється. В метод `setTimeout` ми передаємо таймер: 500 мс для першого проміса (`firstPromise`) і 100 мс для другого проміса (`secondPromise`). Це означає, що `secondPromise` розв'язується першим зі значенням `'два'`. `res` тепер містить значення `'два'`, яке виводиться в консоль.",
      "correct": "B"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nlet person = { name: \"Lydia\" };\nconst members = [person];\nperson = null;\n\nconsole.log(members);\n`\n *A*: ``null``\n *B*: ``[null]``\n *C*: ``[{}]``\n *D*: ``[{ name: \"Lydia\" }]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Спочатку ми оголошуємо змінну `person` зі значенням об'єкта, у якого є властивість `name`. Потім ми оголошуємо змінну з ім'ям `members`. Ми встановлюємо перший елемент цього масиву рівним значенню змінної `person`. Об'єкти взаємодіють за допомогою _посилань_ при встановленні їх рівними один одному. Коли ви призначаєте посилання з однієї змінної в іншу, ви створюєте _копію_ цього посилання. (зверніть увагу, що у них _не однакові_ посилання!) Потім ми присвоюємо змінній `person` значення `null`. Ми змінили лише значення змінної `person`, а не перший елемент у масиві, оскільки цей елемент має інше (скопійоване) посилання на об'єкт. Перший елемент в `members` все ще містить посилання на вихідний об'єкт. Коли ми виводимо в консоль масив `members`, перший елемент все ще містить значення об'єкта, яке виводиться в консоль.",
      "correct": "D"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nconst person = {\n  name: \"Lydia\",\n  age: 21,\n};\n\nfor (const item in person) {\n  console.log(item);\n}\n`\n *A*: ``{ name: \"Lydia\" }, { age: 21 }``\n *B*: ``\"name\", \"age\"``\n *C*: ``\"Lydia\", 21``\n *D*: ``[\"name\", \"Lydia\"], [\"age\", 21]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "За допомогою циклу `for-in` ми можемо перебирати ключі об'єкта, в даному випадку `name` та `age`. Під капотом ключі об'єкта є рядками (якщо вони не є Symbol). У кожному циклі ми встановлюємо значення `item` рівним поточному ключу, за яким він перебирається. Спочатку, `item` дорівнює `name`, і виводиться в консоль. Потім `item` дорівнює `age`, який виводиться в консоль.",
      "correct": "B"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nconsole.log(3 + 4 + \"5\");\n`\n *A*: ``\"345\"``\n *B*: ``\"75\"``\n *C*: ``12``\n *D*: ``\"12\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Асоціативність операторів - це порядок, в якому компілятор оцінює вирази, зліва направо або справа наліво. Це відбувається тільки в тому випадку, якщо всі оператори мають _однаковий_ пріоритет. У нас є тільки один тип оператора: `+`. Крім того, асоціативність зліва направо. `3 + 4` оцінюється першим. Це призводить до числа `7`. `7 + '5'` призводить до `\"75\"` через приведення типу. JavaScript перетворює число `7` в рядок, див. питання 15. Ми можемо об'єднати два рядки, використовуючи оператор `+`. `\"7\" + \"5\"` призводить до `\"75\"`.",
      "correct": "B"
    },
    {
      "title": "Яке значення `num`?",
      "code": "`javascript\nconst num = parseInt(\"7*6\", 10);\n`\n *A*: ``42``\n *B*: ``\"42\"``\n *C*: ``7``\n *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Тільки перші числа в рядку повертаються. На основі _системи числення_ (другий аргумент, щоб вказати, до якого типу чисел ми хочемо його аналізувати: основа 10, шістнадцяткове, вісімкове, двійкове і т.д.), `parseInt` перевіряє, чи є символи в рядку допустимими. Як тільки він зустрічає символ, який не є допустимим числом в основі, він припиняє синтаксичний аналіз і ігнорує наступні символи. `*` не є допустимим числом. Він тільки розбирає `\"7\"` в десяткове `7`. `num` тепер містить значення `7`.",
      "correct": "C"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\n[1, 2, 3].map((num) => {\n  if (typeof num === \"number\") return;\n  return num * 2;\n});\n`\n *A*: ``[]``\n *B*: ``[null, null, null]``\n *C*: ``[undefined, undefined, undefined]``\n *D*: ``[ 3 x empty ]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "При використанні методу map, значення `num` дорівнює елементу, над яким він в даний момент зациклюється. В цьому випадку елементи є числами, тому умова оператора if `typeof num === \"number\"` завжди повертає `true`. Функція map створює новий массив і вставляє значення, які повертаються функцією. Однак ми нічого не повертаємо. Коли ми не повертаємо значення з функції, функція за замовчуванням повертає значення `undefined`. Для кожного елемента в масиві викликається функціональний блок, тому для кожного елемента ми повертаємо `undefined`.",
      "correct": "C"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nfunction getInfo(member, year) {\n  member.name = \"Lydia\";\n  year = 1998;\n}\n\nconst person = { name: \"Sarah\" };\nconst birthYear = \"1997\";\n\ngetInfo(person, birthYear);\n\nconsole.log(person, birthYear);\n`\n *A*: ``{ name: \"Lydia\" }, \"1997\"``\n *B*: ``{ name: \"Sarah\" }, \"1998\"``\n *C*: ``{ name: \"Lydia\" }, \"1998\"``\n *D*: ``{ name: \"Sarah\" }, \"1997\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Аргументи передаються _за значенням_, якщо їх значення не є об'єктом, то вони передаються _посиланням_. `birthYear` передається за значенням, оскільки це рядок, а не об'єкт. Коли ми передаємо аргументи за значенням, створюється _копія_ цього значення (див. питання 46). Переменна `birthYear` має посилання на значення `\"1997\"`. Аргумент `year` також має посилання на значення `\"1997\"`, але це не те саме значення, на яке є посилання для `birthYear`. Коли ми оновлюємо значення `year`, встановлюючи `year` рівним `\"1998\"`, ми оновлюємо тільки значення `year`. `birthYear` все ще дорівнює `\"1997\"`. Значення `person` є об'єктом. Аргумент `member` має (скопійоване) посилання на _той самий_ об'єкт. Коли ми змінюємо властивість об'єкта, на який `member` посилається, значення `person` також буде змінено, оскільки вони обидва мають посилання на один і той же об'єкт. Властивість `name` об'єкта `person` тепер дорівнює значенню `\"Lydia\"`.",
      "correct": "A"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nfunction greeting() {\n  throw \"Hello world!\";\n}\n\nfunction sayHi() {\n  try {\n    const data = greeting();\n    console.log(\"It worked!\", data);\n  } catch (e) {\n    console.log(\"Oh no an error:\", e);\n  }\n}\n\nsayHi();\n`\n *A*: ``It worked! Hello world!``\n *B*: ``Oh no an error: undefined``\n *C*: ``SyntaxError: can only throw Error objects``\n *D*: ``Oh no an error: Hello world!``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "За допомогою оператора `throw` ми можемо створювати власні помилки. З цим оператором ви можете генерувати винятки. Винятком може бути *рядок*, *число*, *логічне значення* або *об'єкт*. В цьому випадку нашим винятком є рядок `'Hello world'`. За допомогою оператора `catch` ми можемо вказати, що робити, якщо в блоці `try` викидається виняток. Виняток: рядок `'Hello world'`. `e` тепер дорівнює тому рядку, який ми записуємо. Це призводить до `'Oh no an error: Hello world'`.",
      "correct": "D"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\nfunction Car() {\n  this.make = \"Lamborghini\";\n  return { make: \"Maserati\" };\n}\n\nconst myCar = new Car();\nconsole.log(myCar.make);\n`\n *A*: ``\"Lamborghini\"``\n *B*: ``\"Maserati\"``\n *C*: ``ReferenceError``\n *D*: ``TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Коли ви повертаєте властивість, значення властивості дорівнює _значенню, що повертається_, а не значенню, встановленому у функції конструктора. Ми повертаємо рядок `\"Maserati\"`, тому `myCar.make` дорівнює `\"Maserati\"`.",
      "correct": "B"
    },
    {
      "title": "Яким буде результат?",
      "code": "`javascript\n(() => {\n  let x = (y = 10);\n})();\n\nconsole.log(typeof x);\nconsole.log(typeof y);\n`\n *A*: ``\"undefined\", \"number\"``\n *B*: ``\"number\", \"number\"``\n *C*: ``\"object\", \"number\"``\n *D*: ``\"number\", \"undefined\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "`let x = y = 10;` насправді є скороченням для:  `javascript y = 10; let x = y; `  Коли ми встановлюємо `y` рівним `10`, ми фактично додаємо властивість `y` до глобального об'єкта (`window` в браузері, `global` в Node). В браузері `window.y` тепер дорівнює `10`.  Потім ми оголошуємо змінну `x` зі значенням `y`, яке дорівнює `10`. Змінні, оголошені з ключовим словом `let`, мають _блокову видимість_, вони визначені тільки в блоку, в якому вони оголошені; негайно викликана функція (IIFE) в цьому випадку. Коли ми використовуємо оператор `typeof`, операнд `x` не визначено: ми намагаємося отримати доступ до `x` поза блоком, в якому він оголошений. Це означає, що `x` не визначено. Значення, яким не присвоєно або не оголошено значення, мають тип `\"undefined\"`. `console.log(typeof x)` повертає `\"undefined\"`.  Однак ми створили глобальну змінну `y`, встановивши `y` рівним `10`. Це значення доступне в будь-якому місці нашого коду. `y` визначено і містить значення типу `\"number\"`. `console.log(typeof y)` повертає `\"number\"`.",
      "correct": "A"
    },
    {
      "title": "Який буде вивід?",
      "code": "`javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nDog.prototype.bark = function () {\n  console.log(`Woof I am ${this.name}`);\n};\n\nconst pet = new Dog(\"Mara\");\n\npet.bark();\n\ndelete Dog.prototype.bark;\n\npet.bark();\n`\n *A*: ``\"Woof I am Mara\"`, `TypeError``\n *B*: ``\"Woof I am Mara\"`, `\"Woof I am Mara\"``\n *C*: ``\"Woof I am Mara\"`, `undefined``\n *D*: ``TypeError`, `TypeError``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Ми можемо видаляти властивості з об'єктів, використовуючи ключове слово `delete`, також і в прототипі. Видаляючи властивість в прототипі, вона більше не доступна в ланцюжку прототипів. В цьому випадку функція `bark` більше не доступна в прототипі після `delete Dog.prototype.bark`, але ми все ще намагаємося отримати до неї доступ. Коли ми намагаємося викликати щось, що не є функцією, викидається `TypeError`. В цьому випадку `TypeError: pet.bark не є функцією`, оскільки `pet.bark` є `undefined`.",
      "correct": "A"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst set = new Set([1, 1, 2, 3, 4]);\n\nconsole.log(set);\n`\n *A*: ``[1, 1, 2, 3, 4]``\n *B*: ``[1, 2, 3, 4]``\n *C*: ``{1, 1, 2, 3, 4}``\n *D*: ``{1, 2, 3, 4}``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Об'єкт `Set` є колекцією _унікальних_ значень: значення може з'являтися тільки один раз в наборі. Ми передали послідовність `[1, 1, 2, 3, 4]` з повторюваним значенням `1`. Оскільки в наборі не може бути двох однакових значень, одне з них видаляється. Це призводить до `{1, 2, 3, 4}`.",
      "correct": "D"
    },
    {
      "title": "Який буде вивід?",
      "code": "`javascript\n// counter.js\nlet counter = 10;\nexport default counter;\n`\n *A*: ``10``\n *B*: ``11``\n *C*: ``Error``\n *D*: ``NaN``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Імпортований модуль є _read-only_: ви не можете змінити імпортований модуль. Тільки модуль, який їх експортує, може змінити його значення. Коли ми намагаємося збільшити значення `myCounter`, викидається помилка: `myCounter` доступний тільки для читання і не може бути змінений.",
      "correct": "C"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst name = \"Lydia\";\nage = 21;\n\nconsole.log(delete name);\nconsole.log(delete age);\n`\n *A*: ``false`, `true``\n *B*: ``\"Lydia\"`, `21``\n *C*: ``true`, `true``\n *D*: ``undefined`, `undefined``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Оператор `delete` використовується для видалення властивостей з об'єктів. Змінні, оголошені за допомогою `const`, `let` або `var`, не є властивостями об'єктів, тому їх не можна видалити за допомогою `delete`. Проте, за відсутності ключового слова `var`, `let` або `const` перед `age = 21;`, JavaScript інтерпретує це як створення глобальної властивості `age`. Оскільки `age` є властивістю глобального об'єкта, її можна видалити, і `delete age` поверне `true`. Таким чином, правильна відповідь: **A**. `delete name` поверне `false`, оскільки `name` є константою і не може бути видалена, а `delete age` поверне `true`, оскільки `age` є глобальною властивістю.",
      "correct": "A"
    },
    {
      "title": "Який буде вивід?",
      "code": "`javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst [y] = numbers;\n\nconsole.log(y);\n`\n *A*: ``[[1, 2, 3, 4, 5]]``\n *B*: ``[1, 2, 3, 4, 5]``\n *C*: ``1``\n *D*: ``[1]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Деструктуризація масивів дозволяє витягти значення з масиву і присвоїти їх змінним. В даному випадку, ми витягаємо перший елемент масиву `numbers` і присвоюємо його змінній `y`. Таким чином, `y` буде дорівнювати `1`. Правильна відповідь: **C**.",
      "correct": "C"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst user = { name: \"Lydia\", age: 21 };\nconst admin = { admin: true, ...user };\n\nconsole.log(admin);\n`\n *A*: ``{ admin: true, user: { name: \"Lydia\", age: 21 } }``\n *B*: ``{ admin: true, name: \"Lydia\", age: 21 }``\n *C*: ``{ admin: true, user: [\"Lydia\", 21] }``\n *D*: ``{ admin: true }``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Можна комбінувати об'єкти за допомогою оператора розповсюдження `...`. Це дозволяє створювати копії пар ключ/значення одного об'єкта і додавати їх в інший об'єкт. В цьому випадку ми створюємо копії об'єкта `user` і додаємо їх в об'єкт `admin`. Об'єкт `admin` тепер містить скопійовані пари ключ/значення, що призводить до `{admin: true, name: \"Lydia\", age: 21}`.",
      "correct": "B"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst person = { name: \"Lydia\" };\n\nObject.defineProperty(person, \"age\", { value: 21 });\n\nconsole.log(person);\nconsole.log(Object.keys(person));\n`\n *A*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\", \"age\"]``\n *B*: ``{ name: \"Lydia\", age: 21 }`, `[\"name\"]``\n *C*: ``{ name: \"Lydia\"}`, `[\"name\", \"age\"]``\n *D*: ``{ name: \"Lydia\"}`, `[\"age\"]``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "За допомогою методу `defineProperty` ми можемо додавати нові властивості до об'єкта або змінювати існуючі. Коли ми додаємо властивість до об'єкта за допомогою методу `defineProperty`, вони за замовчуванням _не перелічувані_. Метод `Object.keys` повертає всі імена _enumerable_ властивостей об'єкта, в даному випадку тільки `\"name\"`. Властивості, додані за допомогою методу `defineProperty`, за замовчуванням незмінні. Ви можете перевизначити цю поведінку, використовуючи властивості `writable`, `configurable` та `enumerable`. Таким чином, метод `defineProperty` дає вам набагато більший контроль над властивостями, які ви додаєте до об'єкта.",
      "correct": "B"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst settings = {\n  username: \"lydiahallie\",\n  level: 19,\n  health: 90,\n};\n\nconst data = JSON.stringify(settings, [\"level\", \"health\"]);\nconsole.log(data);\n`\n *A*: ``\"{\"level\":19, \"health\":90}\"``\n *B*: ``\"{\"username\": \"lydiahallie\"}\"``\n *C*: ``\"[\"level\", \"health\"]\"``\n *D*: ``\"{\"username\": \"lydiahallie\", \"level\":19, \"health\":90}\"``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Другий аргумент `JSON.stringify` - це _replacer_. Замінювач може бути або функцією, або масивом, і дозволяє вам контролювати, що і як повинні бути перетворені в значення. Якщо замінювач є _масивом_, тільки властивості, імена яких включені в масив, будуть додані в рядок JSON. В цьому випадку включаються тільки властивості з іменами `\"level\"` і `\"health\"`, `\"username\"` виключається. `data` тепер дорівнює `\"{\"level\":19, \"health\":90}\"`. Якщо замінювач є _function_, ця функція викликається для кожної властивості об'єкта, який ви перетворюєте. Значення, що повертається з цієї функції, буде значенням властивості при додаванні в рядок JSON. Якщо значення дорівнює undefined, ця властивість виключається з рядка JSON.",
      "correct": "A"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nlet num = 10;\n\nconst increaseNumber = () => num++;\nconst increasePassedNumber = (number) => number++;\n\nconst num1 = increaseNumber();\nconst num2 = increasePassedNumber(num1);\n\nconsole.log(num1);\nconsole.log(num2);\n`\n *A*: ``10`, `10``\n *B*: ``10`, `11``\n *C*: ``11`, `11``\n *D*: ``11`, `12``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Унарний оператор `++` _спочатку повертає_ значення операнда, _потім збільшує_ значення операнда. Значення `num1` дорівнює `10`, так як функція збільшення спочатку повертає значення `num`, яке дорівнює `10`, і тільки потім збільшує значення `num`. `num2` - це `10`, так як ми передали `num1` в `incpasePassedNumber`. `number` дорівнює `10` (значення `num1`). Знову ж таки, унарний оператор `++` _спочатку повертає_ значення операнда, _потім збільшує_ значення операнда. Значення `number` дорівнює `10`, тому `num2` дорівнює `10`.",
      "correct": "A"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\nconst value = { number: 10 };\n\nconst multiply = (x = { ...value }) => {\n  console.log((x.number *= 2));\n};\n\nmultiply();\nmultiply();\nmultiply(value);\nmultiply(value);\n`\n *A*: ``20`, `40`, `80`, `160``\n *B*: ``20`, `40`, `20`, `40``\n *C*: ``20`, `20`, `20`, `40``\n *D*: ``NaN`, `NaN`, `20`, `40``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "В ES6 ми можемо ініціалізувати параметри значенням за замовчуванням. Значенням параметра буде значення за замовчуванням, якщо жодне інше значення не було передано функції, або якщо значення параметра дорівнює `\"undefined\"`. В цьому випадку ми розповсюджуємо властивості об'єкта `value` на новий об'єкт, тому значення `x` за замовчуванням дорівнює `{number: 10}`. Аргумент за замовчуванням реалізується в момент _call time_! Кожен раз, коли ми викликаємо функцію, створюється _new_ об'єкт. Ми викликаємо функцію `multiply` перші два рази, не передаючи значення: `x` має значення за замовчуванням `{number: 10}`. Потім ми записуємо помножене значення цього числа, яке дорівнює `20`. В третій раз, коли ми викликаємо multiply, ми передаємо аргумент: об'єкт з іменем `value`. Оператор `*=` насправді є скороченням для `x.number = x.number * 2`: ми змінюємо значення `x.number` і записуємо помножене значення `20`. В четвертий раз ми знову передаємо об'єкт `value`. `x.number` раніше було змінено на `20`, тому `x.number *= 2` записує `40`.",
      "correct": "C"
    },
    {
      "title": "Яким буде вивід?",
      "code": "`javascript\n[1, 2, 3, 4].reduce((x, y) => console.log(x, y));\n`\n *A*: ``1` `2`, `3` `3` і `6` `4``\n *B*: ``1` `2`, `2` `3` і `3` `4``\n *C*: ``1` `undefined`, `2` `undefined`, `3` `undefined` і `4` `undefined``\n *D*: ``1` `2`, `undefined` `3` і `undefined` `4``",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "Першим аргументом, який отримує метод `reduce`, є _акумулятор_, в даному випадку `x`. Другий аргумент - це _поточне значення_, `y`. За допомогою методу `reduce` ми виконуємо функцію зворотного виклику для кожного елемента в масиві, що в кінцевому підсумку може призвести до єдиного значення. В цьому прикладі ми не повертаємо ніяких значень, ми просто реєструємо значення акумулятора і поточне значення. Значення акумулятора дорівнює раніше поверненому значенню функції зворотного виклику. Якщо ви не передасте необов'язковий аргумент `initialValue` методу `reduce`, акумулятор буде дорівнювати першому елементу при першому виклику. При першому виклику акумулятор (`x`) дорівнює `1`, а поточне значення (`y`) дорівнює `2`. Ми не повертаємось з функції зворотного виклику, ми реєструємо акумулятор і поточне значення: `1` і `2` реєструються. Якщо ви не повертаєте значення з функції, вона повертає значення `undefined`. При наступному виклику акумулятор дорівнює `undefined`, а поточне значення дорівнює 3. `undefined` і `3` будуть зареєстровані. При четвертому виклику ми знову не повертаємось з функції зворотного виклику. Акумулятор знову дорівнює `undefined`, а поточне значення дорівнює `4`. `undefined` і `4` будуть зареєстровані.",
      "correct": "D"
    },
    {
      "title": "За допомогою якого конструктора ми можемо успішно розширити клас `Dog`?",
      "code": "```javascript\nclass Dog {\n  constructor(name) {\n    this.name = name;\n  }\n};\n\nclass Labrador extends Dog {\n  // 1\n  constructor(name, size) {\n    this.size = size;\n  }\n  // 2\n  constructor(name, size) {\n    super(name);\n    this.size = size;\n  }\n  // 3\n  constructor(size) {\n    super(name);\n    this.size = size;\n  }\n  // 4\n  constructor(name, size) {\n    this.name = name;\n    this.size = size;\n  }\n\n};\n```",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "У похідному класі ви не можете отримати доступ до ключового слова `this` до виклику `super`. Якщо ви спробуєте це зробити, буде кинуто ReferenceError: 1 і 4 призведуть до помилки посилання. За допомогою ключового слова `super` ми викликаємо конструктор батьківського класу із заданими аргументами. Конструктор батька приймає аргумент `name`, тому нам потрібно передати `name` у `super`. Клас `Labrador` приймає два аргументи: `name`, оскільки він розширює `Dog`, і `size` як додаткову властивість класу `Labrador`. Вони обидва мають бути передані у функцію конструктора у `Labrador`, що зроблено правильно за допомогою конструктора 2.",
      "correct": "B"
    },
    {
      "title": "Яким буде вивід?",
      "code": "```javascript\n// index.js\nconsole.log(\"running index.js\");\nimport { sum } from \"./sum.js\";\nconsole.log(sum(1, 2));\n\n// sum.js\nconsole.log(\"running sum.js\");\nexport const sum = (a, b) => a + b;\n```",
      "answers": [
        "A",
        "B",
        "C",
        "D"
      ],
      "explanation": "За допомогою ключового слова `import` усі імпортовані модулі є _pre-parsed_. Це означає, що імпортовані модулі виконуються _першими_, код у файлі, який імпортує модуль, виконується _після_. У цьому різниця між `require()` у CommonJS і `import`! За допомогою `require()` ви можете завантажувати залежності на вимогу під час виконання коду. Якби ми використовували `require` замість `import`, у консоль було б виведено `running index.js`, `running sum.js`, `3`.",
      "correct": "B"
    }
  ]
};

export default questions;