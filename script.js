let arr = [
  {
    name: "VTV1",
    value: "https://s1.nihontv.net:21585/vtv1/index.m3u8",
  },
  {
    name: "VTV2",
    value: "https://live-zlr1.tv360.vn/manifest/vtv2/playlist_720p.m3u8",
  },
  {
    name: "VTV3",
    value: "https://live-zlr1.tv360.vn/manifest/VTV3/playlist_720p.m3u8",
  },
  {
    name: "VTV5",
    value: "https://live.tv360.vn/manifest/VTV5_HD/playlist_720p.m3u8",
  },
  {
    name: "VTV6",
    value: "https://live.tv360.vn/manifest/VTV6_HD/playlist_720p.m3u8",
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
