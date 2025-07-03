export async function POST(req) {
  const { text } = await req.json();
  const apiKey = process.env.ELEVEN_LABS_API_KEY;

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE/stream', {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      voice_settings: { stability: 0.5, similarity_boost: 0.5 }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ElevenLabs API error:', errorText);
    return new Response(errorText, { status: 500 });
  }

  const audioBuffer = await response.arrayBuffer();
  return new Response(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg'
    }
  });
}
