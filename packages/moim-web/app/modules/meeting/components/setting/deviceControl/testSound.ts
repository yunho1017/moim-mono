import {
  DefaultAudioMixController,
  TimeoutScheduler,
} from "amazon-chime-sdk-js";

export default function testSound(
  endCallback?: VoidFunction,
  sinkId?: string,
  frequency = 440,
  durationSec = 1,
  rampSec = 0.1,
  maxGainValue = 0.1,
) {
  if (!sinkId || sinkId === "None") {
    return;
  }

  const audioContext = new window.AudioContext();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0;
  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.frequency.value = frequency;
  oscillatorNode.connect(gainNode);
  const destinationStream = audioContext.createMediaStreamDestination();
  gainNode.connect(destinationStream);
  const { currentTime } = audioContext;
  const startTime = currentTime + 0.1;
  gainNode.gain.linearRampToValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(maxGainValue, startTime + rampSec);
  gainNode.gain.linearRampToValueAtTime(
    maxGainValue,
    startTime + rampSec + durationSec,
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    startTime + rampSec * 2 + durationSec,
  );
  oscillatorNode.start();
  const audioMixController = new DefaultAudioMixController();
  audioMixController.bindAudioDevice({ deviceId: sinkId } as any);
  audioMixController.bindAudioElement(new Audio());
  audioMixController.bindAudioStream(destinationStream.stream);
  new TimeoutScheduler((rampSec * 2 + durationSec + 1) * 1000).start(() => {
    audioContext.close();
    endCallback?.();
  });
}
