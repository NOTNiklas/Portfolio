---
title: "Warum mein Held winzig war: ein eigenes Skelett in UE5 retargeten"
date: 2026-10-14
category: kintsugi
readingTime: 6
excerpt: Mein Character kam in normaler Größe an und schrumpfte auf Ameisengröße, sobald ich die Beispielanimationen retargetet habe. Was Root und Pelvis damit zu tun hatten.
---

Ren kam genau in der richtigen Größe in Unreal an. Das Skeletal Mesh sah gut aus, die Materialien waren geladen, alles war bereit für Animationen. Dann habe ich die Beispielanimationen von Manny und Quinn auf ihn retargetet, und er schrumpfte auf Ameisengröße.

## Das Symptom

Das Mesh allein hatte normale Proportionen. Nur die retargeteten Animationen waren winzig. Das hat die Suche schnell eingegrenzt: Das Problem war nicht das Modell, sondern wie die beiden Skelette zueinander stehen.

## Die Ursache

Das Skelett stammte aus einem KI-zu-3D-Tool. Root und Pelvis lagen an ganz anderen Positionen und in einem anderen Maßstab, als der UE5-Mannequin erwartet. Der Retargeter vergleicht diese Ketten und skaliert die Bewegung passend, also wirkt sich ein Fehler ganz unten in der Hierarchie auf alles darüber aus.

## Was ich gelernt habe

Zuerst Root und Pelvis prüfen. Sicherstellen, dass Maßstab und Referenzpose beider Skelette übereinstimmen, und erst dann die Retarget-Ketten einrichten. Das zuerst zu beheben, hätte mir zwei Abende gespart.
