const peer = new Peer(undefined, {
  host: "/",
  port: 3030,
  path: "/peer",
});
const socket = io();

socket.on("user", (idUser) => {
  if (peer._id === idUser) {
    console.log("no call");
    return;
  }
  console.log("call", idUser);
  call(idUser);
});
console.log(peer);
const video = document.getElementById("video");
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function (err) {
    /* handle the error */
  });
document.getElementById("grid-video").appendChild(video);
// const peer = new Peer('someid', {
//   host: 'localhost',
//   port: 9000,
//   path: '/myapp'
// });
function call(id) {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      var call = peer.call(id, stream);
      call.on("stream", function (remoteStream) {
        let video1 = document.createElement("video");
        video1.srcObject = remoteStream;
        video1.play();
        document.getElementById("grid-video").appendChild(video1);
        // Show stream in some video/canvas element.
        console.log("ok");
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
}
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
peer.on("call", function (call) {
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", function (remoteStream) {
        // Show stream in some video/canvas element.
        let video = document.createElement("video");
        video.srcObject = remoteStream;
        video.play();
        document.getElementById("grid-video").appendChild(video);
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});
