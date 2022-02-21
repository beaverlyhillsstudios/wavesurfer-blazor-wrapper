using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace WavesurferBlazorWrapper
{

    public class WavesurferJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;
        private readonly DotNetObjectReference<WavesurferPlayer> _objRef;

        public WavesurferJsInterop(IJSRuntime jsRuntime, DotNetObjectReference<WavesurferPlayer> objRef)
        {
            _moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/WavesurferBlazorWrapper/wavesurfer-use.js").AsTask());
            _objRef = objRef;
        }

        public async Task Create(Guid mainDivGuid, Guid timelineDivGuid, Guid minimapDivGuid)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("create", _objRef, mainDivGuid, timelineDivGuid, minimapDivGuid);
        }

        public async Task Zoom(int zoom)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("zoom", zoom);
        }

        public async Task Load(string url)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("load", url);
        }

        public async Task SeekAndCenter(float seekRequest)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("seekAndCenter", seekRequest);
        }

        public async Task PlayPause()
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("playPause");
        }

        public async ValueTask DisposeAsync()
        {
            if (_moduleTask.IsValueCreated)
            {
                var module = await _moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}