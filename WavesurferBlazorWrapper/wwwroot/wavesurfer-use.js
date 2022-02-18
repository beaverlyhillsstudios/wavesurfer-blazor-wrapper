var wavesurfer = null;

export function create(dotNetHelper) {

    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#428bca',
        progressColor: '#00629b',
        normalize: true,
        plugins: [
            WaveSurfer.regions.create({
                
            }),
            WaveSurfer.timeline.create({
                container: "#wave-timeline"
            }),
            WaveSurfer.minimap.create({
                container: '#wave-minimap',
                waveColor: '#777',
                progressColor: '#222',
                height: 40
            })
        ]
    });
    wavesurfer.on('ready',
        function() {
            dotNetHelper.invokeMethodAsync("OnWavesurferReady", wavesurfer.getDuration());
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

export function seek(seek) {
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

