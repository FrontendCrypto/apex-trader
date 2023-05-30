![image](https://github.com/FrontendCrypto/tickerboard-vue/assets/4659020/c1af6cb9-cffb-49df-83cb-aaa6b6b9ab4b)

# TickerBoardVue

TickerBoard is a web application (work in progress) that displays real-time information about different cryptocurrencies. It aims to allow users to track the price and balance of various cryptocurrencies and will provide a chart to visualize their price trends (currently under development).

- The project uses the `@heroicons/vue` library for easily incorporating Heroicons into the Vue components.
- It also includes the `pinia` library for state management.
- The `sass` package is used for Sass/SCSS support in the project.
- Vue Router is not included in the dependencies, so if you need routing capabilities, you'll need to install and configure it separately.
- The project uses Vue 3 and Vuex 4 for state management.


## Features (Coming Soon)

TickerBoard is designed to have the following features (currently in development):

- Price and balance tracking: TickerBoard will provide real-time updates on the price and balance of cryptocurrencies.
- Interactive chart: Users will be able to view the price trends of cryptocurrencies over different timeframes using an interactive chart.
- Cryptocurrency selection: Users can choose from a list of supported cryptocurrencies to track their prices and balances.
- Categories: TickerBoard will categorize cryptocurrencies into different categories such as NFT, GameFi, DeFi, CEX, DEX, and PoW, allowing users to easily navigate and filter cryptocurrencies based on their interests.
- Keyboard navigation: The application will include a keyboard interface that enables users to navigate through different categories and cryptocurrencies efficiently.

This repository is a Vue 3 project template called "TickerBoardVue". It is set up with Vite, a fast and lightweight build tool for Vue applications. Here are some additional details about the project:

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
