const players = new Map();

export function create(dotNetHelper, mainDivGuid, timelineDivGuid, minimapDivGuid, showTimeLine, showMiniMap, showMarkers, audioThreshold, regionDragSelection, optionsDefault, optionsUser) {
    const instanceId = key(mainDivGuid);
    const existing = players.get(instanceId);
    if (existing) {
        destroy(instanceId);
    }

    let lastPosition = 0;
    const options = Object.assign({}, optionsDefault || {}, optionsUser || {});
    const regions = WaveSurfer.Regions.create();
    const plugins = [regions];

    options.container = '#sel_' + mainDivGuid;
    options.plugins = plugins;

    if (showTimeLine) {
        plugins.push(WaveSurfer.Timeline.create({
            container: '#sel_' + timelineDivGuid
        }));
    }

    if (showMiniMap) {
        plugins.push(WaveSurfer.Minimap.create({
            container: '#sel_' + minimapDivGuid,
            waveColor: '#777',
            progressColor: '#222',
            height: 40
        }));
    }

    const wavesurfer = WaveSurfer.create(options);
    const instance = {
        dotNetHelper,
        regions,
        subscriptions: [],
        wavesurfer,
        markerRegionIds: new Set()
    };
    players.set(instanceId, instance);

    if (regionDragSelection) {
        regionEnableDragSelection(instanceId, {});
    }

    subscribe(instance, wavesurfer, 'audioprocess', (position) => {
        if (Math.abs(position - lastPosition) > audioThreshold) {
            lastPosition = position;
            invoke(instance, 'OnWavesurferAudioProcess', position);
        }
    });
    subscribe(instance, wavesurfer, 'dblclick', () => invoke(instance, 'OnWavesurferDblClick'));
    subscribe(instance, wavesurfer, 'destroy', () => invoke(instance, 'OnWavesurferDestroy'));
    subscribe(instance, wavesurfer, 'error', (error) => invoke(instance, 'OnWavesurferError', String(error)));
    subscribe(instance, wavesurfer, 'finish', () => invoke(instance, 'OnWavesurferFinish'));
    subscribe(instance, wavesurfer, 'interaction', () => invoke(instance, 'OnWavesurferInteraction'));
    subscribe(instance, wavesurfer, 'loading', (percent) => invoke(instance, 'OnWavesurferLoading', percent));
    subscribe(instance, wavesurfer, 'pause', () => invoke(instance, 'OnWavesurferPause'));
    subscribe(instance, wavesurfer, 'play', () => invoke(instance, 'OnWavesurferPlay'));
    subscribe(instance, wavesurfer, 'ready', () => invoke(instance, 'OnWavesurferReady'));
    subscribe(instance, wavesurfer, 'scroll', (scrollEvent) => invoke(instance, 'OnWavesurferScroll', scrollEvent));
    subscribe(instance, wavesurfer, 'seeking', (seek) => invoke(instance, 'OnWavesurferSeek', seek));
    subscribe(instance, wavesurfer, 'volume', (volume) => invoke(instance, 'OnWavesurferVolume', volume));
    subscribe(instance, wavesurfer, 'zoom', (minPxPerSec) => invoke(instance, 'OnWavesurferZoom', minPxPerSec));

    subscribe(instance, regions, 'region-created', (region) => {
        bindRegionEvents(instance, region);
        invoke(instance, 'OnWavesurferRegionCreated', getRegionDataOnly(region));
    });
    subscribe(instance, regions, 'region-update', (region) => invoke(instance, 'OnWavesurferRegionUpdated', getRegionDataOnly(region)));
    subscribe(instance, regions, 'region-updated', (region) => invoke(instance, 'OnWavesurferRegionUpdateEnd', getRegionDataOnly(region)));
    subscribe(instance, regions, 'region-removed', (region) => {
        const regionData = getRegionDataOnly(region);
        if (instance.markerRegionIds.delete(region.id)) {
            invoke(instance, 'OnWavesurferMarkerDrop', getMarkerDataOnly(region));
        }
        invoke(instance, 'OnWavesurferRegionRemoved', regionData);
    });
}

export function cancelAjax(instanceId) {
    const instance = requireInstance(instanceId);
    if (instance.wavesurfer.abortController) {
        instance.wavesurfer.abortController.abort();
    }
}

export function destroy(instanceId) {
    const id = key(instanceId);
    const instance = players.get(id);
    if (!instance) {
        return;
    }

    instance.subscriptions.forEach((unsubscribe) => unsubscribe());
    instance.subscriptions = [];
    instance.wavesurfer.destroy();
    players.delete(id);
}

export function empty(instanceId) {
    requireInstance(instanceId).wavesurfer.empty();
}

export function getActivePlugins(instanceId) {
    return requireInstance(instanceId).wavesurfer.getActivePlugins();
}

export function getBackgroundColor(instanceId) {
    return getOption(instanceId, 'backgroundColor');
}

export function getCurrentTime(instanceId) {
    return requireInstance(instanceId).wavesurfer.getCurrentTime();
}

export function getCursorColor(instanceId) {
    return getOption(instanceId, 'cursorColor');
}

export function getDuration(instanceId) {
    return requireInstance(instanceId).wavesurfer.getDuration();
}

export function getPlaybackRate(instanceId) {
    return requireInstance(instanceId).wavesurfer.getPlaybackRate();
}

export function getProgressColor(instanceId) {
    return getOption(instanceId, 'progressColor');
}

export function getVolume(instanceId) {
    return requireInstance(instanceId).wavesurfer.getVolume();
}

export function getMute(instanceId) {
    return requireInstance(instanceId).wavesurfer.getMuted();
}

export function getFilters() {
    return null;
}

export function getWaveColor(instanceId) {
    return getOption(instanceId, 'waveColor');
}

export function exportPCM(instanceId, length, accuracy) {
    return exportPeaks(instanceId, null, length, accuracy);
}

export function exportPeaks(instanceId, channels, maxLength, precision) {
    return requireInstance(instanceId).wavesurfer.exportPeaks({
        channels: channels ?? undefined,
        maxLength: maxLength ?? undefined,
        precision: precision ?? undefined
    });
}

export function exportImage(instanceId, format, quality, type) {
    return requireInstance(instanceId).wavesurfer.exportImage(format, quality, type);
}

export function isPlaying(instanceId) {
    return requireInstance(instanceId).wavesurfer.isPlaying();
}

export function load(instanceId, url, peaks, duration) {
    return requireInstance(instanceId).wavesurfer.load(url, peaks, duration);
}

export async function loadBlob(instanceId, blob, peaks, duration) {
    const wavesurfer = requireInstance(instanceId).wavesurfer;
    if (typeof blob === 'string') {
        const response = await fetch(blob);
        blob = await response.blob();
    }
    return wavesurfer.loadBlob(blob, peaks, duration);
}

export function pause(instanceId) {
    requireInstance(instanceId).wavesurfer.pause();
}

export function play(instanceId, start, end) {
    return requireInstance(instanceId).wavesurfer.play(start, end);
}

export function playPause(instanceId) {
    return requireInstance(instanceId).wavesurfer.playPause();
}

export function seekAndCenter(instanceId, progress) {
    const wavesurfer = requireInstance(instanceId).wavesurfer;
    wavesurfer.seekTo(progress);
    wavesurfer.setScrollTime(wavesurfer.getDuration() * progress);
}

export function seekTo(instanceId, progress) {
    requireInstance(instanceId).wavesurfer.seekTo(progress);
}

export function setBackgroundColor(instanceId, color) {
    setOptions(instanceId, { backgroundColor: color });
}

export function setCursorColor(instanceId, color) {
    setOptions(instanceId, { cursorColor: color });
}

export function setHeight(instanceId, height) {
    setOptions(instanceId, { height });
}

export function setFilter() {
}

export function setPlaybackRate(instanceId, rate) {
    requireInstance(instanceId).wavesurfer.setPlaybackRate(rate);
}

export function setPlayEnd(instanceId, position) {
    const wavesurfer = requireInstance(instanceId).wavesurfer;
    wavesurfer.play(wavesurfer.getCurrentTime(), position);
}

export function setVolume(instanceId, newVolume) {
    requireInstance(instanceId).wavesurfer.setVolume(newVolume);
}

export function setMute(instanceId, mute) {
    const instance = requireInstance(instanceId);
    instance.wavesurfer.setMuted(mute);
    invoke(instance, 'OnWavesurferMute', mute);
}

export function setProgressColor(instanceId, color) {
    setOptions(instanceId, { progressColor: color });
}

export function setWaveColor(instanceId, color) {
    setOptions(instanceId, { waveColor: color });
}

export function skip(instanceId, offset) {
    requireInstance(instanceId).wavesurfer.skip(offset);
}

export function skipBackward(instanceId) {
    skip(instanceId, -5);
}

export function skipForward(instanceId) {
    skip(instanceId, 5);
}

export function setSinkId(instanceId, deviceId) {
    return requireInstance(instanceId).wavesurfer.setSinkId(deviceId);
}

export function stop(instanceId) {
    requireInstance(instanceId).wavesurfer.stop();
}

export function toggleMute(instanceId) {
    const instance = requireInstance(instanceId);
    const wavesurfer = instance.wavesurfer;
    wavesurfer.setMuted(!wavesurfer.getMuted());
    invoke(instance, 'OnWavesurferMute', wavesurfer.getMuted());
}

export function toggleInteraction(instanceId) {
    requireInstance(instanceId).wavesurfer.toggleInteraction();
}

export function toggleScroll(instanceId) {
    const wavesurfer = requireInstance(instanceId).wavesurfer;
    wavesurfer.setOptions({ autoScroll: !wavesurfer.options.autoScroll });
}

export function zoom(instanceId, pxPerSec) {
    requireInstance(instanceId).wavesurfer.zoom(pxPerSec);
}

export function regionAddRegion(instanceId, options) {
    return getRegionDataOnly(requireInstance(instanceId).regions.addRegion(options || {}));
}

export function regionClearRegions(instanceId) {
    const instance = requireInstance(instanceId);
    instance.regions.clearRegions();
    instance.markerRegionIds.clear();
}

export function regionList(instanceId) {
    return requireInstance(instanceId).regions.getRegions().map(getRegionDataOnly);
}

export function regionListUpdate(instanceId, regionList) {
    const regionsById = new Map(requireInstance(instanceId).regions.getRegions().map((region) => [region.id, region]));
    (regionList || []).forEach((region) => {
        const existing = regionsById.get(region.id);
        if (existing) {
            existing.setOptions(region);
        }
    });
}

export function regionPlay(instanceId, regionId) {
    const region = getRegionById(instanceId, regionId);
    if (region) {
        region.play();
    }
}

export function regionPlayLoop(instanceId, regionId) {
    const region = getRegionById(instanceId, regionId);
    if (region) {
        region.play(true);
    }
}

export function regionRemove(instanceId, regionId) {
    const region = getRegionById(instanceId, regionId);
    if (region) {
        region.remove();
    }
}

export function regionEnableDragSelection(instanceId, options) {
    requireInstance(instanceId).regions.enableDragSelection(options || {});
}

export function markerAddMarker(instanceId, options) {
    const instance = requireInstance(instanceId);
    const marker = options || {};
    const region = instance.regions.addRegion({
        id: marker.id,
        start: marker.time || 0,
        end: marker.time || 0,
        color: marker.color || 'rgba(0,0,0,0.1)',
        content: marker.label || marker.tooltip || '',
        drag: marker.draggable === true,
        resize: false,
        preventContextMenu: marker.preventContextMenu
    });
    instance.markerRegionIds.add(region.id);
    return getMarkerDataOnly(region);
}

export function markerClearMarkers(instanceId) {
    const instance = requireInstance(instanceId);
    instance.regions.getRegions()
        .filter((region) => instance.markerRegionIds.has(region.id))
        .forEach((region) => region.remove());
    instance.markerRegionIds.clear();
}

export function loadRegions(instanceId, regions) {
    regionClearRegions(instanceId);
    (regions || []).forEach((region) => {
        if (region.word !== 'silence') {
            regionAddRegion(instanceId, {
                start: region.start / 10000000,
                end: region.end / 10000000,
                drag: false,
                resize: false
            });
        }
    });
}

function bindRegionEvents(instance, region) {
    if (region.__blazorEventsBound) {
        return;
    }

    region.__blazorEventsBound = true;
    subscribe(instance, region, 'play', () => invoke(instance, 'OnWavesurferRegionPlay', getRegionDataOnly(region)));
    subscribe(instance, region, 'in', () => invoke(instance, 'OnWavesurferRegionIn', getRegionDataOnly(region)));
    subscribe(instance, region, 'out', () => invoke(instance, 'OnWavesurferRegionOut', getRegionDataOnly(region)));
    subscribe(instance, region, 'over', () => invoke(instance, 'OnWavesurferRegionMouseEnter', getRegionDataOnly(region)));
    subscribe(instance, region, 'leave', () => invoke(instance, 'OnWavesurferRegionMouseLeave', getRegionDataOnly(region)));
    subscribe(instance, region, 'click', () => {
        if (instance.markerRegionIds.has(region.id)) {
            invoke(instance, 'OnWavesurferMarkerClick', getMarkerDataOnly(region));
        }
        invoke(instance, 'OnWavesurferRegionClick', getRegionDataOnly(region));
    });
    subscribe(instance, region, 'dblclick', () => invoke(instance, 'OnWavesurferRegionDblClick', getRegionDataOnly(region)));
    subscribe(instance, region, 'update-end', () => {
        if (instance.markerRegionIds.has(region.id)) {
            invoke(instance, 'OnWavesurferMarkerDrag', getMarkerDataOnly(region));
        }
    });
}

function getRegionById(instanceId, regionId) {
    return requireInstance(instanceId).regions.getRegions().find((region) => region.id === regionId);
}

function getRegionDataOnly(regionFull) {
    return {
        id: regionFull.id,
        start: regionFull.start,
        end: regionFull.end,
        loop: regionFull.loop,
        drag: regionFull.drag,
        resize: regionFull.resize,
        color: regionFull.color,
        channelIdx: regionFull.channelIdx,
        content: regionFull.content?.textContent || regionFull.content || null
    };
}

function getMarkerDataOnly(regionFull) {
    return {
        time: regionFull.start,
        label: regionFull.content?.textContent || regionFull.content || '',
        color: regionFull.color,
        position: 'top',
        markerElement: null,
        draggable: regionFull.drag === true,
        tooltip: regionFull.content?.textContent || regionFull.content || '',
        preventContextMenu: regionFull.preventContextMenu
    };
}

function getOption(instanceId, optionName) {
    return requireInstance(instanceId).wavesurfer.options[optionName] || null;
}

function invoke(instance, method, ...args) {
    instance.dotNetHelper.invokeMethodAsync(method, ...args);
}

function key(instanceId) {
    return String(instanceId);
}

function requireInstance(instanceId) {
    const instance = players.get(key(instanceId));
    if (!instance) {
        throw new Error('WavesurferPlayer instance was not created or was already disposed.');
    }
    return instance;
}

function setOptions(instanceId, options) {
    requireInstance(instanceId).wavesurfer.setOptions(options);
}

function subscribe(instance, target, eventName, handler) {
    const unsubscribe = target.on(eventName, handler);
    if (typeof unsubscribe === 'function') {
        instance.subscriptions.push(unsubscribe);
    }
}
