"""Render the chronological homepage film from its attributed source footage.

Usage:
  python3 scripts/build-decades-film.py --archive-dir /path/to/archive \
      --modern-dir /path/to/modern

Source filenames, time ranges, provenance and licenses: docs/decades-film-edit.json.
Requires FFmpeg. Original downloads and intermediate files are not shipped.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import subprocess


def run(*args):
    subprocess.run(args, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive-dir", required=True, type=Path)
    parser.add_argument("--modern-dir", required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    edit = json.loads((root / "docs/decades-film-edit.json").read_text())
    work = root / "output/decades-film"
    work.mkdir(parents=True, exist_ok=True)
    output = root / "public/videos/greatness-through-time.mp4"
    roots = {"archive": args.archive_dir, "modern": args.modern_dir}

    def render(entry):
        index, shot = entry
        group, name = shot["input"].split("/", 1)
        source = roots[group] / name
        target = work / f"{index:02d}.mp4"
        filters = [shot["crop"]] if shot.get("crop") else []
        filters.extend([
            "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos",
            "crop=1920:1080",
            "setsar=1",
            "setpts=PTS-STARTPTS",
            "fps=30",
            "format=yuv420p",
        ])
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-ss", str(shot["start"]), "-i", str(source), "-an",
            "-vf", ",".join(filters), "-frames:v", "15",
            "-c:v", "libx264", "-preset", "medium", "-crf", "21",
            "-threads", "2", "-video_track_timescale", "15360", str(target))
        return target

    with ThreadPoolExecutor(max_workers=3) as pool:
        paths = list(pool.map(render, enumerate(edit["shots"])))
    concat = work / "concat.txt"
    concat.write_text("".join(f"file '{p.name}'\n" for p in paths))
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-f", "concat", "-safe", "0", "-i", str(concat),
        "-c", "copy", "-movflags", "+faststart", str(output))

    # A Wedge wave makes the reduced-motion/fallback composition independent
    # of playback; a still preserves the texture of the actual source.
    poster_index = next(i for i, s in enumerate(edit["shots"]) if s["id"] == "modern-04")
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-ss", str(poster_index * 0.5 + 0.2), "-i", str(output),
        "-frames:v", "1", "-q:v", "2", str(root / "public/videos/greatness-poster.jpg"))

    client = {
        "shots": [{k: s[k] for k in ("year", "label")} for s in edit["shots"]],
        "sources": [
            {k: s[k] for k in ("title", "url", "author", "license", "licenseUrl")}
            for s in edit["sources"]
        ],
        "licenseNote": edit["licenseNote"],
    }
    (root / "src/data/decades-film.json").write_text(
        json.dumps(client, ensure_ascii=False, indent=2) + "\n"
    )
    credits = [
        f'{edit["title"]} — edited by Capra',
        edit["licenseNote"] + "\n" + edit["licenseUrl"],
    ]
    credits.extend(
        f'{source["title"]}\n{source["author"]}\n{source["url"]}\n'
        f'{source["license"]}: {source["licenseUrl"]}'
        for source in edit["sources"]
    )
    credits.append(
        "Changes: half-second excerpts, muted, scaled, cropped, and assembled chronologically."
    )
    (root / "public/videos/greatness-credits.txt").write_text("\n\n".join(credits) + "\n")
    print(f"Rendered {len(paths)} half-second shots: {output}")


if __name__ == "__main__":
    main()
