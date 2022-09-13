# wavesurfer-blazor-wrapper

![Nuget](https://img.shields.io/nuget/v/WavesurferBlazorWrapper) ![Nuget](https://img.shields.io/nuget/dt/WavesurferBlazorWrapper)

.NET6 Core wrapper around JS library: wavesurfer.js by **katspaugh** (https://wavesurfer-js.org/)

## Installation

### Package
PackageManager
```
Install-Package WavesurferBlazorWrapper -Version 0.2.1
```
or .net CLI
```
dotnet add package WavesurferBlazorWrapper --version 0.2.1
```

### Javascript
Add JS to your layout <head> section
```html
<script src="_content/WavesurferBlazorWrapper/wavesurfer.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.minimap.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.regions.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.timeline.min.js"></script>
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

### Listening to events
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

New version supports all events from **Regions** plugin with **OnRegion...** prefix.

> Original event documentation: https://wavesurfer-js.org/plugins/regions.html
  
### Calling methods  
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
