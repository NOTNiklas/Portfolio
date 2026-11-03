---
title: "Combo Graph 1.0: building a node editor in Slate"
date: 2026-07-18
category: tools
readingTime: 7
excerpt: What I learned writing my first Unreal editor plugin.
---

Combos started as a long list of if-statements. Every new attack meant touching code in three places. Combo Graph moves that into a node editor inside Unreal.

## Why a graph

Combos branch. A light attack can lead into another light, a heavy or a dodge cancel. A graph shows that at a glance, a list does not.

## What was hard

Slate, the UI framework of the Unreal editor, has a steep start. Once the first custom node rendered, the rest followed quickly.
