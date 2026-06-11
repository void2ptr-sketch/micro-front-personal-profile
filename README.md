# personal-profile

Модуль персонального профиля пользователя на Angular. Подключается в другие проекты и расширяется плагинами (безопасность, локализация и др.).

## Стек

- Angular 19 (standalone components)
- TypeScript, SCSS
- Angular Material
- Signal API для состояния
- `@angular/localize` + runtime i18n (ru, en, zh)
- HttpClient + interceptors (auth, errors, mock API)

## Структура проекта

```
src/app/
├── core/           # layout, API, state, domain
├── features/       # home, security, locale
├── shared/         # pipes, security utils
└── smoke/          # smoke-тесты

src/locale/         # файлы переводов по языкам
src/environments/   # конфигурация контуров (local, dev, test, lt, preprod, prod)
```

## Контуры (environments)

Каждый контур — отдельный файл в `src/environments/`:

| Контур   | Файл                       | Сборка / запуск                    |
| -------- | -------------------------- | ---------------------------------- |
| LOCAL    | `environment.local.ts`     | `npm start` / `npm run build:local` |
| DEV      | `environment.dev.ts`       | `npm run start:dev` / `build:dev`  |
| TEST     | `environment.test.ts`      | `npm run start:test` / `build:test` |
| LT       | `environment.lt.ts`        | `npm run start:lt` / `build:lt`    |
| PREPROD  | `environment.preprod.ts`   | `npm run start:preprod` / `build:preprod` |
| PROD     | `environment.prod.ts`    | `npm run build:prod`               |

По умолчанию `environment.ts` указывает на LOCAL (localhost, mock API). Angular подменяет файл через `fileReplacements` в `angular.json`.

## Требования

- Node.js 22+
- npm 10+

## Установка

```bash
npm install
```

Секреты и локальные переменные — в `.env.local` (см. `.env.example`). Не коммитьте файлы с секретами.

## Запуск

```bash
# dev-сервер
npm start

# открыть http://localhost:4200
```

## Сборка

```bash
# production
npm run build:prod

# артефакты: dist/personal-profile/
```

## Тесты и качество

```bash
npm test              # unit-тесты (watch)
npm run test:ci       # CI: headless, без watch
npm run lint          # ESLint
npm run format:check  # Prettier
npm run audit         # проверка зависимостей
npm run ci            # lint + build:prod + test:ci
```

## CI

GitHub Actions (`.github/workflows/ci.yml`): на push/PR в `main` выполняются lint, production build и тесты.

## Маршруты

| Путь        | Описание        |
| ----------- | --------------- |
| `/home`     | Главная         |
| `/security` | Смена пароля    |
| `/locale`   | Выбор языка     |

## Дополнительно

План задач — в [TASKS.md](TASKS.md).
