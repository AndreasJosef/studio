# Raw WebRTC—no libraries like PeerJS or Socket.io—just the native "OG Principles" of the browser.

## 1. The Architecture: The "Signaling" Handshake

WebRTC is peer-to-peer, but the two computers need a "phonebook" to find each other initially. This is called **Signaling**.

1. **Peer A** creates an "Offer" (a text file describing their video format).
2. **Peer B** receives the offer and creates an "Answer."
3. **The Server's only job:** Passing these two text files back and forth. After that, the server can literally go to sleep.

---

## 2. The "Field Logic" Starter Code (The UI)

Save this as `index.html`. It’s a single-file, zero-dependency TUI-inspired interface.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body {
        background: #000;
        color: #00ff00;
        font-family: 'JetBrains Mono', monospace;
        padding: 20px;
      }
      #room-container {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 20px;
      }
      video {
        width: 100%;
        border: 1px solid #333;
        background: #111;
        transform: scaleX(-1);
      }
      .member-list {
        border-left: 1px solid #333;
        padding-left: 20px;
      }
      input,
      button {
        background: #111;
        color: #00ff00;
        border: 1px solid #00ff00;
        padding: 5px;
        margin: 5px 0;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <h1>[FIELD LOGIC]: THE_ROOM_v1.0</h1>
    <div id="room-container">
      <div class="video-grid">
        <video id="localVideo" autoplay playsinline muted></video>
        <video id="remoteVideo" autoplay playsinline></video>
      </div>
      <div class="member-list">
        <h3>MEMBERS_LIST</h3>
        <ul id="users">
          <li>SYSTEM_OPERATOR (YOU)</li>
        </ul>
        <textarea
          id="offerCode"
          placeholder="Paste Offer/Answer here..."
        ></textarea>
        <button onclick="createOffer()">1. CREATE OFFER</button>
        <button onclick="acceptOffer()">2. ACCEPT OFFER/ANSWER</button>
      </div>
    </div>

    <script>
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // A public "reflector" to find your public IP
      });

      let localStream;

      // Start Camera
      async function init() {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        document.getElementById('localVideo').srcObject = localStream;
        localStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, localStream));
      }

      // Handle incoming video
      pc.ontrack = (event) => {
        document.getElementById('remoteVideo').srcObject = event.streams[0];
      };

      // WebRTC Handshake Logic
      async function createOffer() {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        // In a real app, you'd send this via a WebSocket. For now, we copy-paste.
        document.getElementById('offerCode').value = JSON.stringify(
          pc.localDescription
        );
      }

      async function acceptOffer() {
        const data = JSON.parse(document.getElementById('offerCode').value);
        if (data.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          document.getElementById('offerCode').value = JSON.stringify(
            pc.localDescription
          );
        } else if (data.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
        }
      }

      init();
    </script>
  </body>
</html>
```

---

## 3. The "Field Logic" Optimization

Because you are using your T14 G1, you want to ensure the browser doesn't over-calculate.

- **Resolution Caps:** In `getUserMedia`, you can specify `{ video: { width: 640, height: 480 } }`. For a school group project, you don't need 4K. Lowering the resolution is the single best way to keep your CPU cool.
- **Direct DOM:** Notice we are using `document.getElementById`. No Virtual DOM, no diffing. When a track arrives, the browser's C++ engine hooks it directly to the `<video>` hardware sink.

---

## 4. Scaling to a "Group Project"

For a "Room" with 5+ people, you have two choices:

1. **Mesh (P2P):** Everyone connects to everyone else. (Great for 3-4 people, but taxes your upload speed).
2. **SFU (Selective Forwarding Unit):** You use a tiny C/C++ server (like **Mediasoup** or **Janus**) that just "forwards" the packets. This is what professional bespoke tools use.

---

## 5. Your Project Roadmap

- **Step 1:** Run the code above. Open two tabs of Zen Browser side-by-side. Copy the "Offer" from one to the other. You’ve just bypassed Zoom.
- **Step 2:** Add a small **Node.js or C server** with WebSockets so you don't have to copy-paste the text files manually.
- **Step 3:** Use your **Custom Elements** skill to make each participant's video a standalone `<field-logic-peer>` component.

### Why this is "Future Smart"

By building this, you aren't just making a chat app; you are learning **Network Topology** and **Media Streams**. Even if AI writes the UI, the _topology_ of how people connect is a design choice only a human Architect makes.

**Would you like me to help you write the 20-line Node.js "Signaling Server" to replace the copy-pasting so you can actually use this for a group project?**
