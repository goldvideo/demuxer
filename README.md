# A tool for demux ts/mp4 on pure JavaScript. 

>  [中文文档](./README_ZH.md)

This tool can be used on platforms such as HTML5 players or Node.js, the following is the data flow diagram
![](./doc/design/dataflow.gv.png)


## Demos

- [Demux MP4](./doc/examples/demux-mp4.html)
- [Demux TS](./doc/examples/demux-ts.html)


## How to start?

1. install 
   
    ``` shell
    npm i demuxer
    ```

2. Setup

    ``` js
    import Demuxer from 'demuxer';

    const demux = new Demuxer('m2ts');
    
    // The data is spit out in a streaming manner, 
    // and the first data is emitted as soon as possible.
    demux.on(Demuxer.Events.DEMUX_DATA, (e) => {
        console.log(e)
                    
        // if (e.stream_type === 15) {
        //     console.log(e)
        // }
    });
    
    demux.on(Demuxer.Events.DONE, (e) => {
        // consumed & flushed all piped buffer.
    });
    
    // buffer -> video bytes ArrayBuffer 
    demux.push(buffer, {
        // Support push part of the data for parsing
        // When done is set to true, if the data is decoded and there is no remaining data, the data is considered to have been pushed and Events.DONE will be emitted.
        // When done is set to false, Events.DONE will not be emit, waiting for subsequent data push
        done: true 
    }); 
    ```

3. Debug

    ```$js
    var demuxer = new Demuxer('m2ts', {
        debug: true
    });
    ```

4. Demuxer Options

    ```$js
    let options = {
        // Setting options.debug = true; will turn on debug logs on JS console.
        debug: true
    };

    var demuxer = new Demuxer('m2ts', options);
    ```

## About decoding MP4 raw data (h264/hevc/aac)

Developer should parse the data of the mp4 header, and then locate the pos of the data information in the mdat according to the information described in the mp4 header.


## About how to integrate Demuxer with Worker

Because the third party is likely to be internally built by the worker tool, in order not to conflict and redundancy with the worker tool, the worker is implemented by the user.

## LICENSE
[MIT](LICENSE)