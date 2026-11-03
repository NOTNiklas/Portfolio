---
title: "Combo Graph 1.0: ein Node-Editor in Slate"
date: 2026-07-18
category: tools
readingTime: 7
excerpt: Was ich beim Schreiben meines ersten Unreal-Editor-Plugins gelernt habe.
---

Combos waren anfangs eine lange Liste von If-Abfragen. Jeder neue Angriff hieß, an drei Stellen Code anzufassen. Combo Graph verlegt das in einen Node-Editor direkt in Unreal.

## Warum ein Graph

Combos verzweigen sich. Ein leichter Angriff kann in einen weiteren leichten, einen schweren oder einen Dodge-Cancel übergehen. Ein Graph zeigt das auf einen Blick, eine Liste nicht.

## Was schwierig war

Slate, das UI-Framework des Unreal-Editors, hat einen steilen Einstieg. Sobald der erste eigene Node gerendert wurde, ging der Rest schnell.
