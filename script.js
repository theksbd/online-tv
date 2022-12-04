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
    name: "VTV5",
    value:
      "https://vips-livecdn.fptplay.net/hda2/vtv5hd_vhls.smil/chunklist_b5000000.m3u8",
  },
  {
    name: "VTV6",
    value:
      "https://vips-livecdn.fptplay.net/hda1/vtv6hd_vhls.smil/chunklist_b5000000.m3u8",
  },
];

const playVideo = document.getElementById("tvplay");
playVideo.onclick = function () {
  playVideo.play();
};

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

const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.replace("?channel=" + this.value);
  });
});

function initializeTV() {
  const query = window.location.search.substring(1);
  const qs = parse_query_string(query);
  let channel = qs.hasOwnProperty("channel") ? qs.channel : "VTV3";
  const obj = arr.find((item) => item.name === channel);
  const url = obj.value;
  document.getElementById("tvsource").src = url;
  document.getElementById("selectChannel").value = obj.name;
  const player = videojs("tvplay");
  player.play();
}

initializeTV();
