using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace WavesurferBlazorWrapper
{
    public record WavesurferMarker
    {
        [JsonPropertyName("time")]
        public float Time { get; set; } = 0f;

        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("color")]
        public string Color { get; set; } = "rgba(0,0,0,0.1)";
        
        [JsonPropertyName("position")]
        public string Position { get; set; }

        [JsonPropertyName("tooltip")]
        public string Tooltip { get; set; }
        
        [JsonPropertyName("markerElement")]
        public ElementReference? MarkerElement { get; set; }

        [JsonPropertyName("draggable")] 
        public bool Draggable { get; set; } = false;        
        
        [JsonPropertyName("preventContextMenu")]
        public bool? PreventContextMenu { get; set; } = false;
    }
}
