# wavesurfer-blazor-wrapper

![Nuget](https://img.shields.io/nuget/v/WavesurferBlazorWrapper) ![Nuget](https://img.shields.io/nuget/dt/WavesurferBlazorWrapper)

.NET6 Core wrapper around JS library: wavesurfer.js by **katspaugh** (https://wavesurfer-js.org/)

> Actual version of included wavesurfer.js: 6.4.0

## Installation

### Package
PackageManager
```
Install-Package WavesurferBlazorWrapper -Version 0.4.0
```
or .net CLI
```
dotnet add package WavesurferBlazorWrapper --version 0.4.0
```

### Javascript
Add JS to your layout <head> section
```html
<script src="_content/WavesurferBlazorWrapper/wavesurfer.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.minimap.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.regions.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.timeline.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.markers.min.js"></script>
```

## Usage

### Basic
Add Blazor component to your page
```razor
@using WavesurferBlazorWrapper

<WavesurferPlayer Url="youraudiofile.mp3"></WavesurferPlayer>
```
By default, player is shown with timeline and minimap plugins active, but without toolbar (so you can use controls of your own). If you want to use our basic out-of-the-box just enable it:
```razor
<WavesurferPlayer Url="youraudiofile.mp3" ShowDefaultToolbar="true"></WavesurferPlayer>
```

### Events

#### Main functionality

Every Wavesurfer event can be used via On... component parameter.
  
E.g. **seek** event via **OnSeek** parameter
```razor
<WavesurferPlayer Url="youraudiofile.mp3" OnSeek="Seek" OnLoading="Loading"></WavesurferPlayer>

@code
{
    public void Seek(float seekPosition)
    {
        Console.WriteLine("Seek: " + seekPosition);
    }

    public void Loading(int percent)
    {
        Console.WriteLine("Loading: " + percent + "%");
    }
}
```
  
> Original JS event list: https://wavesurfer-js.org/docs/events.html

#### Regions plugin

All events from **Regions** plugin with **OnRegion...** prefix are supported, returning `WavesurferRegion` object.

> Original event and method documentation: https://wavesurfer-js.org/plugins/regions.html

#### Markers plugin

All events from **Markers** plugin with **OnMarker...** prefix are supported, returning `WavesurferMarker` object.

> Original event and method documentation: https://wavesurfer-js.org/plugins/markers.html
  
### Methods  
For calling Wavesurfer methods you need to have ref to your component  
```razor
<WavesurferPlayer @ref="_wavePlayer" Url="youraudiofile.mp3"></WavesurferPlayer>

<button @onclick="() => PlayPause()">Play / Pause</button>
  
@code
{
    WavesurferPlayer _wavePlayer;

    public async void PlayPause()
    {
        await _wavePlayer.PlayPause();
    }
}
```
> Original JS method list: https://wavesurfer-js.org/docs/methods.html

#### Regions plugin

##### Original

`Task<WavesurferRegion?> RegionAddRegion(WavesurferRegion regionData)`

> **DEPRECATED:** `Task<WavesurferRegion?> RegionAddRegion(IEnumerable<WavesurferRegionOption>? regionOptions)`

`Task RegionClearRegions()`

`Task RegionEnableDragSelection(IEnumerable<WavesurferRegionOption>? regionOptions)`

`Task RegionPlay(string regionId)`

`Task RegionPlayLoop(string regionId)`

`Task RegionRemove(string regionId)`

Example:
```razor
//add new region - actual non-deprecated way
await Player?.RegionAddRegion(
    new WavesurferRegion()
    {
        Start = 200,
        End = 280,
        Resize = true,
        Color = "rgba(10,200,25,0.3)"
    }
);
```

##### Wrapper specific

`Task<IEnumerable<WavesurferRegion>?> RegionList()` - retreive all regions, replacement for direct access to JS list

`Task RegionListUpdate(IEnumerable<WavesurferRegion> regionList)` - send changed list back to JS, removal can be done via RegionRemove method

Example:
```razor
//get list
var regions = await Player?.RegionList();

//make changes to one of regions
regions.First().Color = "rgba(100,0,0,0.5)";
regions.First().Start = 90;

//send changes back
await Player?.RegionListUpdate(regions);
```

> Original attributes documentation: https://wavesurfer-js.org/plugins/regions.html
 
#### Markers plugin

`Task<WavesurferMarker?> MarkerAddMarker(WavesurferMarker markerData)`

`Task MarkerClearMarkers()`

Example:
```razor
//clear existing
await Player?.MarkerClearMarkers();

//add new marker
var marker = await Player?.MarkerAddMarker(new WavesurferMarker()
{
    Color = "rgba(10,20,200,0.8)",
    Label = "Test",
    Time = 250,
    Position = "top",
    Draggable = true
});
```

> Original attributes documentation: https://wavesurfer-js.org/plugins/markers.html
