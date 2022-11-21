let arr = [
  {
    name: "VTV1",
    value:
      "https://vips-livecdn.fptplay.net/hda1/vtv1hd_vhls.smil/chunklist_b5000000.m3u8",
  },
  {
    name: "VTV2",
    value:
      "https://vips-livecdn.fptplay.net/hda1/vtv2_vhls.smil/chunklist_b5000000.m3u8",
  },
  {
    name: "VTV3",
    value:
      "https://vips-livecdn.fptplay.net/hda1/vtv3hd_vhls.smil/chunklist_b5000000.m3u8",
  },
  {
    name: "VTV6",
    value:
      "https://vips-livecdn.fptplay.net/hda1/vtv6hd_vhls.smil/chunklist_b5000000.m3u8",
  },
];

function parse_query_string(query) {
  const params = query.split("&");
  const query_string = {};
  for (let i = 0; i < params.length; i++) {
    const pair = params[i].split("=");
    const key = decodeURIComponent(pair.shift());
    const value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = value;
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      const arr = [query_string[key], value];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(value);
    }
  }
  return query_string;
}

$(document.body).on("change", "#selectChannel", function (e) {
  const btnRadio = document.querySelector('input[name=VTV]:checked').value;
  console.log(btnRadio);
  window.location.replace("?channel=" + btnRadio);
});

$(function () {
  const query = window.location.search.substring(1);
  const qs = parse_query_string(query);
  // <!-- console.log("qs: " + qs); -->
  let cn = "VTV6";
  if (qs.hasOwnProperty("channel")) {
    // <!-- console.log("channel: " + qs.channel); -->
    cn = qs.channel;
  }
  let obj = arr.find((o) => o.name === cn);
  // <!-- console.log(obj); -->
  document.title = "S3H Háng Vương";
  document.getElementById("tvsource").src = obj.value;
  document.getElementById("selectChannel").value = obj.name;
  const player = videojs("tvplay");
  player.play();
});
