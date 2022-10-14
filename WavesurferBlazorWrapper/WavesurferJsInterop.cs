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

        public async Task Create(Guid mainDivGuid, Guid timelineDivGuid, Guid minimapDivGuid, bool showTimeLine, bool showMiniMap, bool showMarkers, float audioProcessThreshold, bool regionDragSelection, IEnumerable<WavesurferOption> optionsDefault, IEnumerable<WavesurferOption>? optionsUser)
        {
            var module = await _moduleTask.Value;
            await module.InvokeVoidAsync("create", _objRef, mainDivGuid, timelineDivGuid, minimapDivGuid, showTimeLine, showMiniMap, showMarkers, audioProcessThreshold, regionDragSelection, WavesurferOptionsService.GetObjectFromRecords(optionsDefault),WavesurferOptionsService.GetObjectFromRecords(optionsUser));
        }

        public async Task<IJSObjectReference> GetModuleTask()
        {
            return await _moduleTask.Value;
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