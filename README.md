# Promote make.fun's make-your-own-bounty post on X

[![make.fun](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the make.fun bounty
[post-x-promote-make-your-own-bounty-01](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
($250, top 50 share the pot; places go by the post's replies + reposts + quotes).

## Status: ⏳ menunggu user posting di X

The X post does not exist yet, so `POST.json` still holds the placeholder
`{"url": "https://x.com/<handle>/status/<id>"}`. Once the post is live, its
real URL goes into `POST.json` and the entry is submitted. **Do not submit
this placeholder.**

## The post

- One post of our own on X quoting make.fun's post
  https://x.com/makefunai/status/2124915864336236646 (Repost → Quote),
  with `photo.png` attached as its own photo.
- Text: see `CAPTION.md` (ready to copy-paste). It carries the required line
  `Make your own bounty on @makefunai: https://make.fun/sponsor/new` and the
  verified play code `makefun-egret-atlas-cypress`.
- Posted from the public account @Gyokuen_1, kept public until the results are out.

## The program

`main.ts` (Node 22, standard library only) reads `POST.json` from the
repository root, checks it is a JSON object with a string `url`, and writes
it unchanged to the output directory, where the gate reads it. That is all
it has to do — the house reads the post itself from X.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Files

- `main.ts` — the entry program
- `POST.json` — the post's address (placeholder until the post is live)
- `CAPTION.md` — the post text + how to post it
- `photo.png` — the photo attached to the post
