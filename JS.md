# JavaScript キャッチアップメモ

## JavaScript の活躍場所

JSの活躍場所は

- Web Browser（クライアントサイド）
- Node.js（サーバーサイド）

など、色々あります。

フロントエンドのJavaScript:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome</title>
  </head>
  <body>
    <button id="hello">Push me!</button>
    <script>
      document.getElementById('hello').addEventListener('click', () => {
        alert('Hello world!')
      });
    </script>
  </body>
</html>
```

サーバーサイドのJavaScript(Node.js):
```javascript
const http = require('http');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world!\n');
});

server.listen(port, host, () => {
  console.log(`Server start at http://${host}:${port}/`);
});
```

※同じ言語で記述できるものの、使うフレームワークやエコシステムも千差万別なので
「似て非なるもの」と思っておいたほうが、あとあとがっかりしなくて済む気がします。

具体的には、ブラウザ上のJSはHTMLを始めとするDOMの操作やAjaxなどをメインに行うが、
サーバー上のJS(Node)は、OSやファイルシステムにおける多種多様な処理を行うことをメインとする事が多い。

## NodeJSで実行

### はじめの一歩

Node.jsをインストールすると、node コマンドが利用できるようになり、これは Node.js の REPL (Read-Eval-Print Loop) 環境を提供するほか、
JavaScript ファイルを引数で渡すことによって即時実行することが可能です。

nodeコマンドを実行:
```
$ node
> console.log('Hello world!');
Hello world!
undefined
>
```

スクリプトを引数にして実行:
```
$ cat app.js
----
function main() {
  console.log('Hello world!");
};
main();
----

$ node app.js
Hello world!
```

### npm と パッケージ管理

Node.js には npm というパッケージ管理システムが存在していて、世界中で公開されているライブラリやパッケージなどを利用することができます。

npm コマンドの場合:
```
# プロジェクトの初期化
$ npm init

# パッケージの検索
$ npm search <package>

# パッケージの追加（実行時に依存するパッケージの場合）
$ npm install --save <package>

# パッケージの追加（開発時に依存するパッケージの場合）
$ npm install --save-dev <package>

# パッケージの削除
$ npm uninstall <package>
```

yarn コマンドの場合:
```
# プロジェクトの初期化
$ yarn init

# パッケージの追加（実行時に依存するパッケージの場合）
$ yarn add <package>

# パッケージの追加（開発時に依存するパッケージの場合）
$ yarn add -D <package>

# パッケージの削除
$ yarn remove <package>
```

また、package.json の scripts にタスクを定義することで、npm / yarn コマンドから該当のタスクを呼び出すことができる。

```
$ npm run start
$ yarn run start
```

package.json の例:
```json
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "dist/index.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon --exec babel-node src/index.js --watch src",
    "build": "babel src -d dist",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.16.4",
    "morgan": "^1.9.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.4",
    "@babel/node": "^7.2.2",
    "@babel/preset-env": "^7.3.4",
    "nodemon": "^1.18.10"
  }
}
```

## JavaScriptの仕様とバージョン
### [CommonJS](https://ja.wikipedia.org/wiki/CommonJS)
JavaScriptの仕様の一つ。モジュール機能を実装したことにより、複数ファイルでのプログラム管理ができるようになった。
（モジュールの取り扱いは、 module.exports / require ）。

#### CommonJS記法(require):
```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server start');
});

module.exports = app;
```

### [EcmaScript](https://ja.wikipedia.org/wiki/ECMAScript)
JavaScriptの標準化のための規格/仕様。ES6あたりが大きな転換期になっていてES5以前などを指して旧JSなどと言ったりもする。すべての実行環境が最新の仕様に対応しているわけではないので、互換性確保のために*トランスパイラ*などと呼ばれるコード変換機能でComminJSやES5形式に変換する事が多い（[Babel](https://babeljs.io/)などが有名）。
（モジュールの取り扱いは、 export / import ）

 - (古いなにか)
 - ES5 互換性の最低互換ラインかな？
 - ES6(ES2015) (Class、Module、Promise, ArrowFunction, SpredOperator ...)
 - ES2016 (Array.prototype.includes ...)
 - ES2017 (async/await ...)
 - ES2018 ...
 - (新しいなにか)

#### ES Module 記法(import):
```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server start');
});

export default app;
```

ただし import 構文は、まだNode.js 標準では experimental 扱いのため、拡張子を .mjs にした上で --exprerimental-modules のオプションを付けて実行するか、babelなどを利用してES5にトランスパイルして実行する必要がある。(2019/10 node/v10時点)。

### [V8 Engine](https://github.com/v8/v8)
Google社製のJavaScriptの実行エンジンで、Google Chrome や Node.js などで採用されている。



## データ型
これ以上不可分な最小のデータの種類。プリミティブ型とも言う。

- Boolean
  - true
  - false
- Null
  - null
- Undefined
  - undefined
- Number
  - 1
  - 1.0
  - 0b1010 // -> 10
  - 0o644 // -> 511
  - 0xff // ->255
- String
  - 'a'
  - "a"
  - \`I'm ${name} .\` // -> テンプレート構文。中身の変数が展開される。
- BigInt
  - (意識して使ったこと無い)
- Symbol
  - (意識して使ったこと無い)

※JavaScript には暗黙の型変換がある。
```javascript
const value = 1 + "2"; // -> 文字列の "12"
```

## データ構造
識別子を用いて参照可能なデータ構造（ex. user[1] とか ）。基本はプリミティブなデータ以外は、大体がObjectと思っていいと思う。

- Object
  - Object
    - { name: 'taro', age: 20 }
  - Array
    - [1, 2, 3, 4, 5]
  - Class
    - class User { hello() { return 'Hello'; } }
  - function
    - function hello(name) { return 'Hello, ' + name; }

※ JavaScriptは、関数を変数に代入したり他関数の引数や戻り値などに利用できる性質を持っている（＝第一級オブジェクト、第一級関数）。

## 変数のスコープ
- var 関数
- (なし) グローバル
- const ブロックスコープ　[ES6/ES2015]
- let ブロックスコープ　[ES6/ES2015]

→ 基本的には const を使い、再代入が必要な場合には let を使う方針が良いよ。

```javascript
// 変数代入の際に型の宣言はいらない
var name = 'taro';

// varがないとグローバルスコープに変数ができる
//（変数名が衝突するかもしれないのであんまり良くない。グローバル汚染）
GREEDING = 'HELLO';

// const は定数宣言
const sports = 'baseball';
spots = 'soccer'; //　エラー！！

// let は最代入可能
let favorites = 'meat';
favorites = 'fish';
```

## JavaScriptの特徴
- スクリプト言語なのでコンパイルは要らない（トランスパイルは要るかも）。
- シングルスレッドのイベント駆動型のモデルである<br>→ コールバックなどを始めとする非同期処理を多用することがある。

## 制御構文
- 条件分岐<br>→ if / switch
- ループ<br>→ for / for-in / for-of / while
- 比較<br>→ 等値比較(==, !=)、同値比較(===, !==)
- 論理演算<br>→ &&(and), ||(or), !(not)

```javascript
// 比較における暗黙の型変換
console.log(1 == "1"); // => true
console.log(0 == false); // => true
console.log(10 == ["10"]); // => true

※ 基本的にに 同値比較(===, !==) を使いましょう・。
```

## 関数の宣言
```javascript
// 関数宣言
function 関数名(仮引数1, 仮引数2) {
    // 関数を呼び出された時の処理
    // ...
    return 関数の返り値;
}
// 関数呼び出し
const 関数の結果 = 関数名(引数1, 引数2);
console.log(関数の結果); // => 関数の返り値
```

- 呼び出し時の引数が少ないとき　→　仮引数に undefined が入る

## 関数宣言の種類

- 関数式

```javascript
function sayHello() {
  return 'Hello';
};

setTimeout(function showHello() {
  console.log('Hello');
}, 2000);
```

- 匿名関数(無名関数)
```javascript
const sayHello = function() {
  return 'Hello';
};

setTimeout(function() {
  console.log('Hello')
}, 2000);
```

- アロー関数
```javascript
const sayHello = () => {
  return 'Hello';
};

// オブジェクトのみを帰す場合には、()で囲むとreturn 文を省略できる。
// 引数がない場合には()は省略できる
const myObj = => ({ message: 'Hello!' });
```

- ※即時関数(あんまり使わない)
```javascript
((name) => {
  console.log("I'm " + name + " !");
})('Taro');
```

## コールバック関数

前述の通り、JavaScriptは、関数自体を変数や別の関数の引数に指定することができるので「処理のロジックそのもの」を別に関数に渡すことができる。
また、受け渡し先でコールバック処理自体にパラメータを渡すことができるので、使いこなすと多分とても便利だとおもう（小並感）。

```javascript
function repeat5Times(callback) {
  for(let i = 0; i < 5; i++) {
    callback(i);
  }
}

repeat5Times((time) => {
  console.log('バン！', time);
});

/*
バン！0
バン！1
バン！2
バン！3
バン！4
*/

repeat5Times((a) => {
  console.log('ドン！', a);
});

/*
ドン！0
ドン！1
ドン！2
ドン！3
ドン！4
*/
```

配列のソートなどでもよくでてくる。
```javascript
const array = [-10, 3, 5, 10, 55, 100, -1, ];

array.sort((a, b) => {
  return (a > b) ? 1 : (b > a) ? -1 : 0;
});
// -> [ -10, -1, 3, 5, 10,  55, 100 ]　※昇順

array.sort((a, b) => {
  return (a % 2 !== 0) ? 1 : (b % 2 !== 0) ? -1 : 0;
});
// -> [ -10,  10, 100, -1, 3, 5, 55 ]　※偶数優先（…意味あるかは謎…）
```

## 非同期処理

JavaScript の重要な特徴の一つとして「イベントループ型の非同期(ノンブロッキング)である」という点が挙げられる。例えば、一定時間後に関数を実行する setTimeout 関数を例にしてみます。

non-blocking.js:
```javascript
// 「Good Morning!」を表示する
console.log('Good Morning!');

// 2000 ms 後に「Hello!」を表示する
setTimeout(() => {
  console.log('Hello!');
}, 2000);

// 「Good Night!」を表示する
console.log('Good Night!');
```

これはsetTimeoutは、2秒経過後にコールバック関数として渡された関数を実行するわけですが、すべての処理を2秒止めるわけではなく、本流の処理はそのまま走らせた上で2秒経過したときに初めて関数が実行されます。
（ちなみに「コールバック関数を受け渡す形だから」といってすべてが非同期処理というわけではないことに注意。本質的にはあくまで「使用する関数が非同期関数（=イベント駆動）かどうか」で決まります。）

つまり、非同期関数の何が嬉しいかというと「時間のかかる処理（ファイルを読み書きする、ネットワーク通信をする、ユーザーの入力をまつ、等）」をバックグラウンドで監視しながら、本流の処理を止めることなく動作させることが可能になる。

非同期処理で書いた場合：
```javascript
import fs from 'fs';

fs.readFile('a_huge_file.txt', (data) => {
  // do something ...
  doSomethingAfterRead(data);
});

nextFunction();
```

⇒ どれだけ巨大なファイルであろうが、すぐに nextFunction() に処理が移り、ファイルが読み終わった段階で doSomethingAfterRead() が実行される。


同期処理で書いた場合：
```javascript
import fs from 'fs';

console.log('start');

const data = fs.readFileSync('a_huge_file.txt');
// do something ...
doSomethingAfterRead(data);

nextFunction();
```
⇒ ファイルが読み込み終わらないと doSomethingAfterRead() も nextFunction() も実行されないので、外部からはフリーズしたように見える。

### コールバック地獄

非同期関数を実行する場合、なにか指定の処理が終わった後に実行すべき処理をコールバック関数として渡すことが多いが、非同期関数の処理が重なっていくと、どんどんネストが深くなり可読性が下がる。


例）パスワードをファイルから読みとり、インターネットのAPIにアクセスし、その結果をテキストファイルに書き込む
```javascript
readPasswordFromFile('./myPassword.txt', (password) => {
  console.log('パスワードの読み込み完了！ password: ', password);
  getWeatherDataFromAPI('http://api.weather.example.com', password, (weatherData) => {
    console.log('APIからの情報取得完了！！ weatherData: ', weatherData);
    writeResultToFileatherData('./myWeatherData.txt', () => {
      console.log('ファイルへの書き込み完了！！！　やっとおわり！！！　読みにくい！！！')
    });
  });
});
```

### Promisep[ES6]
前述のコールバック地獄を抜け出すための手段として ES6 で実装した Promise というものがある（thenを呼び出せるオブジェクトを "thenable" と言ったりする）。

⇒ 最初だけ非同期で、その後は同期的な処理をする場合には非同期関数を
```javascript
const promise = new Promise((resolve, reject) => {
  // resolve / reject が呼び出されるまで処理を待ち、
  // resolve が呼び出されると直後の then メソッドのコールバックの引数に結果が入り、
  // reject が呼び出されると catch メソッドのコールバックの引数に結果が入る

  setTimeout(() => {
    resolve('A');  // 3秒経過して resolve が呼ばれた段階で次の then に処理が移る。
  }, 3000);
})
.then((result) => {
  // result には　直前の thenable で resolve() または return された結果が入っている。 -> A
  return "**" + result + "**";
})
.then((result) => {
  // result には　直前の thenable で resolve() または return された結果が入っている。 -> **A**
  return "((" + result + "))";
})
.then((result) => {
  // result には　直前の thenable で resolve() または return された結果が入っている。 -> **A**
  throw new Error('some error'); // 意図的にエラーを起こしてみる
  return "++" + result + "++";
})
.catch((error) => {
  // error には 途中で起きたエラーオブジェクトが入っている。
});
```

⇒ 非同期処理を重ねたい場合には、はじめに非同期関数を Promise でラップして thenable にし、それを return すれば良い。
```javascript
const readPasswordFromFilePromise = new Promise((resolve) => {
  readPasswordFromFile('./myPasswordFile.txt', (password) => {
    resolve(password); // -> こうすると、続く then のコールバック関数の引数に password が渡る。
  });
});

const getWeatherDataFromAPIPromise = new Promise((resolve) => {
  getWeatherDataFromAPI('http://api.weather.example.com', password, (weatherData) => {
    resolve(weatherData); // -> こうすると、続く then のコールバック関数の引数に weratherData が渡る。
  });
});

const writeResultToFilePromise = new Promise((resolve) => {
  writeResultToFile('./myWeatherData.txt', () => {
    resolve(); // -> 返却するものがなくても、resolve を呼ばないと、待機が終了しない。
  });
});

// メイン処理がスッキリ！！（ネストが1階層で済む）
readPasswordFromFilePromise()
  .then((password) => {
    return getWeatherFromAPIPromise(password);
  })
  .then((weatherData) => {
    return writeResultToFilePromise(weatherData);
  })
  .then(() => {
    console.log('やったぜ！')
  });
```

### async / await [ES7]

前述の Promise 構文でもネストが浅くなったことで可読性が高まったが、更に async / await 構文を使うことで、
Promise オブジェクトを同期的に記述することができる。（asyncは修飾子、awaitは演算子らしい。）

ただし、注意としては await 演算子は、async修飾子をつけて宣言された関数内でしか使用することができない。

```javascript
const readPasswordFromFilePromise = new Promise((resolve) => {
  readPasswordFromFile('./myPasswordFile.txt', (password) => {
    resolve(password); // -> こうすると、続く then のコールバック関数の引数に password が渡る。
  });
});

const getWeatherDataFromAPIPromise = new Promise((resolve) => {
  getWeatherDataFromAPI('http://api.weather.example.com', password, (weatherData) => {
    resolve(weatherData); // -> こうすると、続く then のコールバック関数の引数に weratherData が渡る。
  });
});

const writeResultToFilePromise = new Promise((resolve) => {
  writeResultToFile('./myWeatherData.txt', () => {
    resolve(); // -> 返却するものがなくても、resolve を呼ばないと、待機が終了しない。
  });
});

// メイン処理がスッキリ！！（これまでの同期処理と同じ様に書くことができる。）
async function main() {
  const password = await readPasswordFromFilePromise(); // ここが終わるまで待つ…
  const weatherData = await getWeatherFromAPIPromise(password); // ここが終わるまで待つ…
  await writeResultToFilePromise(weatherData); // ここが終わるまで待つ…
  console.log('やったぜ！！！！');
}
```

ただし、結局のところはメイン処理をブロッキングしていることと同義なので、何でもかんでも await で待てばよいというものではない。

```javascript
import fs from 'fs';

// ファイルの中から何かを読み出してくれる関数（※Promiseを返却してくれる）
function getDataFromFile(file) {
  return new Promise((resolve) => {
    fs.readFile(file, (err, data) => {
      resolve(data);
    })
  });
});

async function main() {
  const result001 = await getDataFromFile('./001.txt');
  const result002 = await getDataFromFile('./002.txt');
  const result003 = await getDataFromFile('./003.txt');
  // 続く…
  const result098 = await getDataFromFile('./098.txt');
  const result099 = await getDataFromFile('./099.txt');
  const result100 = await getDataFromFile('./100.txt');

  console.log('全部終わったよ');
};

main(); // 100秒後にやっと終わる。。。
```

このとき、1回のファイルの読み出しに1秒かかるとすると、直列実行すると100秒経過しないと処理が終わらない。
もし、他の処理に依存しない Promise の場合には、並列実行してできるだけ処理を早く終わらせるように実装しなければならない。


Promise.all()の例：
```javascript
import fs from 'fs';

// ファイルの中から何かを読み出してくれる関数（※Promiseを返却してくれる）
function getDataFromFile(file) {
  return new Promise((resolve) => {
    fs.readFile(file, (err, data) => {
      resolve(data);
    })
  });
});

async function main() {
  const results = await Promise.all([
    getDataFromFile('./001.txt'),
    getDataFromFile('./002.txt'),
    getDataFromFile('./003.txt'),
    // 続く…
    getDataFromFile('./098.txt'),
    getDataFromFile('./099.txt'),
    getDataFromFile('./100.txt')
  ]); // Promise.all() を利用することで平行にPromiseを実行できる。

  console.log('全部終わったよ');
};

main(); // 同時並行でできるので早く終る！
```

Promise の同時処理に関しては、以下の2つを覚えておけば良いかなと。
```javascript
const resultAll = await Promise.all([
  thenable1,
  thenable2,
  // Promise オブジェクトの配列を引数として渡す
]);
// すべての処理結果を取得して配列に含めるまで待機する Promise　オブジェクトが返却される。
// (したがって、await をつけて実行すれば、すべての処理結果が含まれた配列が取り出せる)

const resultRace = await Promise.race([
  thenable1,
  thenable2,
  // Promise オブジェクトの配列を引数として渡す
]);
// 渡された Promise オブジェクトのうち、最速で実行し終わる Promise　オブジェクトが返却される。
// (したがって、await をつけて実行すれば、最速の処理のものだけが取り出せる。他の処理も同時実行されているが結果は無視される。)
```


## クラス構文(ES6)

```javascript
class Human {
  // コンストラクター
  constructor(firstName, lastName) {
    // プロパティ
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // ゲッター
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  // セッター
  set fullName(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // メソッド
  greet() {
    console.log(`Hello! I'm ${this.firstName} ${this.lastName} !`);
  }
}

const human = new Human('taro', 'tanaka');
human.greet(); // "Hello! I'm taro tanaka"

// クラスの継承
class BaseballPlayer extends Human {
  constructor(firstName, lastName) {
    // 親クラスのコンストラクタを呼ぶ
    super(firstName, lastName)
  }

  hit() {
    console.log('カキーン！');
  }
};

const player = new BaseballPlayer('taro', 'tanaka');
player.greet(); // "Hello! I'm taro tanaka"
player.hit(); // "カキーン"
```

## 覚えておくと良いもの

### よく使うグローバルオブジェクト
特にインポートしたり、宣言したりしなくても使えるオブジェクト。必要に応じて覚えればよかろう。

```javascript
// console オブジェクト
console.log('hogehoge')
console.error()
console.dir()

// process　オブジェクト（Node環境限定）
process.env // 環境変数とかが入っているオブジェクト。”NODE_ENV=production node index.js” とかって実行すると、process.env.NODE_ENV に 'production'が入っている。パスワードとかソース上に記載したくないものを受け渡したりする
process.exit(-1) // 実行プロセスを強制終了するメソッド。強制的に異常終了させたいときに使ったりする。

// window オブジェクト（ブラウザ環境限定）
window.innerHeight // ブラウザの表示領域の高さ
window.innerWidth // ブラウザの表示領域の高さ
```

### よく使うデータオブジェクトのメソッド
```javascript
// JSON


// Object
const obj = {
  name: 'taro',
  age: 20,
  sex: 'M'
};

Object.keys(obj); // -> キーの配列を取得　[ 'name', 'age', 'sex' ]
Object.values(obj); // -> バリューの配列を取得　[ 'taro', 20, 'M' ]

//　Array
const array = [ 1, 2, 3, 4, 5 ];

array.forEach((value, index) => {
  console.log(value * 2, index);
});
/*
  値を一つずつ取り出して何かをする。コールバックの2つ目の引数にはindexが入る。単純に繰り返すときに使う。
  2 1
  4 2
  6 3
  8 4
  10 5
*/

const result = array.map((value, index) => {
  return value * 5;
});
/*
　result にはコールバックで返却された値の配列が含まれる。新しい配列を生成したいときに使う。
  -> [5, 10, 15, 20, 25 ]
*/

const result = array.reduve((acc, crr, idx, arr) => {
  return acc += crr;
});
/*
  result には配列を渡り歩いて計算した結果が格納されている。1つの値にまとめたいとき。
  => 15
*/
```


### よく使う標準モジュール
```javascript
import fs from 'fs'; // ファイルモジュール

fs.readFile('./data.txt', 'utf-8', (err, data) => {
  console.log(data);
});

```

## 参考文献
- [js-primer](https://jsprimer.net/)


