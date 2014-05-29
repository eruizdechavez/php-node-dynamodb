php-node-dynamodb
==============

A quick example of Node.js reading PHP session on DynamoDB

Requirements
------------

[PHP](http://www.php.net/) (5.4+), [Composer](https://getcomposer.org/), [Node.js](http://nodejs.org/), [DynamoDB Local](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html) (executable files and demo database included with this source).

Install
-------

Open a terminal, `cd` into this project's folder and execute this 2 commands:

```sh
composer install
npm install
```

Run
---

On one terminal window run:

```sh
java -Djava.library.path=./dynamodb/DynamoDBLocal_lib -jar ./dynamodb/DynamoDBLocal.jar -port 8001 -dbPath ./dynamodb/
```

On a different terminal (without closing the previous one) run:

```sh
php -S localhost:8000
```

On a different terminal (without closing the two previous) run:

```sh
node index.js
```

Finally, with both applications running, open your browser and go to [http://localhost:8000](http://localhost:8000)
