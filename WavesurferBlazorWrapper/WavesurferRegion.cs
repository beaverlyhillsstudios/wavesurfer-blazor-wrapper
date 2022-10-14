using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WavesurferBlazorWrapper
{
    public record WavesurferRegion
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonPropertyName("start")]
        public float Start { get; set; } = 0f;

        [JsonPropertyName("end")]
        public float End { get; set; } = 0f;

        [JsonPropertyName("loop")]
        public bool? Loop { get; set; }

        [JsonPropertyName("drag")]
        public bool Drag { get; set; } = true;

        [JsonPropertyName("resize")]
        public bool Resize { get; set; } = true;

        [JsonPropertyName("color")]
        public string Color { get; set; } = "rgba(0,0,0,0.1)";

        [JsonPropertyName("channelIdx")]
        public int? ChannelId { get; set; }

        [JsonPropertyName("handleStyle")]
        public JsonElement? HandleStyle { get; set; }

        [JsonPropertyName("preventContextMenu")]
        public bool? PreventContextMenu { get; set; } = false;

        [JsonPropertyName("showTooltip")]
        public bool ShowTooltip { get; set; } = true;
    }
}
