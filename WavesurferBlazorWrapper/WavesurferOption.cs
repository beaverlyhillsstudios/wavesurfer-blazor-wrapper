using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WavesurferBlazorWrapper
{
    public enum WavesurferOptionKey
    {
        audioRate = 0,
        audioContext = 1,
        audioScriptProcessor = 2,
        autoCenter = 3,
        backend = 4,
        backgroundColor = 5,
        barGap = 6,
        barHeight = 7,
        barMinHeight = 8,
        barRadius = 9,
        barWidth = 10,
        closeAudioContext = 11,
        container = 12,
        cursorColor = 13,
        cursorWidth = 14,
        drawingContextAttributes = 15,
        fillParent = 16,
        forceDecode = 17,
        height = 18,
        hideScrollbar = 19,
        hideCursor = 20,
        interact = 21,
        loopSelection = 22,
        maxCanvasWidth = 23,
        mediaControls = 24,
        mediaType = 25,
        minPxPerSec = 26,
        normalize = 27,
        partialRender = 28,
        pixelRatio = 29,
        plugins = 30,
        progressColor = 31,
        regionsMinLength = 32,
        removeMediaElementOnDestroy = 33,
        renderer = 34,
        responsive = 35,
        scrollParent = 36,
        skipLength = 37,
        splitChannels = 38,
        splitChannelsOptions = 39,
        waveColor = 40,
        xhr = 41
    }
    public record WavesurferOption(WavesurferOptionKey key, object value);

    public static class WavesurferOptionsService
    {
        public static object getObjectFromRecords(IEnumerable<WavesurferOption> opts)
        {
            dynamic result = new ExpandoObject();  
            var dictionary = (IDictionary<string, object>)result;

            foreach (var opt in opts)
            {
                dictionary.Add(opt.key.ToString(), opt.value);
            }

            return result;
        }
    }
}
