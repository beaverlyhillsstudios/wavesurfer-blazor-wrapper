using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WavesurferBlazorWrapper
{
    public enum WavesurferRegionOptionKey
    {
        id = 0,
        start = 1,
        end = 2,
        loop = 3,
        drag = 4,
        resize = 5,
        color = 6,
        minLength = 7,
        maxLength = 8
    }
    public record WavesurferRegionOption(WavesurferRegionOptionKey Key, object Value);

    public static class WavesurferRegionOptionsService
    {
        public static object GetObjectFromRecords(IEnumerable<WavesurferRegionOption>? opts)
        {
            dynamic result = new ExpandoObject();  
            var dictionary = (IDictionary<string, object>)result;

            if (opts != null)
            {
                foreach (var opt in opts)
                {
                    dictionary.Add(opt.Key.ToString(), opt.Value);
                }
            }

            return result;
        }
    }
}
