#!/usr/bin/env bash
# Transcodes lossless masters/<release>/*.flac into web-ready MP3s in audio/<release>/.
# Run this whenever files in masters/ change (e.g. after dropping in real mixes).
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p assets/downloads

for release_dir in masters/*/; do
    release=$(basename "$release_dir")
    mkdir -p "audio/$release"
    for src in "$release_dir"*.flac; do
        [ -e "$src" ] || continue
        base=$(basename "$src" .flac)
        slug=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
        out="audio/$release/${slug}.mp3"
        ffmpeg -y -i "$src" -codec:a libmp3lame -qscale:a 4 "$out" -loglevel error
        echo "transcoded: $out"
    done

    zip_out="assets/downloads/${release}.zip"
    rm -f "$zip_out"
    (cd "audio/$release" && zip -j "../../$zip_out" ./*.mp3 >/dev/null)
    echo "zipped: $zip_out"
done
