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
        public string Id { get; init; } = Guid.NewGuid().ToString();

        [JsonPropertyName("start")]
        public float Start { get; init; } = 0f;

        [JsonPropertyName("end")]
        public float End { get; init; } = 0f;

        [JsonPropertyName("loop")]
        public bool? Loop { get; init; }

        [JsonPropertyName("drag")]
        public bool Drag { get; init; } = true;

        [JsonPropertyName("resize")]
        public bool Resize { get; init; } = true;

        [JsonPropertyName("color")]
        public string Color { get; init; } = "rgba(0,0,0,0.1)";

        [JsonPropertyName("channelIdx")]
        public int? ChannelId { get; init; }

        [JsonPropertyName("handleStyle")]
        public JsonElement? HandleStyle { get; init; }

        [JsonPropertyName("preventContextMenu")]
        public bool? PreventContextMenu { get; init; } = false;

        [JsonPropertyName("showTooltip")]
        public bool ShowTooltip { get; init; } = true;
    }

    public static class WavesurferRegionService
    {
        public static WavesurferRegion? ConvertFromJS(JsonElement region)
        {
            return JsonSerializer.Deserialize<WavesurferRegion>(region);
        }
    }
}
