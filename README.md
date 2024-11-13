# vue-audio-okapi [![npm](https://img.shields.io/npm/v/vue-audio-tapir)](https://www.npmjs.com/package/vue-audio-tapir) [![npm](https://img.shields.io/npm/l/vue-audio-tapir)](https://www.npmjs.com/package/vue-audio-tapir)

Audio recorder component for Vue.js 3 for saving voice messages in mp3 file format. It makes it possible to record an audio message and send it to a server using the HTTP POST body.

## Use Case

The most popular use case of vue-audio-okapi is to upload an audio contact message directly from a website to your server.
 
## Architecture Overview

The developer includes the vue-audio-okapi component in his Vue 3 website. Users can leave 
a voice message and submits it. Vue-audio-okapi contacts the laravel backend api and uploads the audio data. 

## Installation

In a Vue 3 application install with:

```bash
npm i vue-audio-okapi --save
```

or
```bash
yarn add vue-audio-okapi --save
```

## Example Usage in vue3

```html
<template>
  <OkapiWidget :time="2" backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message" 
                 buttonColor="green"/>
</template>

<script>
import OkapiWidget from 'vue-audio-okapi';
import 'vue-audio-okapi/dist/vue-audio-okapi.css';

export default {
  name: 'App',
  components: {
    OkapiWidget,
  }
}
</script>
```

## Properties

| Name             | Type     | Description                                                                                                      | 
|------------------|----------|------------------------------------------------------------------------------------------------------------------|
| time             | Number   | Maximum recording time in minutes                                                                                |
| bitRate          | Number   | Bit rate of recording                                                                                            |
| sampleRate       | Number   | Sample rate of recording                                                                                         |
| backendEndpoint  | String   | URL of the service that receives the data as POST                                                                |
| buttonColor      | String   | Color code of the buttons for theming                                                                            |
| afterRecording   | Function | Callback function when recording is finished.                                                                    |
| successfulUpload | Function | Callback function that is called when data is uploaded successfully.                                             |
| failedUpload     | Function | Callback function that is called when upload failed.                                                             |
| customUpload     | Function | Custom upload function that expects the audio blob as parameter. Returns true when successful, false when error. |
| visible          | Boolean  | If the widget is visible on the website. "false" stops the recording.                                            |                                                                                          |

The data sent to the server is encoded in the MP3 format.

## Compatibility

Successfully tested with applications that use Vue 3 and inertiajs. 

## Dependencies

- [Vue 3](https://v3.vuejs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Lamejs](https://github.com/zhuker/lamejs)

## Further Reading

- [Web Audio API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MP3 File Format](https://en.wikipedia.org/wiki/MP3)

## References

The package bases on a fork of the [vue-audio-tapir](https://github.com/tderflinger/vue-audio-tapir) by: [@tderflinger](https://twitter.com/tderflinger)
Your can read more about the Audio Okapi project on the blog:
https://www.tderflinger.com/en/easily-receive-audio-messages-from-users

This project has been inspired by [vue-audio-recorder](https://github.com/grishkovelli/vue-audio-recorder) by Gennady Grishkovtsov.

## License

MIT License
