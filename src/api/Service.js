import MPEGMode from 'lamejs/src/js/MPEGMode';
import Lame from 'lamejs/src/js/Lame';
import BitStream from 'lamejs/src/js/BitStream';
import {Mp3Encoder, WavHeader} from 'lamejs';

window.MPEGMode = MPEGMode;
window.Lame = Lame;
window.BitStream = BitStream;

export default class Service {
  constructor(backendEndpoint) {
    this.backendEndpoint = backendEndpoint;
  }

  encodeMono(channels, sampleRate, samples) {
    let buffer = [];
    let mp3enc = new Mp3Encoder(channels, sampleRate, 128);
    let remaining = samples.length;
    let maxSamples = 1152;

    console.log(remaining, maxSamples);

    for (let i = 0; remaining >= maxSamples; i += maxSamples) {
      let mono = samples.subarray(i, i + maxSamples);
      let mp3buf = mp3enc.encodeBuffer(mono);
      if (mp3buf.length > 0) {
        buffer.push(new Int8Array(mp3buf));
      }
      remaining -= maxSamples;
    }
    let d = mp3enc.flush();
    if(d.length > 0){
      buffer.push(new Int8Array(d));
    }

    console.log('done encoding, size=', buffer.length);

    return new Blob(buffer, {type: 'audio/mp3'});
  }


  // returns true if successfull, false if failed
  async postBackend(recordedBlob) {
    let wav = WavHeader.readHeader(new DataView(await recordedBlob.arrayBuffer()));
    console.log('wav:', wav);
    let samples = new Int16Array(await recordedBlob.arrayBuffer(), wav.dataOffset, wav.dataLen / 2);

    let blob = this.encodeMono(wav.channels, wav.sampleRate, samples);

    try {
      const response = await fetch(this.backendEndpoint, {
        method: "POST",
        body: blob,
      });

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
