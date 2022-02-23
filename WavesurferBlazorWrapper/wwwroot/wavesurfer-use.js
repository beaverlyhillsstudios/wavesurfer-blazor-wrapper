var wavesurfer = null;

export function create(dotNetHelper, mainDivGuid, timelineDivGuid, minimapDivGuid, showTimeLine, showMiniMap, optionsDefault, optionsUser) {

    var options = {};
    Object.assign(options, optionsDefault, optionsUser);

    options.container = '#sel_' + mainDivGuid;
    options.plugins = [
        WaveSurfer.regions.create({
        })
    ];

    if (showTimeLine) {
        options.plugins.push(
            WaveSurfer.timeline.create({
                container: '#sel_' + timelineDivGuid
            })
        );
    }
    if (showMiniMap) {
        options.plugins.push(
            WaveSurfer.minimap.create({
                container: '#sel_' + minimapDivGuid,
                waveColor: '#777',
                progressColor: '#222',
                height: 40
            })
        );

    }

    wavesurfer = WaveSurfer.create(options);
    
    //WaveSurfer events
    wavesurfer.on('audioprocess',
        function(position) {
            dotNetHelper.invokeMethodAsync("OnWavesurferAudioProcess", position);
        }
    );
    wavesurfer.on('dblclick',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferDblClick");
        }
    );
    wavesurfer.on('destroy',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferDestroy");
        }
    );
    wavesurfer.on('error',
        function(errorMessage) {
            dotNetHelper.invokeMethodAsync("OnWavesurferError", errorMessage);
        }
    );
    wavesurfer.on('finish',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferFinish");
        }
    );
    wavesurfer.on('interaction',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferInteraction");
        }
    );
    wavesurfer.on('loading',
        function(percent) {
            dotNetHelper.invokeMethodAsync("OnWavesurferLoading", percent);
        }
    );
    wavesurfer.on('mute',
        function(status) {
            dotNetHelper.invokeMethodAsync("OnWavesurferMute", status);
        }
    );
    wavesurfer.on('pause',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferPause");
        }
    );
    wavesurfer.on('play',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferPlay");
        }
    );
    wavesurfer.on('ready',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferReady");
        }
    );
    wavesurfer.on('scroll',
        function(scrollEvent) {
            dotNetHelper.invokeMethodAsync("OnWavesurferScroll", scrollEvent);
        }
    );
    wavesurfer.on('seek',
        function(seek) {
            dotNetHelper.invokeMethodAsync("OnWavesurferSeek", seek);
        }
    );
    wavesurfer.on('volume',
        function(volume) {
            dotNetHelper.invokeMethodAsync("OnWavesurferVolume", volume);
        }
    );
    wavesurfer.on('zoom',
        function(minPxPerSec) {
            dotNetHelper.invokeMethodAsync("OnWavesurferZoom", minPxPerSec);
        }
    );
}

//Wavesurfer methods
export function cancelAjax() {
    wavesurfer.cancelAjax();
}
export function destroy() {
    wavesurfer.destroy();
}
export function empty() {
    wavesurfer.empty();
}
export function getActivePlugins() {
    return wavesurfer.getActivePlugins();
}
export function getBackgroundColor() {
    return wavesurfer.getBackgroundColor();
}
export function getCurrentTime() {
    return wavesurfer.getCurrentTime();
}
export function getCursorColor() {
    return wavesurfer.getCursorColor();
}
export function getDuration() {
    return wavesurfer.getDuration();
}
export function getPlaybackRate() {
    return wavesurfer.getPlaybackRate();
}
export function getProgressColor() {
    return wavesurfer.getProgressColor();
}
export function getVolume() {
    return wavesurfer.getVolume();
}
export function getMute() {
    return wavesurfer.getMute();
}
export function getFilters() {
    return wavesurfer.getFilters();
}
export function getWaveColor() {
    return wavesurfer.getWaveColor();
}
export function exportPCM(length, accuracy, noWindow, start) {
    return wavesurfer.exportPCM(length, accuracy, noWindow, start);
}
export function exportImage(format, quality, type) {
    return wavesurfer.exportImage(format, quality, type);
}
export function isPlaying() {
    return wavesurfer.isPlaying();
}
export function load(url, peaks, preload) {
    wavesurfer.load(url, peaks, preload);
}
export function loadBlob(url) {
    wavesurfer.loadBlob(url);
}
export function pause() {
    wavesurfer.pause();
}
export function play(start, end) {
    wavesurfer.play(start, end);
}
export function playPause() {
    wavesurfer.playPause();
}
export function seekAndCenter(progress) {
    wavesurfer.seekAndCenter(progress);
}
export function seekTo(progress) {
    wavesurfer.seekTo(progress);
}
export function setBackgroundColor(color) {
    wavesurfer.setBackgroundColor(color);
}
export function setCursorColor(color) {
    wavesurfer.setCursorColor(color);
}
export function setHeight(height) {
    wavesurfer.setHeight(height);
}
export function setFilter(filters) {
    wavesurfer.setFilter(filters);
}
export function setPlaybackRate(rate) {
    wavesurfer.setPlaybackRate(rate);
}
export function setPlayEnd(position) {
    wavesurfer.setPlayEnd(position);
}
export function setVolume(newVolume) {
    wavesurfer.setVolume(newVolume);
}
export function setMute(mute) {
    wavesurfer.setMute(mute);
}
export function setProgressColor(color) {
    wavesurfer.setProgressColor(color);
}
export function setWaveColor(color) {
    wavesurfer.setWaveColor(color);
}
export function skip(offset) {
    wavesurfer.skip(offset);
}
export function skipBackward() {
    wavesurfer.skipBackward();
}
export function skipForward() {
    wavesurfer.skipForward();
}
export function setSinkId(color) {
    wavesurfer.setSinkId(color);
}
export function stop() {
    wavesurfer.stop();
}
export function toggleMute() {
    wavesurfer.toggleMute();
}
export function toggleInteraction() {
    wavesurfer.toggleInteraction();
}
export function toggleScroll() {
    wavesurfer.toggleScroll();
}
export function zoom(pxPerSec) {
    wavesurfer.zoom(pxPerSec);
}

//utility functions
export function loadRegions(regions) {
    wavesurfer.clearRegions();
    for (var x = 0; x < regions.length; x++) {
        console.log(regions[x]);
        if(regions[x].word != "silence") {
            wavesurfer.addRegion({
                start: regions[x].start / 10000000,
                end: regions[x].end / 10000000,
                drag: false,
                resize: false
            });
        }
    }
}

