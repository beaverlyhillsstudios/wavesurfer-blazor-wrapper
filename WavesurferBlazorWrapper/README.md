Blazor wrapper around wavesurfer.js.

Included wavesurfer.js version: 7.10.1.

Supported target frameworks: .NET 8, .NET 9, and .NET 10.

## Scripts

Add the bundled scripts to your layout:

```html
<script src="_content/WavesurferBlazorWrapper/wavesurfer.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.regions.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.timeline.min.js"></script>
<script src="_content/WavesurferBlazorWrapper/wavesurfer.minimap.min.js"></script>
```

wavesurfer.js v7 removed the Markers plugin. Wrapper marker methods are backed by single-point Regions.

## Basic Usage

```razor
@using WavesurferBlazorWrapper

<WavesurferPlayer Url="youraudiofile.mp3" />
```

Multiple players can be used on the same page:

```razor
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-1.mp3" />
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-2.mp3" />
<WavesurferPlayer ShowDefaultToolbar Url="/audio/track-3.mp3" />
```

## Regions And Content

Use `WavesurferRegion` for new code. `WavesurferRegionOption` is the older key/value option helper and is kept for compatibility.

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

## Export Peaks JSON

wavesurfer.js v7 replaced `exportPCM` with `exportPeaks`. Use `ExportPeaks` after the player is ready:

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

`ExportPCM` is obsolete and delegates to the v7 peaks export behavior.

## ASP.NET Core MVC

This package is a Blazor component library. It can be used from ASP.NET Core MVC only through the standard ASP.NET Core Blazor component integration path, not as a plain Razor view helper.
