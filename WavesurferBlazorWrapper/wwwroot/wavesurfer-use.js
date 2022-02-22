var wavesurfer = null;

export function create(dotNetHelper, mainDivGuid, timelineDivGuid, minimapDivGuid, optionsDefault, optionsUser) {

    var options = {};
    Object.assign(options, optionsDefault, optionsUser);

    options.container = '#sel_' + mainDivGuid;
    options.plugins = [
        WaveSurfer.regions.create({
        }),
        WaveSurfer.timeline.create({
            container: '#sel_' + timelineDivGuid
        }),
        WaveSurfer.minimap.create({
            container: '#sel_' + minimapDivGuid,
            waveColor: '#777',
            progressColor: '#222',
            height: 40
        })
    ];

    wavesurfer = WaveSurfer.create(options);
    
    //Events
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

export function load(url) {
    wavesurfer.load(url);
}

export function playPause() {
    wavesurfer.playPause();
}

export function zoom(zoomLevel) {
    wavesurfer.zoom(zoomLevel);
}

export function seekAndCenter(seek) {
    wavesurfer.seekAndCenter(seek);
}

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

