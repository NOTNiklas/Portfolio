---
title: "Why my hero was tiny: retargeting a custom skeleton in UE5"
date: 2026-10-14
category: kintsugi
readingTime: 6
excerpt: My character came in at normal size, then shrank to an ant the moment I retargeted the sample animations. Here is what the root and pelvis had to do with it.
---

Ren arrived in Unreal at exactly the right size. The skeletal mesh looked fine, the materials loaded, everything was ready for animation. Then I retargeted the Manny and Quinn sample animations onto him and he shrank to the size of an ant.

## The symptom

The mesh on its own had normal proportions. Only the retargeted animations were tiny. That narrowed it down quickly: the problem was not the model, it was how the two skeletons relate to each other.

## The cause

The skeleton came out of an AI-to-3D tool. Its root and pelvis sat at very different positions and scales than the UE5 mannequin expects. The retargeter compares those chains and scales the motion to match, so a mismatch at the bottom of the hierarchy affects everything above it.

## What I learned

Check the root and pelvis before anything else. Make sure the scale and the reference pose of both skeletons agree, then set up the retarget chains. Fixing that first would have saved me two evenings.
