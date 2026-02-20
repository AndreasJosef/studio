const roomID = 'field-logic-hall';
const ws = new WebSocket('ws://localhost:8080');
const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
});

// 1. Force H.264 for Hardware Acceleration
const forceH264 = (pc) => {
  const { codecs } = RTCRtpReceiver.getCapabilities('video');
  const h264Codecs = codecs.filter((c) => c.mimeType === 'video/H264');
  const transceivers = pc.getTransceivers();
  transceivers.forEach((t) => {
    if (t.receiver.track.kind === 'video') t.setCodecPreferences(h264Codecs);
  });
};

// 2. Capture Intent (Presenter)
async function startPresentation() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: 30 },
  });
  document.getElementById('main-stage').srcObject = stream;
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  forceH264(pc);
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  ws.send(JSON.stringify({ type: 'offer', sdp: offer, roomID }));
}

// 3. Handle Incoming Reflections (Students)
pc.ontrack = (event) => {
  const [stream] = event.streams;
  const v = document.createElement('video');
  v.autoplay = true;
  v.srcObject = stream;
  document.getElementById('hall').appendChild(v);
};

// 4. The Signaling Logic
ws.onopen = () => ws.send(JSON.stringify({ type: 'join', roomID }));
ws.onmessage = async (msg) => {
  try {
    // 1. Check if the data is a string or needs to be converted
    let rawData = msg.data;
    if (rawData instanceof Blob) {
      rawData = await rawData.text(); // Convert Blob to string
    }

    const data = JSON.parse(rawData);

    // 2. The Logic Switchboard
    if (data.type === 'offer') {
      console.log('[FIELD_LOGIC]: Offer Received');
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws.send(JSON.stringify({ type: 'answer', sdp: answer, roomID }));
    } else if (data.type === 'answer') {
      console.log('[FIELD_LOGIC]: Answer Received');
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    } else if (data.type === 'ice-candidate' && data.candidate) {
      console.log('[FIELD_LOGIC]: Candidate Added');
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  } catch (err) {
    console.error('[FIELD_LOGIC] Parse Error:', err);
    console.log('[FIELD_LOGIC] Raw Data that failed:', msg.data);
  }
};

pc.onicecandidate = (event) => {
  if (event.candidate) {
    ws.send(
      JSON.stringify({
        type: 'ice-candidate',
        candidate: event.candidate,
        roomID,
      })
    );
  }
};

// Telemetry Monitor (Audit the Physics)
setInterval(async () => {
  const stats = await pc.getStats();
  stats.forEach((report) => {
    if (report.type === 'outbound-rtp' && report.kind === 'video') {
      document.getElementById('telemetry').innerText =
        `SILICON_ACTIVE | CODEC: H264 | BPS: ${Math.round((report.bytesSent * 8) / 1000)}kbps`;
    }
  });
}, 2000);
