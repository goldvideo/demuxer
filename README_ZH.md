# 纯JS解码TS/MP4工具

>  [English Readme](./README.md)

该工具可用于HTML5播放器或者Node.js等平台，下面为解码数据流向图
![](./doc/design/dataflow.gv.png)

## Demos

- [解码MP4](./doc/examples/demux-mp4.html)
- [解码TS](./doc/examples/demux-ts.html)


## 如何开始？

1. 安装

    ``` shell
    npm i demuxer
    ```

2. 使用
    ``` js
    import Demuxer from 'demuxer';

    const demux = new Demuxer('m2ts');
    
    // 数据是按照流式方式吐出，尽快吐出解析出来第一个数据
    demux.on(Demuxer.Events.DEMUX_DATA, (e) => {
        console.log(e)
                    
        // if (e.stream_type === 15) {
        //     console.log(e)
        // }
    });
    

    // 当push进来的数据都解析并吐出后，会产生如下事件。用来告诉使用者数据已经解析完毕
    demux.on(Demuxer.Events.DONE, (e) => {
        // 数据消耗完毕之后，管道进行了flush动作
    });
    
    // buffer -> video bytes ArrayBuffer 
    demux.push(buffer, {
        // 本解码器支持推送部分数据
        // 当done设置为true后，如果数据解码完毕没有剩余数据，则认为数据已经推送完毕，Events.DONE才会发出。
        // 当done设置为false后，Events.DONE不会发出，等待后续数据推送
        done: true 
    }); 
    ```

3. Debug开启的方式

    ```$js
    var demuxer = new demuxer.Demux('m2t', {
        debug: true
    });
    ```

4. Demuxer Options

    ```$js
    let options = {
        // 设置 options.debug = true; 后在JS控制台，可以打印日志.
        debug: true
    };

    var demuxer = new Demuxer('m2ts', options);
    ```


## 关于解码MP4原始数据(h264/hevc/aac)的问题

需要开发者解析mp4头部分数据后，再根据头中描述的信息，定位mdat中具体到数据信息位置


## 关于如何用Worker集成 Demuxer

因为第三方很可能自己内部有worker工具，为了不和worker工具产生冲突及冗余，worker由使用者自行实现。

## LICENSE
[MIT](LICENSE)