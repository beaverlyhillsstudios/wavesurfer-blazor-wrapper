using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace WavesurferBlazorWrapper
{

    public class WavesurferJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;
        private readonly DotNetObjectReference<WavesurferPlayer> _objRef;

        public WavesurferJsInterop(IJSRuntime jsRuntime, DotNetObjectReference<WavesurferPlayer> objRef)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/WavesurferBlazorWrapper/wavesurfer-use.js").AsTask());
            _objRef = objRef;
        }

        public async Task Create()
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("create", _objRef);
        }

        public async Task Zoom(int zoom)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("zoom", zoom);
        }

        public async Task Load(string url)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("load", url);
        }

        public async Task Seek(float seekRequest)
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("seek", seekRequest);
        }

        public async Task PlayPause()
        {
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("playPause");
        }

        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}