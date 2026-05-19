# wavesurfer-blazor-wrapper

![Nuget](https://img.shields.io/nuget/v/WavesurferBlazorWrapper) ![Nuget](https://img.shields.io/nuget/dt/WavesurferBlazorWrapper)

Blazor wrapper around the [wavesurfer.js](https://wavesurfer.xyz/) audio waveform library.

Included wavesurfer.js version: 7.10.1.

Supported target frameworks: .NET 8, .NET 9, and .NET 10.

## Installation

### Package

Package Manager:

```powershell
Install-Package WavesurferBlazorWrapper -Version 0.5.1
```

.NET CLI:

```powershell
dotnet add package WavesurferBlazorWrapper --version 0.5.1
```

### JavaScript

Add the bundled scripts to your layout head section:

```html
<script src="_content/WavesurferBlazorWrapper/wavesurfer.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.regions.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.timeline.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.minimap.min.js"></script>
```

The old wavesurfer.js Markers plugin was removed upstream in v7. Wrapper marker methods are backed by single-point Regions.

## Basic Usage

```razor
@using WavesurferBlazorWrapper

<WavesurferPlayer Url="youraudiofile.mp3" />
```

The timeline and minimap plugins are enabled by default. The built-in toolbar is disabled by default:

```razor
<WavesurferPlayer Url="youraudiofile.mp3" ShowDefaultToolbar="true" />
```

Multiple players can be used on the same page. Each component instance owns a separate wavesurfer.js instance:

```razor
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-1.mp3" />
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-2.mp3" />
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-3.mp3" />
```

## Methods

For calling wavesurfer methods, keep a component reference:

```razor
<WavesurferPlayer @ref="_wavePlayer" Url="youraudiofile.mp3" />

<button @onclick="PlayPause">Play / Pause</button>

@code {
    private WavesurferPlayer? _wavePlayer;

    private async Task PlayPause()
    {
        if (_wavePlayer is not null)
        {
            await _wavePlayer.PlayPause();
        }
    }
}
```

## Regions And Content

`WavesurferRegion` is the preferred C# model for adding and updating regions. Region options are the older key/value helper API and are kept for compatibility.

Use `Content` for timestamped text such as lyrics:

```razor
await Player.RegionAddRegion(new WavesurferRegion
{
    Start = 12.4f,
    End = 16.8f,
    Content = "First lyric line",
    Color = "rgba(10, 120, 220, 0.2)",
    Drag = false,
    Resize = false
});
```

Region events use the `OnRegion...` component parameters and return `WavesurferRegion`.

## Markers

wavesurfer.js v7 removed the Markers plugin. The wrapper keeps `MarkerAddMarker` and `MarkerClearMarkers` as compatibility helpers by creating single-point regions.

```razor
await Player.MarkerAddMarker(new WavesurferMarker
{
    Time = 25,
    Label = "Chorus",
    Color = "rgba(10,20,200,0.8)",
    Draggable = true
});
```

## Export Peaks JSON

wavesurfer.js v7 replaced `exportPCM` with `exportPeaks`. Use `ExportPeaks` from C# after the player is ready:

```razor
<WavesurferPlayer @ref="Player" Url="sample.wav" OnReady="PlayerReady" />

@code {
    private WavesurferPlayer? Player;

    private async Task PlayerReady()
    {
        if (Player is null)
        {
            return;
        }

        var peaks = await Player.ExportPeaks(channels: 2, maxLength: 1000, precision: 10000);
        var json = System.Text.Json.JsonSerializer.Serialize(peaks);
    }
}
```

`ExportPCM` remains available but is obsolete and delegates to the v7 peaks export behavior.

## ASP.NET Core MVC

This package is a Blazor component library. It can be used from ASP.NET Core MVC only through the standard ASP.NET Core Blazor component integration path. It is not a plain Razor view helper.
