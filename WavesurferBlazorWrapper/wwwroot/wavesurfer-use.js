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
    wavesurfer.on('ready',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferReady", wavesurfer.getDuration());
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
    wavesurfer.on('audioprocess',
        function(position) {
            dotNetHelper.invokeMethodAsync("OnWavesurferAudioProcess", position);
        }
    );
    wavesurfer.on('seek',
        function(seek) {
            dotNetHelper.invokeMethodAsync("OnWavesurferSeek", seek);
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

