
'use strict';

function Account(owner, balance = 0) {
  this.owner = owner;
  this.balance = balance;
}

Account.prototype.deposit = function (amount) {
  if (amount <= 0) {
    throw new Error('Сумма должна быть положительной');
  }

  this.balance += amount;
  return this.balance;
};

Account.prototype.info = function () {
  return `${this.owner}: ${this.balance} ₽`;
};

// ===== Проверки — не меняйте код ниже =====
const show = (value) => JSON.stringify(value, (key, v) => (v === undefined ? 'undefined' : v));

function check(title, fn, expected) {
  let actual;
  try {
    actual = fn();
  } catch (e) {
    actual = `ошибка: ${e.message}`;
  }
  if (show(actual) === show(expected)) {
    console.log(`✅ ${title}`);
  } else {
    console.log(`❌ ${title}`);
    console.log(`     ждали:    ${show(expected)}`);
    console.log(`     получили: ${show(actual)}`);
  }
}

check('owner и balance сохранились', () => {
  const acc = new Account('Аня', 100);
  return [acc.owner, acc.balance];
}, ['Аня', 100]);

check('баланс по умолчанию — 0', () => new Account('Борис').balance, 0);

check('deposit увеличивает баланс и возвращает его', () => {
  const acc = new Account('Аня', 100);
  return [acc.deposit(50), acc.balance];
}, [150, 150]);

check('info', () => {
  const acc = new Account('Аня', 100);
  acc.deposit(50);
  return acc.info();
}, 'Аня: 150 ₽');

check('отрицательная сумма — ошибка', () => new Account('Аня').deposit(-5), 'ошибка: Сумма должна быть положительной');
