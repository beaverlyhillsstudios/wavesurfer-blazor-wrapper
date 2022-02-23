# wavesurfer-blazor-wrapper

![Nuget](https://img.shields.io/nuget/v/WavesurferBlazorWrapper) ![Nuget](https://img.shields.io/nuget/dt/WavesurferBlazorWrapper)

> :warning: Package in **ACTIVE** development! API is subject to change!

.NET6 Core wrapper around JS library: wavesurfer.js by **katspaugh** (https://wavesurfer-js.org/)

## Installation

### Package
PackageManager
```
Install-Package WavesurferBlazorWrapper -Version 0.1.0
```
or .net CLI
```
dotnet add package WavesurferBlazorWrapper --version 0.1.0
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
