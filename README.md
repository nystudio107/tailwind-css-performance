# Tailwind CSS Performance

Small repo to demonstrate the slow building of Tailwind CSS 2.0 using `webpack-dev-server` HMR & PostCSS.

## Problem - Tailwind 2.x

This is the Problem - Tailwind 2.x branch; you can find the [Solution - Tailwind 1.x branch here](https://github.com/nystudio107/tailwind-css-performance/tree/solution)

This is written up in detail in the [Speeding Up Tailwind CSS Builds](https://nystudio107.com/blog/speeding-up-tailwind-css-builds) article.

## Errata

Normally I would never check in a `.env` file into a GitHub repo, but in this case it makes the setup easier, and there are no actual secrets in it.

## Setup

To replicate the issue:

1. Have Docker installed: https://docs.docker.com/get-docker/
2. Clone the repo via `git clone https://github.com/nystudio107/tailwind-css-performance.git`
3. `cd` to the `tailwind-css-performance` directory, and type: `docker-compose up` (the first time building the Docker container will be slow)
4. When you see `webpack_1  | ℹ ｢wdm｣: Compiled successfully.` in your terminal, the project is running

## Testing

Once the project is up and running, point your browser at: http://localhost:8080/ and show the developer tools JavaScript console.

You should see a bright yellow background with confetti raining down, and the following in your JavaScript console:

```
[HMR] Waiting for update signal from WDS...
app.js:20766 You are running a development build of Vue.
Make sure to use the production build (*.prod.js) when deploying for production.
app.js:20966 [WDS] Hot Module Replacement enabled.
app.js:20970 [WDS] Live Reloading enabled.
```

### Reference: Speedy JavaScript HMR

Next, make a simple change to `src/vue/Confetti.vue` such as changing `defaultSize: 20,` to `defaultSize: 40,` and you should see the it rebuild the JavaScript and HMR it quickly:

```
client:55 [WDS] App updated. Recompiling...
reloadApp.js:19 [WDS] App hot update...
log.js:24 [HMR] Checking for updates on the server...
log.js:24 [HMR] Updated modules:
log.js:16 [HMR]  - ../src/vue/Confetti.vue?vue&type=script&lang=ts
log.js:24 [HMR]  - ../src/vue/Confetti.vue?vue&type=script&lang=ts
log.js:24 [HMR]  - ../src/vue/Confetti.vue
log.js:24 [HMR] App is up to date.
```

### The issue: Slow PostCSS / Tailwind CSS rebuild

Next to demonstrate the actual issue, make a simple change to `src/css/components/global.pcss` such as changing `background-color: yellow;` to `background-color: blue;`

You should see it rebuild the CSS:

```
[WDS] App updated. Recompiling...
reloadApp.js:19 [WDS] App hot update...
log.js:24 [HMR] Checking for updates on the server...
log.js:24 [HMR] Updated modules:
log.js:16 [HMR]  - ../src/css/app.pcss
log.js:24 [HMR] App is up to date.
```

...but it will be quite slow in rebuilding, especially compared to the relatively fast JavaScript HMR.

## Excpected Outcome

As discussed in [Tailwind CSS issue #2544](https://github.com/tailwindlabs/tailwindcss/issues/2544), I'm hoping there can be some intelligent caching or preflighting for long-running processes such as `webpack-dev-server`.

Have any instrumentation or profiling been hooked up to the build to determine where the bottlenecks are?
