#!/usr/bin/env python3
"""Generate a short human-like vocal "ah" and write WAV to public/sounds/human_ah.wav

This uses only the Python stdlib (wave, struct, math) so it can run in the devcontainer.
"""
import math
import wave
import struct
import os

SR = 44100
DURATION = 1.2
F0 = 130.0
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'sounds')
os.makedirs(OUT_DIR, exist_ok=True)
OUT_PATH = os.path.join(OUT_DIR, 'human_ah.wav')

total_amp = 1.0 + 0.6 + 0.4 + 0.2 + 0.1
amp = 0.8

frames = []
N = int(SR * DURATION)
for i in range(N):
    t = i / SR
    # simple amplitude envelope: quick attack, slow decay
    if t < 0.02:
        env = t / 0.02
    else:
        env = max(0.0, 1.0 - (t - 0.02) / (DURATION - 0.02))

    # mild vibrato
    vib = 1.0 + 0.003 * math.sin(2 * math.pi * 5.0 * t)

    # sum of harmonics for a vowel-like tone
    s = 0.0
    harmonics = [(1, 1.0), (2, 0.6), (3, 0.4), (4, 0.2), (5, 0.1)]
    for h, a in harmonics:
        s += a * math.sin(2 * math.pi * F0 * h * t * vib)

    # normalize, apply envelope
    sample = env * (s / total_amp)
    # soft clipping for safety
    val = int(max(-1.0, min(1.0, sample * amp)) * 32767)
    frames.append(val)

with wave.open(OUT_PATH, 'wb') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(struct.pack('<' + 'h' * len(frames), *frames))

print('Generated', OUT_PATH)
