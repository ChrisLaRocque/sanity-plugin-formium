# sanity-plugin-formium

Get Formium form IDs as a field in Sanity. You can then pass the ID to the [Formium React SDK](https://formium.io/docs/react) to render forms on your front-end.

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-formium
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {formiumSelect} from 'sanity-plugin-formium'

export default defineConfig({
  //...
  plugins: [formiumSelect({})],
})
```

You'll need your project ID and an API key from Formium

Then in your schemas you can add fields with type `formiumSelect`
```ts
    defineField({
      name: "form",
      type: "formiumSelect",
    }),
```
## License

[MIT](LICENSE) © Chris LaRocque

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
